const inquirer = require('inquirer');

//sorce of code: UofU bootcamp, module 12, activity 23
// Import and require Pool (node-postgres)
// create a Connection Pool, https://node-postgres.com/features/pooling
const { Pool } = require('pg');

// Connect to database
const pool = new Pool(
    {
      //PostgreSQL username
      user: 'postgres',
      //PostgreSQL password
      password: '6062086@Ua00',
      host: 'localhost',
      database: 'emptr_db',
      port: 5432
  },
  console.log('Connected to the emptr_db database!')
  );
  
  //?????
  pool.connect();

  // pool.query(`INSERT INTO departments(name)values("Customer Support")`,(err,res)=>{
  //   console.log(err,res);
  //   //?????
  //   pool.end();
  // })

  // pool.query('SELECT * FROM departments', function (err, {rows}) {
  //   console.log(rows);
  // });

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

inquirer
  .prompt([
    {
      type: "list",
      message: "What WOULD LIKE TO DO ?",
      name: "TODO",
      choices: ["view all DEPARTMENTs", "add an employee", "green", "yellow", "cyan", "magenta"],
    }
    // {
    //   type: "list",
    //   message: "What is your favorite color?",
    //   name: "DEPARTMENT",
    //   choices: ["WORKSHOP", "blue", "green", "yellow", "cyan", "magenta"],
    // }
  ])
  .then((res) =>{
    todo(res.TODO);
  }
  );

function todo (name) {
  if (name === "view all DEPARTMENTs") {
    pool.query('SELECT * FROM departments', function (err, {rows}) {
      console.log(rows);
    });
  if (name === "add an employee") {
    inquirer
  .prompt([
    {
      type: "input",
      message: "first name of employee?",
      name: "TODO",
      choices: ["view all DEPARTMENTs", "add an employee", "green", "yellow", "cyan", "magenta"],
    }
  ])

    pool.query('INSERT INTO employee(name)values("Customer Support")', function (err, {rows}) {
      
    });

  };

}


  inquirer
  .prompt([
    {
      type: 'input',
      name: 'last_name',
      message: "What's your last name",
    }
    // {
    //   type: "list",
    //   message: "What is your favorite color?",
    //   name: "DEPARTMENT",
    //   choices: ["WORKSHOP", "blue", "green", "yellow", "cyan", "magenta"],
    // }
  ])
  .then((response) =>
    console.log(colors[response.color](`Your favorite color is ${response.color}!`))
  );

  // .then((answers) => {
  //   const htmlPageContent = generateHTML(answers);

  //   fs.writeFile('index.html', htmlPageContent, (err) =>
  //     err ? console.log(err) : console.log('Successfully created index.html!')
  //   );
  // });