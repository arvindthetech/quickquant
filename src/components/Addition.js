import React, { useState } from 'react';
import { Play, Flag, RotateCcw } from 'lucide-react';

const Addition = () => {
  const [difficulty, setDifficulty] = useState('level1');
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [timeLeft, setTimeLeft] = useState(0);
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [isQuizEnded, setIsQuizEnded] = useState(false);
  const [startTime, setStartTime] = useState(null);

  // Generate quiz questions based on difficulty
  const generateQuizQuestions = () => {
    const questions = [];
    const numQuestions = 10;

    for (let i = 0; i < numQuestions; i++) {
      let question = {};
      if (difficulty === 'level1') {
        const num1 = Math.floor(Math.random() * 9) + 1;
        const num2 = Math.floor(Math.random() * 9) + 1;
        question = {
          question: `What is ${num1} + ${num2}?`,
          options: generateOptions(num1 + num2),
          answer: (num1 + num2).toString(),
        };
      } else if (difficulty === 'level2') {
        const num1 = Math.floor(Math.random() * 90) + 10;
        const num2 = Math.floor(Math.random() * 90) + 10;
        question = {
          question: `What is ${num1} + ${num2}?`,
          options: generateOptions(num1 + num2),
          answer: (num1 + num2).toString(),
        };
      } else if (difficulty === 'level3') {
        const num1 = Math.floor(Math.random() * 90) + 10;
        const num2 = Math.floor(Math.random() * 90) + 10;
        const num3 = Math.floor(Math.random() * 90) + 10;
        question = {
          question: `What is ${num1} + ${num2} + ${num3}?`,
          options: generateOptions(num1 + num2 + num3),
          answer: (num1 + num2 + num3).toString(),
        };
      } else if (difficulty === 'level4') {
        const num1 = Math.floor(Math.random() * 900) + 100;
        const num2 = Math.floor(Math.random() * 900) + 100;
        question = {
          question: `What is ${num1} + ${num2}?`,
          options: generateOptions(num1 + num2),
          answer: (num1 + num2).toString(),
        };
      } else if (difficulty === 'level5') {
        const level = Math.floor(Math.random() * 4) + 1;
        if (level === 1) {
          const num1 = Math.floor(Math.random() * 9) + 1;
          const num2 = Math.floor(Math.random() * 9) + 1;
          question = {
            question: `What is ${num1} + ${num2}?`,
            options: generateOptions(num1 + num2),
            answer: (num1 + num2).toString(),
          };
        } else if (level === 2) {
          const num1 = Math.floor(Math.random() * 90) + 10;
          const num2 = Math.floor(Math.random() * 90) + 10;
          question = {
            question: `What is ${num1} + ${num2}?`,
            options: generateOptions(num1 + num2),
            answer: (num1 + num2).toString(),
          };
        } else if (level === 3) {
          const num1 = Math.floor(Math.random() * 90) + 10;
          const num2 = Math.floor(Math.random() * 90) + 10;
          const num3 = Math.floor(Math.random() * 90) + 10;
          question = {
            question: `What is ${num1} + ${num2} + ${num3}?`,
            options: generateOptions(num1 + num2 + num3),
            answer: (num1 + num2 + num3).toString(),
          };
        } else if (level === 4) {
          const num1 = Math.floor(Math.random() * 900) + 100;
          const num2 = Math.floor(Math.random() * 900) + 100;
          question = {
            question: `What is ${num1} + ${num2}?`,
            options: generateOptions(num1 + num2),
            answer: (num1 + num2).toString(),
          };
        }
      }
      questions.push(question);
    }
    return questions;
  };

  // Generate random options for quiz questions
  const generateOptions = (correctAnswer) => {
    const options = [correctAnswer.toString()];
    while (options.length < 4) {
      const randomOption = (parseInt(correctAnswer) + Math.floor(Math.random() * 20) - 10).toString();
      if (!options.includes(randomOption)) {
        options.push(randomOption);
      }
    }
    return options.sort(() => Math.random() - 0.5);
  };

  // Start the quiz
  const startQuiz = () => {
    setQuizQuestions(generateQuizQuestions());
    setIsQuizActive(true);
    setIsQuizEnded(false);
    setScore({ correct: 0, incorrect: 0 });
    setTimeLeft(0);
    setCurrentQuestionIndex(0);
    setStartTime(Date.now());
  };

  // Handle user's answer selection
  const handleAnswerSelection = (option) => {
    setSelectedOption(option);
    if (option === quizQuestions[currentQuestionIndex].answer) {
      setScore((prev) => ({ ...prev, correct: prev.correct + 1 }));
    } else {
      setScore((prev) => ({ ...prev, incorrect: prev.incorrect + 1 }));
    }
    setTimeout(() => {
      if (currentQuestionIndex < quizQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption(null);
      } else {
        endQuiz();
      }
    }, 800);
  };

  // End the quiz
  const endQuiz = () => {
    setIsQuizActive(false);
    setIsQuizEnded(true);
    setTimeLeft(Math.floor((Date.now() - startTime) / 1000));
  };

  // Reset difficulty selection
  const resetDifficulty = () => {
    setIsQuizActive(false);
    setIsQuizEnded(false);
    setQuizQuestions([]);
  };

  return (
    <div className="addition-page" style={styles.page}>
      <div className="container mt-4">
        <h2 className="text-center mb-4" style={styles.heading}> Addition Practice </h2>
        <div className="text-center">
          {!isQuizActive && !isQuizEnded ? (
            <div>
              <div className="mb-3">
                <label htmlFor="difficulty" className="form-label">Select Difficulty:</label>
                <select
                  id="difficulty"
                  className="form-control"
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  style={styles.select}
                >
                  <option value="level1">Level 1 (Single-Digit Addition)</option>
                  <option value="level2">Level 2 (Two-Digit Addition)</option>
                  <option value="level3">Level 3 (Three Two-Digit Addition)</option>
                  <option value="level4">Level 4 (Three-Digit Addition)</option>
                  <option value="level5">Level 5 (Mixed Questions)</option>
                </select>
              </div>
              <button className="btn btn-success" style={styles.button} onClick={startQuiz}>
                <Play size={18} className="me-2" /> Start Quiz
              </button>
            </div>
          ) : isQuizActive ? (
            <div>
              <div className="mb-3" style={styles.question}>
                {quizQuestions[currentQuestionIndex]?.question}
              </div>
              <div className="row">
                {quizQuestions[currentQuestionIndex]?.options.map((option, index) => (
                  <div key={index} className="col-md-6 mb-3">
                    <button
                      className={`btn w-100 ${
                        selectedOption === option
                          ? option === quizQuestions[currentQuestionIndex].answer
                            ? 'btn-success'
                            : 'btn-danger'
                          : 'btn-outline-secondary'
                      }`}
                      style={styles.optionButton}
                      onClick={() => handleAnswerSelection(option)}
                      disabled={selectedOption !== null}
                    >
                      {option}
                    </button>
                  </div>
                ))}
              </div>
              <div className="d-flex justify-content-center gap-3 mt-3">
                <button className="btn btn-danger d-flex align-items-center gap-2" style={styles.button} onClick={endQuiz}>
                  <Flag size={18} /> End Quiz
                </button>
                <button className="btn btn-secondary d-flex align-items-center gap-2" style={styles.button} onClick={resetDifficulty}>
                  <RotateCcw size={18} /> Change Difficulty
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h3 style={styles.quizEndHeading}> Quiz Completed!</h3>
              <div className="mt-3" style={styles.score}>⏱️ Time Taken: {timeLeft} seconds</div>
              <div className="mt-3" style={styles.score}>✅ Correct: {score.correct} | ❌ Incorrect: {score.incorrect}</div>
              <div className="d-flex justify-content-center gap-3 mt-3">
                <button className="btn btn-primary d-flex align-items-center gap-2" style={styles.button} onClick={startQuiz}>
                  <RotateCcw size={18} /> Restart Quiz
                </button>
                <button className="btn btn-secondary d-flex align-items-center gap-2" style={styles.button} onClick={resetDifficulty}>
                  <RotateCcw size={18} /> Change Difficulty
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    background: '#ffffff', // White background
    minHeight: '100vh',
    padding: '20px',
    border: '4px solid #000000', // Thick black border
    boxShadow: '8px 8px 0px #000000', // Bold shadow
  },
  heading: {
    color: '#000000', // Black text
    fontWeight: '700',
    fontSize: '2rem',
  },
  select: {
    border: '4px solid #000000', // Thick black border
    borderRadius: '0', // Sharp edges
    padding: '10px',
    fontSize: '1rem',
    fontWeight: '700', // Bold text
  },
  button: {
    border: '4px solid #000000', // Thick black border
    borderRadius: '0', // Sharp edges
    padding: '10px 20px',
    fontSize: '1rem',
    fontWeight: '700', // Bold text
    boxShadow: '4px 4px 0px #000000', // Bold shadow
    transition: 'transform 0.3s ease',
  },
  optionButton: {
    border: '4px solid #000000', // Thick black border
    borderRadius: '0', // Sharp edges
    padding: '10px 20px',
    fontSize: '1rem',
    fontWeight: '700', // Bold text
    boxShadow: '4px 4px 0px #000000', // Bold shadow
    transition: 'transform 0.3s ease',
  },
  question: {
    fontSize: '24px',
    color: '#000000', // Black text
    fontWeight: '700', // Bold text
  },
  quizEndHeading: {
    fontSize: '2rem',
    color: '#000000', // Black text
    fontWeight: '700', // Bold text
  },
  score: {
    fontSize: '1.25rem',
    color: '#000000', // Black text
    fontWeight: '700', // Bold text
  },
};

export default Addition;