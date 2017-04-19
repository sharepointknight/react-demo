import BandList from "./BandList";
import BandDetail from "./BandDetail";
import NewBand from "./NewBand";
import * as React from "react";
import Band from "../model/Band"
import SharePointService from "../services/SharePointService"

export interface SharePointDataState { Bands:Band[], selectedBand: Band };

export default class SharePointData extends React.Component<undefined,SharePointDataState>
{
    constructor()
    {
        super();
        this.state = { Bands: [], selectedBand:new Band() };
    }
    loadBands()
    {
        SharePointService.GetListItems("Bands").then(function (data:any){
            this.setState({Bands: data});
        }.bind(this));
    }
    componentWillMount()
    {
        this.loadBands();
    }
    bandClicked(selBand:any)
    {
        this.setState({selectedBand: selBand});
    }
    bandAdded(newBand:any)
    {
        let bands:Band[] = this.state.Bands;
        bands.push(newBand);
        this.setState({Bands: bands});
    }
    render() {
        let detail = <br />;
        if(this.state.selectedBand.Title != null)
            detail = <BandDetail Band={this.state.selectedBand} />
        return (
            <div>
                <div className="left">
                    <BandList Bands={this.state.Bands } ref="List" bandClicked={this.bandClicked.bind(this)} />

                    <NewBand bandAdded={this.bandAdded.bind(this)} />
                </div>
                {detail}
            </div>);
    }
}