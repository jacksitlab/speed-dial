import SpeedDialItem from 'models/speedDialItem';
import * as React from 'react';
import { Route, Switch, useRouteMatch, withRouter } from "react-router";
import itemStore from 'stores/itemStore';
import PageWrapper from './pageWrapper';
import SpeedDialItemView from './speedDialItemView';

export interface IMainPageProperties {
    match: { params: { id: string } }
}
export interface IMainPageState {
    items: SpeedDialItem[] | null;
}

class MainPage extends React.Component<any, IMainPageState> {

    private readonly items: SpeedDialItem[];
    public constructor(props: any) {
        super(props);

        this.state = { items: itemStore.getData() };
        this.onDataLoaded = this.onDataLoaded.bind(this);
        itemStore.on("change", this.onDataLoaded);
        console.log(`id=${this.props.match.params.id}`);
        console.log(this.props)

    }
    componentWillUnmount() {
        itemStore.removeListener("change", this.onDataLoaded);
    }
    private onDataLoaded() {
        const data = itemStore.getData();
        console.log(`data loaded: ${JSON.stringify(data)}`)
        this.setState({ items: data })
    }
    private findItem(id: string): SpeedDialItem | null {
        if (this.state.items) {
            for (let i = 0; i < this.state.items.length; i++) {
                if (this.state.items[i].id == id) {
                    return this.state.items[i];
                }
            }
        }
        return null;
    }
    private onItemClicked(id: string) {
        console.log(`${id} clicked`)
        // const item = this.findItem(id);
        // if (item != null) {
        //     this.setState({ items: item.items })
        // }
    }
    private onItemUrlClicked(url: string) {
        console.log(`${url} clicked`)
    }
    render() {
        console.log("render")
        const items = SpeedDialItem.find(this.state.items, this.props.match.params.id);
        if (items) {
            return <PageWrapper>
                <div className="speed-dial-container">
                    {items.map((item) => {
                        return <SpeedDialItemView key={`item_${item.id}`} item={item}
                            onItemUrlClicked={(url) => { this.onItemUrlClicked(url) }}
                            onItemClicked={(id) => { this.onItemClicked(id); }} />
                    })}
                </div>
            </PageWrapper>
        }
        else {
            return <PageWrapper><div>Not Found</div></PageWrapper>
        }
    }
}

export default MainPage;