import React, { Component } from 'react'
import PropTypes from 'prop-types'


class ConfirmButton extends Component {
  render() {
    const {onConfirm, title , buttonClassName, children } = this.props
    return (
      <div className={buttonClassName}>
        <button onClick={() => onConfirm()}>{title}</button>
        {children}
      </div>
    )
  }
}


ConfirmButton.propTypes = {
  onConfirm: PropTypes.func,
  title: PropTypes.string,
  buttonClassName: PropTypes.string
}

export default ConfirmButton