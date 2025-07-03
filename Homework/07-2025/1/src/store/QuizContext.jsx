import {createContext, useReducer} from "react";
import {initialState, quizReducer} from "./quizReducer.js";

export const QuizContext = createContext()

export function QuizProvider({children}) {
    const [state, dispatch] = useReducer(quizReducer, initialState)
    return (
        <QuizContext.Provider value={{state, dispatch}}>
            {children}
        </QuizContext.Provider>
    )
}