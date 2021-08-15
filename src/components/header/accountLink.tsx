import Client from "@/data/client";
import React from "react";
import { Link } from "react-router-dom";

export default class AccountLink extends React.Component {
    readonly state: { client: ClientInfos | null };

    constructor(props: any) {
        super(props);

        this.state = { client: Client.getInfos() };

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        Client.addChangeListener(this.handleChange);
    }

    componentWillUnmount() {
        Client.removeChangeListener(this.handleChange);
    }

    handleChange(client: ClientInfos) {
        this.setState({ client });
    }

    render() {
        return this.state.client ? this.renderClient() : <Link to="/login">Login</Link>;
    }

    renderClient() {
        if (!this.state.client) throw new Error("Client not connected");

        return (
            <div>
                <div>
                    <img src={`https://cdn.discordapp.com/avatars/${this.state.client.id}/${this.state.client.avatar}`}></img>
                </div>
            </div>
        );
    }
}
