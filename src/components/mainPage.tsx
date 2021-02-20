import { globals } from 'app';
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
    search: string;
}

class MainPage extends React.Component<any, IMainPageState> {

    private readonly items: SpeedDialItem[];
    public constructor(props: any) {
        super(props);

        this.state = { items: itemStore.getData() , search:""};
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
    isUrl(s: string): boolean {
        return s.trim().startsWith("url(");
    }
    componentDidUpdate() {
        document.title = `${globals.APP_TITLE}- ${itemStore.getTitle()}`;
        const bg = itemStore.getBackground();
        if (this.isUrl(bg)) {
            document.body.style.backgroundImage = bg;
        }
        else {
            document.body.style.background = bg;
        }
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
    private onSearch(searchString:string){
        console.log("search for "+searchString);
        this.setState({search:searchString});
    }
    render() {

        console.log(`render with search ${this.state.search}`)
        const items = SpeedDialItem.find(this.state.items, this.props.match.params.id, this.state.search);
        if (items) {
            return <PageWrapper onSearch={(searchString:string)=>{this.onSearch(searchString);}}>
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