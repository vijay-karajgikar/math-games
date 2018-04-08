import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toggleLoginAction } from '../actions/UserAction';
import axios from 'axios';
import styles from './login.css';

import InputControl from '../controls/InputControl';



class LoginComponent extends React.Component {
    state = {
        email: '',
        password: '',
        isError: false,
        snackbarMessage: '',
        snackbarOpen: false,
        user: undefined
    }

    constructor(props) {
        super(props);
    }

    onEmailChange = (e) => {
        const email = e.target.value;
        const isValid = e.target.validity.valid;
        this.setState(() => ({ email, isError: !isValid, snackbarMessage: "Invalid credentials" }));
    }
    onPasswordChange = (e) => {
        const password = e.target.value;
        this.setState(() => ({ password }));
    }
    
    handleLogin = (e) => {
        e.preventDefault();
        this.setState(() => ({ isError: false, snackbarMessage: '', snackbarOpen: false }));        

        if (!this.state.email) {
            console.log("Is Error: true, email invalid")
            this.setState(() => ({
                isError: true,
                snackbarMessage: "Please provide valid credentials to login.",
            }));
            return;
        }

        if (!this.state.password) {
            console.log("IsError: true, password invalid")
            this.setState(() => ({
                isError: true,
                snackbarMessage: "Please provide valid credentials to login.",
            }));
            return;
        }
        const loginObject = { email: this.state.email, password: this.state.password };

        axios.post("http://localhost:6767/users/authenticate", loginObject)
        .then((response) => {
            console.log(response.data);

            if (response.data.success) {
                this.setState(() => ({ 
                    isError: false, 
                    snackbarMessage: "Login Successful! Navigating to Game page", 
                    snackbarOpen: true,
                    user: {
                        firstName: response.data.user.firstName,
                        lastName: response.data.user.lastName,
                        email: response.data.user.email,
                        id: response.data.user._id,
                        isLoggedIn: true
                    }
                }));
                const user = {
                    firstName: response.data.user.firstName,
                    lastName: response.data.user.lastName,
                    email: response.data.user.email,
                    id: response.data.user._id,
                    isLoggedIn: true
                }
                this.props.history.push("/game");
                this.props.dispatch(toggleLoginAction(user));                
            }
        })
        .catch((error) => {
            console.log(error);
            this.setState(() => ({
                isError: true,
                snackbarMessage: "Login Failed! Invalid credentials",
            }));
            
        });
    }


    render() {
       
        return (
            <div className={styles.mainDiv}>
                <div className={styles.headerDiv}>
                    <h2>Login</h2><span>Use your credentials to login</span>
                </div>
                <div className={styles.contentDiv}>
                    {
                        this.state.isError && !this.state.snackbarOpen && 
                        <span className={styles.errorMessage}>{this.state.snackbarMessage}</span>
                    }
                    {
                        this.state.snackbarOpen && 
                        <span className={styles.successMessage}>{this.state.snackbarMessage}</span>
                    }
                    <form>
                        <InputControl inputType="email"
                            title="Username:" 
                            name="username"
                            onInputChange={this.onEmailChange}
                            valueContent={this.state.email} />

                        <InputControl inputType="password"
                            title="Password:"
                            name="password"
                            onInputChange={this.onPasswordChange}
                            valueContent={this.state.password} />

                        <ul className={styles.buttonsList}>
                            <li className={styles.buttonsListItem}>
                                <ul className={styles.navButtonsList}>
                                    <li><Link to="/reset">Forgot password?</Link></li>
                                    <li><Link to="/register">Register</Link></li>
                                </ul>
                            </li>
                            <li className={styles.buttonsListItem}>
                                <button className={styles.buttonLogin} onClick={this.handleLogin}>Login</button>
                            </li>
                        </ul>
                    </form>
                </div>
            </div>
        );
    }
}


const mapsStateToProps = (state) => {
    return {
        user: state.user
    };
};
export default connect(mapsStateToProps)(LoginComponent);
