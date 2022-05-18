import React from "react";
import StudentsRow from "./StudentsRow";

function StudentsTable({ items }) {
  return (
    <table className='center_table' id='StudentsTable'>
      {/* <caption>List of Students</caption> */}
      <thead>
        <tr>
          <th>Student_id</th>
          <th>Class_id</th>
          <th>Student_name</th>
          <th>Student_address</th>
          <th>Student_email</th>
          <th>Student_gpa</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, i) => (
          <StudentsRow item={item} key={i} />
        ))}
      </tbody>
    </table>
  );
}

export default StudentsTable;
