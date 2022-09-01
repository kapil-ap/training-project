const { response } = require("express");
var express = require("express");
const getPool = require("../public/javascripts/db");
var router = express.Router();
const pool = getPool();
router.get("/", async (req, res, next) => {
  try {
    const getProjects = await pool.query("SELECT * FROM emp_app.project;");
    res.status(200).json(getProjects.rows);
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
});

router.get("/:project_id", async (req, res, next) => {
  try {
    const project_id = req.params.project_id;
    const idArr = pool.query(
      `SELECT project_id FROM emp_app.project`,
      (err, result) => {
        if (err) {
          res.status(500).json("Unable to fetch projects");
        } else {
          result.rows.forEach((row) => {
            found = project_id === row.project_id;
          });

          if (found === false) {
            res.status(404).json("Wrong project details entered");
          }
        }
      }
    );
    const getProject = await pool.query(
      "SELECT * FROM emp_app.project WHERE project_id = $1",
      [project_id]
    );
    res.json(getProject.rows);
  } catch (error) {
    res.status(500).json("Database is not responding");
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { project_name, client_name, manager_id } = req.body;
    console.log({project_name,client_name,manager_id});
    await pool.query(
      `INSERT INTO emp_app.project (project_name,client_name,manager_id) VALUES ($1,$2,$3) RETURNING * ;`,
      [project_name, client_name, manager_id]
    );
    res.status(201).json(`Project Added Successfully`);
  } catch (error) {
    if (error.code === "23505") {
      res.status(400).json("Entered project name already exists");
    }
    if (error.code === "23503") {
      res.status(400).json("The manager entered is not present");
    }
  }
});

router.put("/:project_id", async (req, res, next) => {
  try {
    const { project_name, client_name, manager_id } = req.body;
    const project_id = req.params.project_id;
    // console.log({first_name,last_name,email,phone,pid});
    await pool.query(
      `UPDATE emp_app.project SET project_name = $1, client_name = $2 , manager_id = $3 WHERE project_id=$4;`,
      [project_name, client_name, manager_id, project_id]
    );
    res.json(`Project Completely Updated Successfully`);
  } catch (error) {
    res.json(error);
    console.error("Can`t add the project");
  }
});

router.patch("/:project_id", async (req, res, next) => {
  try {
    let property = req.body;

    let query = "UPDATE emp_app.project SET ";

    Object.entries(property).forEach(([key, value]) => {
      const valueToSet =
        typeof property[key] === "string" ? `'${value}'` : value;
      query += `${key} =${valueToSet},`;
    });

    query = query.slice(0, -1);
    query += ` WHERE project_id = ${req.params.project_id};`;
    console.log(query);
    await pool.query(query);

    res.json(
      `project with id = ${req.params.project_id} has been updated successfully`
    );
  } catch (error) {
    if (error.code === "23505") {
      res.status(400).json("Entered project name already exists");
    }
    if (error.code === "23503") {
      res.status(400).json("The manager entered is not present");
    }
  }
});

router.delete("/:project_id", async (req, res, next) => {
  try {
    let query = `DELETE FROM emp_app.project WHERE project_id = ${req.params.project_id};`;

    await pool.query(query, (err, result) => {
      if (err) {
        res.status(500).json("Unable to fetch projects");
      } else {
        result.rows.forEach((row) => {
          found = project_id === row.project_id;
        });

        if (found === false) {
          res.status(404).json("Wrong project details entered");
        }
      }
    });
    res
      .status(204)
      .json(
        `Project with id = ${req.params.project_id} has been deleted successfully`
      );
  } catch (error) {
    res.status(500).json("Database is not responding");
  }
});

module.exports = router;
