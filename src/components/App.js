import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { LoadingBar } from 'react-redux-loading'
import { handleInitialData } from '../actions/shared'
import  HomePage from './HomePage'
import QuestionPage from './QuestionPage'
import NewQuestion from './NewQuestion'
import LoginPage from './LoginPage'
import LeaderBoard from './LeaderBoard'



class App extends Component{

    componentDidMount(){

        this.props.dispatch(handleInitialData())
    }

    render(){
        return(
<Router>
    <Fragment>
        <LoadingBar />

        <div className='container'>
          
            {this.props.loading === true ? <LoginPage /> :
                <div>
                <Route path='/' exact component={HomePage} />
                <Route path='/question/:id' component={QuestionPage}/>
                <Route path='/new' component={NewQuestion} />
                <Route path='/leaderboard' component={LeaderBoard}/>
                </div>
            }
        </div>

    </Fragment>
</Router>

            )
    }
}

function mapStateToProps ({ authedUser }){
    return {
      loading: authedUser === null
    }
  }

export default connect(mapStateToProps)(App)