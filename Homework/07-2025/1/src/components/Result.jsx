import {useContext} from "react";
import {QuizContext} from "../store/QuizContext.jsx";
import {questions} from "../data/questions.js";
import {Button, Typography, Box} from "@mui/material";

export default function Result() {
    const {state, dispatch} = useContext(QuizContext);
    const {score} = state;

    return (
        <Box mt={4} textAlign="center">
            <Typography variant="h4" gutterBottom>
                Kết quả: {score} / {questions.length} điểm
            </Typography>
            <Button variant="contained" onClick={() => dispatch({type: "RESTART"})}>
                Làm lại bài
            </Button>
        </Box>
    );
}
