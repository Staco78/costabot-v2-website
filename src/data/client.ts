namespace Client {
    let changeListeners: ((client: ClientInfos) => void)[] = [];
    let client: ClientInfos | null = null;

    export let state = 0;

    export function getInfos(): ClientInfos | null {
        return client;
    }

    export function addChangeListener(listener: (client: ClientInfos) => void) {
        changeListeners.push(listener);
    }

    export function removeChangeListener(listener: (client: ClientInfos) => void) {
        const index = changeListeners.findIndex(value => listener === value);

        if (index === -1) throw new Error("Listener not found");

        changeListeners.splice(index);
    }

    export async function update() {
        state = 1;

        const token = getTokenCookie();

        if (!token) return;

        const infos = await getInfoFromDiscord(token);

        client = infos;

        state = 2;

        changeListeners.forEach(listener => listener(infos));
    }

    export function waitUpdate(): Promise<void> {
        return new Promise(async resolve => {
            if (state === 0) {
                update().then(resolve);
            }
            if (state === 1) {
                addChangeListener(listener);
            }
            if (state === 2) resolve();

            function listener() {
                resolve();
                removeChangeListener(listener);
            }
        });
    }

    async function getInfoFromDiscord(token: string): Promise<ClientInfos> {
        const response = await fetch("https://discord.com/api/v9/users/@me", { headers: { Authorization: `Bearer ${token}` } });

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
