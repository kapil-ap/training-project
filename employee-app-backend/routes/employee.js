const { response } = require("express");
const e = require("express");
var express = require("express");
const getPool = require("../public/javascripts/db");
var router = express.Router();

const pool = getPool();
// try{
// pool.connect((err,client,release) => {

// })}
// catch(error){

// }

router.get("/", async (req, res, next) => {
  try {
    const getEmployees = await pool.query(
      "SELECT e.emp_id, e.first_name, e.last_name, e.email, e.phone, e.pid ,p.project_name FROM emp_app.employee AS e INNER JOIN emp_app.project AS p ON e.pid = p.project_id;"
    );
    res.json(getEmployees.rows);
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
});

router.get("/:emp_id", async (req, res, next) => {
  try {
    const emp_id = req.params.emp_id;
    let found = false;
    const idArr = pool.query(
      `SELECT emp_id FROM emp_app.employee`,
      (err, result) => {
        if (err) {
          res.status(500).json("Unable to fetch employees");
        } else {
          result.rows.forEach((row) => {
            if (emp_id === row.emp_id.toString()) {
              found = emp_id === row.emp_id.toString();
            }
          });

          if (found === false) {
            res.status(404).json("Wrong employee details entered");
          }
        }
      }
    );
    const getEmployee = await pool.query(
      "SELECT e.emp_id, e.first_name, e.last_name, e.email, e.phone, e.pid ,p.project_name FROM emp_app.employee AS e INNER JOIN emp_app.project AS p ON e.pid = p.project_id WHERE e.emp_id = $1",
      [emp_id]
    );

    res.status(200).json(getEmployee.rows);
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { first_name, last_name, email, phone, pid } = req.body;
  
    
    await pool.query(
      `INSERT INTO emp_app.employee (first_name,last_name,email,phone,pid) VALUES ($1,$2,$3,$4,$5) RETURNING * ;`,
      [first_name, last_name, email, phone, pid]
    );
    res.status(201).json(`Employee Added Successfully`);
  } catch (error) {
    if (error.code === "23505") {
      if (error.constraint === "employee_phone_key")
        res.status(400).json("Entered Phone Number Already Exists");
      else {
        res.status(400).json("Entered Email already exists");
      }
    } else if (error.code === "23503") {
      res.status(400).json("The project id entered is not present");
    } else {
      console.log(error);
      res.status(400).json(error);
    }
  }
});

router.put("/:emp_id", async (req, res, next) => {
  try {
    const { first_name, last_name, email, phone, pid } = req.body;
    const emp_id = req.params.emp_id;
    console.log({first_name,last_name,email,phone,pid});
    await pool.query(
      `UPDATE emp_app.employee SET first_name=$1, last_name=$2, email=$3, phone=$4, pid=$5 WHERE emp_id=$6;`,
      [first_name, last_name, email, phone, pid, emp_id]
    );
    res.json(`Project Completely Updated Successfully`);
  } catch (error) {
    res.json(error);
    console.error("Can`t add the employee");
  }
});

router.patch("/:emp_id", async (req, res, next) => {
  try {
    let property = req.body;

    let query = "UPDATE emp_app.employee SET ";

    Object.entries(property).forEach(([key, value]) => {
      const valueToSet =
        typeof property[key] === "string" ? `'${value}'` : value;
      query += `${key} =${valueToSet},`;
    });

    query = query.slice(0, -1);
    query += ` WHERE emp_id = ${req.params.emp_id};`;
    console.log(query);
    await pool.query(query);

    res.json(
      `Employee with id = ${req.params.emp_id} has been updated successfully`
    );
  } catch (error) {
    if (error.code === "23505") {
      if (error.constraint === "employee_phone_key")
        res.status(400).json("Entered Phone Number Already Exists");
      else {
        res.status(400).json("Entered Email already exists");
      }
    }
    if (error.code === "23503") {
      res.status(400).json("The project id entered is not present");
    }
  }
});

router.delete("/:emp_id", async (req, res, next) => {
  try {
    let query = `DELETE FROM emp_app.employee WHERE emp_id = ${req.params.emp_id};`;
    let emp_found = false;
    await pool.query(query, (err, result) => {
      if (err) {
        res.status(500).json("Unable to reach the database");
      } else {
        result.rows.forEach((row) => {
          emp_found = emp_id === row.emp_id;
        });

        if (emp_found === false) {
          res.status(404).json("Wrong employee details entered");
        }
      }
    });
    res.json(
      `Employee with id = ${req.params.emp_id} has been deleted successfully`
    );
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
