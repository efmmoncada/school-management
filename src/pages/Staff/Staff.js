import AddStaffForm from "../../components/AddStaffForm/AddStaffForm";
import "./Staff.css";
import StaffTable from "../../components/StaffTable";
import StaffData from "../../data/staff";

const Staff = () => {
  return (
    <div>
      {/* <h1>Staff</h1> */}
      <h2>Here is a list of staff in your database.</h2>
      <StaffTable items={StaffData} />
      <AddStaffForm />
    </div>
  );
};

export default Staff;
