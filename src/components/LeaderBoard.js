import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Nav from './Nav'
import { tallyScores } from '../utils/helpers'

class LeaderBoard extends Component {

render(){

    const {scores} = this.props;

    console.log('User Scores', scores);

return(
    <div>
             
                <div> <Nav /> </div>
              <div className='center'>
                  
                  <div className='leaderboard-title'>LeaderBoard</div>

                  <div className='question-list'>
              {scores.map((user) => (
                <div className='leaderboard-frame'>
                        
                    <div className='leaderboard-left'> <img src={user.avatar} alt={`Avatar of author: ${user.name}`} className='large-avatar'/> </div>
                    <div className='leaderboard-center'>
                            <div className='leaderboard-name'>{user.name}</div>
                            <div className='leaderboard-count'>Answered Questions {user.answered}</div>
                            <div className='leaderboard-count'>Created Questions {user.created}</div>

                    </div>
                    <div className='leaderboard-right'>
                    
                    <div className='leaderboard-right-inset'>
                    <div className='leaderboard-score-title'>Score </div>
                        <div className='leaderboard-score'>
                           
                            <div className='leaderboard-score-value'>{user.score} </div>
                        </div>
                    </div>
                    </div>
                </div>
              ))}
              </div>


              </div>
               
    </div>

)

}
    
}

function mapStateToProps({authedUser, users, questions}, props )
{
    
   return { 
        scores: tallyScores(users),
        authedUser,
      
    }
}



export default withRouter(connect(mapStateToProps)(LeaderBoard))