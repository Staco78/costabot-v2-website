import Client from "./client";

namespace Servers {
    export let servers: GuildInfos[] = [];
    let onChangeListeners: ((server: GuildInfos[]) => void)[] = [];

    export let state: 0 | 1 | 2 = 0;

    export async function update(): Promise<void> {
        state = 1;

        const client = Client.getInfos();

        if (!client) {
            await Client.waitUpdate();
            return await update();
        }

        const response = await fetch("/api/servers", { headers: { Authorization: `Bearer ${client.token}` } });
        servers = await response.json();

        state = 2;

        onChangeListeners.forEach(listener => listener(servers));
    }

    export function waitUpdate(): Promise<void> {
        return new Promise(async resolve => {
            if (state === 0) {
                await update();
                resolve();
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

    export function addChangeListener(listener: (servers: GuildInfos[]) => void) {
        onChangeListeners.push(listener);
    }

    export function removeChangeListener(listener: (servers: GuildInfos[]) => void) {
        const index = onChangeListeners.findIndex(value => listener === value);

        if (index === -1) throw new Error("Listener not found");

        onChangeListeners.splice(index);
    }

    export async function get(id: string): Promise<GuildInfos> {
        await waitUpdate();

        const server = servers.find(server => server.id === id);

        if (!server) throw new Error("Server not found");

        return server;
    }
}

export default Servers;
