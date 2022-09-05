import React, { useEffect } from "react";
import { useState } from "react";
import useEmpServices from "../services/useEmpServices";
import swal from "sweetalert";
import useProjectServices from "../services/useProjectServices";

type Employee = {
  emp_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  pid: number;
  project_name: string;
};
type Project = {
  project_id: number;
  project_name: string;
  client_name: string;
  manager_id: number;
};
type EditProps = {
  selectedEmployee: Employee;
};

const Edit = (props: EditProps) => {
  // const selectedEmployee: Employee[] = useEmpServices(
  //   fetch(`http://localhost:3000/employee/${props.employeeId}`)
  // );
  // console.log(selectedEmployee);
  const [employee, setEmployee] = useState<Employee>(props.selectedEmployee);

  // useEffect(() => {
  //   setEmployee({
  //     emp_id: props.employeeId,
  //     first_name: selectedEmployee[0]?.first_name,
  //     last_name: selectedEmployee[0]?.last_name,
  //     email: selectedEmployee[0]?.email,
  //     phone: selectedEmployee[0]?.phone,
  //     pid: selectedEmployee[0]?.pid,
  //     project_name: selectedEmployee[0]?.project_name,
  //   });
  // }, []);
  const [patchRequestObject,setPatchRequestObject] = useState({});
  const projects: Project[] = useProjectServices(
    fetch("http://localhost:3000/project")
  );

  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmployee({
      ...employee,
      [event.target.id]: event.target.value,
    });
    setPatchRequestObject({
      ...patchRequestObject,
      [event.target.id]:event.target.value,
    })
    console.log(employee);  
    console.log(patchRequestObject);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setEmployee({
      ...employee,
      [event.target.id]: Number(event.target.value),
    });
    setPatchRequestObject({
      ...patchRequestObject,
      [event.target.id]: Number(event.target.value),
    });
    console.log(employee);
    console.log(patchRequestObject);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      let res = await fetch(
        `http://localhost:3000/employee/${props.selectedEmployee.emp_id}`,
        {
          method: "PATCH",
          body: JSON.stringify(patchRequestObject),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      
      let resJson = await res.json();
      
      if (res.status === 200) {
        swal({
          title: "Updated",
          text: resJson,
          icon: "success",
        }).then(()=> {
          window.location.href = "/";
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
        />
        <label htmlFor="phone">Phone</label>
        <input
          type="text"
          id="phone"
          placeholder="9910245896"
          value={employee.phone}
          onChange={handleChange}
        />
        <label htmlFor="project_name">Select Project</label>
        <select name="projects" id="pid" value = {employee.pid} onChange={handleSelectChange}>
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

export default Edit;
