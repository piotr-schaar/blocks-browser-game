import { h, Component } from 'preact';
import { Provider } from 'react-redux';
import { Router } from 'preact-router';
import store from '../store';

// Code-splitting is automated for routes
import Home from '../routes/home';

export default class App extends Component {
  render() {
    return (
      <div id="app">
        <Provider store={store}>
          <Router>
            <Home path="/" />
          </Router>
        </Provider>
      </div>
    );
  }
}
