import React, { useEffect, useState } from "react";

const difficulties = ["Any Difficulty", "Easy", "Medium", "Hard"];
const numberOfQuestions = 10;
const questionTypes = [
  { display: "Any Type", value: "any" },
  { display: "Multiple Choice", value: "multiple" },
  { display: "True or False", value: "boolean" },
];

function QuizStartPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState(difficulties[0]);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedQuestionType, setSelectedQuestionType] = useState(questionTypes[0].value);
  const [fetchedCategories, setFetchedCategories] = useState([]);
  const [fetchedQuestions, setFetchedQuestions] = useState([]);

  const getCategories = () => {
    setIsLoading(true);
    fetch("https://opentdb.com/api_category.php")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.trivia_categories);
        setFetchedCategories(data.trivia_categories);
        setIsLoading(false);
      });
  };

  const getQuestions = () => {
    let questionsUrl = "https://opentdb.com/api.php?amount=" + numberOfQuestions;
    if (selectedCategory > 0) questionsUrl = questionsUrl + "&category=" + selectedCategory;
    if (selectedDifficulty !== difficulties[0])
      questionsUrl = questionsUrl + "&difficulty=" + selectedDifficulty.toLowerCase();
    if (selectedQuestionType !== questionTypes[0].value) questionsUrl = questionsUrl + "&type=" + selectedQuestionType;
    setIsLoading(true);
    fetch(questionsUrl)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.results);
        setFetchedQuestions(data.results);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    console.log("calling categories api");
    getCategories();
  }, []);

  useEffect(() => {
    console.log("calling questions api");
    getQuestions();
  }, [selectedCategory, selectedDifficulty, selectedQuestionType]);

  useEffect(() => {
    console.log("selected category is " + selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    console.log("selected difficulty is " + selectedDifficulty);
  }, [selectedDifficulty]);

  useEffect(() => {
    console.log("selected question type is " + selectedQuestionType);
  }, [selectedQuestionType]);

  const startQuiz = () => {
    if (fetchedQuestions.length > 0) window.location.href = "/quiz";
  };

  return (
    <>
      <label htmlFor="category-select">Category</label>
      <select id="category-select" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
        <option value="0">Any Category</option>
        {fetchedCategories.length > 1 &&
          fetchedCategories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
      </select>

      <label htmlFor="difficulty-select">Difficulty</label>
      <select id="difficulty-select" value={selectedDifficulty} onChange={(e) => setSelectedDifficulty(e.target.value)}>
        {difficulties.map((difficulty) => (
          <option key={difficulty} value={difficulty}>
            {difficulty}
          </option>
        ))}
      </select>

      <label htmlFor="question-type-select">Question Type</label>
      <select
        id="question-type-select"
        value={selectedQuestionType}
        onChange={(e) => setSelectedQuestionType(e.target.value)}
      >
        {questionTypes.map((questionType) => (
          <option key={questionType.value} value={questionType.value}>
            {questionType.display}
          </option>
        ))}
      </select>

      {fetchedQuestions.length > 0 ? (
        <p>Total Questions For Selected Criteria: {fetchedQuestions.length}</p>
      ) : (
        <p>
          <mark>No Question(s) Found For Selected Criteria.</mark>
        </p>
      )}

      {isLoading ? <button aria-busy="true">Loading...</button> : <button onClick={startQuiz}>Start Quiz</button>}
    </>
  );
}

export default QuizStartPage;
