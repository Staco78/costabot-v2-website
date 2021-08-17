import Servers from "@/data/servers";
import React from "react";
import { withRouter } from "react-router-dom";

class Server extends React.Component {
    declare readonly props: { id: string };

    readonly state: { serverData: GuildInfos | null; notFound: boolean };

    constructor(props: any) {
        super(props);

        this.state = { serverData: null, notFound: false };

        Servers.get((this.props as any).match.params.id)
            .then(server => this.setState({ serverData: server }))
            .catch(() => this.setState({ notFound: true }));
    }

    render() {
        if (this.state.notFound) return <div>Server not found</div>;
        if (!this.state.serverData) return <div>Chargement...</div>;

        return <div>{this.state.serverData.name}</div>;
    }
}

export default withRouter(Server as any);
