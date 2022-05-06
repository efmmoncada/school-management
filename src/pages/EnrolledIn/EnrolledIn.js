import AddEnrolledInForm from "../../components/AddEnrolledInForm/AddEnrolledInForm.js";
import "./EnrolledIn.css";
import React from 'react';
import EnrolledInTable from '../../components/EnrolledInTable';
import EnrolledInData from '../../data/EnrolledIn'

const EnrolledIn = () => {
  return (
    <div>
      <h2>Here is a list of Enrolled_In in your database.</h2>
      <EnrolledInTable items={EnrolledInData}/>
      <AddEnrolledInForm />
    </div>
  );
};

export default EnrolledIn;
