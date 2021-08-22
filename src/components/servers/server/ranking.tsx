import React from "react";

import css from "@/assets/style/serverRanking.module.css";

export default class Ranking extends React.Component {
    declare readonly props: { server: ServerData };

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div style={{ marginTop: "40px", marginBottom: "20px", textAlign: "center" }}>
                <h1>Classement</h1>
                <div>
                    {this.props.server.ranking.users.map(user => (
                        <RankingRow user={user} key={user.id} />
                    ))}
                </div>
            </div>
        );
    }
}

class RankingRow extends React.Component {
    declare readonly props: { user: ServerRankingUser };

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div className={css.row_container}>
                <div className={css.row_left_container}>
                    <img className={css.row_img} src={this.props.user.avatarURL} />
                    <div>{this.props.user.username}</div>
                </div>
                <div>{`Niveau ${this.props.user.lvl} avec ${this.props.user.xp} xp`}</div>
            </div>
        );
    }
}
