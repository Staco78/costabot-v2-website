import React from "react";

import css from "@/assets/style/serverSelect.module.css";
import { Link } from "react-router-dom";

export default class ServerSelect extends React.Component {
    declare readonly props: { children?: React.ReactNode; server: GuildInfos };

    constructor(props: { server: GuildInfos }) {
        super(props);
    }

    render() {
        return (
            <div className={css.container}>
                <Link to={`/servers/${this.props.server.id}`}>
                    <div className={css.server_info_container}>
                        <div>
                            {this.props.server.icon ? (
                                <img className={css.icon} src={`https://cdn.discordapp.com/icons/${this.props.server.id}/${this.props.server.icon}.png`} />
                            ) : (
                                <div className={css.icon} style={{ border: "1px solid white", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    {this.props.server.name
                                        .replace(/'s /g, " ")
                                        .replace(/\w+/g, e => e[0])
                                        .replace(/\s/g, "")}
                                </div>
                            )}
                        </div>
                        <div>{this.props.server.name}</div>
                    </div>
                </Link>
            </div>
        );
    }
}
