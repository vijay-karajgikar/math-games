import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import InputControl from '../controls/InputControl';
import styles from './forgotPassword.css';

class ForgotPasswordComponent extends React.Component {

  state = {
    email: '',
    isError: false,
    errorMessage: '',
    isSuccess: false,
    successMessageOne: '',
    successMessageTwo: '',
    successMessageThree: ''
  }

  constructor(props) {
    super(props);    
  }

  onEmailChange = (e) => {
    const email = e.target.value;
    const isValid = e.target.validity.valid;
    this.setState(() => ({ email, isError: !isValid, errorMessage: "Invalid email" }));
  }

  onResetClick = (e) => {
    e.preventDefault();
    this.setState(() => ({ isError: false, errorMessage: '', successMessage: '', isSuccess: false }));

    const forgotObject = { email: this.state.email, resetLink: 'http://localhost:4555' };
    console.log(forgotObject);

    axios.post("http://localhost:6767/users/forgot", forgotObject)
      .then((response) => {
        if (response.data.success) {
          this.setState(() => ({
            isSuccess: true,
            successMessage: "A password reset link is sent to your registered email address.",
            successMessageOne: "Check your inbox and follow the instructions in your email to reset the password"
          }));
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState(() => ({
          isError: true,
          errorMessage: "Error sending the link for password reset"
        }));
      });
  }

  render() {
    return (
      <div className={styles.mainDiv}>
        <div className={styles.headerDiv}>
          <h2>Forgot Password</h2>
        </div>
        <div className={styles.contentDiv}>
          {
            this.state.isSuccess && <p>{this.state.successMessage}</p>        
          }
          {
            this.state.isSuccess && <p>{this.state.successMessageOne}</p>
          }
          <InputControl inputType="email" name="username" title="Username:" 
            valueContent={this.state.email} 
            onInputChange={this.onEmailChange} />
          <button className={styles.buttonReset} onClick={this.onResetClick}>Reset</button>
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

export default connect(mapsStateToProps)(ForgotPasswordComponent);