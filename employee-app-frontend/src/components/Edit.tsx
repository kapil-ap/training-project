import React from "react";
import { useState } from "react";

type Employee = {
  id: number;
  name: string;
  email: string;
  phone: string;
};

type EditProps = {
  employeeList: Employee[];
  employeeId: number;
};

const Edit = (props: EditProps) => {
  const [employee, setEmployee] = useState<Employee>({
    id: 5000,
    name: "",
    email: "",
    phone: "",
  });

  let selectedEmployee: Employee = {
    id: 5000,
    name: "",
    email: "",
    phone: "",
  };

  for (let i = 0; i < props.employeeList.length; i++) {
    if (props.employeeList[i].id === props.employeeId) {
      selectedEmployee = props.employeeList[i];
      break;
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmployee({ ...employee, [event.target.id]: event.target.value });
    selectedEmployee = {
      ...selectedEmployee,
      [event.target.id]: event.target.value,
    };
    console.log(selectedEmployee);
    console.log(employee);
  };

  return (
    <div className="small-container">
      <form>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          placeholder="First Name"
          value={selectedEmployee.name}
          onChange={handleChange}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="example@example.com"
          value={selectedEmployee.email}
          onChange={handleChange}
        />
        <label htmlFor="phone">Phone</label>
        <input
          type="text"
          id="phone"
          value={selectedEmployee.phone}
          onChange={handleChange}
        />
        <button type="submit"> Submit </button>
      </form>
    </div>
  );
};

export default Edit;
