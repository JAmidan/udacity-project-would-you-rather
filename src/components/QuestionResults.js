import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { formatQuestion, checkAnswers } from '../utils/helpers'

class QuestionResults extends Component{

    render() {

        const {formatedQuestion, authedUser, users, id} = this.props

        const {author, avatar, oneText, twoText, oneCount, twoCount, totalCount} = formatedQuestion

        let q1Percentage = Math.trunc(((oneCount / totalCount) * 100)) + '%'
        let q2Percentage = Math.trunc(((twoCount / totalCount) * 100)) + '%'

        let yourAnswer = checkAnswers(id, users, authedUser)

        var returnHTML = ''

        return(
        
        <div className='question-results' >
            
           
            <div className='asked-by'>Asked By {author}</div>


            <div className='left-results' > <img src={avatar} alt={`Avatar of author: ${author}`} className='large-avatar'/> </div>

            <div className='right-results' >
                <h2>Results:</h2>
                <div className='question-results-box'>Would you rather {oneText}?
                    <div className='meter'>
                        <span style={{width: q1Percentage}}>{q1Percentage}</span>
                    </div>
                    <div className='center'>{oneCount} out of {totalCount} votes</div>
                </div>
                <div className='question-results-box'>Would you rather {twoText}?
                <div className='meter'>
                    <span style={{width: q2Percentage}}>{q2Percentage}</span>
                </div>
                <div className='center'>{twoCount} out of {totalCount} votes</div>
                </div>
                <div>
                {yourAnswer !== 0 && <span>  You Answered: {yourAnswer === 1 && <span>{oneText}</span>}{yourAnswer === 2 && <span>{twoText}</span>}</span>}
                </div>

            </div>
        </div>
       )

    }
}

function mapStateToProps({authedUser, users}, props )
{
   return { 
        formatedQuestion: props.question ? formatQuestion(props.question, users, authedUser) : null,
        authedUser,
        users,
        id: props.question.id
    }
}

export default connect(mapStateToProps)(QuestionResults)