import React, { useState } from "react";
import swal from "sweetalert";
type Project = {
  project_name: string;
  client_name: string;
  manager_id: number;
};
const AddProject = () => {
  const [project, setProject] = useState<Project>({
    project_name: "",
    client_name: "",
    manager_id: 0,
  });
 
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // const { name, value } = event.target;

    setProject({
      ...project,
      [event.target.id]: event.target.value,
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

      if(res.status === 500) {
        swal({
          title:resJson,
          icon:"error",
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
        <label htmlFor="manager_id">Manager Id</label>
        <input
          type="number"
          id="manager_id"
          placeholder="1"
          value={project.manager_id}
          onChange={handleChange}
        />

        <button type="submit"> Submit </button>
      </form>
    </div>
  );
};

export default AddProject;
