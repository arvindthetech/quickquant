import React, { useState } from 'react';
import { Play, Flag, RotateCcw } from 'lucide-react';

const Table = () => {
  const [activeTab, setActiveTab] = useState('learning'); // Tabs: 'learning' or 'practice'
  const [tablesRange, setTablesRange] = useState({ start: 1, end: 5 }); // For practice part
  const [questions, setQuestions] = useState([]); // Store 10 questions
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Track current question
  const [selectedOption, setSelectedOption] = useState(null); // User's selected option
  const [score, setScore] = useState({ correct: 0, incorrect: 0 }); // Track score
  const [timeLeft, setTimeLeft] = useState(0); // Time taken to solve the quiz
  const [isQuizActive, setIsQuizActive] = useState(false); // Track if quiz is active
  const [isQuizEnded, setIsQuizEnded] = useState(false); // Track if quiz has ended
  const [startTime, setStartTime] = useState(null); // Track quiz start time

  // Generate tables for the learning part
  const generateTables = () => {
    const tables = [];
    for (let i = tablesRange.start; i <= tablesRange.end; i++) {
      const tableRow = [];
      for (let j = 1; j <= 10; j++) {
        tableRow.push(i * j);
      }
      tables.push({ number: i, values: tableRow });
    }
    return tables;
  };

  // Generate 10 random questions for the practice part
  const generateQuestions = () => {
    const { start, end } = tablesRange;
    const questions = [];
    for (let i = 0; i < 10; i++) {
      const num1 = Math.floor(Math.random() * (end - start + 1)) + start;
      const num2 = Math.floor(Math.random() * 10) + 1;
      const answer = num1 * num2;
      const options = generateOptions(answer);
      questions.push({ num1, num2, answer, options });
    }
    return questions;
  };

  // Generate 4 options (1 correct, 3 incorrect)
  const generateOptions = (correctAnswer) => {
    const options = [correctAnswer];
    while (options.length < 4) {
      const randomOption = correctAnswer + (Math.floor(Math.random() * 10) - 5);
      if (!options.includes(randomOption)) {
        options.push(randomOption);
      }
    }
    return options.sort(() => Math.random() - 0.5); // Shuffle options
  };

  // Start the quiz for the practice part
  const startQuiz = () => {
    setQuestions(generateQuestions());
    setIsQuizActive(true);
    setIsQuizEnded(false);
    setScore({ correct: 0, incorrect: 0 });
    setCurrentQuestionIndex(0);
    setStartTime(Date.now());
    setTimeLeft(0);
  };

  // Handle user's answer selection
  const handleAnswerSelection = (option) => {
    setSelectedOption(option);
    if (option === questions[currentQuestionIndex].answer) {
      setScore((prev) => ({ ...prev, correct: prev.correct + 1 }));
    } else {
      setScore((prev) => ({ ...prev, incorrect: prev.incorrect + 1 }));
    }
    setTimeout(() => {
      if (currentQuestionIndex < 9) {
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

  // Change range during the quiz
  const changeRange = () => {
    setIsQuizActive(false);
    setIsQuizEnded(false);
    setQuestions([]);
  };

  return (
    <div className="table-page" style={styles.page}>
      <div className="container mt-4">
        <h2 className="text-center mb-4" style={styles.heading}> Tables Explorer </h2>
        <div className="text-center mb-4">
          <button
            className={`btn ${activeTab === 'learning' ? 'btn-primary' : 'btn-outline-primary'} me-2`}
            style={styles.tabButton}
            onClick={() => setActiveTab('learning')}
          >
            📘 Learning Mode
          </button>
          <button
            className={`btn ${activeTab === 'practice' ? 'btn-primary' : 'btn-outline-primary'}`}
            style={styles.tabButton}
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
                  <label htmlFor="startRange" className="form-label" style={styles.label}>
                    Start Range (1-30):
                  </label>
                  <input
                    type="number"
                    id="startRange"
                    className="form-control"
                    style={styles.input}
                    value={tablesRange.start}
                    min="1"
                    max="30"
                    onChange={(e) => setTablesRange((prev) => ({ ...prev, start: parseInt(e.target.value) }))}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="endRange" className="form-label" style={styles.label}>
                    End Range (1-30):
                  </label>
                  <input
                    type="number"
                    id="endRange"
                    className="form-control"
                    style={styles.input}
                    value={tablesRange.end}
                    min="1"
                    max="30"
                    onChange={(e) => setTablesRange((prev) => ({ ...prev, end: parseInt(e.target.value) }))}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              {generateTables().map((table) => (
                <div key={table.number} className="col-md-4 mb-4">
                  <div className="card h-100" style={styles.card}>
                    <div className="card-body text-center">
                      <h5 className="card-title" style={styles.cardTitle}>Table of {table.number}</h5>
                      <p className="card-text" style={styles.cardText}>{table.values.join(', ')}</p>
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
                  <label htmlFor="startRange" className="form-label" style={styles.label}>
                    Start Range (1-30):
                  </label>
                  <input
                    type="number"
                    id="startRange"
                    className="form-control"
                    style={styles.input}
                    value={tablesRange.start}
                    min="1"
                    max="30"
                    onChange={(e) => setTablesRange((prev) => ({ ...prev, start: parseInt(e.target.value) }))}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="endRange" className="form-label" style={styles.label}>
                    End Range (1-30):
                  </label>
                  <input
                    type="number"
                    id="endRange"
                    className="form-control"
                    style={styles.input}
                    value={tablesRange.end}
                    min="1"
                    max="30"
                    onChange={(e) => setTablesRange((prev) => ({ ...prev, end: parseInt(e.target.value) }))}
                  />
                </div>
                <button className="btn btn-success" style={styles.button} onClick={startQuiz}>
                  <Play size={18} className="me-2" /> Start Quiz
                </button>
              </div>
            ) : isQuizActive ? (
              <div>
                <div className="mb-3" style={styles.question}>
                  Question {currentQuestionIndex + 1} of 10
                </div>
                <div className="mb-3" style={styles.question}>
                  What is {questions[currentQuestionIndex]?.num1} × {questions[currentQuestionIndex]?.num2}?
                </div>
                <div className="row">
                  {questions[currentQuestionIndex]?.options.map((option, index) => (
                    <div key={index} className="col-md-6 mb-3">
                      <button
                        className={`btn w-100 ${
                          selectedOption === option
                            ? option === questions[currentQuestionIndex].answer
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
                  <button className="btn btn-secondary d-flex align-items-center gap-2" style={styles.button} onClick={changeRange}>
                    <RotateCcw size={18} /> Change Range
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h3 style={styles.quizEndHeading}>🎉 Quiz Completed!</h3>
                <div className="mt-3" style={styles.score}>⏱️ Time Taken: {timeLeft} seconds</div>
                <div className="mt-3" style={styles.score}>✅ Correct: {score.correct} | ❌ Incorrect: {score.incorrect}</div>
                <div className="d-flex justify-content-center gap-3 mt-3">
                  <button className="btn btn-primary d-flex align-items-center gap-2" style={styles.button} onClick={startQuiz}>
                    <RotateCcw size={18} /> Restart Quiz
                  </button>
                  <button className="btn btn-secondary d-flex align-items-center gap-2" style={styles.button} onClick={changeRange}>
                    <RotateCcw size={18} /> Change Range
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

// Styles
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
  label: {
    fontSize: '1rem',
    fontWeight: '700',
    color: '#000000', // Black text
  },
  input: {
    border: '4px solid #000000', // Thick black border
    borderRadius: '0', // Sharp edges
    padding: '10px',
    fontSize: '1rem',
    fontWeight: '700', // Bold text
  },
  tabButton: {
    border: '4px solid #000000', // Thick black border
    borderRadius: '0', // Sharp edges
    padding: '10px 20px',
    fontSize: '1rem',
    fontWeight: '700', // Bold text
    boxShadow: '4px 4px 0px #000000', // Bold shadow
    transition: 'transform 0.3s ease',
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
  card: {
    border: '4px solid #000000', // Thick black border
    borderRadius: '0', // Sharp edges
    boxShadow: '4px 4px 0px #000000', // Bold shadow
  },
  cardTitle: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#000000', // Black text
  },
  cardText: {
    fontSize: '1rem',
    fontWeight: '700',
    color: '#000000', // Black text
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

export default Table;