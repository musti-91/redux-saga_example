
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import cc from 'classcat'

class ListItem extends Component {

  state = {
    onChecked: this.props.isComplete
  }
  render() {
    const { text, listItem, hasButton, buttonClassName, buttonLabel, onButtonClicked, description, hasCheckBox } = this.props
    const { onChecked } = this.state
    const listItemTextClasses = cc([
      "itemText",
      { completed: onChecked }
    ])
    return (
      <div className={listItem}>
        {hasCheckBox && this._renderCheckBox(onChecked)}
        <span className={listItemTextClasses}>
          {text}
        </span>
        <span>{description}</span>
        {hasButton && this._renderButton(buttonLabel, buttonClassName, onButtonClicked)}
      </div>
    )
  }
  _renderButton = (buttonLabel, buttonClassName, onButtonClicked) => (
    <button className={buttonClassName} onClick={onButtonClicked}>
      {buttonLabel}
    </button>
  )
  _renderCheckBox = (onChecked) => (
    <input type='checkbox' checked={onChecked} onChange={this._onCheck()} />
  )
  _onCheck = () => () => {
    this.setState(() => ({
      onChecked: !this.state.onChecked
    }))
  }
}


ListItem.propTypes = {
  text: PropTypes.string,
  listItem: PropTypes.string,
  hasButton: PropTypes.bool,
  onButtonClicked: PropTypes.func,
  buttonClassName: PropTypes.string,
  buttonLabel: PropTypes.string,
  description: PropTypes.string,
  hasCheckBox: PropTypes.bool
}
ListItem.defaultProps = {
  buttonLabel: 'add',
  buttonClassName: 'btn',
  listItem: "listItem",
  hasCheckBox: false
}

export default ListItem