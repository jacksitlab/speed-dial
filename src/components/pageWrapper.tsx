import * as React from 'react'
import { NavLink } from 'react-router-dom';
import itemStore from 'stores/itemStore';
interface PageWrapperProps {
    onSearch?(onSearch: string): void;
    onEnter?(): void;
}
interface PageWrapperState {
    subtitle: string;
    background: string;
    showForkRibbon: boolean;
    searchValue: string;
    headerBackground?: string;
    headerLogo?: string
}
class PageWrapper extends React.Component<PageWrapperProps, PageWrapperState> {

    constructor(props: PageWrapperProps) {
        super(props);
        this.state = { subtitle: "", background: "", showForkRibbon: true, searchValue: "" }
        this.onDataLoaded = this.onDataLoaded.bind(this);
        itemStore.on("change", this.onDataLoaded);
    }

    componentWillUnmount() {
        itemStore.removeListener("change", this.onDataLoaded);
    }

    private onDataLoaded() {
        this.setState({
            subtitle: itemStore.getTitle(),
            background: itemStore.getBackground(),
            showForkRibbon: itemStore.showForkRibbon(),
            headerBackground: itemStore.getHeaderBackground(),
            headerLogo: itemStore.getHeaderLogo()
        })
    }
    private onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.onSearch(e.target.value);

    }
    private onSearch(e: string) {
        if (this.props.onSearch) {
            this.props.onSearch(e);
        }
        this.setState({ searchValue: e });

    }
    private onKeyPressed(e: React.KeyboardEvent<HTMLInputElement>) {
        console.log(`key ${e.key} pressed`)
        if (e.key == "Enter") {
            if (this.props.onEnter) {
                this.props.onEnter();
            }
        }
    }
    render() {
        return (
            <div className="container">
                <nav className="navbar" style={this.state.headerBackground ? { background: this.state.headerBackground } : {}}>
                    {this.state.headerLogo ? <img src={this.state.headerLogo} className="logo" /> : ""}
                    <NavLink onClick={() => { this.onSearch(""); }} className="navbar-brand" style={{}} to="/"><b>Speed</b>Dial</NavLink>
                    <span className="navbar-brand" style={{ marginLeft: '30px' }}>{this.state.subtitle}</span>
                    <div className="navbar-search">
                        <input id="tbx_search" autoFocus={true} type="text" placeholder="Search"
                            value={this.state.searchValue}
                            onKeyPress={(e) => { this.onKeyPressed(e); }}
                            onChange={(e) => { this.onInputChange(e) }} />
                    </div>
                </nav>
                <div className="form-inline" >
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            {this.state.showForkRibbon ? <a className="nav-link github-fork-ribbon" data-ribbon="Fork me on GitHub" target="_blank" href="https://github.com/jacksitlab/speed-dial">SourceCode</a> : ""}
                        </li>
                    </ul>
                </div>
                {this.props.children}
                {/* <LoadingOverlay />
                <NotificationLayer /> */}
            </div>


        )
    }
}

export default PageWrapper;