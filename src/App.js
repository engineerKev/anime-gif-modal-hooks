import React, { useEffect, Suspense, useContext, useReducer } from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';

import './App.css';
import GiphModal from './containers/GiphModal/GiphModal';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import Layout from './components/Layout/Layout';
import { AuthContext } from './context/auth-context';
import SavedLikesProvider from './context/likedGiphs-context';
import {initialState as likedGiphsInitialState, reducer as likedGiphsReducer} from './reactStore/reducers/likedGiphsReducer';

const LikedGiphs = React.lazy(() => {
  return import('./containers/LikedGiphs/LikedGiphs')
});

const app = (props) => {
  const { authData, tryAutoSignIn } = useContext(AuthContext);
  const { token: isAuthenticatedHooks} = authData
  const [savedLikedState, savedLikedDispatch] = useReducer(likedGiphsReducer, likedGiphsInitialState);
  useEffect(() => {
    tryAutoSignIn();
  }, []);



  let routes = (
    <Switch>
      <Route path="/auth" component={Auth} />
      <Route path="/likes" render={(props) => {
        return (
          <SavedLikesProvider>
            <LikedGiphs 
              savedLikesDispatch={savedLikedDispatch}
              savedLikesState={savedLikedState} 
              {...props} 
            />
          </SavedLikesProvider>
        )
      }} />
      <Route path="/" exact render={(props) => {
        return (
          <GiphModal 
            savedLikedState={savedLikedState}
            savedLikedDispatch={savedLikedDispatch} 
            {...props} />
        )
      }} />
      <Redirect to="/" />
    </Switch>

  );
  
  if (isAuthenticatedHooks) {
    routes = (
      <Switch>
        <Route path="/logout" component={(props) => {
          return(
            <Logout savedLikedDispatch={savedLikedDispatch} {...props} />
          );
        }} />
      <Route path="/likes" render={(props) => {
        return (
          <SavedLikesProvider>
            <LikedGiphs 
              savedLikesDispatch={savedLikedDispatch}
              savedLikesState={savedLikedState} 
              {...props} 
            />
          </SavedLikesProvider>
        )
      }} />
      <Route path="/" exact render={(props) => {
        return (
          <GiphModal 
            savedLikedState={savedLikedState}
            savedLikedDispatch={savedLikedDispatch} 
            {...props} />
        )
      }} />
        <Redirect to="/" />
      </Switch>

    );
  }
  return (
    <div className="App">
      <BrowserRouter>
        <Layout
            savedLikedState={savedLikedState}
        >
          <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default app;
