import React from "react";
import AddEnrolledInForm from "../../components/AddEnrolledInForm/AddEnrolledInForm.js";
import EnrolledInTable from "../../components/EnrolledInTable";
import EnrolledInData from "../../data/EnrolledIn";
import Header from "../../components/Header/Header.js";

import "./EnrolledIn.css";

const EnrolledIn = () => {
  return (
    <div>
      <Header title='Enrolled In' />
      <h2>Here is a list of Enrolled_In in your database.</h2>
      <EnrolledInTable items={EnrolledInData} />
      <AddEnrolledInForm />
    </div>
  );
};

export default EnrolledIn;
