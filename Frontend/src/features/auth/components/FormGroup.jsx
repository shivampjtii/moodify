import React from 'react'

const FormGroup = ({label, placeholder}) => {
  return (
    <div className="form-group">
        <label htmlFor={label.toLowerCase()}>{label}</label>
        <input type={label.toLowerCase()} id={label.toLowerCase()} name={label.toLowerCase()} placeholder={placeholder} required />
    </div>
  )
}

export default FormGroup