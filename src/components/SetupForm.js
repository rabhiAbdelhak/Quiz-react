import React from "react";
import styled from "styled-components";

//local imports
import Specialheading from "./Specialheading";
import useAppContext from "../Context";

const SetupForm = () => {
  const { options, setOptions, fetchQuestions, setWaiting, setIsRunning } =
    useAppContext();
  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    const type = e.target.type;

    setOptions((oldOptions) => {
      return type !== "checkbox"
        ? { ...oldOptions, [name]: value }
        : { ...oldOptions, [name]: e.target.checked };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchQuestions();
    setWaiting(false);
    setIsRunning(true);
  };
  return (
    <Wrapper>
      <Specialheading title="Quiz Setup" />
      <Form onSubmit={handleSubmit}>
        <Group>
          <Label htmlFor="nbrQuestions">Number Of Questions</Label>
          <Input
            type="number"
            name="nbrQuestions"
            max="50"
            min="5"
            value={options.nbrQuestions}
            onChange={handleChange}
          />
        </Group>
        <Group>
          <Label>Category</Label>
          <Select
            id="category"
            name="category"
            value={options.category}
            onChange={handleChange}
          >
            <option value="21">Sports</option>
            <option value="23">Politics</option>
            <option value="24">History</option>
          </Select>
        </Group>
        <Group>
          <Label>Difficulty</Label>
          <Select
            id="difficulty"
            name="difficulty"
            value={options.difficulty}
            onChange={handleChange}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </Select>
        </Group>
        <Group>
          <Label>Game Mode</Label>
          <Select
            id="mode"
            name="mode"
            value={options.mode}
            onChange={handleChange}
          >
            <option
              value="eliminatoire"
              title="you lose with your first wrong answer"
            >
              Eliminatoire
            </option>
            <option value="continuing">Continuing</option>
          </Select>
        </Group>
        <Checkboxes>
          <Checkbox>
            <Input
              type="checkbox"
              vlaue={options.helper}
              id="helper"
              checked={options.helper}
              name="helper"
              onChange={handleChange}
            />
            <Label htmlFor="helper">Enable Help Options ?</Label>
          </Checkbox>
          <Checkbox>
            <Input
              type="checkbox"
              vlaue={options.timer}
              id="timer"
              checked={options.timer}
              name="timer"
              onChange={handleChange}
            />
            <Label htmlFor="timer">PLay with Timer (10s) ?</Label>
          </Checkbox>
        </Checkboxes>
        <Button>Start</Button>
      </Form>
    </Wrapper>
  );
};

export default SetupForm;

const Wrapper = styled.div``;

const Form = styled.form`
  display: grid;
  grid-template: 60px 60px 40px/ 45% 45%;
  justify-content: space-between;
  gap: 10px;
  width: 50%;
  font-size: 14px;
  margin: 30px auto;
`;
const Group = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 10px;
`;

const Select = styled.select`
  padding: 4px;
  background: var(--bg-light-color);
  border: none;
  border-radius: 3px;
`;
const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
  color: var(--font-color);
  padding:0;
`;

const Input = styled.input`
  padding: 4px;
  background: var(--bg-light-color);
  border: none;
  border-radius: 3px;
`;

const Button = styled.button`
  margin-top: 30px;
  width: 100%;
  padding: 4px;
  grid-column: 1/3;
`;

const Checkboxes = styled.div``;

const Checkbox = styled.div`
display: flex;
align-items: center;
grid-column: 1/3;

label {
    margin:0 8px;
    flex: 1;
}
`