import React from "react";
import StudentsTable from "../../components/StudentsTable";
import StudentsData from "../../data/students";
import AddStudentForm from "../../components/AddStudentForm/AddStudentForm";
import "./Students.css";

const Students = () => {
  return (
    <div>
      <h1>Students</h1>
      <h2>Here is a list of students in your database.</h2>
      <StudentsTable items={StudentsData} />
      <AddStudentForm />
    </div>
  );
};

export default Students;
