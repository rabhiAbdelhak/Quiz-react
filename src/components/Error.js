import React from 'react';
import styled from 'styled-components';

//local imports 
import useAppContext from '../Context';

const Error = () => {
  const {error} = useAppContext();
  return (
    <Wrapper className='_flex-center'>
        {error}
    </Wrapper>
  )
}

export default Error

const Wrapper = styled.section`
color: tomato;
`