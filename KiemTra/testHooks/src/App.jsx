import React from 'react';
import {Container} from "@mui/material";
import ContactTable from "./components/ContactTable.jsx";

const App = () => {
    return (
        <div>
            <Container>
                <ContactTable/>
            </Container>
        </div>
    );
};

export default App;
