import Edit from "./Edit";
import EmployeeList from "./EmployeeList";
import useEmpServices from "../services/useEmpServices";



const Dashboard = () => {

  const employeesList = useEmpServices(
    fetch("http://localhost:3000/employee")
    );
    console.log(employeesList);
  return (
    <div>
      <EmployeeList employees={employeesList} />
      {/* <Edit employeeList={employees} employeeId={5002} /> */}
    </div>
  );
};

export default Dashboard;
