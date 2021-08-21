import Client from "./client";

export default class Server {
    server: ServerData | null = null;
    private onChangeListeners: ((server: ServerData) => void)[] = [];

    state: 0 | 1 | 2 = 0;

    readonly id: string;

    constructor(id: string) {
        this.id = id;
    }

    async update(): Promise<void> {
        this.state = 1;

        const client = Client.getInfos();

        if (!client) {
            await Client.waitUpdate();
            return await this.update();
        }

        const response = await fetch(`/api/servers/${this.id}`, { headers: { Authorization: `Bearer ${client.token}` } });
        this.server = await response.json();

        this.state = 2;

        this.onChangeListeners.forEach(listener => listener(this.server as ServerData));
    }

    waitUpdate(): Promise<void> {
        return new Promise(async resolve => {
            const listener = () => {
                resolve();
                this.removeChangeListener(listener);
            };

            if (this.state === 0) {
                await this.update();
                resolve();
            }
            if (this.state === 1) {
                this.addChangeListener(listener);
            }
            if (this.state === 2) resolve();
        });
    }

    addChangeListener(listener: (server: ServerData) => void) {
        this.onChangeListeners.push(listener);
    }

    removeChangeListener(listener: (server: ServerData) => void) {
        const index = this.onChangeListeners.findIndex(value => listener === value);

        if (index === -1) throw new Error("Listener not found");

        this.onChangeListeners.splice(index);
    }
}
