import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

import css from "@/assets/style/header.module.css";
import AccountLink from "./accountLink";

export default class Header extends React.Component {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div className={css.header}>
                <Link to="/">
                    <img className={css.img} src="/assets/img/logo.png"></img>
                </Link>
                <div className={css.links}>
                    <Link to="/bot">Bot</Link>
                    <Link to="/servers">Serveurs</Link>
                    <AccountLink></AccountLink>
                </div>
            </div>
        );
    }
}
