"use client";

import React, { useState, useEffect } from "react";
import { CheckCircle, XCircle, ChevronLeft, ChevronRight, Flag, Award, Clock, AlertCircle, TrendingUp, BookOpen } from "lucide-react";
import { useRouter } from "next/navigation";

export default function QuizAssessment() {
    const router = useRouter();

    const quiz = {
        id: "quiz-1",
        title: "JavaScript & DOM Fundamentals",
        moduleTitle: "DOM Manipulation",
        description: "Test your understanding of JavaScript DOM manipulation concepts",
        passingScore: 60,
        timeLimit: 15,
        questions: [
            {
                id: "q1",
                type: "multiple-choice",
                question: "What does DOM stand for?",
                options: [
                    "Document Object Model",
                    "Data Object Management",
                    "Digital Operation Method",
                    "Document Orientation Mode"
                ],
                correctAnswer: 0,
                explanation: "DOM stands for Document Object Model, which is a programming interface for HTML and XML documents."
            },
            {
                id: "q2",
                type: "true-false",
                question: "The querySelector() method returns all elements that match the specified CSS selector.",
                correctAnswer: false,
                explanation: "False. querySelector() returns only the FIRST element that matches. Use querySelectorAll() to get all matching elements."
            },
            {
                id: "q3",
                type: "multiple-choice",
                question: "Which method is used to add a new element to the DOM?",
                options: [
                    "addElement()",
                    "appendChild()",
                    "insertElement()",
                    "attachChild()"
                ],
                correctAnswer: 1,
                explanation: "appendChild() is the standard method to add a new child element to a parent element in the DOM."
            },
            {
                id: "q4",
                type: "text",
                question: "What JavaScript method would you use to change the text content of an HTML element?",
                correctAnswer: "textContent",
                alternateAnswers: ["innerText", "innerHTML"],
                explanation: "The textContent property is the recommended way to change text content. innerText and innerHTML also work, though innerHTML interprets HTML tags."
            },
            {
                id: "q5",
                type: "true-false",
                question: "Event bubbling means events propagate from parent elements down to child elements.",
                correctAnswer: false,
                explanation: "False. Event bubbling means events propagate UP from the target element to parent elements. The opposite (parent to child) is called event capturing."
            },
            {
                id: "q6",
                type: "multiple-choice",
                question: "Which of the following is NOT a valid way to select an element in JavaScript?",
                options: [
                    "document.getElementById('myId')",
                    "document.querySelector('.myClass')",
                    "document.getElementByClass('myClass')",
                    "document.getElementsByClassName('myClass')"
                ],
                correctAnswer: 2,
                explanation: "getElementByClass() does not exist. The correct method is getElementsByClassName() (note the plural 'Elements')."
            },
            {
                id: "q7",
                type: "text",
                question: "What property would you use to add or remove CSS classes from an element? (Hint: element._______.add('class-name'))",
                correctAnswer: "classList",
                alternateAnswers: ["classlist"],
                explanation: "The classList property provides methods like add(), remove(), and toggle() to manipulate CSS classes on an element."
            },
            {
                id: "q8",
                type: "multiple-choice",
                question: "What is the correct syntax to prevent the default behavior of an event?",
                options: [
                    "event.stopDefault()",
                    "event.preventDefault()",
                    "event.cancelDefault()",
                    "event.preventAction()"
                ],
                correctAnswer: 1,
                explanation: "event.preventDefault() is the correct method to prevent the default action associated with an event from occurring."
            }
        ]
    };

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(quiz.timeLimit * 60); // in seconds
    const [flaggedQuestions, setFlaggedQuestions] = useState(new Set());

    const currentQuestion = quiz.questions[currentQuestionIndex];
    const totalQuestions = quiz.questions.length;
    const answeredCount = Object.keys(answers).length;

    // Timer
    useEffect(() => {
        if (showResults) return;
        
        const timer = setInterval(() => {
            setTimeRemaining(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    handleSubmitQuiz();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [showResults]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleAnswer = (answer) => {
        setAnswers(prev => ({
            ...prev,
            [currentQuestion.id]: answer
        }));
    };

    const toggleFlag = () => {
        setFlaggedQuestions(prev => {
            const newSet = new Set(prev);
            if (newSet.has(currentQuestion.id)) {
                newSet.delete(currentQuestion.id);
            } else {
                newSet.add(currentQuestion.id);
            }
            return newSet;
        });
    };

    const handleNext = () => {
        if (currentQuestionIndex < totalQuestions - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
        }
    };

    const checkAnswer = (question, userAnswer) => {
        if (userAnswer === undefined || userAnswer === null || userAnswer === '') return false;

        if (question.type === 'multiple-choice') {
            return userAnswer === question.correctAnswer;
        } else if (question.type === 'true-false') {
            return userAnswer === question.correctAnswer;
        } else if (question.type === 'text') {
            const normalizedAnswer = userAnswer.toLowerCase().trim();
            const correctNormalized = question.correctAnswer.toLowerCase().trim();
            
            if (normalizedAnswer === correctNormalized) return true;
            
            if (question.alternateAnswers) {
                return question.alternateAnswers.some(alt => 
                    alt.toLowerCase().trim() === normalizedAnswer
                );
            }
            
            return false;
        }
        return false;
    };

    const calculateResults = () => {
        let correct = 0;
        quiz.questions.forEach(question => {
            if (checkAnswer(question, answers[question.id])) {
                correct++;
            }
        });
        return {
            correct,
            incorrect: totalQuestions - correct,
            percentage: Math.round((correct / totalQuestions) * 100),
            passed: Math.round((correct / totalQuestions) * 100) >= quiz.passingScore
        };
    };

    const handleSubmitQuiz = () => {
        setShowResults(true);
    };

    const handleRetake = () => {
        setAnswers({});
        setShowResults(false);
        setCurrentQuestionIndex(0);
        setTimeRemaining(quiz.timeLimit * 60);
        setFlaggedQuestions(new Set());
    };

    if (showResults) {
        const results = calculateResults();
        
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-2 lg:p-4">
                <div className="max-w-4xl mx-auto">
                    {/* Results Header */}
                    <div className={`rounded-lg p-4 lg:p-6 mb-3 text-center ${results.passed ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 'bg-gradient-to-r from-orange-500 to-red-600'} text-white shadow-md`}>
                        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                            {results.passed ? (
                                <Award size={48} className="text-white" />
                            ) : (
                                <AlertCircle size={48} className="text-white" />
                            )}
                        </div>
                        
                        <h1 className="text-xl lg:text-2xl font-bold mb-3">
                            {results.passed ? '🎉 Congratulations!' : '📚 Keep Learning!'}
                        </h1>
                        
                        <p className="text-md lg:text-lg font-semibold mb-2">
                            You scored {results.percentage}%
                        </p>
                        
                        <p className="text-md opacity-90">
                            {results.passed 
                                ? 'You have passed this assessment!' 
                                : `You need ${quiz.passingScore}% to pass. Review the material and try again.`}
                        </p>
                    </div>

                    {/* Score Breakdown */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 lg:p-8 shadow-md mb-6">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <TrendingUp size={24} className="text-green-600" />
                            Score Breakdown
                        </h2>
                        
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center">
                                <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">
                                    {totalQuestions}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Total Questions</div>
                            </div>
                            
                            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center">
                                <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">
                                    {results.correct}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Correct</div>
                            </div>
                            
                            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg text-center">
                                <div className="text-3xl font-bold text-red-600 dark:text-red-400 mb-1">
                                    {results.incorrect}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Incorrect</div>
                            </div>
                            
                            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg text-center">
                                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                                    {results.percentage}%
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Score</div>
                            </div>
                        </div>

                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
                            <div 
                                className={`h-4 rounded-full transition-all duration-1000 ${results.passed ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 'bg-gradient-to-r from-orange-500 to-red-600'}`}
                                style={{ width: `${results.percentage}%` }}
                            />
                        </div>
                    </div>

                    {/* Question Review */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 lg:p-6 shadow-lg mb-6">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <BookOpen size={24} className="text-purple-600" />
                            Answer Review
                        </h2>
                        
                        <div className="space-y-4">
                            {quiz.questions.map((question, index) => {
                                const userAnswer = answers[question.id];
                                const isCorrect = checkAnswer(question, userAnswer);
                                
                                return (
                                    <div key={question.id} className={`p-4 rounded-lg border-2 ${isCorrect ? 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800'}`}>
                                        <div className="flex items-start gap-3 mb-3">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${isCorrect ? 'bg-green-500' : 'bg-red-500'} text-white`}>
                                                {isCorrect ? <CheckCircle size={18} /> : <XCircle size={18} />}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                                                    Question {index + 1}: {question.question}
                                                </h3>
                                                
                                                {question.type === 'multiple-choice' && (
                                                    <div className="space-y-1 text-sm">
                                                        <p className="text-gray-700 dark:text-gray-300">
                                                            <span className="font-medium">Your answer:</span> {userAnswer !== undefined ? question.options[userAnswer] : 'Not answered'}
                                                        </p>
                                                        {!isCorrect && (
                                                            <p className="text-green-700 dark:text-green-300">
                                                                <span className="font-medium">Correct answer:</span> {question.correctAnswer}
                                                            </p>
                                                        )}
                                                    </div>
                                                )}
                                                
                                                {question.type === 'true-false' && (
                                                    <div className="space-y-1 text-sm">
                                                        <p className="text-gray-700 dark:text-gray-300">
                                                            <span className="font-medium">Your answer:</span> {userAnswer !== undefined ? (userAnswer ? 'True' : 'False') : 'Not answered'}
                                                        </p>
                                                        {!isCorrect && (
                                                            <p className="text-green-700 dark:text-green-300">
                                                                <span className="font-medium">Correct answer:</span> {question.correctAnswer ? 'True' : 'False'}
                                                            </p>
                                                        )}
                                                    </div>
                                                )}
                                                
                                                {question.type === 'text' && (
                                                    <div className="space-y-1 text-sm">
                                                        <p className="text-gray-700 dark:text-gray-300">
                                                            <span className="font-medium">Your answer:</span> {userAnswer || 'Not answered'}
                                                        </p>
                                                        {!isCorrect && (
                                                            <p className="text-green-700 dark:text-green-300">
                                                                <span className="font-medium">Correct answer:</span> {question.correctAnswer}
                                                            </p>
                                                        )}
                                                    </div>
                                                )}
                                                
                                                <div className="mt-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                                        <span className="font-medium text-gray-900 dark:text-gray-100">Explanation:</span> {question.explanation}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button
                            onClick={handleRetake}
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold"
                        >
                            Retake Quiz
                        </button>
                        <button
                            onClick={() => router.replace(`/student/catalog/${quiz.id}/learning/${quiz.id}`)}
                            className="flex-1 border border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold"
                        >
                            Back to Course
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:gray-900  p-2 lg:p-4">
            <div className="max-w-4xl mx-auto">
                {/* Quiz body */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-2 lg:p-4 shadow-sm mb-2">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
                        <div>
                            <h1 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                                {quiz.title}
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">{quiz.description}</p>
                        </div>
                        
                        <div className={`flex items-center gap-2 px-2 py-2 rounded-lg ${timeRemaining < 60 ? 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 animate-pulse' : 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300'}`}>
                            <Clock size={15} />
                            <span className="font-mono text-md font-bold">{formatTime(timeRemaining)}</span>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2 mb-6">
                        
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">
                                Question {currentQuestionIndex + 1} of {totalQuestions}
                            </span>
                            <span className="text-gray-600 dark:text-gray-400">
                                {answeredCount} answered
                            </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div 
                                className="bg-gradient-to-r from-gray-500 to-green-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
                            />
                        </div>
                    </div>

                    <div className="flex items-start justify-between mb-6 border-t border-gray-200 dark:border-gray-700 pt-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 flex items-center justify-center font-bold">
                                {currentQuestionIndex + 1}
                            </div>
                            <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 rounded-full text-xs font-medium uppercase">
                                {currentQuestion.type.replace('-', ' ')}
                            </span>
                        </div>
                        
                        <button
                            onClick={toggleFlag}
                            className={`p-2 rounded-lg transition-colors ${flaggedQuestions.has(currentQuestion.id) ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400' : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 hover:text-yellow-600 dark:hover:text-yellow-400'}`}
                        >
                            <Flag size={20} />
                        </button>
                    </div>

                    <h2 className="text-md lg:text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">
                        {currentQuestion.question}
                    </h2>

                    {/* Multiple Choice */}
                    {currentQuestion.type === 'multiple-choice' && (
                        <div className="space-y-2">
                            {currentQuestion.options.map((option, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleAnswer(index)}
                                    className={`w-full text-left p-2 rounded-lg border-1 text-sm transition-all ${
                                        answers[currentQuestion.id] === index
                                            ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-900 dark:text-green-100'
                                            : 'border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-600 bg-white dark:bg-gray-800'
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                                            answers[currentQuestion.id] === index
                                                ? 'border-green-500 bg-green-500'
                                                : 'border-gray-300 dark:border-gray-600'
                                        }`}>
                                            {answers[currentQuestion.id] === index && (
                                                <div className="w-2 h-2 bg-white rounded-full" />
                                            )}
                                        </div>
                                        <span className="text-gray-900 dark:text-gray-100">{option}</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}

                    {/* True/False */}
                    {currentQuestion.type === 'true-false' && (
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={() => handleAnswer(true)}
                                className={`p-4 rounded-lg border-1 transition-all ${
                                    answers[currentQuestion.id] === true
                                        ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                                        : 'border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-600'
                                }`}
                            >
                                <CheckCircle size={32} className={`mx-auto mb-2 ${answers[currentQuestion.id] === true ? 'text-green-600' : 'text-gray-400'}`} />
                                <div className="text-center font-semibold text-gray-900 dark:text-gray-100">True</div>
                            </button>
                            
                            <button
                                onClick={() => handleAnswer(false)}
                                className={`p-4 rounded-lg border-1 transition-all ${
                                    answers[currentQuestion.id] === false
                                        ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                                        : 'border-gray-200 dark:border-gray-700 hover:border-red-300 dark:hover:border-red-600'
                                }`}
                            >
                                <XCircle size={32} className={`mx-auto mb-2 ${answers[currentQuestion.id] === false ? 'text-red-600' : 'text-gray-400'}`} />
                                <div className="text-center font-semibold text-gray-900 dark:text-gray-100">False</div>
                            </button>
                        </div>
                    )}

                    {/* Text Input */}
                    {currentQuestion.type === 'text' && (
                        <div>
                            <input
                                type="text"
                                value={answers[currentQuestion.id] || ''}
                                onChange={(e) => handleAnswer(e.target.value)}
                                placeholder="Type your answer here..."
                                className="w-full px-4 py-4 border-1 border-gray-200 dark:border-gray-700 rounded-md focus:border-green-500 focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm"
                            />
                            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                                Enter your answer in the text field above
                            </p>
                        </div>
                    )}

                {/* Navigation */}
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                    <button
                        onClick={handlePrevious}
                        disabled={currentQuestionIndex === 0}
                        className="flex-1 text-sm sm:flex-none px-2 py-1 bg-white dark:bg-gray-800 border-1 border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-sm font-semibold transition-colors flex items-center justify-center gap-2"
                    >
                        <ChevronLeft size={15} />
                        Previous
                    </button>

                    <div className="flex-1" />

                    {currentQuestionIndex === totalQuestions - 1 ? (
                        <button
                            onClick={handleSubmitQuiz}
                            className="flex-1 sm:flex-none px-2 py-1 text-sm bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-sm font-semibold transition-all shadow-sm flex items-center justify-center gap-2"
                        >
                            <Award size={15} />
                            Finish Quiz
                        </button>
                    ) : (
                        <button
                            onClick={handleNext}
                            className="flex-1 sm:flex-none px-2 py-1 bg-green-600 hover:bg-green-700 text-white rounded-sm font-semibold transition-colors flex items-center justify-center gap-2"
                        >
                            Next
                            <ChevronRight size={15} />
                        </button>
                    )}
                </div>
                </div>

                {/* Question Navigation Grid */}
                <div className="mt-4 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
                    <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-4 uppercase">Quick Navigation</h3>
                    <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2">
                        {quiz.questions.map((q, index) => (
                            <button
                                key={q.id}
                                onClick={() => setCurrentQuestionIndex(index)}
                                className={`aspect-square rounded-md font-semibold text-sm transition-all ${
                                    index === currentQuestionIndex
                                        ? 'bg-green-600 text-white shadow-sm scale-110'
                                        : answers[q.id] !== undefined && answers[q.id] !== ''
                                            ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-1 border-green-500'
                                            : flaggedQuestions.has(q.id)
                                                ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300 border-1 border-yellow-500'
                                                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                                }`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}