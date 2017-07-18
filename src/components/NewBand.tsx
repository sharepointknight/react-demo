import * as React from "react";
import Band from "../model/Band"
import SharePointService from "../services/SharePointService";
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

export interface NewBandProps { bandAdded?:any };

export interface NewBandState { 
    bandName:string, 
    imageUrl:string, 
    category:string, 
    description:string 
};

export default class NewBand extends React.Component<NewBandProps,NewBandState>
{
    constructor()
    {
        super();
        this.state = {bandName:"",imageUrl:"",category:"Rock", description:""};
    }
    onTitleChange(event:any)
    {
        let val:string = event.target.value;
        this.setState({bandName:val});
    }
    onImageChange(event:any)
    {
        let val:string = event.target.value;
        this.setState({imageUrl:val});
    }
    onCategoryChange(event:any)
    {
        let val:string = event.target.value;
        this.setState({category:val});
    }
    onDescriptionChange(event:any)
    {
        let val:string = event.target.value;
        this.setState({description:val});
    }
    submit()
    {
        SharePointService.AddListItem("Bands",{
            Title: this.state.bandName,
            Category: this.state.category,
            Description: this.state.description,
            ImageUrl: this.state.imageUrl
        }).then((result:any) => {
            this.setState({
                imageUrl:"",
                category:"Rock",
                description:"",
                bandName:""
            });
            if(typeof(this.props.bandAdded)!=="undefined" && this.props.bandAdded != null)
                this.props.bandAdded(result.data);
        });
    }
    render() {
        return (<div>
            <input type="text" placeholder="Band Name" onChange={this.onTitleChange.bind(this)} value={this.state.bandName} /><br />
            <input type="text" placeholder="Image URL" onChange={this.onImageChange.bind(this)} value={this.state.imageUrl} /><br />
            <select onChange={this.onCategoryChange.bind(this)} value={this.state.category}>
                <option>Rock</option>
                <option>Country</option>
                <option>Techno</option>
            </select><br />
            <textarea rows={2} cols={10} onChange={this.onDescriptionChange.bind(this)} value={this.state.description} ></textarea>
            <br />
            { //<button type="button" onClick={this.submit.bind(this)}>Add</button>
            }
                            
                            
                    <DefaultButton
                    icon='Add'
                    text='Add Band' type="button" href="javascript:void(0)"
                    onClick={this.submit.bind(this)}
                />
            
        </div>);
    }
}