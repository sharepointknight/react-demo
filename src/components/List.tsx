import ListItem from "./ListItem";
import * as React from "react";

export default class List extends React.Component<undefined,undefined>
{
    private items:string[] = ["Hello","World","Awesome"];
    render() {
        return (<ul>{this.items.map(function (obj,) { 
            debugger;
            return (<ListItem Text={obj} />)
        }) }</ul>);
    }
}