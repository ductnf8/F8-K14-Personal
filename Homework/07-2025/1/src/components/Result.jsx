import React, {useContext} from 'react';
import {QuizContext} from "../store/QuizContext.jsx";
import {questions} from "../data/questions.js";
import {Box, Button, Paper, Typography} from "@mui/material";

const Result = () => {
    const {state, dispatch} = useContext(QuizContext)
    return (
        <Box>
            <Paper sx={{padding: 4, textAlign: 'center'}}>
                <Typography
                    variant='h3' gutterBottom
                >YOUR RESULT</Typography>

                <Typography variant='h6' mb={3}>
                    {state.score}/{questions.length} questions
                </Typography>
                <Button
                    onClick={() => dispatch({type: 'RESTART'})}
                    variant='contained' color='primary'
                >
                    PLAY AGAIN
                </Button>
            </Paper>
        </Box>
    );
};

export default Result;
