import { useEffect, useState } from "react";

const useEmpServices = (request: Promise<Response>) => {
  const [empData, setEmpData] = useState([]);

  useEffect(() => {
    request.then((response) =>
      response
        .json()
        .then((data) => ({
          data: data,
          status: response.status,
        }))
        .then((res) => {
          console.log(res.data);
          setEmpData(res.data);
        })
    );
  },[]);

  return empData;
};

export default useEmpServices;
