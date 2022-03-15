import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import {connect } from 'react-redux'
import { clearAuthedUser } from '../actions/authedUser'
import { Redirect, useHistory } from 'react-router-dom'



class Nav extends Component{

  

    handleLogout = (e) => {

        e.preventDefault()
        const {dispatch} = this.props
        dispatch(clearAuthedUser())
      
    }

render () {

    const { authedUser, users } = this.props

    let authedUserName = ""
    let avatar = ""

     if( authedUser !== null)
    { 
    authedUserName = users[authedUser].name
    avatar = users[authedUser].avatarURL
    }else{
        return <Redirect to={'/'} /> 
    }



   // const authedUserName= users[authedUser].name

    console.log('authedUser', authedUser)
    console.log('users', users)

    console.log('name', authedUserName)

    return(
        <div className='nav-bar'>
            <div>
            <nav className='nav'>
                        <ul>
                            <li className='nav-button'>
                                <NavLink to='/' exact activeClassName='active'>
                                    Home
                                </NavLink> 
                            </li>
                            <li className='nav-button'>
                                <NavLink to='/new' activeClassName='active'>
                                    New Question
                                </NavLink>
                            </li>
                            <li className='nav-button'>
                                <NavLink to='/leaderboard' activeClassName='active'>
                                    Leader Board
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
                {authedUserName !== "" &&
                <div className='nav-user' >
                        <div className='nav-right' style={{cursor: 'pointer'}} onClick={(e) => this.handleLogout(e)}>
                            <NavLink to='/' exact activeClassName='active'>
                                Logout
                            </NavLink>
                        </div>
                        <div className='nav-right'> <img className='avatar' src={avatar} alt={`Avatar of author: ${authedUserName}`} /> </div>
                        <div className='nav-right' > Hello,  {authedUserName} </div>
                       
                </div>
                }
         
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

export default connect(mapStateToProps)(Nav)