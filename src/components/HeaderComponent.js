import React from 'react';
import { NavLink, Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import GameComponent from './GameComponent'
import HomeComponent from './HomeComponent';
import LoginComponent from './LoginComponent';
import RegisterComponent from './RegisterComponent'
import { toggleLoginAction } from '../actions/UserAction';
import styles from './header.css';


const HeaderComponent = (props) => (
    <div className={styles.containerDiv}>
        <li><NavLink className={styles.normal} to="/">Home</NavLink></li>
        <ul className={styles.linksList}>
            {
                !props.user.isLoggedIn && <li><NavLink
                    className={styles.normal}
                    to="/login">Login</NavLink></li>
            }
            {
                !props.user.isLoggedIn && <li><NavLink 
                    className={styles.normal}
                    to="/register">Register</NavLink></li>
            }
            {
                props.user.isLoggedIn && <li><NavLink
                    className={styles.normal}
                    to="/logout">Logout</NavLink></li>
            }
            {
                props.user.isLoggedIn && <li><NavLink 
                    className={styles.normal}
                    to="/game">Game</NavLink></li>
            }
            {
                props.user.isLoggedIn && 
                <li>
                    <span className={styles.normal}>{props.user.firstName}, {props.user.lastName}</span>
                </li>
            }
        </ul>
    </div>
);

export default connect((state) => {
    return {
        user: state.user,
        dispatch: state.dispatch
    };
})(HeaderComponent);