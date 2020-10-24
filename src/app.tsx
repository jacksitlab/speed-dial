import * as React from 'react';
import * as ReactDOM from 'react-dom'
import { Route, HashRouter, Redirect, Switch } from 'react-router-dom';
import '../node_modules/github-fork-ribbon-css/gh-fork-ribbon.css'
import './app.css'
import PageWrapper from 'components/pageWrapper';
import MainPage from 'components/mainPage';

export const globals = {

}

const NotFoundPage = () => {
    return <PageWrapper><div className="container"><span>Page Not Found</span></div></PageWrapper>
}

class App extends React.Component {

    componentDidMount() {

    }
    render() {
        return (

            <HashRouter>
                <Switch>
                    <Route path="/" component={MainPage} />

                </Switch>
            </HashRouter>


        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));