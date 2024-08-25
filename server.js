const inquirer = require('inquirer');

//sorce of code: UofU bootcamp, module 12, activity 23
// Import and require Pool (node-postgres)
// We'll be creating a Connection Pool. Read up on the benefits here: https://node-postgres.com/features/pooling
const { Pool } = require('pg');

// Connect to database
const pool = new Pool(
    {
      // Enter PostgreSQL username
      user: '',
      // Enter PostgreSQL password
      password: '',
      host: 'localhost',
      database: 'emptr_db'
  },
  console.log('Connected to the emptr_db database!')
  )
  
  pool.connect();

//   // Hardcoded query: DELETE FROM course_names WHERE id = 3;
// pool.query(`DELETE FROM course_names WHERE id = $1`, [3], (err, {rows}) => {
//     if (err) {
//       console.log(err);
//     }
//     console.log(rows);
//   });
  
//   // Query database
//   pool.query('SELECT * FROM course_names', function (err, {rows}) {
//     console.log(rows);
//   });
  
//   // Default response for any other request (Not Found)
//   app.use((req, res) => {
//     res.status(404).end();
//   });
  
//   app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//   });



// sorce of code: UofU bootcamp, module 09, activities 23, 28

// inquirer
//   .prompt([
//     {
//       type: "list",
//       message: "What is your favorite color?",
//       name: "color",
//       choices: ["red", "blue", "green", "yellow", "cyan", "magenta"],
//     }
//   ])
//   .then((response) =>
//     console.log(colors[response.color](`Your favorite color is ${response.color}!`))
//   );


//   .then((answers) => {
//     const htmlPageContent = generateHTML(answers);

//     fs.writeFile('index.html', htmlPageContent, (err) =>
//       err ? console.log(err) : console.log('Successfully created index.html!')
//     );
//   });