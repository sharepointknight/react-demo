import * as React from "react";
import Band from "../model/Band"

export interface BandListItemProps { Band:Band, onClick:any };

export default class BandListItem extends React.Component<BandListItemProps,any>
{
    render() {
        return (<li onClick={this.props.onClick}><i className="ms-Icon ms-Icon--MusicNote"></i> {this.props.Band.Title} - {this.props.Band.Category}</li>);
    }
}
//<i className="ms-Icon ms-Icon--MusicNote"></i>