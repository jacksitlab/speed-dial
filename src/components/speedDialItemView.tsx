import SpeedDialItem from 'models/speedDialItem';
import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';

export interface ISpeedDialProperties {

    item: SpeedDialItem;
    onItemClicked(id: string): void;
    onItemUrlClicked(url: string): void
}
class SpeedDialItemView extends React.Component<ISpeedDialProperties>{

    public constructor(props: ISpeedDialProperties) {
        super(props);
    }
    private onItemClicked() {
        // if (this.props.item.type == "folder") {
        //     this.props.onItemClicked(this.props.item.id);
        // }
        // else {
        //     this.props.onItemUrlClicked(this.props.item.url);
        // }
    }
    render() {
        if (this.props.item.type == "folder") {

            return <NavLink className="item" to={`/${this.props.item.id}`}>

                <div onClick={() => { this.onItemClicked(); }}>
                    <div className=""></div>
                    <span>{this.props.item.title}</span>
                </div></NavLink>
        }
        else {
            return <a className="item" href={this.props.item.url} >

                <div onClick={() => { this.onItemClicked(); }}>
                    <div className=""></div>
                    <span>{this.props.item.title}</span>
                </div></a>
        }
    }
}
export default SpeedDialItemView