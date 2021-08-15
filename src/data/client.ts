namespace Client {
    let changeListeners: ((client: ClientInfos) => void)[] = [];

    export function getInfos(): ClientInfos | null {
        const client = localStorage.getItem("client");
        if (client === null) return client;

        return JSON.parse(client);
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
        const token = getTokenCookie();

        if (!token) return;

        const infos = await getInfoFromDiscord(token);

        changeListeners.forEach(listener => listener(infos));
    }

    async function getInfoFromDiscord(token: string): Promise<ClientInfos> {
        const response = await fetch("https://discord.com/api/v9/users/@me", { headers: { Authorization: `Bearer ${token}` } });
        const json = await response.json();

        console.log(json);

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
