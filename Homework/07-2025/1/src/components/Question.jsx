import {useContext} from "react";
import {QuizContext} from "../store/QuizContext.jsx";
import {questions} from "../data/questions.js";
import {Box, Button, Card, Stack, Typography} from "@mui/material";

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

    return {color, variant};
}

export default function Question() {
    const {state, dispatch} = useContext(QuizContext);
    const {currentQuestion, selectedAnswer, showAnswer} = state;
    const question = questions[currentQuestion];

    const onSelect = (option) => {
        if (!showAnswer) {
            dispatch({type: "SELECT_ANSWER", payload: option});
        }
    };

    return (
        <Box mt={4}>
            <Card sx={{p: 3}}>
                <Typography variant="h6" gutterBottom>
                    Câu {currentQuestion + 1} / {questions.length}
                </Typography>

                <Typography variant="h5" mb={3}>
                    {question.question}
                </Typography>

                <Stack spacing={2}>
                    {question.options.map((option, index) => (
                        <Button
                            key={index}
                            onClick={() => onSelect(option)}
                            {...getButtonProps(option, state, question)}
                        >
                            {option}
                        </Button>
                    ))}
                </Stack>

                {!showAnswer && selectedAnswer && (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => dispatch({type: "CONFIRM_ANSWER"})}
                        sx={{mt: 3}}
                    >
                        CONFIRM
                    </Button>
                )}

                {showAnswer && (
                    <Button
                        onClick={() => dispatch({type: "NEXT_QUESTION"})}
                        variant="outlined"
                        sx={{mt: 4}}
                    >
                        {currentQuestion === questions.length - 1
                            ? "VIEW RESULTS"
                            : "NEXT QUESTION"}
                    </Button>
                )}
            </Card>
        </Box>
    );
}
