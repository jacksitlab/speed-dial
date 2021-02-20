import * as React from 'react'
import { NavLink } from 'react-router-dom';
import itemStore from 'stores/itemStore';
interface PageWrapperProps{
    onSearch?(onSearch:string):void;
}
class PageWrapper extends React.Component<PageWrapperProps, { subtitle: string, background: string }> {

    constructor(props: PageWrapperProps) {
        super(props);
        this.state = { subtitle: "", background: "" }
        this.onDataLoaded = this.onDataLoaded.bind(this);
        itemStore.on("change", this.onDataLoaded);
    }

    componentWillUnmount() {
        itemStore.removeListener("change", this.onDataLoaded);
    }
    private onDataLoaded() {
        this.setState({ subtitle: itemStore.getTitle(), background: itemStore.getBackground() })


    }
    private onInputChange(e:React.ChangeEvent<HTMLInputElement>){
        const value = e.target.value;
        if(this.props.onSearch){
            this.props.onSearch(value);
        }
    }
    render() {
        return (
            <div className="container">
                <nav className="navbar">
                    <NavLink className="navbar-brand" style={{}} to="/"><b>Speed</b>Dial</NavLink>
                    <span className="navbar-brand" style={{ marginLeft: '30px' }}>{this.state.subtitle}</span>
                    <div className="navbar-search">
                        <input type="text" placeholder="Search" onChange={(e)=>{this.onInputChange(e)}}/>


                    </div>
                </nav>
                <div className="form-inline" >
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <a className="nav-link github-fork-ribbon" data-ribbon="Fork me on GitHub" target="_blank" href="https://github.com/jacksitlab/speed-dial">SourceCode</a>
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