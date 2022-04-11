import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

//local imports
import useAppContext from "../Context";
import Specialheading from "./Specialheading";

const Question = () => {
  const {
    questions,
    loading,
    options,
    setCorrectAnswers,
    setFinish,
    setIsRunning,
    index,
    setIndex,
    time,
    setTime,
  } = useAppContext();

  // help states hooks
  const [showHelp, setShowHelp] = useState(false);
  const [isRemoveHelp, setIsRemoveHelp] = useState(true);
  const [tellAnswerHelp, setTellAnswerHelp] = useState(false);
  const [isTellAnswerAble, setIsTellAnswerAble] = useState(true);
  const [istimeHelp, setTimeHelp] = useState(true);
  //end help states hooks

  const helpRef = useRef();
  let mounted = useRef(1);
  let [suggetions, setSuggetions] = useState([]);
  const style = {
    background: time === 0 ? "rgba(255, 0, 0, 0.3)" : time < 5 ? "#EDE04D" : "",
    color: time < 5 ? "white" : "",
  };
  const handleAnswer = (answer, e) => {
    if (tellAnswerHelp) {
      AnswerIsTrue(answer, e);
      return;
    }
    if (questions[index].correct_answer === answer) {
      setCorrectAnswers((oldValue) => oldValue + 1);
    } else if (options.mode === "eliminatoire") {
      setFinish(true);
      setIsRunning(false);
      return;
    }

    if (index < questions.length - 1) {
      options.timer && setTime(10);
      setIndex((prevIndex) => prevIndex + 1);
    } else {
      setFinish(true);
      setIsRunning(false);
      return;
    }
  };

  //function to remove two wrong answers
  const removeTwoSuggetions = () => {
    setSuggetions((oldSug) => {
      let newSugg = oldSug.filter(
        (suggetion) => suggetion === questions[index].correct_answer
      );
      newSugg = [
        ...newSugg,
        oldSug.filter((sugg) => sugg !== questions[index].correct_answer)[
          Math.floor(Math.random()) * 3
        ],
      ];
      return newSugg;
    });
    setShowHelp(false);
    setIsRemoveHelp(false);
  };

  const AnswerIsTrue = (suggestion, e) => {
    if (!tellAnswerHelp) return;
    if (suggestion === questions[index].correct_answer) {
      e.target.style.borderColor = "green";
      e.target.style.color = "green";
    } else {
      e.target.style.borderColor = "tomato";
      e.target.style.color = "tomato";
    }
    setTimeout(() => {
      e.target.style.removeProperty("border-color");
      e.target.style.removeProperty("color");
    }, 3000);
    setTellAnswerHelp(false);
    setIsTellAnswerAble(false);
  };

  //function to add 10 second if the timer is active
  const plusTimeHelp = () => {
    if (!istimeHelp) return;
    setTime((oldTime) => oldTime + 10);
    setTimeHelp(false);
    setShowHelp(false);
  };
  //useEffect hook to setsuetionswhen index change
  useEffect(() => {
    if (!loading) {
      setSuggetions([
        ...questions[index].incorrect_answers,
        questions[index].correct_answer,
      ]);
    }
    setShowHelp(false);
    setTime(10);
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, loading]);

  //useEffect hook to use the timer when it is active
  useEffect(() => {
    if (!options.timer) return;
    let interval = setInterval(() => {
      if (time > 0) {
        setTime((oldTime) => oldTime - 1);
      } else {
        handleAnswer("");
        setTime(10);
      }
    }, 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time]);

  // useEffect Hook to toggle the help options
  useEffect(() => {
    if (mounted.current < 3) {
      mounted.current++;
      console.log(mounted.current);
      return;
    }

    if (showHelp) {
      helpRef.current.style.transform = "translateX(0)";
    } else {
      helpRef.current.style.transform = "translateX(calc(-100% - 20px))";
    }
  }, [showHelp]);

  // loading conditional rendering
  if (loading) {
    return <div>loading..</div>;
  }

  // Questoin rendering
  return (
    <Wrapper style={style}>
      <Specialheading
        title="Quiz"
        nbrQuestions={questions.length}
        time={options.timer ? time : null}
      />
      <h3>{questions[index].question}</h3>
      <Suggestions>
        {suggetions.map((suggetion, index) => {
          return (
            <Suggetion key={index} onClick={(e) => handleAnswer(suggetion, e)}>
              {index + 1}. {suggetion}
            </Suggetion>
          );
        })}
      </Suggestions>
      <Options>
        {index < questions.length - 1 && options.mode !== "eliminatoire" && (
          <Button key={index} onClick={() => setIndex(index + 1)}>
            Next Question
          </Button>
        )}
        {options.helper && (
          <Help onClick={() => setShowHelp((oldShow) => !oldShow)}>?</Help>
        )}
      </Options>
      <Helps ref={helpRef}>
        <button onClick={removeTwoSuggetions} disabled={!isRemoveHelp}>
          Rx2
        </button>
        <button
          onClick={() => {
            setTellAnswerHelp(true);
            setShowHelp(false);
          }}
          disabled={!isTellAnswerAble}
        >
          1An
        </button>
        {options.timer && (
          <button onClick={plusTimeHelp} disabled={!istimeHelp}>
            +10s
          </button>
        )}
      </Helps>
    </Wrapper>
  );
};

export default Question;

const Wrapper = styled.section`
  padding: 10px 20px;
  border-radius: 5px;
  overflow: hidden;
  position: relative;

  h3 {
    font-size: 22px;
    font-weight: 500;
    color: var(--font-color);
    letter-spacing: 1px;
    text-align: center;
    margin: 25px 0;
    min-height: 50px;
  }
`;

const Suggestions = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 20px auto;
  align-items: center;
  width: 70%;
  gap: 5%;
  min-height: 150px;
`;

const Suggetion = styled.button`
  width: 45%;
  padding: 8px 0px;
  margin-bottom: 10px;
  background: transparent;
  border: none;
  border-bottom: 0.1px solid var(--font-color);
  transition: 0.3s;
  cursor: pointer;
  color: var(--font-color);
  font-weight: 300;
  font-size: 14px;
  text-align: left;

  :hover {
    background: var(--main-color);
    color: white;
    transform: scale(1.04);
  }
`;
const Options = styled.div`
  padding: 10px;
  align-items: center;
`;

const Button = styled.button`
  display: block;
  width: 120px;
  padding: 7px;
  float: right;
  border: none;
  font-weight: bold;
  cursor: pointer;
  background: transparent;

  :hover {
    color: yellow;
  }
`;

const Help = styled.button`
  float-left;
  background: transparent;
  color: var(--primary-color);
  border:none;
  font-size: 22px;
  cursor: pointer;
 

`;

const Helps = styled.div`
padding: 15px;
display: flex;
gap: 10px;
align-items:center;
justify-conent: center;
background: white;
box-shadow: 3px 3px 7px rgb(0 0 0 / 0.6);
position: absolute;
z-index:1000;
bottom 35px;
border-radius: 5px;
left: 5px;
transform: translateX(calc(-100% - 20px));
transition: 0.3s;

::before{
  content: '';
  width:0;
  height: 0;
  border-width: 7px;
  border-style: solid;
  border-color: white transparent transparent  transparent ;
  position: absolute;
  bottom: -14px;
  left: 10px;
}

button {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: var(--main-color);
  border:none;
  color: white;
}

button:disabled{
  opacity: 0.2;
}
`;
