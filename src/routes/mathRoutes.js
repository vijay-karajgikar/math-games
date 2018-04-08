import React from 'react';
import { BrowserRouter, Switch, Route, Link, NavLink } from 'react-router-dom';

import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';

import GameComponent from '../components/GameComponent';
import HomeComponent from '../components/HomeComponent';
import LoginComponent from '../components/LoginComponent';
import RegisterComponent from '../components/RegisterComponent';
import HeaderComponent from '../components/HeaderComponent';
import ForgotPasswordComponent from '../components/ForgotPasswordComponent';
import LogoutComponent from '../components/LogoutComponent';
import ResetComponent from '../components/ResetComponent';

import { registerUserAction, toggleLoginAction } from '../actions/UserAction';

var store = configureStore();
store.subscribe(() => {
    console.log(store.getState());
});

const MathRoutes = () => (
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <HeaderComponent />            
                <Switch>
                    <Route path="/" component={HomeComponent} exact />
                    <Route path="/login" component={LoginComponent} />
                    <Route path="/register" component={RegisterComponent} />
                    <Route path="/game" component={GameComponent} />
                    <Route path="/logout" component={LogoutComponent} />
                    <Route path="/reset" component={ResetComponent} />
                </Switch>
            </div>            
        </BrowserRouter>
    </Provider>
);

export default MathRoutes;