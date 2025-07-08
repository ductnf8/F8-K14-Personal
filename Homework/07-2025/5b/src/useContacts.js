import {useEffect, useState} from "react";
import {getContact} from "./api/contactApi.js";

export const useContacts = () => {
    const [contacts, setContacts] = useState([])

    useEffect(() => {
        fetchContacts()
    }, []);

    const fetchContacts = async () => {
        try {
            const data = await getContact()
            setContacts(data)
        } catch (e) {
            console.log(e.message)
        }
    }

    return {contacts}
}