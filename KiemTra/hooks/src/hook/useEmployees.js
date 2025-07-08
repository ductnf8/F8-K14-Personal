import {useEffect, useState} from "react";
import {addEmp, deleteEmp, getEmployees, updateEmp} from "../components/api/employeeApi.js";

const generateIncrementalId = (employees) => {
    if (employees.length === 0) return 1
    const maxId = Math.max(...employees.map(e => e.id || 0))
    return maxId + 1
}

export const useEmployees = () => {
    const [employees, setEmployees] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchData()
    }, []);

    const fetchData = async () => {
        try {
            const data = await getEmployees()
            setEmployees(data)
            console.table(data)
        } catch (e) {
            console.log(e.message)
            setError('Loi khi tai nhan vien')
        }
    }

    const addEmployee = async (employee) => {
        const newEmp = await addEmp(employee)
        newEmp.id = generateIncrementalId(employees)
        setEmployees(prev => [...prev, newEmp])
    }

    const updateEmployee = async (employee) => {
        const updated = await updateEmp(employee)
        setEmployees(prev => prev.map(e => e.id === employee.id ? updated : e))
    }

    const deleteEmployee = async (id) => {
        await deleteEmp(id)
        setEmployees(prev => prev.filter(e => e.id !== id))
    }
    return {
        employees,
        error,
        addEmployee,
        updateEmployee,
        deleteEmployee
    }
}