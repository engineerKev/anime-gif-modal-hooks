import React, { useEffect, Suspense, useContext } from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';

import './App.css';
import GiphModal from './containers/GiphModal/GiphModal';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import Layout from './components/Layout/Layout';
import { AuthContext } from './context/auth-context';

const LikedGiphs = React.lazy(() => {
  return import('./containers/LikedGiphs/LikedGiphs')
});

const app = (props) => {
  const { authData, tryAutoSignIn } = useContext(AuthContext);
  const { token: isAuthenticatedHooks} = authData
  useEffect(() => {
    tryAutoSignIn();
  }, []);



  let routes = (
    <Switch>
      <Route path="/auth" component={Auth} />
      <Route path="/likes" render={(props) => <LikedGiphs {...props} />} />
      <Route path="/" exact component={GiphModal} />
      <Redirect to="/" />
    </Switch>

  );
  //GET AUTH CONTEXT IN ORDER TO USE TOKEN 
  if (isAuthenticatedHooks) {
    routes = (
      <Switch>
        <Route path="/logout" component={Logout} />
        <Route path="/likes" render={(props) => <LikedGiphs {...props} />} />
        <Route path="/" exact component={GiphModal} />
        <Redirect to="/" />
      </Switch>

    );
  }
  return (
    <div className="App">
      <BrowserRouter>
        <Layout>
          <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default app;
