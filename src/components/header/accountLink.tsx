import React from "react";
import { Link } from "react-router-dom";

import css from "@/assets/style/accountLink.module.css";
import { clientContext } from "@/contexts";


export default class AccountLink extends React.Component {
    static contextType = clientContext;
    declare context: React.ContextType<typeof clientContext>;

    constructor(props: any) {
        super(props);

    }

    render() {
        return this.context ? (
            <Link className={css.container} to="/account">
                <img className={css.avatar} src={`https://cdn.discordapp.com/avatars/${this.context.id}/${this.context.avatar}`}></img>
                <div className={css.username}>{this.context.username}</div>
            </Link>
        ) : (
            <Link to="/login">Login</Link>
        );
    }
}
