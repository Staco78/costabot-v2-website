import React from "react";
import DataServers from "@/data/servers";
import { clientContext } from "@/contexts";
import ServerSelect from "./serverSelect";

import type { APIPartialGuild } from "discord-api-types";

import css from "@/assets/style/servers.module.css";

export default class Servers extends React.Component {
    static contextType = clientContext;
    declare context: React.ContextType<typeof clientContext>;

    readonly state: { servers: APIPartialGuild[] };

    constructor(props: any) {
        super(props);

        this.state = { servers: [] };

        this.onChange = this.onChange.bind(this);

        if (DataServers.state === 0) DataServers.update();
        else if (DataServers.state === 2) this.state = { servers: DataServers.servers };
    }

    componentDidMount() {
        DataServers.addChangeListener(this.onChange);
    }

    componentWillUnmount() {
        DataServers.removeChangeListener(this.onChange);
    }

    onChange(servers: APIPartialGuild[]) {
        this.setState({ servers });
    }

    render() {
        if (this.state.servers.length === 0 && DataServers.state === 1) return <div>Chargement...</div>;
        if (this.state.servers.length === 0 && DataServers.state === 2) return <div>Aucun serveur</div>;

        return (
            <div className={css.container}>
                <h1>Sélectionnez un serveur</h1>
                <div className={css.serverList}>
                    {this.state.servers.map(server => (
                        <ServerSelect server={server} key={server.id} />
                    ))}
                </div>
            </div>
        );
    }
}
