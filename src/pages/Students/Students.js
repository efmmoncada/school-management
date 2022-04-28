// import "./Students.css";

import React from 'react';
import StudentsTable from '../../components/StudentsTable';
import students_data from '../../data/students'

const Students = () => {
  return (
    <div>
      <h2>Here is a list of students in your database.</h2>
      <StudentsTable items={students_data}/>
    </div>
  );
};

export default Students;
