import React, { useContext, useState } from "react";

const AppContext = React.createContext();

const tempURL = "https://opentdb.com/api.php";
export const AppContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [waiting, setWaiting] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState(false);
  const [index, setIndex] = useState(0);
  const [time, setTime] = useState(10);
  const [options, setOptions] = useState({
    nbrQuestions: 10,
    category: 23,
    difficulty: "hard",
    mode: "continuing",
    timer: true,
    helper: true,
  });
  const [questions, setQuestions] = useState([]);
  const [finish, setFinish] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  
  const restartQuiz = () => {
        setQuestions([]);
        setIndex(0);
        setTime(10);
        setFinish(false);
        setCorrectAnswers(0);
        setWaiting(true);
        setIsRunning(false);
  }
  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${tempURL}?amount=${options.nbrQuestions}&category=${options.category}&difficulty=${options.difficulty}&type=multiple`
      );
      const data = await res.json();
      setQuestions(data.results);
      setLoading(false);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <AppContext.Provider
      value={{
        options,
        setOptions,
        loading,
        waiting,
        setWaiting,
        questions,
        fetchQuestions,
        correctAnswers,
        setCorrectAnswers,
        finish,
        setFinish,
        restartQuiz,
        isRunning,
        setIsRunning,
        index, 
        setIndex,
        time, 
        setTime,
        error
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export default useAppContext;
