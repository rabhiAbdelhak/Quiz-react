import styled from 'styled-components';
import Finish from './components/Finish';


//local imports
import Question from './components/Question';
import SetupForm from './components/SetupForm';
import useAppContext from './Context';

function App() {
  const {waiting, finish} = useAppContext();
  return (
    <Wrapper className='_flex-center'>
      <Application>
        {waiting ? <SetupForm/> : finish ? <Finish/> : <Question/>}
      </Application>
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.main`
width: 100%;
height: 100vh;
background: var(--bg-color);
border-radius: 5px;

`

const Application = styled.section`
background: var(--bg-second-color);
width: 70%;
box-shadow: 3px 3px 7px rgb(0 0 0 / 0.3);
padding: 10px;
`

