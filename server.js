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
  
  //connect to db
  pool.connect();

  inquirer
  .prompt([
    {
      type: "list",
      message: "Choose what you would like to do:",
      name: "TODO",
      choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role"],
    }
  ])
  .then((res) =>{

    console.log(res);
    console.log(res.TODO);

    actionTODO(res.TODO);

  function actionTODO (data) {

    console.log(`user have made a choice! It is ${data}. A code is needed to act based on the user choice`);

    // if (name === "view all departments") {
    //   pool.query('SELECT * FROM department', 
    //               function (err, {rows}) {
    //                 console.log(rows);
    //               }
    //   );
    // };

    // if (name === "view all roles") {
    //   pool.query('SELECT * FROM role', 
    //               function (err, {rows}) {
    //                 console.log(rows);
    //               }
    //   );
    // };

    // if (name === "view all employees") {
    //   pool.query('SELECT * FROM employee', 
    //               function (err, {rows}) {
    //                 console.log(rows);
    //               }
    //   );
    // };

    // if (name === "add a department") {
      
    //   inquirer
    //   .prompt([
    //     {
    //       type: "input",
    //       depName: "departmentName",
    //       message: "What is the name of a new Department?",
    //     }
    //   ])
    //   .then((res) =>{

    //     console.log(`A new Department is ${res.departmentName}`);

    //     pool.query('INSERT INTO department(name)values(res.departmentName)', 
    //                 function (err, {rows}) {
    //                   console.log(rows);
    //                   pool.end();
    //                 }
    //     );
        
    //   });
    
    // };

    // if (name === "add a role") {

    //   // 1. TODO get Department Names to add them to promt below:

    //   // 2. get user input (user data) about a new role:
    //   inquirer
    //   .prompt([
    //     {
    //       type: "input",
    //       rTitle: "roleTitle",
    //       message: "What is the title of a role?",
    //     },
    //     {
    //       type: "input",
    //       rSalary: "roleSalary",
    //       message: "What is the salary for the role?",
    //     },
    //     {
    //       type: 'list',
    //       rDep: 'roleDepartment',
    //       message: 'Chose the Department you would like to assign this role to:',
    //       choices: ['Workshop', 'Human Resources', 'IT', 'Office', 'Security', 'Medical'],
    //       // filter(val) {
    //       //   return val.toLowerCase();
    //       // },
    //     }
    //   ])
    //   .then((res) =>{

    //     console.log(`A new Role is ${res.roleTitle}`);
    //     console.log(`A new Role Salary is ${res.roleTitle}`);
    //     console.log(`A new Role Department is ${res.roleDepartment}`);

    //     // 3. get a department_id based on res.roleDepartment:
    //     roleDepartment_id = 
        
    //     // 4. add a new role to the role-table to our db:
    //     pool.query('INSERT INTO role(title, salary, department_id)values(res.roleTitle, res.roleSalary, roleDepartment_id)', 
    //                 function (err, {rows}) {
    //                   console.log(rows);
    //                   pool.end();
    //                 }
    //     );
        
    //   });
    // };

    // if (name === "add an employee") {

    //   // 1. TODO get Role Titles to add them to promt below:

    //   // 2. TODO get Manager Titles to add them to promt below:

    //   // 3. get user input (user data) about a new employee:
    //   inquirer
    //   .prompt([
    //     {
    //       type: "input",
    //       eFirstName: "employeeFirstName",
    //       message: "What is the First Name of a new employee?",
    //     },
    //     {
    //       type: "input",
    //       eLastName: "employeeLastName",
    //       message: "What is the Last Name of a new employee?",
    //     },
    //     {
    //       type: 'list',
    //       eRole: 'employeeRole',
    //       message: 'Choose the Role for a new employee:',
    //       choices: ['operator', 'mechanic', 'Line Lead', 'Coach', 'HR Officer', 'IT Specialist', 'Cafeteria Officer', 'Chief', 'Office Manager', 'Senior Office Manager', 'Security Officer', 'Senior Security Officer', 'Nurse'],
    //       // filter(val) {
    //       //   return val.toLowerCase();
    //       // },
    //     },
    //     {
    //       type: 'list',
    //       eManager: 'employeeManager',
    //       message: 'Choose a manager for a new employee:',
    //       choices: ['Line Lead', 'Coach', 'Chief', 'Senior Office Manager', 'Senior Security Officer', 'None'],
    //       // filter(val) {
    //       //   return val.toLowerCase();
    //       // },
    //     }
    //   ])
    //   .then((res) =>{

    //     // console.log(`A new Role is ${res.roleTitle}`);
    //     // console.log(`A new Role Salary is ${res.roleTitle}`);
    //     // console.log(`A new Role Department is ${res.roleDepartment}`);

    //     // 4. get a role_id based on res.employeeRole:
    //     employeeRole_id = 1;

    //     // 5. get a manager_id based on res.employeeManager:
    //     employeeManager_id = 0;

    //     // 6. add a new employee to the employee-table to our db:
    //     pool.query('INSERT INTO role(first_name, last_name, role_id, manager_id)values(res.employeeFirstName, res.employeeLastName, employeeRole_id, employeeManager_id)', 
    //                 function (err, {rows}) {
    //                   console.log(rows);
    //                   pool.end();
    //                 }
    //     );
        
    //   });

    // };

    // if (name === "update an employee role") {
    //   pool.query('SELECT * FROM employee', 
    //               function (err, {rows}) {
    //                 console.log(`code is needed to update this table:`);
    //                 console.log(rows);
    //               }
    //   );
    // };
  
  };

}
);


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






  // inquirer
  // .prompt([
  //   {
  //     type: 'input',
  //     name: 'last_name',
  //     message: "What's your last name",
  //   }
  //   // {
  //   //   type: "list",
  //   //   message: "What is your favorite color?",
  //   //   name: "DEPARTMENT",
  //   //   choices: ["WORKSHOP", "blue", "green", "yellow", "cyan", "magenta"],
  //   // }
  // ])
  // .then((response) =>
  //   console.log(colors[response.color](`Your favorite color is ${response.color}!`))
  // );

  // // .then((answers) => {
  // //   const htmlPageContent = generateHTML(answers);

  // //   fs.writeFile('index.html', htmlPageContent, (err) =>
  // //     err ? console.log(err) : console.log('Successfully created index.html!')
  // //   );
  // // });


  // source of code: https://www.youtube.com/watch?v=yguFIUQPFO4&list=LL&index=1