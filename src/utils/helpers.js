export function formatDate (timestamp) {
    const d = new Date(timestamp)
    const time = d.toLocaleTimeString('en-US')
    return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString()
  }
  



export function formatQuestion (question, users, authedUser) {

  

  const { id, author, timestamp, optionOne, optionTwo } = question
  
  let user = users[author]
  let authorName = user.name
  let authorAvatar = user['avatarURL']
  let optionOneText = optionOne.text
  let optionTwoText = optionTwo.text
  let optionOneCount = optionOne.votes.length
  let optionTwoCount = optionTwo.votes.length
  let totalCount = optionOneCount + optionTwoCount


  return {
    id,
    timestamp,
    author: authorName,
    avatar: authorAvatar,
    oneText: optionOneText,
    twoText: optionTwoText,
    oneCount: optionOneCount,
    twoCount: optionTwoCount,
    totalCount: totalCount

    
  }
}

export function checkAnswers(id,users,authedUser)
{
  const activeUser = users[authedUser]
  const activeUserAnswers = activeUser.answers
  const findQuestion = activeUserAnswers[id]

  let yourAnswer = ''

  switch (findQuestion) {
      case 'optionOne':
          yourAnswer = 1;
          break;
      case 'optionTwo':
          yourAnswer = 2;
          break;
      default:
          yourAnswer = 0
          break;
  }

  return yourAnswer

}

export function tallyScores(users){

  let scores = [];

  for(let u in users){
    let user = users[u];
    let answeredQuestions = Object.keys(user.answers).length;
    let createdQuestions = user.questions.length;
    let totalScore = answeredQuestions + createdQuestions;
 
    scores.push({
      name: user.name,
      avatar: user.avatarURL,
      answered: answeredQuestions,
      created: createdQuestions,
      score: totalScore

    })

  }
    //Sort Scores  
  scores.sort((a,b) => (a.score > b.score) ? -1 : 1)     
  return scores;

}