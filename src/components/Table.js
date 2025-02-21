import React, { useState, useEffect } from 'react';

const Table = () => {
  const [activeTab, setActiveTab] = useState('learning'); // Tabs: 'learning' or 'practice'
  const [tablesRange, setTablesRange] = useState({ start: 1, end: 5 }); // For practice part
  const [currentQuestion, setCurrentQuestion] = useState(null); // For practice part
  const [userAnswer, setUserAnswer] = useState(''); // For practice part
  const [feedback, setFeedback] = useState(''); // For practice part
  const [score, setScore] = useState({ correct: 0, incorrect: 0 }); // For practice part
  const [timeLeft, setTimeLeft] = useState(60); // For practice part
  const [isQuizActive, setIsQuizActive] = useState(false); // For practice part
  const [isQuizEnded, setIsQuizEnded] = useState(false); // Track if quiz has ended

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

  // Generate a random question for the practice part
  const generateQuestion = () => {
    const { start, end } = tablesRange;
    const num1 = Math.floor(Math.random() * (end - start + 1)) + start;
    const num2 = Math.floor(Math.random() * 10) + 1;
    setCurrentQuestion({ num1, num2, answer: num1 * num2 });
  };

  // Start the quiz for the practice part
  const startQuiz = () => {
    setIsQuizActive(true);
    setIsQuizEnded(false);
    setScore({ correct: 0, incorrect: 0 });
    setTimeLeft(60);
    generateQuestion();
  };

  // Handle user's answer submission for the practice part
  const handleSubmit = (e) => {
    e.preventDefault();
    if (parseInt(userAnswer) === currentQuestion.answer) {
      setFeedback('Correct! 🎉');
      setScore((prev) => ({ ...prev, correct: prev.correct + 1 }));
    } else {
      setFeedback(`Incorrect! The answer is ${currentQuestion.answer}.`);
      setScore((prev) => ({ ...prev, incorrect: prev.incorrect + 1 }));
    }
    setUserAnswer('');
    generateQuestion();
  };

  // Timer logic for the practice part
  useEffect(() => {
    if (isQuizActive && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setIsQuizActive(false);
      setIsQuizEnded(true);
      setFeedback('Time’s up! ⌛');
    }
  }, [isQuizActive, timeLeft]);

  return (
    <div
      className="table-page"
      style={{
        background: isQuizActive
          ? 'linear-gradient(135deg, #00f88c,rgb(111, 193, 237),rgb(92, 92, 240))' // Quiz mode background
          : 'linear-gradient(135deg, #f5f7fa, #c3cfe2)', // Learning mode background
        minHeight: '100vh',
        padding: '20px',
      }}
    >
      <div className="container mt-4">
        <h2 className="text-center mb-4">Multiplication Tables</h2>
        <div className="text-center mb-4">
          <button
            className={`btn ${activeTab === 'learning' ? 'btn-primary' : 'btn-outline-primary'} me-2`}
            onClick={() => setActiveTab('learning')}
          >
            Learning Part
          </button>
          <button
            className={`btn ${activeTab === 'practice' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setActiveTab('practice')}
          >
            Practice Part
          </button>
        </div>

        {activeTab === 'learning' ? (
          <div>
            <div className="row justify-content-center">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="startRange" className="form-label">
                    Start Range (1-30):
                  </label>
                  <input
                    type="number"
                    id="startRange"
                    className="form-control"
                    value={tablesRange.start}
                    min="1"
                    max="30"
                    onChange={(e) => setTablesRange((prev) => ({ ...prev, start: parseInt(e.target.value) }))}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="endRange" className="form-label">
                    End Range (1-30):
                  </label>
                  <input
                    type="number"
                    id="endRange"
                    className="form-control"
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
                  <div className="card h-100">
                    <div className="card-body">
                      <h5 className="card-title">Table of {table.number}</h5>
                      <p className="card-text">{table.values.join(', ')}</p>
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
                  <label htmlFor="startRange" className="form-label">
                    Start Range (1-30):
                  </label>
                  <input
                    type="number"
                    id="startRange"
                    className="form-control"
                    value={tablesRange.start}
                    min="1"
                    max="30"
                    onChange={(e) => setTablesRange((prev) => ({ ...prev, start: parseInt(e.target.value) }))}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="endRange" className="form-label">
                    End Range (1-30):
                  </label>
                  <input
                    type="number"
                    id="endRange"
                    className="form-control"
                    value={tablesRange.end}
                    min="1"
                    max="30"
                    onChange={(e) => setTablesRange((prev) => ({ ...prev, end: parseInt(e.target.value) }))}
                  />
                </div>
                <button className="btn btn-primary" onClick={startQuiz}>
                  <span className="material-icons">play_arrow</span> Start Quiz
                </button>
              </div>
            ) : isQuizActive ? (
              <div>
                <div className="mb-3" style={{ fontSize: '20px', color: '#d9534f', fontWeight: '600' }}>
                  Time Left: {timeLeft} seconds
                </div>
                <div className="mb-3" style={{ fontSize: '24px', color: '#333', fontWeight: '600' }}>
                  What is {currentQuestion?.num1} × {currentQuestion?.num2}?
                </div>
                <form onSubmit={handleSubmit}>
                  <input
                    type="number"
                    className="form-control mb-3"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    autoFocus
                  />
                  <button type="submit" className="btn btn-success">
                    <span className="material-icons">check</span> Submit
                  </button>
                </form>
                <div className="mt-3" style={{ fontSize: '18px', color: '#5cb85c', fontWeight: '600' }}>
                  {feedback}
                </div>
              </div>
            ) : (
              <div>
                <h3>Quiz Ended!</h3>
                <div className="mt-3" style={{ fontSize: '18px', color: '#333' }}>
                  Correct: {score.correct} | Incorrect: {score.incorrect}
                </div>
                <button className="btn btn-primary mt-3" onClick={startQuiz}>
                  <span className="material-icons">replay</span> Restart Quiz
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Table;