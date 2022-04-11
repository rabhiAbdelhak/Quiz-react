import React from 'react'
import styled from 'styled-components';

//local imports
import useAppContext from '../Context'
import Specialheading from './Specialheading';


const Finish = () => {
  const {restartQuiz, correctAnswers, questions} = useAppContext();

  return (
    <Wrapper >
        <Specialheading title='Quiz Finished'/>
        <Content className='_flex-center'>
          <h1>Game Finished</h1>
          <h2>Score : {correctAnswers}/{questions.length}</h2>
          <button onClick={restartQuiz}>Restart Quiz</button>
        </Content>
    </Wrapper>
  )
}

export default Finish

const Wrapper = styled.div`
height: 100%;
width: 100%;
`

const Content = styled.div`
flex-direction: column;
padding: 30px;

`