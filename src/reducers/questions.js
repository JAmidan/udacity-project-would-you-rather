import { ADD_QUESTION, RECEIVE_QUESTIONS, ANSWER_QUESTION, TOGGLE_SHOW_ANSWERED } from "../actions/questions";

export default function question(state ={}, action){
    switch(action.type){

        case TOGGLE_SHOW_ANSWERED :

            const {showAnsweredValue} = state?.showAnswered ?? {}
            let showAnseredNewValue = true;

            if(showAnsweredValue === true)
            {
                showAnseredNewValue = false;
            }
            
            return{
                ...state,
                showAnswered:showAnseredNewValue
            }
            
        case RECEIVE_QUESTIONS :
           return {
               ...state,
               ...action.questions

            }
            case ADD_QUESTION :
                const { question } = action

                return{
                    ...state,
                    [action.question.id]: action.question,
                }
        case ANSWER_QUESTION :
  
            return{
                ...state,
                [action.question.id]:{
                    ...state[action.question.id],
                    [action.answer]: {
                        ...action.question[action.answer],
                        votes: action.question[action.answer].votes.concat([action.user])
                    }
                }
            }

        default :
        return state
    }
}