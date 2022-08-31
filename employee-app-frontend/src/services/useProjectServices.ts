import { useEffect, useState } from "react";

type Project = {
    project_id : number;
    project_name: string;
    client_name:string;
    manager_id:number;
}
const useProjectServices = (request: Promise<Response>) => {
  const [projectData, setProjectData] = useState<Project[]>([]);

  useEffect(() => {
    request.then((response) =>
      response
        .json()
        .then((data) => ({
          data: data,
          status: response.status,
        }))
        .then((res) => {
          setProjectData(res.data);
        })
    );
  },[]);

  return projectData;
};

export default useProjectServices;