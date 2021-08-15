import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

import css from "@/assets/style/header.module.css";
import AccountLink from "./accountLink";
import Client from "@/data/client";

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
                    <AccountLink></AccountLink>
                </div>
            </div>
        );
    }
}
