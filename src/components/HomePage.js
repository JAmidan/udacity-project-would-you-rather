import React, { Component } from 'react'
import { connect } from "react-redux"
import QuestionButton from './QuestionButton'
import Nav from './Nav'
import {handleToggleShowAnswered} from '../actions/questions'

class HomePage extends Component{

    state= {
        showAnswered: false
    }


      handleShowAnswered = (e) => {
      
        let newShowAnswered = false

        if(this.state.showAnswered === true)
        {
            newShowAnswered = false
        }else
        {
            newShowAnswered = true
        }

        this.setState(() => ({
            showAnswered: newShowAnswered       
        }))


    }

    render(){
        return(
            
            <div>
               
                <Nav />
                <h3 className='center'>Would You Rather</h3>
                <div className='center'>
                <button onClick={this.handleShowAnswered} disabled={this.state.showAnswered} className='toggle-answered'>Answered Questions</button>
                <button onClick={this.handleShowAnswered} disabled={!this.state.showAnswered} className='toggle-answered'>Unanswered Questions</button>
                </div>
                <div className='question-list'>
                    {this.props.questionIds.map((id) => (
                        <div key={id}  className='question-box'>
                            <QuestionButton id={id} showAnswered={this.state.showAnswered}/>
                        </div>
                    ))}
                </div>
                
            </div>
        )
    }
}

function mapStateToProps ({questions}){

   
    let sortedQuestions = Object.values(questions).sort((a,b) => (a.timestamp < b.timestamp ) ? 1 : -1);

    let sortedIds = sortedQuestions.map(a => a.id);
    

    return{
        //questionIds: Object.keys(questions)
        questionIds: sortedIds
        //Todo: determine sort order or grouping based on status of the question
    }
}

export default connect(mapStateToProps)(HomePage)