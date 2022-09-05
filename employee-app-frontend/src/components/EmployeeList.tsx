import React, { MouseEventHandler, useState } from "react";
import Edit from "./Edit";
import swal from 'sweetalert';
type Employee = {
  emp_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  pid: number;
  project_name: string;
};
type managerEmployee = {
  emp_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  pid: number;
  project_name: string;
  manager_id:number;
}

type EmployeeListProps = {
  employees: managerEmployee[];
};

const EmployeeList = (props: EmployeeListProps) => {
  const { employees } = props;
  
  const [editing, setEditing] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee>({
    emp_id: 0,
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    pid: 0,
    project_name: "",
  });
  const handleEdit = (employee: Employee) => {
    setEditing(true);
    setSelectedEmployee(employee);
  };

  const handleDelete = async (id: number) => {
    let res = await fetch(`http://localhost:3000/employee/${id}`, {
      method: "DELETE",
    });
    let resJson = await res.json();
    if (res.status === 200) {
      swal({
        title: "Updated",
        text: resJson,
        icon: "success",
      }).then(() => {
        window.location.href = "/";
      });
    }
  };
  return (
    <div className="container">
      {!editing && (
        <div className="contain-table">
          <table className="striped-table">
            <thead>
              <tr>
                <th>No.</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Project Name</th>
                <th colSpan={2} className="text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {employees.length > 0 ? (
                employees.map((employee, i) => (
                  <tr key={employee.emp_id}>
                    <td>{i + 1}</td>
                    <td>{employee.first_name}</td>
                    <td>{employee.last_name}</td>
                    <td>{employee.email}</td>
                    <td>{employee.phone} </td>
                    <td>{employee.project_name} </td>
                    <td className="text-right">
                      <button
                        className="button muted-button"
                        onClick={() => handleEdit(employee)}
                      >
                        Edit
                      </button>
                    </td>
                    {employee.emp_id === employee.manager_id ? (<td></td>):(<td className="text-left">
                      <button className="button muted-button" onClick={ () =>  handleDelete(employee.emp_id) }>Delete</button>
                    </td>)}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7}>No Employees</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {editing && (
        <>
          <Edit selectedEmployee={selectedEmployee} />
        </>
      )}
    </div>
  );
};

export default EmployeeList;
