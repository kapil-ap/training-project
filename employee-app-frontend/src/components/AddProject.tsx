import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import useEmpServices from "../services/useEmpServices";
type Project = {
  project_name: string;
  client_name: string;
  manager_id: number;
};
type Employee = {
  emp_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  pid: number;
  project_name: string;
  manager_id: number;
};

const AddProject = () => {
  const [project, setProject] = useState<Project>({
    project_name: "",
    client_name: "",
    manager_id: 0,
  });

  let managersAvailable = true;
  let employees: Employee[] = useEmpServices(
    fetch("http://localhost:3000/employee")
  );
  console.log("employees",employees);
  let nonManagers:Employee[] =[]; 
  const removeManagers = (employees: Employee[]) => {
    for(let i = 0 ; i<employees.length ; i++){
      if(employees[i].emp_id !== employees[i].manager_id)
      {
        nonManagers.push(employees[i]);
      }
    } 
  };
  removeManagers(employees);
  console.log("nonManagers",nonManagers);
  

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // const { name, value } = event.target;
    if(nonManagers.length < 1){
      swal({
        title: "You don't have available managers",
        icon: "error",
      }).then(() => {
        window.location.href = "/";
      });
    }
    setProject({
      ...project,
      [event.target.id]: event.target.value,
    });
    console.log(project);
  };
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if(nonManagers.length < 1){
      swal({
        title: "You don't have managers",
        icon: "error",
      }).then(() => {
        window.location.href = "/";
      });
    }
    setProject({
      ...project,
      [event.target.id]: Number(event.target.value),
    });
    console.log(project);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      let res = await fetch("http://localhost:3000/project/", {
        method: "POST",
        body: JSON.stringify(project),
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
        <label htmlFor="project_name">Project Name</label>
        <input
          type="text"
          id="project_name"
          placeholder="Fintrack"
          value={project.project_name}
          onChange={handleChange}
        />

        <label htmlFor="name">Client Name</label>
        <input
          type="text"
          id="client_name"
          placeholder="Apple Inc"
          value={project.client_name}
          onChange={handleChange}
        />

        <label htmlFor="manager_name">Select Manager</label>
        <select name="managers" id="manager_id" onChange={handleSelectChange}>
          {nonManagers.length > 0 ? (
            nonManagers.map((nonManager) => (
              <option key={nonManager.emp_id} value={nonManager.emp_id}>
                {nonManager.first_name} {nonManager.last_name}
              </option>
            ))
          ) : (
            <option>No Available Managers</option>
          )}
        </select>

        <button type="submit"> Submit </button>
      </form>
    </div>
  );
};

export default AddProject;
