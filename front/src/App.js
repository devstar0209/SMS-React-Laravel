import React from 'react';
import { BrowserRouter } from "react-router-dom";
import { ConnectedRouter } from 'connected-react-router';
import { history } from './rootReducer';

import MainRoutes from './routes/MainRoutes';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <ConnectedRouter history={history}>
          <MainRoutes />
        </ConnectedRouter>
    );
  }
}

export default App;