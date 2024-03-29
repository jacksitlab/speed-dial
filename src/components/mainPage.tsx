import { globals } from 'app';
import SpeedDialItem from 'models/speedDialItem';
import * as React from 'react';
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
    showHidden: boolean;
}

class MainPage extends React.Component<any, IMainPageState> {

    private readonly items: SpeedDialItem[];
    private updated: boolean;
    public constructor(props: any) {
        super(props);
        this.updated = false;
        let data = itemStore.getData();
        this.state = { items: data, filteredItems: SpeedDialItem.find(data, this.props.match.params.id, ""), search: "" , showHidden: false};
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
        document.title = `${globals.APP_TITLE} - ${itemStore.getTitle()}`;
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
        console.log(`${id} clicked`);
    }
    private onItemUrlClicked(url: string) {
        console.log(`${url} clicked`);
    }
    private onSearch(searchString: string) {
        console.log("search for " + searchString);
        this.setState({ search: searchString, filteredItems: SpeedDialItem.find(this.state.items, this.props.match.params.id, searchString, this.state.showHidden) });
    }
    private onShowHideToggleButtonChanged(show:boolean){
        console.log(`show hidden items: ${show}`);
        this.setState({ showHidden:show, filteredItems: SpeedDialItem.find(this.state.items, this.props.match.params.id, this.state.search, show) });
        
    }
    public static openUrl(url: string) {
        console.log(`open url ${url}`)
        if (itemStore.doOpenInNewTab()) {
            const w = window ? window.open(url, '_blank') : null;
            if (w) {
                w.focus();
            }
        }
        else {
            window.location.href = url;
        }
    }
    private onEnterPressed() {
        const items = this.state.filteredItems;
        if (items && items.length == 1) {
            MainPage.openUrl(items[0].url);
        }
        else {
            if (this.state.search.startsWith("g ")) {
                MainPage.openUrl(`https://www.google.com/search?q=${encodeURI(this.state.search.substring(2))}`);
            } else if (this.state.search.startsWith("d ")) {
                MainPage.openUrl(`https://duckduckgo.com/search?q=${encodeURI(this.state.search.substring(2)).replace("%20", "+")}`);
            } else if (this.state.search.startsWith("y ")) {
                MainPage.openUrl(`https://www.youtube.com/results?search_query=${encodeURI(this.state.search.substring(2)).replace("%20", "+")}`);
            } else if (this.state.search.startsWith("w ")) {
                MainPage.openUrl(`https://en.wikipedia.org/wiki/Special:Search?ns0=1&search=${encodeURI(this.state.search.substring(2))}`);
            }
            else if (/[a-z]+\.[a-z]{2,3}/.exec(this.state.search)) {
                MainPage.openUrl(`https://${this.state.search}`);
            }
        }
    }
   
    render() {

        console.log(`render with search ${this.state.search} and id ${this.props.match.params.id}`)
        let items = this.state.filteredItems;
        if (this.updated) {
            items = SpeedDialItem.find(this.state.items, this.props.match.params.id, this.state.search, this.state.showHidden);
            this.updated = false;
        }
        const openInNewTab = itemStore.doOpenInNewTab();
        if (items) {
            return <PageWrapper 
                onSearch={(searchString: string) => { this.onSearch(searchString); }} 
                onEnter={() => { this.onEnterPressed() }}
                onShowHideToggleButtonChanged={(show)=>{this.onShowHideToggleButtonChanged(show)}}
                >
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