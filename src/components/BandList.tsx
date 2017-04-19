import BandListItem from "./BandListItem";
import * as React from "react";
import Band from "../model/Band"

export interface BandListProps { Bands:Band[], bandClicked?:any };
export interface BandListState { selectedBand: null };
export default class BandList extends React.Component<BandListProps,BandListState>
{
    //static defaultProps: BandListProps;
    handleClick(obj:any)
    {
        this.setState({selectedBand:obj});
        if(typeof(this.props.bandClicked)!=="undefined" && this.props.bandClicked != null)
            this.props.bandClicked(obj);
    }
    render() {
        return (<ul>{this.props.Bands.map(function (obj:any) { 
            return (<BandListItem onClick={this.handleClick.bind(this, obj)} key={obj.ID} Band={obj} />)
        }.bind(this)) }</ul>);
    }
}
//BandList.defaultProps = { Bands:[], bandClicked: null};