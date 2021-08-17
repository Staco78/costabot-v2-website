import React from "react";

import css from "@/assets/style/button.module.css";

export default class Button extends React.Component {
    declare readonly props: { value: string; onClick?: () => void };

    constructor(props: any) {
        super(props);
    }

    render() {
        return <input type="button" value={this.props.value} className={css.button} onClick={this.props.onClick ?? (() => {})} />;
    }
}
