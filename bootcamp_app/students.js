const { Pool } = require("pg");
const argv = process.argv.slice(2);

const cohortName = argv[0];
const maxResults = argv[1];

const pool = new Pool({
  user: "vagrant",
  password: "123",
  host: "localhost",
  database: "bootcampx",
});

pool
  .query(
    `
SELECT students.id, students.name as student, cohorts.name as cohort
FROM students
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name LIKE '%${cohortName}%'
LIMIT ${maxResults};
`
  )
  .then((res) => {
    res.rows.forEach((user) => {
      console.log(
        `${user.student} has an id of ${user.id} and was in the ${user.cohort} cohort`
      );
    });
  })
  .catch((err) => console.error("query error", err.stack));
