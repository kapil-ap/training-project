import React, { useState } from "react";
import swal from "sweetalert";
import useEmpServices from "../services/useEmpServices";
type Project = {
  project_name: string;
  client_name: string;
  manager_id: number;
};
type Employee = {
  emp_id:number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  pid: number;
};

const AddProject = () => {
  const [project, setProject] = useState<Project>({
    project_name: "",
    client_name: "",
    manager_id: 0,
  });

  const managers: Employee[] = useEmpServices(
    fetch("http://localhost:3000/employee")
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // const { name, value } = event.target;

    setProject({
      ...project,
      [event.target.id]: event.target.value,
    });
    console.log(project);
  };
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    
    setProject({
      ...project,
      [event.target.id]:Number(event.target.value),
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
          {managers.length > 0 ? (
            managers.map((manager) => (
              <option key={manager.emp_id} value={manager.emp_id}>
                {manager.first_name} {manager.last_name}
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

export default AddProject;
