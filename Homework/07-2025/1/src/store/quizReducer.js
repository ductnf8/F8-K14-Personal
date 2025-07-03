import {questions} from "../data/questions.js";

export const initialState = {
    currentQuestion: 0,
    selectedAnswer: null,
    showAnswer: false,
    score: 0,
    isFinished: false
}

function selectAnswer(state, action) {
    const isCorrect = action.payload === questions[state.currentQuestion].answer;
    return {
        ...state,
        selectedAnswer: action.payload,
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
    NEXT_QUESTION: nextQuestion,
    RESTART: restartQuiz
};

export function quizReducer(state, action) {
    const handler = actionMap[action.type];
    if (typeof handler === "function") {
        return handler(state, action);
    }
    return state
}
