import Client from "./client";

import type { APIPartialGuild } from "discord-api-types";
import Server from "./server";

namespace Servers {
    export let servers: APIPartialGuild[] = [];
    let detailledServers: Server[] = [];
    let onChangeListeners: ((server: APIPartialGuild[]) => void)[] = [];

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

    export function addChangeListener(listener: (servers: APIPartialGuild[]) => void) {
        onChangeListeners.push(listener);
    }

    export function removeChangeListener(listener: (servers: APIPartialGuild[]) => void) {
        const index = onChangeListeners.findIndex(value => listener === value);

        if (index === -1) throw new Error("Listener not found");

        onChangeListeners.splice(index);
    }

    export async function get(id: string): Promise<ServerData> {
        let server = detailledServers.find(server => server.id === id);

        if (server) {
            if (server.state === 0) await server.update();
            else if (server.state === 1) await server.waitUpdate();
        }

        if (!server) {
            const newServer = new Server(id);
            detailledServers.push(newServer);
            await newServer.update();
            server = newServer;
        }

        return server.server as ServerData;
    }
}

export default Servers;
