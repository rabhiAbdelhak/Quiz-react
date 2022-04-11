import React from 'react';

//local imports
import styled from 'styled-components';
import useAppContext from '../Context';


const Specialheading = ({title, nbrQuestions,time}) => {
  const {correctAnswers, isRunning} = useAppContext();
  return (
    <Wrapper>
        <h1>{title}</h1>
        {time && <span>00:{time}</span>}
        {isRunning ? <span>{correctAnswers}/{nbrQuestions}</span> : '-'}
    </Wrapper>
  )
}

export default Specialheading

const Wrapper = styled.div`
padding-bottom: 15px;
border-bottom: 1px solid var(--bg-light-color);
display: flex;
justify-content: space-between;
color: var(--primary-color);

h1{
  text-shadow: 3px 3px 5px var(--bg-light-color);
}
`