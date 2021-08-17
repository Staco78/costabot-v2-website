import { clientContext } from "@/contexts";
import Servers from "@/data/servers";
import React from "react";

export default class Account extends React.Component {
    constructor(props: any) {
        super(props);
    }

    render() {
        if (this.context === null) return <div>Vous n'êtes pas connecté</div>;

        return <div>Mon compte</div>;
    }
}
