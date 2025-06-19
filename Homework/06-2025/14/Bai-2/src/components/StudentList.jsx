import React from 'react';
import StudentItem from "./StudentItem.jsx";

const StudentList = ({students}) => {
    return (
        <div style={{marginTop: '50px'}}>
            {
                students.map(s => (
                    < StudentItem key={s.id} student={s}/>
                ))
            }
        </div>
    );
};

export default StudentList;
