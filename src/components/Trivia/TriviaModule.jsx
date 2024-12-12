import React, { useState, useEffect } from 'react';
import generalTriviaData from '../../data/generalTrivia.json';
import spaceTriviaData from '../../data/spaceTrivia.json';
import './TriviaModule.scss';

const TriviaModule = ({ theme }) => {
  const [triviaType, setTriviaType] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [hoveredTriviaType, setHoveredTriviaType] = useState(null);

  // Load questions based on selected trivia type
  useEffect(() => {
    if (triviaType) {
      let triviaData;

      if (triviaType === 'general') {
        triviaData = generalTriviaData;
      } else if (triviaType === 'space') {
        triviaData = spaceTriviaData;
      }

      if (triviaData && triviaData.results && Array.isArray(triviaData.results)) {
        const shuffledQuestions = triviaData.results
          .sort(() => Math.random() - 0.5)
          .slice(0, 5);
        setQuestions(shuffledQuestions);
      } else {
        console.error('Trivia data format is incorrect:', triviaData);
      }
    }
  }, [triviaType]);

  useEffect(() => {
    if (questions.length) {
      const currentQuestionData = questions[currentQuestion];
      const allAnswers = [
        currentQuestionData.correct_answer,
        ...currentQuestionData.incorrect_answers,
      ];
      setShuffledAnswers(allAnswers.sort(() => Math.random() - 0.5));
    }
  }, [questions, currentQuestion]);

  if (!triviaType) {
    // Trivia type selection screen
    return (
      <div className={`trivia trivia--selection trivia--${theme}`}>
        <h2>Trivia Challenge</h2>

        <div className="trivia-context">
          <h3>Select a Trivia Type:</h3>
        </div>
        <div className="trivia__description">
          {hoveredTriviaType === 'general' && (
            <p>
              Test your knowledge with a mix of fun and engaging questions from various categories.
            </p>
          )}
          {hoveredTriviaType === 'space' && (
            <p>Explore the universe with space-themed trivia designed for curious minds.</p>
          )}
        </div>

        <div className="trivia__selection-buttons">
          <button
            onMouseEnter={() => setHoveredTriviaType('general')}
            onMouseLeave={() => setHoveredTriviaType(null)}
            onClick={() => setTriviaType('general')}
          >
            General Trivia
          </button>
          <button
            onMouseEnter={() => setHoveredTriviaType('space')}
            onMouseLeave={() => setHoveredTriviaType(null)}
            onClick={() => setTriviaType('space')}
          >
            Space Trivia
          </button>
        </div>
      </div>
    );
  }

  if (!questions.length) {
    return <div className={`trivia trivia--${theme}`}>Loading questions...</div>;
  }

  const handleAnswerSelect = (answer) => {
    if (selectedAnswer) return;
    setSelectedAnswer(answer);
    const correct = answer === questions[currentQuestion].correct_answer;
    setIsAnswerCorrect(correct);

    if (correct) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setQuizCompleted(true);
    }
    setSelectedAnswer(null);
    setIsAnswerCorrect(null);
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setIsAnswerCorrect(null);
    setScore(0);
    setQuizCompleted(false);

    // Reshuffle and reload 5 questions for a new quiz
    let triviaData;

    if (triviaType === 'general') {
      triviaData = generalTriviaData;
    } else if (triviaType === 'space') {
      triviaData = spaceTriviaData;
    }

    const shuffledQuestions = triviaData.results
      .sort(() => Math.random() - 0.5)
      .slice(0, 5);
    setQuestions(shuffledQuestions);
  };

  const handleChangeTriviaType = () => {
    // Reset all states and go back to trivia selection
    setTriviaType(null);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setIsAnswerCorrect(null);
    setQuestions([]);
    setShuffledAnswers([]);
    setScore(0);
    setQuizCompleted(false);
  };

  const currentQuestionData = questions[currentQuestion];

  if (!currentQuestionData && !quizCompleted) {
    return <div className={`trivia trivia--${theme}`}>Error loading question data</div>;
  }

  return (
    <div className={`trivia trivia--${theme}`}>
      <h2>Trivia Challenge</h2>
      {!quizCompleted ? (
        <>
          <div className="trivia__question">
            <p>{currentQuestionData.question}</p>
          </div>
          <div className="trivia__options">
            {shuffledAnswers.map((answer, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(answer)}
                disabled={selectedAnswer !== null}
                className={`
                  ${selectedAnswer === answer
                    ? answer === currentQuestionData.correct_answer
                      ? 'correct'
                      : 'incorrect'
                    : ''
                }
                `}
              >
                {answer}
              </button>
            ))}
          </div>
          {selectedAnswer && (
            <div className="trivia__feedback">
              {isAnswerCorrect ? (
                <p className="correct-feedback">Correct!</p>
              ) : (
                <p className="incorrect-feedback">
                  Incorrect! The correct answer was: {currentQuestionData.correct_answer}
                </p>
              )}
              <button onClick={handleNextQuestion} className="next-button">
                {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="trivia__results">
          <h3>Quiz Complete!</h3>
          <p>
            You scored {score} out of {questions.length}.
          </p>
          <div className="trivia__results-buttons">
            <button onClick={handleRestartQuiz} className="restart-button">
              Restart Quiz
            </button>
            <button onClick={handleChangeTriviaType} className="change-type-button">
              Change Trivia Type
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TriviaModule;