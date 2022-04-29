import React from "react";
import StaffRow from './StaffRow';


function StaffTable({items}) {
    return (
        <table class="center_table"  id="StaffTable">
            {/* <caption>List of Staff</caption> */}
            <thead>
                <tr>
                    <th>Staff_id</th>
                    <th>Staff_name</th>
                    <th>Staff_address</th>
                    <th>Staff_phone_number</th>
                    <th>Staff_email</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {items.map((item,i) => <StaffRow item={item} key={i} />)}
            </tbody>
        </table>
    );
}


export default StaffTable;