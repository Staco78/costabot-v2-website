import Servers from "@/data/servers";
import React from "react";
import { Link, withRouter } from "react-router-dom";
import Ranking from "./ranking";

class Server extends React.Component {
    declare readonly props: { id: string };

    readonly state: { serverData: ServerData | null; error: Error | null };

    constructor(props: any) {
        super(props);

        this.state = { serverData: null, error: null };

        Servers.get((this.props as any).match.params.id)
            .then(server => this.setState({ serverData: server }))
            .catch(e => this.setState({ error: e }));
    }

    render() {
        if (this.state.error)
            return (
                <div>
                    {this.state.error.message === "Token not found" ? (
                        <span>
                            Please <Link to="/login">Login</Link>
                        </span>
                    ) : (
                        this.state.error.message
                    )}
                </div>
            );
        if (!this.state.serverData) return <div>Chargement...</div>;

        return (
            <div>
                <Ranking server={this.state.serverData} />
            </div>
        );
    }
}

export default withRouter(Server as any);
