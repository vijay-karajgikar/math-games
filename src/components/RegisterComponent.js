import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { registerUserAction } from '../actions/UserAction';
import InputControl from '../controls/InputControl';
import styles from './register.css';

class RegisterComponent extends React.Component {
    state = {
        firstName: '',
        firstNameError: '',
        lastName: '',
        lastNameError: '',
        email: '',
        emailError:'',
        password: '',
        confirmPassword: '',
        passwordError: '',
        confirmPasswordError: '',
        snackbarMessage: '',
        snackbarOpen: false,
        isError: false
    }

    constructor(props) {
        super(props);
    }

    emailChange = (e) => {
        const email = e.target.value;
        var isError = false;
        var emailError = "";
        if (!email) {
            isError = true;
            emailError = "Invalid email";
        }
        this.setState(() => ({ email, emailError, isError }));
    }

    passwordChange = (e) => {
        const password = e.target.value;
        var isError = false;
        var passwordError = "";
        if (!password) {
            isError = true;
            passwordError = "Invalid password";
        }
        this.setState(() => ({ password, passwordError, isError }));
    }

    confirmPasswordChange = (e) => {
        const confirmPassword = e.target.value;
        var isError = false;
        var confirmPasswordError = "";
        if (!confirmPassword) {
            confirmPasswordError = "";
            isError = true;
        }
        this.setState(() => ({ confirmPassword, confirmPasswordError, isError }));
    }

    firstNameChange = (e) => {
        const firstName = e.target.value;
        var isError = false;
        var firstNameError = "";
        if (!firstName) {
            firstNameError = "Invalid first name";
            isError = true;
        }
        this.setState(() => ({ firstName, firstNameError, isError }));
    }

    lastNameChange = (e) => {
        const lastName = e.target.value;
        var isError = false;
        var lastNameError = "";

        if (!lastName) {
            lastNameError = "Invalid last name";
            isError = true;
        }
        this.setState(() => ({ lastName, lastNameError, isError }));
    }

    handleRequestClose = () => {
        if (!this.state.isError) {
            this.setState(() => ({ snackbarOpen: false}));
            this.props.history.push("/login");
        }
    }
    
    handleRegister = (e) => {
        e.preventDefault();

        if (!this.state.firstName) {            
            this.setState(() => ({
                isError: true,
                firstNameError: "Invalid First Name", 
                snackbarMessage: "One or more required fields is missing", 
                snackbarOpen: true 
            }));            
        }
        if (!this.state.lastName) {
            this.setState(() => ({ 
                isError: true,
                lastNameError: "Invalid Last Name",
                snackbarMessage: "One or more required fields is missing",
                snackbarOpen: true
            }));            
        }
        if (!this.state.email) {
            this.setState(() => ({ 
                isError: true,
                emailError: "Invalid email",
                snackbarMessage: "One or more required fields is missing",
                snackbarOpen: true
            }));
        }
        if (!this.state.password) {
            this.setState(() => ({ 
                isError: true,
                passwordError: "Invalid password",
                snackbarMessage: "One or more required fields is missing",
                snackbarOpen: true
            }));
            return;
        }
        if (!this.state.confirmPassword) {
            this.setState(() => ({ 
                isError: true,
                confirmPasswordError: "Invalid confirm password",
                snackbarMessage: "One or more required fields is missing",
                snackbarOpen: true
            }));
        }
        if (this.state.password !== this.state.confirmPassword) {
            this.setState(() => ({ 
                isError: true,
                snackbarMessage: "Two passwords dont match",
                snackbarOpen: true 
            }));
        }

        if (this.state.isError) {
            return;
        }

        this.setState(() => ({ isError: false, snackbarMessage: '', snackbarOpen: false }));

        var user = {
            firstName: this.state.firstName, 
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
        }
        axios.post("http://localhost:6767/users/create", user)
            .then((response) => {
                console.log(response);
                if (response.data.success) {
                    this.setState(() => ({ 
                        isError: false,
                        snackbarMessage: "User Registered successfully... Navigating to Login",
                        snackbarOpen: true 
                    }));
                }
            })
            .catch((error) => {
                this.setState(() => ({
                    isError: true,
                    snackbarMessage: "User registration failed",
                    snackbarOpen: true
                }));
            });
    }

    render() {

        return (
            <div className={styles.mainDiv}>
                <div className={styles.headerDiv}>
                    <h2>Register</h2>
                    <span>Provide the details below to create your account</span>
                </div>
                <div className={styles.contentDiv}>
                    {
                        this.state.isError && 
                        <span className={styles.errorMessage}>{this.state.snackbarMessage}</span>
                    }
                    <form>
                        <ul className={styles.inputList}>
                            <li>
                                <InputControl inputType="text" 
                                    title="First name:" 
                                    name="firstName"
                                    onInputChange={this.firstNameChange}
                                    valueContent={this.state.firstName}
                                    fullWidth={false} />

                            </li>
                            <li>
                                <InputControl inputType="text"
                                    title="Last name:"
                                    name="lastName"
                                    onInputChange={this.lastNameChange}
                                    valueContent={this.state.lastName}
                                    fullWidth={false} />
                            </li>
                        </ul>
                        <InputControl inputType="email"
                                    title="Email:"
                                    name="email"
                                    onInputChange={this.emailChange}
                                    valueContent={this.state.email}
                                    fullWidth={true} />

                        <ul className={styles.inputList}>
                            <li>
                                <InputControl inputType="password"
                                    title="Password:"
                                    name="password"
                                    onInputChange={this.passwordChange}
                                    valueContent={this.state.password}
                                    fullWidth={false} />

                            </li>
                            <li>
                                <InputControl inputType="password"
                                    title="Confirm Password:"
                                    name="confirmPassword"
                                    onInputChange={this.confirmPasswordChange}
                                    valueContent={this.state.confirmPassword}
                                    fullWidth={false} />

                            </li>
                        </ul>

                        <ul className={styles.buttonsList}>
                            <li>
                                <Link to="/login">Already a member? Login</Link>
                            </li>
                            <li>
                                <button className={styles.buttonRegister} onClick={this.handleRegister}>Register</button>
                            </li>
                        </ul>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
};

export default connect(mapStateToProps)(RegisterComponent);










