import AddClassForm from "../../components/AddClassForm/AddClassForm";
import React from "react";
import ClassesTable from "../../components/ClassesTable";
import ClassesData from "../../data/classes";
import Header from "../../components/Header/Header";

import "./Classes.css";

const Classes = () => {
  return (
    <div>
      <Header title='Classes' />
      <h2>Here is a list of classes in your database.</h2>
      <ClassesTable items={ClassesData} />
      <AddClassForm />
    </div>
  );
};

export default Classes;
