import SpeedDialItem from 'models/speedDialItem';
import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';

export interface ISpeedDialProperties {

    item: SpeedDialItem;
    onItemClicked(id: string): void;
    onItemUrlClicked(url: string): void;
    openInNewTab: boolean;
}
class SpeedDialItemView extends React.Component<ISpeedDialProperties>{

    public constructor(props: ISpeedDialProperties) {
        super(props);
    }
    private onItemClicked() {
        this.props.onItemClicked(this.props.item.id);
    }
    render() {
        const MAX_LEN = 28;
        const reducedTitle = this.props.item.title.length > MAX_LEN ? this.props.item.title.substring(0, MAX_LEN - 3) + "..." : this.props.item.title;
        if (this.props.item.type == "folder") {

            return <NavLink className="item" to={`/${this.props.item.id}`}>

                <div className="wrapper" onClick={() => { this.onItemClicked(); }}>
                    <div className="icon" style={{ backgroundImage: `url(${this.props.item.icon}` }}></div>
                    <span className="title">{reducedTitle}</span>
                </div></NavLink>
        }
        else {
            return <a className="item" target={this.props.openInNewTab ? "_blank" : ""} href={this.props.item.url} >
                <div className="wrapper" onClick={() => { this.onItemClicked(); }}>
                    <div className="icon" style={{ backgroundImage: `url(${this.props.item.icon}` }}></div>
                    <span className="title">{reducedTitle}</span>
                </div></a>
        }
    }
}
export default SpeedDialItemView