import AddStaffForm from "../../components/AddStaffForm/AddStaffForm";
import StaffTable from "../../components/StaffTable";
import StaffData from "../../data/staff";
import Header from "../../components/Header/Header";

import "./Staff.css";

const Staff = () => {
  return (
    <div>
      <Header title='Staff' />
      <h2>Here is a list of staff in your database.</h2>
      <StaffTable items={StaffData} />
      <AddStaffForm />
    </div>
  );
};

export default Staff;
