import {useEffect, useState} from "react";
import {addC, deleteC, getContacts, updateC} from "../api/api.js";

export const useContacts = () => {
    const [contacts, setContacts] = useState([])

    useEffect(() => {
        fetchContacts()
    }, []);

    const fetchContacts = async () => {
        try {
            const data = await getContacts()
            setContacts(data)
            console.table(data)
        } catch (e) {
            console.log(e.message)
        }
    }

    const addContact = async (contact) => {
        try {
            const newContact = await addC(contact)
            setContacts(prev => [...prev, newContact])
        } catch (e) {
            console.log(e.message)
        }
    }

    const updateContact = async (contact) => {
        try {
            const updated = await updateC(contact)
            setContacts(prev => prev.map(c => c.id === contact.id ? updated : c))
        } catch (e) {
            console.log(e.message)
        }
    }

    const deleteContact = async (id) => {
        await deleteC(id)
        setContacts(prev => prev.filter(c => c.id !== id))
    }

    return {
        contacts,
        addContact,
        updateContact,
        deleteContact
    }
}