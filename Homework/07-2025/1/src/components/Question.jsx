import {useContext} from "react";
import {QuizContext} from "../store/QuizContext.jsx";
import {questions} from "../data/questions.js";
import {Box, Button, Card, Stack, Typography} from "@mui/material";

export default function Question() {
    const {state, dispatch} = useContext(QuizContext)
    const {currentQuestion, selectedAnswer, showAnswer} = state
    const question = questions[currentQuestion]

    const onSelect = (option) => {
        if (!showAnswer) {
            dispatch({type: 'SELECT_ANSWER', payload: option})
        }
    }

    function getButtonProps(option, state, question) {
        const {selectedAnswer, showAnswer} = state;

        let color = "primary";
        let variant = "outlined";

        if (showAnswer) {
            if (option === question.answer) {
                color = "success";
                variant = "contained";
            } else if (option === selectedAnswer) {
                color = "error";
                variant = "contained";
            }
        } else if (option === selectedAnswer) {
            color = "info";
            variant = "contained";
        }

        return {
            color,
            variant,
        };
    }


    return (
        <>
            <Box mt={4}>
                <Card>
                    <h2>Question {currentQuestion + 1}</h2>
                    <Typography
                        variant='h3'
                        gutterBottom
                    >
                        Question {question.question}/{questions.length}
                    </Typography>
                    <Stack spacing={2}>
                        {
                            question.options.map((option, index) => (
                                <Button
                                    key={index}
                                    onClick={() => onSelect(option)}
                                    {...getButtonProps(option, {...state, dispatch}, question)}
                                >
                                    {option}
                                </Button>
                            ))

                        }
                    </Stack>
                    {
                        showAnswer && (
                            <Button
                                onClick={() => dispatch({type: 'NEXT_QUESTION'})}
                                style={{marginTop: '20px'}}
                            >
                                {
                                    currentQuestion === questions.length - 1
                                        ? 'VIEW RESULTS'
                                        : 'NEXT QUESTION'

                                }
                            </Button>
                        )
                    }
                </Card>
            </Box>
        </>
    )
}