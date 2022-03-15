import React, { Component } from 'react'
import {connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'

class LoginPage extends Component{

    handleSelect = (e,id) => {
        e.preventDefault()

        const {dispatch} = this.props

        //alert(id)

        dispatch(setAuthedUser(id))
    }

    render() {


        const { users } = this.props
         
        return(
            <div className='login-frame'>
                <div className='center'>
                    <h1>Welcome to the Would You Rather App!</h1>
                    <h3>Please select a user to continue</h3>
                </div>
               
              <ul className='user-list'>
                  {this.props.userIds.map((id) =>
                  <li key={id} onClick={(e) => this.handleSelect(e,users[id].id)} className='btn'>
                     <img src={users[id].avatarURL} alt={`Avatar of author: ${users[id].name}`} className='avatar'/> {users[id].name}
                  </li>
                  )}
              </ul>

            </div>
        )
    }
}


function mapStateToProps ({authedUser, users}){
    return{
        authedUser,
        users,
        userIds: Object.keys(users),
     
    }
}

export default connect(mapStateToProps)(LoginPage)