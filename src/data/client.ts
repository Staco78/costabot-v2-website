import type { APIUser } from "discord-api-types";

declare interface User extends APIUser {
    token: string;
}

namespace Client {
    let changeListeners: ((client: User) => void)[] = [];
    let errorListeners: ((error: Error) => void)[] = [];
    let client: User | null = null;
    let error: Error | null = null;

    export let state: 0 | 1 | 2 = 0;

    export function getInfos(): User | null {
        return client;
    }

    export function addChangeListener(listener: (client: User) => void) {
        changeListeners.push(listener);
    }

    export function removeChangeListener(listener: (client: User) => void) {
        const index = changeListeners.findIndex(value => listener === value);

        if (index === -1) throw new Error("Listener not found");

        changeListeners.splice(index);
    }

    export function addErrorListener(listener: (error: Error) => void) {
        if (error) listener(error);
        else errorListeners.push(listener);
    }

    function callErrorListeners(_error: Error) {
        error = _error;
        errorListeners.forEach(listener => listener(_error));
        errorListeners = [];
    }

    export async function update() {
        state = 1;

        const token = getTokenCookie();

        if (!token) {
            const error = new Error("Token not found");
            callErrorListeners(error);
            return;
        }

        try {
            var infos = await getInfoFromDiscord(token);
        } catch (error: any) {
            callErrorListeners(error);
            return;
        }

        client = infos;

        state = 2;

        changeListeners.forEach(listener => listener(infos));
    }

    export function waitUpdate(): Promise<void> {
        return new Promise(async (resolve, reject) => {
            if (state === 0) {
                update().then(resolve).catch(reject);
            }
            if (state === 1) {
                addChangeListener(listener);
                addErrorListener(reject);
            }
            if (state === 2) resolve();

            function listener() {
                resolve();
                removeChangeListener(listener);
            }
        });
    }

    async function getInfoFromDiscord(token: string): Promise<User> {
        const response = await fetch("https://discord.com/api/v9/users/@me", {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status !== 200) {
            throw new Error("Discord unauthorized");
        }

        const json = await response.json();
        json.token = token;

        return json;
    }
}

export default Client;

function getTokenCookie(): string | null {
    const name = "token=";
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == " ") c = c.substring(1, c.length);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return null;
}
