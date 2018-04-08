import React from 'react';
import { connect } from 'react-redux';
import InputControl from '../controls/InputControl';
import axios from 'axios';
import styles from './reset.css';

class ResetComponent extends React.Component {
  state = {
    email: '',
    resetPassword: '',
    confirmPassword: '',
    isError: false,
    errorMessage: '',
    isSuccess: false,
    successMessage: ''
  }

  constructor(props) {
    super(props);
  }

  onEmailChange = (e) => {
    const email = e.target.value;
    this.setState(() => ({ email }));
  }

  onPasswordChange = (e) => {
    const resetPassword = e.target.value;
    this.setState(() => ({ resetPassword }));
  }

  onConfirmPasswordChange = (e) => {
    const confirmPassword = e.target.value;
    this.setState(() => ({ confirmPassword }));
  }

  handleReset = (e) => {
    e.preventDefault();
    this.setState(() => ({ isError: false, errorMessage: '', isSuccess: false, successMessage: '' }));

    if (!this.state.resetPassword) {
      this.setState(() => ({ isError: true, errorMessage: "Please provide the password" }));
      return;
    }

    if (this.state.resetPassword !== this.state.confirmPassword) {
      this.setState(() => ({ isError: true, errorMessage: "Password and confirm password do not match"}));
      return;
    }

    const userObject = { email: this.state.email, password: this.state.resetPassword };

    axios.post("http://localhost:6767/users/update", userObject)
      .then((response) => {
        console.log(response.data);
        this.setState(() => ({ isSuccess: true, successMessage: "The password has been reset."}));
        this.props.history.push("/login");
      })
      .catch((error) => {
        console.log(error);
        this.setState(() => ({ isError: true, errorMessage: error}));
      });
  }

  render() {
    return (
      <div className={styles.mainDiv}>
          <div className={styles.headerDiv}>
            <h2>Reset Password</h2>
          </div>
          <div className={styles.contentDiv}>
            {
              this.state.isError && 
              <span className={styles.errorMessage}>{this.state.errorMessage}</span>
            }
            {
              this.state.isSuccess && 
              <span className={styles.successMessage}>{this.state.successMessage}</span>
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
                            valueContent={this.state.resetPassword} />

              <InputControl inputType="password"
                            title="Confirm Password:"
                            name="confirmPassword"
                            onInputChange={this.onConfirmPasswordChange}
                            valueContent={this.state.confirmPassword} />

              <ul className={styles.buttonsList}>
                <li className={styles.buttonsListItem}>
                  <button className={styles.buttonLogin} onClick={this.handleReset}>Reset</button>
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
}
export default connect(mapStateToProps)(ResetComponent);