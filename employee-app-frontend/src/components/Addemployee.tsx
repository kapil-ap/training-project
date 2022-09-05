import React, { useState } from "react";
import swal from "sweetalert";
import useProjectServices from "../services/useProjectServices";
import validator from 'validator';
import { validateLocaleAndSetLanguage } from "typescript";
type Employee = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  pid: number;
};

type Project = {
  project_id: number;
  project_name: string;
  client_name: string;
  manager_id: number;
};

const Addemployee = () => {
 

  const [employee, setEmployee] = useState<Employee>({
    first_name:'',
    last_name: '',
    email: "",
    phone: "",
    pid:0,
  });
  console.log(employee);
  const projects: Project[] = useProjectServices(
    fetch("http://localhost:3000/project")
  );
  console.log(projects);
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // const { name, value } = event.target;

    setEmployee({
      ...employee,
      [event.target.id]: event.target.value,
    });
    console.log(employee);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    
    setEmployee({
      ...employee,
      [event.target.id]:Number(event.target.value),
    });
    console.log(employee);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if(!validator.isEmail(employee.email)){
      swal({
        title: "Entered Email is not correct",
        icon: "error",
      });
      return;
    }
    if(!(employee.phone.length === 10)){
      swal({
        title: "Entered phone number is not correct",
        icon: "error",
      });
      return;
    }
    try {
      let res = await fetch("http://localhost:3000/employee/", {
        method: "POST",
        body: JSON.stringify(employee),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      let resJson = await res.json();
      if (res.status === 201) {
        swal({
          title: "Created",
          text: resJson,
          icon: "success",
        }).then(()=>{
          setEmployee({
            first_name:'',
            last_name: '',
            email: "",
            phone: "",
            pid:0,
          })
        });
      }

      if (res.status === 400) {
        swal({
          title: resJson,
          icon: "error",
        });
      }

      if (res.status === 500) {
        swal({
          title: resJson,
          icon: "error",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">First Name</label>
        <input
          type="text"
          id="first_name"
          placeholder="First Name"
          value={employee.first_name}
          onChange={handleChange}
        />
        <label htmlFor="name">Last Name</label>
        <input
          type="text"
          id="last_name"
          placeholder="Last Name"
          value={employee.last_name}
          onChange={handleChange}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="example@example.com"
          value={employee.email}
          onChange={handleChange}
          className={validator.isEmail(employee.email) ? "is-success" : 'has-error'}
        />
        <label htmlFor="phone">Phone</label>
        <input
          type="text"
          id="phone"
          placeholder="10-Digit Number"
          value={employee.phone}
          onChange={handleChange}
          className = {(employee.phone.length === 10) ? 'is-success' : 'has-error' }
        />
        <label htmlFor="project_name">Select Project</label>
        <select name="projects" id="pid" onChange={handleSelectChange}>
          {projects.length > 0 ? (
            projects.map((project) => (
              <option key={project.project_id} value={project.project_id}>
                
                {project.project_name}
              </option>
            ))
          ) : (
            <option>No Project</option>
          )}
        </select>

        <button type="submit"> Submit </button>
      </form>
    </div>
  );
};

export default Addemployee;
