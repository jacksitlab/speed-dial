import { globals } from 'app';
import SpeedDialItem from 'models/speedDialItem';
import * as React from 'react';
import { Redirect, Route, Switch, useRouteMatch, withRouter } from "react-router";
import itemStore from 'stores/itemStore';
import PageWrapper from './pageWrapper';
import SpeedDialItemView from './speedDialItemView';


export interface IMainPageProperties {
    match: { params: { id: string } }
}
export interface IMainPageState {
    items: SpeedDialItem[] | null;
    filteredItems: SpeedDialItem[] | null;
    search: string;
}

class MainPage extends React.Component<any, IMainPageState> {

    private readonly items: SpeedDialItem[];
    private updated:boolean;
    public constructor(props: any) {
        super(props);
        this.updated = false;
        let data = itemStore.getData();
        this.state = { items: data, filteredItems: SpeedDialItem.find(data, this.props.match.params.id, ""), search: "" };
        this.onDataLoaded = this.onDataLoaded.bind(this);
        itemStore.on("change", this.onDataLoaded);
    }

    componentWillUnmount() {
        itemStore.removeListener("change", this.onDataLoaded);
    }
    private onDataLoaded() {
        const data = itemStore.getData();
        this.setState({ items: data, filteredItems: SpeedDialItem.find(data, this.props.match.params.id, this.state.search) })


    }
    isUrl(s: string): boolean {
        return s.trim().startsWith("url(");
    }
    componentDidUpdate() {
        console.log("update")
        document.title = `${globals.APP_TITLE}- ${itemStore.getTitle()}`;
        const bg = itemStore.getBackground();
        if (this.isUrl(bg)) {
            document.body.style.backgroundImage = bg;
        }
        else {
            document.body.style.background = bg;
        }
        this.updated = true;
    }
    private onItemClicked(id: string) {
        console.log(`${id} clicked`)
      // this.setState({ filteredItems: SpeedDialItem.find(this.state.items, this.props.match.params.id, this.state.search) });
    }
    private onItemUrlClicked(url: string) {
        console.log(`${url} clicked`)
    }
    private onSearch(searchString: string) {
        console.log("search for " + searchString);
        this.setState({ search: searchString, filteredItems: SpeedDialItem.find(this.state.items, this.props.match.params.id, searchString) });
    }
    private onEnterPressed() {
        const items = this.state.filteredItems;
        if (items && items.length == 1) {
            if (itemStore.doOpenInNewTab()) {
                const w = window ? window.open(items[0].url, '_blank') : null;
                if (w) {
                    w.focus();
                }
            }
            else {
                window.location.href = items[0].url;
            }
        }
    }
    render() {

        console.log(`render with search ${this.state.search} and id ${this.props.match.params.id}`)
        let items = this.state.filteredItems;
        if(this.updated){
            items = SpeedDialItem.find(this.state.items, this.props.match.params.id, this.state.search);
            this.updated = false;
        }
        const openInNewTab = itemStore.doOpenInNewTab();
        if (items) {
            return <PageWrapper onSearch={(searchString: string) => { this.onSearch(searchString); }} onEnter={() => { this.onEnterPressed() }}>
                <div className="speed-dial-container">
                    {items.map((item) => {
                        return <SpeedDialItemView key={`item_${item.id}`} item={item}
                            onItemUrlClicked={(url) => { this.onItemUrlClicked(url) }}
                            onItemClicked={(id) => { this.onItemClicked(id); }}
                            openInNewTab={openInNewTab} />
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