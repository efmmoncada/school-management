import "./Classes.css";
import React from 'react';
import ClassesTable from '../../components/ClassesTable';
import ClassesData from '../../data/classes'

const Classes = () => {
  return (
    <div>
      <h2>Here is a list of classes in your database.</h2>
      <ClassesTable items={ClassesData}/>
    </div>
  );
};

export default Classes;
