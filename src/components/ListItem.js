import React, { Component } from 'react'
import PropTypes from 'prop-types'


class ListItem extends Component {

  state= {
    onChecked: this.props.isComplete
  }
  render() {
    const { text, listItem, hasButton, btnStyle, btnName, onButtonClicked, description, hasCheckBox } = this.props
    const {onChecked} = this.state 
    return (
      <div className={listItem}>
        {text}
        {description}
        {hasButton && this._renderButton(btnName, btnStyle, onButtonClicked)}
        {hasCheckBox && this._renderCheckBox(onChecked)}
      </div>
    )
  }
  _renderButton = (btnName, btnStyle, onButtonClicked) => (
    <button className={btnStyle} onClick={ onButtonClicked}>
      {btnName}
    </button>
  )
  _renderCheckBox= (onChecked) => (
    <input type='checkbox' checked={onChecked} onChange={this._onCheck()}/>
  )
  _onCheck= () => () => {
    this.setState(()=> ({
      onChecked: !this.state.onChecked
    }))
  }
}


ListItem.propTypes = {
  text: PropTypes.string,
  listItem: PropTypes.string,
  hasButton: PropTypes.bool,
  onButtonClicked: PropTypes.func,
  btnStyle: PropTypes.string,
  btnName: PropTypes.string,
  description: PropTypes.string,
  hasCheckBox: PropTypes.bool
}
ListItem.defaultProps = {
  btnName: 'add',
  btnStyle: 'btn',
  listItem: "listItem",
  hasCheckBox:false
}

export default ListItem