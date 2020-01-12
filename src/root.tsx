import * as React from 'react'
import { Provider } from 'react-redux';
import { Route, HashRouter as Router, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import App from './App'
import { store } from './store';

export interface RootProps { }
class Root extends React.Component<RootProps, any> {
    public render() {
        return (
            <Provider store={store}>
                <Router>
                    <Switch>
                        <Route path="/" component={App} />
                    </Switch>
                </Router>
            </Provider>
        )
    }
}
export default hot(Root)
