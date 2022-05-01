import { saveQuestion, saveQuestionAnswer } from "../utils/api"

import { showLoading, hideLoading } from "react-redux-loading"

import { answerQuestionUser } from "./users"

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'
export const TOGGLE_SHOW_ANSWERED = 'TOGGLE_SHOW_ANSWERED'




export function receiveQuestions (questions) {
    return{
        type: RECEIVE_QUESTIONS,
        questions,
    }

}

export function toggleShowAnswered() {
    return{
        type: TOGGLE_SHOW_ANSWERED
    }
}

export function addQuestion (question){
    return {
        type: ADD_QUESTION,
        question
    }
}

export function answerQuestion(question, answer, authedUser){
    return {
        type: ANSWER_QUESTION,
        question,
        answer,
        user: authedUser
        
    }
}

export function handleToggleShowAnswered(){
    return(dispatch) => {
        dispatch(toggleShowAnswered());
    }
}


export function handleAnswerQuestion(question, answer)
{

    return(dispatch, getState) => {
    const qid = question.id
    const {authedUser } = getState()

    console.log('Test AuthedUser', authedUser)
    console.log('Test Question ID', question.id)
    console.log('Test Answer', answer)
    dispatch(answerQuestion(question, answer, authedUser))
    dispatch(answerQuestionUser(question, answer, authedUser))
    dispatch(showLoading())

    return saveQuestionAnswer({
        authedUser, qid, answer
    }).catch((e) => {
        console.warn('Error in saveQuestion: ' , e)
    }).then(() => dispatch(hideLoading()))
   
   

    }

}

export function handleAddQuestion(q1Text, q2Text){

   return(dispatch, getState) => {
       const {authedUser } = getState()

       //console.log('Test AuthedUser', authedUser)

       dispatch(showLoading())
    
       return saveQuestion({
        optionOneText: q1Text,
        optionTwoText: q2Text,
        author: authedUser
       })
       .then((question) => dispatch(addQuestion(question)))
       .then(() => dispatch(hideLoading()))
   }

}