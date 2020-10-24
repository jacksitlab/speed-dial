import * as React from 'react'
import { NavLink } from 'react-router-dom';

class PageWrapper extends React.Component<any, any> {

    constructor(props: any) {
        super(props);

    }
    private getEditorBar(): JSX.Element {
        return <div className="dropdown navbar-nav mr-auto" >
            <input type="number" className="form-control col-3 mx-2" placeholder="width" onChange={(e) => { }} value={22}></input>
            <span style={{ color: '#EEEEEE' }} className=""> x </span>
            <input type="number" className="form-control col-3 mx-2" placeholder="height" onChange={(e) => { }} value={22}></input>
        </div>
    }
    render() {
        return (
            <div className="container-fluid p-0">
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <NavLink className="navbar-brand" style={{ color: '#bd9f6f' }} to="/"><b>Speed</b>Dial</NavLink>
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
                        <div className="form-inline" >
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <a className="nav-link github-fork-ribbon" data-ribbon="Fork me on GitHub" target="_blank" href="https://github.com/jacksitlab/speed-dial">SourceCode</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                {this.props.children}
                {/* <LoadingOverlay />
                <NotificationLayer /> */}
            </div>


        )
    }
}

export default PageWrapper;