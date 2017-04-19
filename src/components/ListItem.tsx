import * as React from "react";

export interface ListItemProps { Text:string };

export default class ListItem extends React.Component<ListItemProps,any>
{
    render() {
        return (<li>{this.props.Text} - Test1</li>);
    }
}

