import React, {Component} from 'react';
import PropTypes from 'prop-types';
    
    
    
export default class  AddUser extends Component{
    constructor(){
        super();
        this.state= {
            value: ""
        }
    }
 render(){
     const { value }= this.state;
     const {addUser} = this.props;
     return <form onSubmit={this._onSubmit(addUser)}>
         <input type='text' value={value} onChange={this._onChangeValue}/>
         <button onClick={this._onSubmit(addUser)}>Add user</button>
     </form>
 }
 _onChangeValue=(e)=>{
    this.setState({
        value:e.target.value
    })
 }

 _onSubmit= (addUser)=>(e)=>{
     e.preventDefault()
     const {value}= this.state;
     if(value.trim("") !== ""){
        addUser({
            name:value, 
            id:Math.floor(Math.random()*34)
        })
        this.resetValue();
     }
 }
  resetValue=()=>{
    this.setState({
        value: ''
    })
  }
}	

AddUser.propTypes ={
    addUser:  PropTypes.func.isRequired
}