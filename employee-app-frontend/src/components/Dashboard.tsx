import React, { useEffect } from "react";
import Edit from "./Edit";
import EmployeeList from "./EmployeeList";
import { getAllEmployees, getEmpList } from "../services/EmployeeService";
import { useState } from "react";

type Employee = {
  id: number;
  name: string;
  email: string;
  phone: string;
};

type newEmployee = {
  id: number,
  name: string,
  email: string,
  phone: string,
  pid:number,
};

const Dashboard = () => {
  // let empArr;
  // const arr = async () => {
  //   let employees = await getAllEmployees();
  //   return employees;
  // };

  const [empArr, setEmpArr] = useState([]);

  // useEffect(() => {
  //   let arr = getAllEmployees();
  //   setEmpArr(

  //   empArr.concat(arr)

  // )},[]);

  // console.log(arr);

  useEffect(() => {
   ( async () =>{
      let employeeList=await getAllEmployees();
      setEmpArr(
        employeeList
        )
    })();
  }, []);

 console.log(empArr);

  // let employeeList = getAllEmployees();
  // console.log(employeeList);

  const employees: Employee[] = [
    {
      id: 5000,
      name: "Kapil Ramwani",
      email: "jai@jai.com",
      phone: "9549996223",
    },
    {
      id: 5001,
      name: "Kapil Ramwani",
      email: "jai@jai.com",
      phone: "9549996223",
    },
    {
      id: 5002,
      name: "Rakesh Ramesh",
      email: "jai@jai.com",
      phone: "8104726999",
    },
  ];
  return (
    <div>
      <EmployeeList employees={employees} />
      <Edit employeeList={employees} employeeId={5002} />
    </div>
  );
};

export default Dashboard;
