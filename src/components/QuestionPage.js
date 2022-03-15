import React, { Component,Fragment } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { formatQuestion, checkAnswers } from '../utils/helpers'
import { handleAnswerQuestion } from '../actions/questions'
import Nav from './Nav'
import QuestionResults from './QuestionResults'



class QuestionPage extends Component {

    constructor() {
        super();
        this.state = {
          choice: '',
          answered: false           
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

    handleChange(event) {
        this.setState({choice: event.target.value});
      }

    handleSubmit(event) {
    const { dispatch, question } = this.props

    //console.log('question', question)
    //console.log(this.state);
    event.preventDefault();

     //Add Dispatch to handleAddQuestion
    dispatch(handleAnswerQuestion(question, this.state.choice))

    }

render(){

const { question } = this.props
const { authedUser } = this.props
//const { users } = this.props
//const author = users[question.author]

const {formatedQuestion} = this.props

const {author, avatar, oneText, twoText, oneCount, twoCount, totalCount} = formatedQuestion

let answerCheck = false;

if ( question === null){
    return <p> This Question dosen't exsit</p>
}

if(question.optionOne.votes.includes(authedUser) )
{
    console.log('Option One',question.optionOne.votes.includes(authedUser)  )
    //this.setState({answered:true})
    answerCheck = true;
  
}else if(question.optionTwo.votes.includes(authedUser)){
    console.log('Option One',question.optionTwo.votes.includes(authedUser) )
    // this.setState({answered:true})
    answerCheck = true;
}


if(answerCheck !== true)
{
    return( 
        <Fragment>
        <div> <Nav /> </div>
        <div className='question-results' >
           
            <div className='asked-by'>{author} Asks: </div>

            
            <div className='left-results' > <img src={avatar} alt={`Avatar of author: ${author}`} className='large-avatar'/> </div>
            <div className='right-results' >
            <div className='question-inner-box'>
                <form onSubmit={this.handleSubmit}>
                    <h3> Would You Rather?</h3>
                    <ul>
                        <li>
                        <label><input name='options' type='radio' value='optionOne'  onChange={this.handleChange} />{question.optionOne.text}?</label>
                        </li>
                
                        <li>
                        <label><input name='options' type='radio' value='optionTwo'  onChange={this.handleChange} />{question.optionTwo.text}?</label>
                        </li>
                    </ul>

                    <button type="submit" className="submit-button">Make your choice</button>
                </form>
            </div>
            </div>
        </div>
        </Fragment>
        )

}else
{
    return(

            <div>
              
                <div> <Nav /> </div>
               
                <div> <QuestionResults question={question} /></div>
               
            </div>

    )
}


 




    }

}

// function mapStateToProps({authedUser, users, questions}, props){

//     const { id } = props.match.params
//     const question = questions[id]
//     console.log('id', id)
//     console.log('MapStateQuestion', question)

//     return {
//         authedUser,
//         users,
//         question
        
//     }
// }

function mapStateToProps({authedUser, users, questions}, props )
{
    const { id } = props.match.params
    const question = questions[id]

   return { 
        formatedQuestion: question ? formatQuestion(question, users, authedUser) : null,
        authedUser,
        question
    }
}

export default withRouter(connect(mapStateToProps)(QuestionPage))

