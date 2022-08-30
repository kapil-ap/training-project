import React from "react";
type Employee = {
  id: number;
  name: string;
  email: string;
  phone: string;
};

type EmployeeListProps = {
  employees: Employee[];
};

const EmployeeList = (props: EmployeeListProps) => {
  const { employees } = props;
  return (
    <div className="contain-table">
      <table className="striped-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th colSpan={2} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((employee, i) => (
              <tr key={employee.id}>
                <td>{i + 1}</td>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.phone} </td>
                <td className="text-right">
                  <button className="button muted-button">Edit</button>
                </td>
                <td className="text-left">
                  <button className="button muted-button">Delete</button>
                </td>
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
  );
};

export default EmployeeList;
