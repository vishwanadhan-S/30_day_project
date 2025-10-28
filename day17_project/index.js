

const quizQuestions = [
    {
        question: "Which language runs in a web browser?",
        options: ["Java", "C", "Python", "JavaScript"],
        correctAnswer: 3
    },
    {
        question: "What does CSS stand for?",
        options: [
            "Central Style Sheets",
            "Cascading Style Sheets",
            "Cascading Simple Sheets",
            "Cars SUVs Sailboats"
        ],
        correctAnswer: 1
    },
    {
        question: "What does HTML stand for?",
        options: [
            "Hypertext Markup Language",
            "Hypertext Markdown Language",
            "Hyperloop Machine Language",
            "Helicopters Terminals Motorboats Lamborghinis"
        ],
        correctAnswer: 0
    },
    {
        question: "Which year was JavaScript launched?",
        options: ["1996", "1995", "1994", "None of the above"],
        correctAnswer: 1
    },
    {
        question: "Which of these is a JavaScript framework?",
        options: ["Django", "Flask", "React", "Laravel"],
        correctAnswer: 2
    }
];


const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultsScreen = document.getElementById('results-screen');
const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const questionElement = document.getElementById('question');
const optionsElements = document.querySelectorAll('.option');
const progressElement = document.getElementById('progress');
const feedbackElement = document.getElementById('feedback');
const scoreElement = document.getElementById('score');
const scoreMessageElement = document.getElementById('score-message');


let currentQuestionIndex = 0;
let score = 0;
let selectedOption = null;


startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', restartQuiz);

// Add event listeners to options
optionsElements.forEach(option => {
    option.addEventListener('click', selectOption);
});

// Start the quiz
function startQuiz() {
    startScreen.classList.remove('active');
    quizScreen.classList.add('active');
    showQuestion();
}

// Display current question and options
function showQuestion() {
    resetOptions();
    const currentQuestion = quizQuestions[currentQuestionIndex];

    questionElement.textContent = currentQuestion.question;
    progressElement.textContent = `Question ${currentQuestionIndex + 1} of ${quizQuestions.length}`;

    optionsElements.forEach((option, index) => {
        option.textContent = currentQuestion.options[index];
    });

    nextBtn.disabled = true;
    feedbackElement.classList.add('hidden');
}

// Handle option selection
function selectOption(e) {
    if (nextBtn.disabled === false) return; // Prevent reselection after answer

    const selectedElement = e.target;
    const selectedIndex = parseInt(selectedElement.getAttribute('data-index'));

    // Remove selection from all options
    resetOptions();

    // Add selection to clicked option
    selectedElement.classList.add('selected');
    selectedOption = selectedIndex;

    // Enable the Next button
    nextBtn.disabled = false;
}

// Reset all option styles
function resetOptions() {
    optionsElements.forEach(option => {
        option.classList.remove('selected', 'correct', 'incorrect');
    });
    selectedOption = null;
}

// Move to next question or show results
function nextQuestion() {
    // Check if answer is correct
    const currentQuestion = quizQuestions[currentQuestionIndex];
    const isCorrect = selectedOption === currentQuestion.correctAnswer;

    // Show feedback
    showFeedback(isCorrect, currentQuestion);

    // Update score if correct
    if (isCorrect) {
        score++;
    }

    // Move to next question after a delay
    setTimeout(() => {
        currentQuestionIndex++;

        if (currentQuestionIndex < quizQuestions.length) {
            showQuestion();
        } else {
            showResults();
        }
    }, 2000);
}

// Show feedback for the current answer
function showFeedback(isCorrect, question) {
    // Highlight correct and incorrect answers
    optionsElements.forEach((option, index) => {
        if (index === question.correctAnswer) {
            option.classList.add('correct');
        } else if (index === selectedOption && !isCorrect) {
            option.classList.add('incorrect');
        }
    });

    // Display feedback message
    feedbackElement.classList.remove('hidden');
    if (isCorrect) {
        feedbackElement.textContent = "Correct! Well done.";
        feedbackElement.className = "feedback correct-feedback";
    } else {
        feedbackElement.textContent = `Incorrect. The correct answer is: ${question.options[question.correctAnswer]}`;
        feedbackElement.className = "feedback incorrect-feedback";
    }
}

// Display final results
function showResults() {
    quizScreen.classList.remove('active');
    resultsScreen.classList.add('active');

    scoreElement.textContent = `${score}/${quizQuestions.length}`;

    // Set score message based on performance
    if (score === quizQuestions.length) {
        scoreMessageElement.textContent = "Perfect score! You're a quiz master!";
    } else if (score >= quizQuestions.length * 0.7) {
        scoreMessageElement.textContent = "Great job! You have good knowledge.";
    } else if (score >= quizQuestions.length * 0.5) {
        scoreMessageElement.textContent = "Not bad! Keep learning to improve.";
    } else {
        scoreMessageElement.textContent = "Keep practicing to improve your knowledge!";
    }
}

// Restart the quiz
function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    selectedOption = null;

    resultsScreen.classList.remove('active');
    startScreen.classList.add('active');
}
