import {questions} from "../data/questions.js";

export const initialState = {
    currentQuestion: 0,
    selectedAnswer: null,
    showAnswer: false,
    score: 0,
    isFinished: false
};

// --- HANDLERS ---
function selectAnswer(state, action) {
    return {
        ...state,
        selectedAnswer: action.payload
    };
}

function confirmAnswer(state) {
    const isCorrect = state.selectedAnswer === questions[state.currentQuestion].answer;
    return {
        ...state,
        showAnswer: true,
        score: isCorrect ? state.score + 1 : state.score
    };
}

function nextQuestion(state) {
    const next = state.currentQuestion + 1;
    if (next >= questions.length) {
        return {...state, isFinished: true};
    }
    return {
        ...state,
        currentQuestion: next,
        selectedAnswer: null,
        showAnswer: false
    };
}

function restartQuiz() {
    return initialState;
}

const actionMap = {
    SELECT_ANSWER: selectAnswer,
    CONFIRM_ANSWER: confirmAnswer,
    NEXT_QUESTION: nextQuestion,
    RESTART: restartQuiz
};

export function quizReducer(state, action) {
    const handler = actionMap[action.type];
    return typeof handler === "function" ? handler(state, action) : state;
}
