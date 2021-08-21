import { discordApiURL } from "@/common";
import { clientContext } from "@/contexts";
import Client from "@/data/client";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Account from "./account/account";
import Header from "./header/header";
import Server from "./servers/server/server";
import Servers from "./servers/serversList/servers";

const authUrl = discordApiURL + "/oauth2/authorize?client_id=804826144297844776&redirect_uri=http%3A%2F%2Flocalhost%2Fredirect_auth&response_type=code&scope=identify+guilds";

import type { APIUser } from "discord-api-types";

declare interface User extends APIUser {
    token: string;
}

export default class App extends React.Component {
    readonly state: { client: User | null };

    constructor(props: any) {
        super(props);

        this.state = { client: Client.getInfos() };

        Client.addChangeListener(client => this.setState({ client }));

        Client.update();
    }

    render() {
        return (
            <clientContext.Provider value={this.state.client}>
                <BrowserRouter>
                    <Header />
                    <Switch>
                        <Route exact path="/login">
                            <Redirect url={authUrl} />
                        </Route>
                        <Route exact path="/account">
                            <Account />
                        </Route>
                        <Route exact path="/servers">
                            <Servers />
                        </Route>
                        <Route path="/servers/:id">
                            <Server />
                        </Route>
                        <Route path="*">Not found</Route>
                    </Switch>
                </BrowserRouter>
            </clientContext.Provider>
        );
    }
}

function Redirect(props: { url: string }) {
    window.location.href = props.url;

    return <div></div>;
}
