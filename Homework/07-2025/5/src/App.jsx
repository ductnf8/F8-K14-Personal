import React, {useEffect} from 'react';
import ContactList from './components/ContactList';
import ContactForm from './components/ContactForm';
import SearchBox from './components/SearchBox.jsx';
import {useDispatch} from 'react-redux';
import {fetchContacts} from './store/contactSlice';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchContacts());
    }, [dispatch]);

    return (
        <div style={{padding: '2rem'}}>
            <h1>📇 Contact Manager</h1>
            <SearchBox/>
            <ContactForm/>
            <ContactList/>
        </div>
    );
};

export default App;
