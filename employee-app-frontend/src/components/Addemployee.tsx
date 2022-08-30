import React, { useState } from "react";
type Employee = {
  id: number;
  name: string;
  email: string;
  phone: string;
};

const Addemployee = () => {
  const [employee, setEmployee] = useState<Employee>({
    id: 5000,
    name: "",
    email: "",
    phone: "",
  });
  const [employeeList, setEmployeeList] = useState<Employee[]>([]);
  console.log(employeeList);
  console.log(employee);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // const { name, value } = event.target;

    setEmployee({
      ...employee,
      [event.target.id]: event.target.value,
    });
    console.log(employee);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const i = employee.id;
    setEmployee({
      ...employee,
      id: i + 1,
    });
    setEmployeeList((employeeList) => [...employeeList, employee]);
    setEmployee({
      id: 5000,
      name: "",
      email: "",
      phone: "",
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          placeholder="First Name"
          value={employee.name}
          onChange={handleChange}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="example@example.com"
          value={employee.email}
          onChange={handleChange}
        />
        <label htmlFor="phone">Phone</label>
        <input
          type="text"
          id="phone"
          value={employee.phone}
          onChange={handleChange}
        />
        <button type="submit"> Submit </button>
      </form>
    </div>
  );
};

export default Addemployee;
