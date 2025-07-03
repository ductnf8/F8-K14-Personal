import React, {useContext} from 'react';
import {QuizContext} from "./store/QuizContext.jsx";
import Result from "./components/Result.jsx";
import Question from "./components/Question.jsx";
import {Container, Typography} from "@mui/material";

const App = () => {
    const {state} = useContext(QuizContext)

    return (
        <Container maxWidth='xl'>
            <Typography
                variant='h1' align='center' mt={5} mb={3}
            >Quiz App
            </Typography>
            {
                state.isFinished
                    ? <Result/>
                    : <Question/>
            }
        </Container>
    );
};

export default App;
