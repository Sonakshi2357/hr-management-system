import React, { useState, useEffect } from 'react';
import { getEmployees, createEmployee } from '../api';

const Employee = () => {
    const [employees, setEmployees] = useState([]);
    const [newEmployee, setNewEmployee] = useState({});

    useEffect(() => {
        const fetchEmployees = async () => {
            const employees = await getEmployees();
            setEmployees(employees);
        };
        fetchEmployees();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const createdEmployee = await createEmployee(newEmployee);
        setEmployees([...employees, createdEmployee]);
        setNewEmployee({});
    };

    return (
        <div>
            <h1>Employees</h1>
            <ul>
                {employees.map((employee) => (
                    <li key={employee._id}>{employee.name}</li>
                ))}
            </ul>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={newEmployee.name}
                    onChange={(event) =>
                        setNewEmployee({ ...newEmployee, name: event.target.value })
                    }
                />
                <button type="submit">Add Employee</button>
            </form>
        </div>
    );
};

export default Employee;