import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import { connect } from 'react-redux';
import { toggleLoginAction } from '../actions/UserAction';
import styles from './logout.css';

class LogoutComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    
    const user = {
      firstName: this.props.user.firstName,
      lastName: this.props.user.lastName,
      email: this.props.user.email,
      id: this.props.user._id,
      isLoggedIn: false
    }
    this.props.dispatch(toggleLoginAction(user));
  }

  render() {
    return (
      <div className={styles.mainDiv}>
        <div className={styles.headerDiv}>
          <h2>Logout</h2>          
        </div>
        <div className={styles.contentDiv}>
          <p>You are now logged out of Math-Games.</p> 
          <p>Thank you and have a great day.</p>
        </div>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(LogoutComponent);