import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'
import Nav from './Nav'

class NewQuestion extends Component{
    state={
        q1Text: '',
        q2Text: '',
        toHome: false,
    }

    handleChangeQ1 = (e) => {
        const q1Text = e.target.value

        this.setState(() => ({
            q1Text
        }))
    }

    handleChangeQ2 = (e) => {
        const q2Text = e.target.value

        this.setState(() => ({
            q2Text
        }))
    }

    handleSubmit = (e) => {

        e.preventDefault()

        const {q1Text, q2Text} = this.state
        const { dispatch, id } = this.props

        //Add Dispatch to handleAddQuestion
        dispatch(handleAddQuestion(q1Text, q2Text))

        this.setState(() => ({
            q1Text: '',
            q2Text: '',
            toHome: id ? false : true,

        }))



    }

    render(){
        const { q1Text, q2Text, toHome} = this.state

        if(toHome === true){
            return <Redirect to={'/'} />
        }

        return(
            <div>
                <Nav />
                
                    <div>
                    <h2 className='center'>New Would You Rather Question</h2>
                        <form className='new-question' onSubmit={this.handleSubmit}>
                            <label for='q1Text'>Would you rather... </label>
                            <input type='text' id='q1Text' name='q1Text' value={q1Text} maxLength={255} placeholder='Enter Option One Text Here' className='textarea' onChange={this.handleChangeQ1} />
                            <br/>
                            <label for='q2Text'>Or... </label>
                            <input type='text' id='q2Text' name='q2Text' value={q2Text} maxLength={255} placeholder='Enter Option Two Text Here' className='textarea' onChange={this.handleChangeQ2} />
                            <br/>
                            <button className='btn'
                                type='submit'
                                disabled={q1Text === '' || q2Text === ''}> 
                                    Submit
                                </button>
                        
                        </form>
                    </div>
            </div>
        )
    }
}

export default connect()(NewQuestion)

