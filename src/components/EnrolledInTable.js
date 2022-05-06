import React from "react";
import EnrolledInRow from './EnrolledInRow';


function EnrolledInTable({items}) {
    return (
        <table class="center_table"  id="Enrolled_InTable">
            {/* <caption>List of Locations</caption> */}
            <thead>
                <tr>
                    <th>Student_id</th>
                    <th>Class_id</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {items.map((item,i) => <EnrolledInRow item={item} key={i} />)}
            </tbody>
        </table>
    );
}


export default EnrolledInTable;