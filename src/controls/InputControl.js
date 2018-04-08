import React from 'react';
import PropTypes from 'prop-types';
import style from './InputControl.css';

const InputControl = (props) => (
  <div className={style.formGroup}>
    <label className={style.formLabel}>{props.title}</label>
    <input className={style.formInput}  
            name={props.name} 
            type={props.inputType}
            value={props.valueContent}
            onChange={props.onInputChange} 
            placeholder={props.placeholder} />    
  </div>
);

InputControl.propTypes = {
  inputType: PropTypes.oneOf(['text', 'number', 'email', 'password']).isRequired,
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  valueContent: PropTypes.oneOfType([
    PropTypes.string, PropTypes.number
  ]).isRequired,
  placeholder: PropTypes.string
}

export default InputControl;