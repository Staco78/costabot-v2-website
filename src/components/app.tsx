import Client from "@/data/client";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./header/header";

export default class App extends React.Component {
    constructor(props: any) {
        super(props);

        Client.update();
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <Header></Header>
                    <Switch>
                        <Route exact path="/login">
                            <Redirect url="https://discord.com/api/oauth2/authorize?client_id=804826144297844776&redirect_uri=http%3A%2F%2Flocalhost%2Fredirect_auth&response_type=code&scope=identify"></Redirect>
                        </Route>
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

function Redirect(props: { url: string }) {
    window.location.href = props.url;

    return <div></div>;
}
