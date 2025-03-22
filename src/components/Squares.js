import React, { useState } from 'react';
import { Play, Flag, RotateCcw } from 'lucide-react';

const Square = () => {
  const [activeTab, setActiveTab] = useState('learning'); // Tabs: 'learning' or 'practice'
  const [range, setRange] = useState({ start: 1, end: 10 }); // For learning part
  const [difficulty, setDifficulty] = useState('easy'); // For practice part
  const [quizQuestions, setQuizQuestions] = useState([]); // For practice part
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // For practice part
  const [selectedOption, setSelectedOption] = useState(null); // For practice part
  const [score, setScore] = useState({ correct: 0, incorrect: 0 }); // For practice part
  const [timeLeft, setTimeLeft] = useState(0); // For practice part (time taken)
  const [isQuizActive, setIsQuizActive] = useState(false); // For practice part
  const [isQuizEnded, setIsQuizEnded] = useState(false); // For practice part
  const [startTime, setStartTime] = useState(null); // For practice part (start time)

  // Generate squares for the learning part
  const generateSquares = () => {
    const squares = [];
    for (let i = range.start; i <= range.end; i++) {
      squares.push({ number: i, square: i * i });
    }
    return squares;
  };

  // Generate quiz questions based on difficulty
  const generateQuizQuestions = () => {
    const questions = [];
    const numQuestions = 10; // Number of questions per quiz

    for (let i = 0; i < numQuestions; i++) {
      let question = {};
      if (difficulty === 'easy') {
        const num = Math.floor(Math.random() * 20) + 1;
        question = {
          question: `What is the square of ${num}?`,
          options: generateOptions(num * num),
          answer: num * num,
        };
      } else if (difficulty === 'medium') {
        const num = Math.floor(Math.random() * 21) + 20;
        question = {
          question: `What is the square of ${num}?`,
          options: generateOptions(num * num),
          answer: num * num,
        };
      } else if (difficulty === 'hard') {
        const num1 = Math.floor(Math.random() * 40) + 1;
        const num2 = Math.floor(Math.random() * 40) + 1;
        const operation = Math.random() > 0.5 ? '+' : '-';
        const answer = operation === '+' ? num1 * num1 + num2 * num2 : num1 * num1 - num2 * num2;
        question = {
          question: `Solve ${num1}² ${operation} ${num2}²`,
          options: generateOptions(answer),
          answer: answer,
        };
      }
      questions.push(question);
    }
    return questions;
  };

  // Generate random options for quiz questions
  const generateOptions = (correctAnswer) => {
    const options = [correctAnswer];
    while (options.length < 4) {
      const randomOption = correctAnswer + Math.floor(Math.random() * 20) - 10;
      if (!options.includes(randomOption)) {
        options.push(randomOption);
      }
    }
    return options.sort(() => Math.random() - 0.5); // Shuffle options
  };

  // Start the quiz
  const startQuiz = () => {
    setQuizQuestions(generateQuizQuestions());
    setIsQuizActive(true);
    setIsQuizEnded(false);
    setScore({ correct: 0, incorrect: 0 });
    setTimeLeft(0);
    setCurrentQuestionIndex(0);
    setStartTime(Date.now()); // Record start time
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
    }, 1000); // 1-second delay for feedback
  };

  // End the quiz
  const endQuiz = () => {
    setIsQuizActive(false);
    setIsQuizEnded(true);
    setTimeLeft(Math.floor((Date.now() - startTime) / 1000)); // Calculate time taken in seconds
  };

  // Change range during the quiz
  const changeRange = () => {
    setIsQuizActive(false);
    setIsQuizEnded(false);
    setQuizQuestions([]);
  };

  return (
    <div className="square-page" style={styles.page}>
      <div className="container mt-4">
        <h2 className="text-center mb-4" style={styles.heading}> Squares Explorer </h2>
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
                  <label htmlFor="startRange" className="form-label">
                    Start Range (1-100):
                  </label>
                  <input
                    type="number"
                    id="startRange"
                    className="form-control"
                    style={styles.input}
                    value={range.start}
                    min="1"
                    max="100"
                    onChange={(e) => setRange((prev) => ({ ...prev, start: parseInt(e.target.value) }))}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="endRange" className="form-label">
                    End Range (1-100):
                  </label>
                  <input
                    type="number"
                    id="endRange"
                    className="form-control"
                    style={styles.input}
                    value={range.end}
                    min="1"
                    max="100"
                    onChange={(e) => setRange((prev) => ({ ...prev, end: parseInt(e.target.value) }))}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              {generateSquares().map((square) => (
                <div key={square.number} className="col-md-4 mb-4">
                  <div className="card h-100" style={styles.card}>
                    <div className="card-body text-center">
                      <h5 className="card-title">{square.number}² = {square.square}</h5>
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
                  <label htmlFor="difficulty" className="form-label">
                    Select Difficulty:
                  </label>
                  <select
                    id="difficulty"
                    className="form-control"
                    style={styles.select}
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                  >
                    <option value="easy">Easy (1-20)</option>
                    <option value="medium">Medium (20-40)</option>
                    <option value="hard">Hard (1-40 with operations)</option>
                  </select>
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
  tabButton: {
    border: '4px solid #000000', // Thick black border
    borderRadius: '0', // Sharp edges
    padding: '10px 20px',
    fontSize: '1rem',
    fontWeight: '700', // Bold text
    boxShadow: '4px 4px 0px #000000', // Bold shadow
    transition: 'transform 0.3s ease',
  },
  input: {
    border: '4px solid #000000', // Thick black border
    borderRadius: '0', // Sharp edges
    padding: '10px',
    fontSize: '1rem',
    fontWeight: '700', // Bold text
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
  card: {
    border: '4px solid #000000', // Thick black border
    borderRadius: '0', // Sharp edges
    boxShadow: '4px 4px 0px #000000', // Bold shadow
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

export default Square;