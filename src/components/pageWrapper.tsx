import * as React from 'react'
import { NavLink } from 'react-router-dom';
import itemStore from 'stores/itemStore';

class PageWrapper extends React.Component<any, { subtitle: string, background: string }> {

    constructor(props: any) {
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

    render() {
        return (
            <div className="container">
                <nav className="navbar">
                    <NavLink className="navbar-brand" style={{}} to="/"><b>Speed</b>Dial</NavLink>
                    <span className="navbar-brand" style={{ marginLeft: '30px' }}>{this.state.subtitle}</span>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        {/* <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/documentation">Documentation</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/editor">Editor</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/imprint">Imprint</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/privacy">Privacy</NavLink>
                            </li>
                        </ul> */}

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