const { Pool } = require("pg");
const argv = process.argv.slice(2);

const cohortName = argv[0];

const pool = new Pool({
  user: "vagrant",
  password: "123",
  host: "localhost",
  database: "bootcampx",
});

pool
  .query(
    `
    SELECT
      teachers.name as teacher,
      cohorts.name as cohort
    FROM assistance_requests
    JOIN teachers ON teachers.id = teacher_id
    JOIN students ON students.id = student_id
    JOIN cohorts ON cohorts.id = cohort_id
    WHERE cohorts.name = '${cohortName}'
    GROUP BY teachers.name, cohorts.name
    ORDER BY teachers.name;
`
  )
  .then((res) => {
    res.rows.forEach((user) => {
      console.log(`${user.cohort}: ${user.teacher}`);
    });
  })
  .catch((err) => console.error("query error", err.stack));
