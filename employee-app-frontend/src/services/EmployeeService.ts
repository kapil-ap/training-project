type Employee = {
  id: number,
  name: string,
  email: string,
  phone: string,
  pid:number,
};
let empList:Employee[]=[];
export async function getAllEmployees() {
  try {
    const response = await fetch("http://localhost:3000/employee").then(
      (response) =>
        response
          .json()
          .then((data) => ({
            data: data,
            status: response.status,
          }))
          .then((res) => {
            empList = res.data;
            // console.log(res);
            return res;
          })
    );

    return response.data; 
  } catch (error) {
    console.log(error);
    return [];
  }
  console.log(empList);
};

export function getEmpList() {
  console.log(empList);
  return empList;
}


