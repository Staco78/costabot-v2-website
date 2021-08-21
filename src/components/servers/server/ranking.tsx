import React from "react";

export default class Ranking extends React.Component {
    declare readonly props: { server: ServerData };

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div>
                {this.props.server.ranking.users.map(user => (
                    <RankingRow user={user} key={user.id} />
                ))}
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
            <div>
                <img src={this.props.user.avatarURL} />
                <div>{this.props.user.username}</div>
            </div>
        );
    }
}
