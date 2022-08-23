import React, { useState } from "react";

type Project = {
  name: string;
  deadline: string;
  clientName: string;
};
const AddProject = () => {
  const [project, setProject] = useState<Project>({
    name: "",
    deadline: "",
    clientName: "",
  });
  const [projectList, setProjectList] = useState<Project[]>([]);
  console.log(projectList);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // const { name, value } = event.target;

    setProject({
      ...project,
      [event.target.id]: event.target.value,
    });
    console.log(project);
  };


  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setProjectList((projectList) => [...projectList, project]);

    
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          placeholder="Fintrack"
          value={project.name}
          onChange={handleChange}
        />
        <label htmlFor="email">Deadline</label>
        <input
          type="date"
          id="deadline"
          placeholder="01-01-2001"
          value={project.deadline}
          onChange={handleChange}
        />

        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="clientName"
          placeholder="Apple Inc"
          value={project.clientName}
          onChange={handleChange}
        />

        <button type="submit"> Submit </button>
      </form>
    </div>
  );
};

export default AddProject;
