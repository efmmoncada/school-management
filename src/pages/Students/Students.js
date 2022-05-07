import React from "react";
import StudentsTable from "../../components/StudentsTable";
import StudentsData from "../../data/students";
import AddStudentForm from "../../components/AddStudentForm/AddStudentForm";
import Header from "../../components/Header/Header";

import "./Students.css";

const Students = () => {
  return (
    <div>
      <Header title='Students' />
      <h2>Here is a list of students in your database.</h2>
      <StudentsTable items={StudentsData} />
      <AddStudentForm />
    </div>
  );
};

export default Students;
