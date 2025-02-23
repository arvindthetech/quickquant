import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

const SquareRoot = () => {
  const [activeTab, setActiveTab] = useState('learning');
  const [range, setRange] = useState({ start: 1, end: 10 });
  const [difficulty, setDifficulty] = useState('level1');
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [timeLeft, setTimeLeft] = useState(0);
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [isQuizEnded, setIsQuizEnded] = useState(false);
  const [startTime, setStartTime] = useState(null);

  const generateSquareRoots = () => {
    const squareRoots = [];
    for (let i = range.start; i <= range.end; i++) {
      squareRoots.push({ number: i, squareRoot: Math.sqrt(i).toFixed(2) });
    }
    return squareRoots;
  };

  const generateQuizQuestions = () => {
    const questions = [];
    const numQuestions = 10;

    for (let i = 0; i < numQuestions; i++) {
      let question = {};
      if (difficulty === 'level1') {
        const num = Math.floor(Math.random() * 10) + 1;
        const perfectSquare = num * num;
        question = {
          question: `What is the square root of ${perfectSquare}?`,
          options: generateOptions(Math.sqrt(perfectSquare).toFixed(2)),
          answer: Math.sqrt(perfectSquare).toFixed(2),
        };
      } else if (difficulty === 'level2') {
        const num = Math.floor(Math.random() * 20) + 1; // Only integer values (1 to 20)
        question = {
          question: `What is the square root of ${num}?`,
          options: generateOptions(Math.sqrt(num).toFixed(2)),
          answer: Math.sqrt(num).toFixed(2),
        };
      }
      questions.push(question);
    }
    return questions;
  };

  const generateOptions = (correctAnswer) => {
    const options = [correctAnswer];
    while (options.length < 4) {
      const randomOption = (parseFloat(correctAnswer) + (Math.random() * 2 - 1)).toFixed(2);
      if (!options.includes(randomOption)) {
        options.push(randomOption);
      }
    }
    return options.sort(() => Math.random() - 0.5);
  };

  const startQuiz = () => {
    setQuizQuestions(generateQuizQuestions());
    setIsQuizActive(true);
    setIsQuizEnded(false);
    setScore({ correct: 0, incorrect: 0 });
    setTimeLeft(0);
    setCurrentQuestionIndex(0);
    setStartTime(Date.now());
  };

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

  const endQuiz = () => {
    setIsQuizActive(false);
    setIsQuizEnded(true);
    setTimeLeft(Math.floor((Date.now() - startTime) / 1000));
  };

  const resetDifficulty = () => {
    setIsQuizActive(false);
    setIsQuizEnded(false);
    setQuizQuestions([]);
  };

  return (
    <div className="square-root-page" style={styles.page}>
      <div className="container mt-4">
        <h2 className="text-center mb-4" style={styles.heading}>🌟 Square Root Explorer 🌟</h2>
        <div className="text-center mb-4">
          <button
            className={`btn ${activeTab === 'learning' ? 'btn-primary' : 'btn-outline-primary'} me-2`}
            onClick={() => setActiveTab('learning')}
          >
            📘 Learning Mode
          </button>
          <button
            className={`btn ${activeTab === 'practice' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setActiveTab('practice')}
          >
            🎯 Practice Mode
          </button>
        </div>

        {activeTab === 'learning' ? (
          <div>
            <div className="row justify-content-center">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="startRange" className="form-label">Start Range (1-100):</label>
                  <input
                    type="number"
                    id="startRange"
                    className="form-control"
                    value={range.start}
                    min="1"
                    max="100"
                    onChange={(e) => setRange((prev) => ({ ...prev, start: parseInt(e.target.value) }))}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="endRange" className="form-label">End Range (1-100):</label>
                  <input
                    type="number"
                    id="endRange"
                    className="form-control"
                    value={range.end}
                    min="1"
                    max="100"
                    onChange={(e) => setRange((prev) => ({ ...prev, end: parseInt(e.target.value) }))}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              {generateSquareRoots().map((squareRoot) => (
                <div key={squareRoot.number} className="col-md-4 mb-4">
                  <div className="card h-100 shadow">
                    <div className="card-body text-center">
                      <h5 className="card-title">√{squareRoot.number} = {squareRoot.squareRoot}</h5>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
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
                  >
                    <option value="level1">Level 1 (Perfect Squares)</option>
                    <option value="level2">Level 2 (Integer Non-Perfect Squares)</option>
                  </select>
                </div>
                <button className="btn btn-success" onClick={startQuiz}>
                  ▶️ Start Quiz
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
                        onClick={() => handleAnswerSelection(option)}
                        disabled={selectedOption !== null}
                      >
                        {option}
                      </button>
                    </div>
                  ))}
                </div>
                <div className="d-flex justify-content-center gap-3 mt-3">
                  <button className="btn btn-danger d-flex align-items-center gap-2" onClick={endQuiz}>
                    🚩 End Quiz
                  </button>
                  <button className="btn btn-secondary d-flex align-items-center gap-2" onClick={resetDifficulty}>
                    🔄 Change Difficulty
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h3>🎉 Quiz Completed!</h3>
                <div className="mt-3" style={styles.score}>⏱️ Time Taken: {timeLeft} seconds</div>
                <div className="mt-3" style={styles.score}>✅ Correct: {score.correct} | ❌ Incorrect: {score.incorrect}</div>
                <div className="d-flex justify-content-center gap-3 mt-3">
                  <button className="btn btn-primary d-flex align-items-center gap-2" onClick={startQuiz}>
                    🔄 Restart Quiz
                  </button>
                  <button className="btn btn-secondary d-flex align-items-center gap-2" onClick={resetDifficulty}>
                    🎛️ Change Difficulty
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  page: {
    background: 'linear-gradient(90deg, #F3F4F6,rgb(248, 225, 207),rgb(255, 197, 150))',
    minHeight: '100vh',
    padding: '20px',
  },
  heading: {
    color: '#1e3a8a',
    fontWeight: '700',
  },
  question: {
    fontSize: '24px',
    color: '#004d40',
    fontWeight: '600',
  },
  score: {
    fontSize: '18px',
    color: '#004d40',
  },
};

export default SquareRoot;