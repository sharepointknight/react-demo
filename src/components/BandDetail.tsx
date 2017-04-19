import * as React from "react";
import Band from "../model/Band"

export interface BandDetailProps { Band:Band };

export default class BandDetail extends React.Component<BandDetailProps,null>
{
    render()
    {
        return (
            <div className="left detail">
                <h2>{this.props.Band.Title}</h2>
                <img src={this.props.Band.ImageUrl} width="300"/><br />
                {this.props.Band.Description}
            </div>
        );
    }
}