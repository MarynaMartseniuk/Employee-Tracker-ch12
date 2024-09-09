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

// pool.query('ALTER TABLE employee ADD Manager _First_Name VARCHAR(30) NOT NULL',
//   function (err, { rows }) {

// });

// pool.query('ALTER TABLE employee ADD Manager _Last_Name VARCHAR(30) NOT NULL',
//   function (err, { rows }) {
    
// });

console.log(`.-----------------------------------------------------.`);
console.log(`|    _____                 _                          |`);
console.log(`|   | ____|_ __ ___  _ __ | | ___  _   _  ___  ___    |`);
console.log(`|   |  _| | '_ ' _  | '_  | |/ _  | | | |/ _  / _     |`);
console.log(`|   | |___| | | | | | |_) | | (_) | |_| |  __/  __/   |`);
console.log(`|   |_____|_| |_| |_| .__/|_| ___/  ___,| ___| ___|   |`);
console.log(`|                   |_|            |___/              |`);
console.log(`|    __  __                                           |`);
console.log(`|   |   /  | __ _ _ __   __ _  __ _  ___ _ __         |`);
console.log(`|   | | /| |/ _' | '_   / _' |/ _' |/ _   '__|        |`);
console.log(`|   | |  | | (_| | | | | (_| | (_| |  __/ |           |`);
console.log(`|   |_|  |_| __,_|_| |_| __,_| ___,| ___|_|           |`);
console.log(`|                             |___/                   |`);
console.log(`.-----------------------------------------------------.`);

function init() {
  console.log('======================================================');
  console.log('=                 Employee    Tracker                =');
  console.log('======================================================');
  inquirer
    .prompt([
      {
        type: "list",
        message: "Choose what you would like to do:",
        name: "TODO",
        choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role", "view employee&manager", "Quit the App"],
      }
    ])
    .then((res) => {

      // console.log(res);
      // console.log(res.TODO);

      actionTODO(res.TODO);

      function actionTODO(data) {

        // console.log(`you have chosen to ${data}. `);

        //+++++++++++++++++++++++++++++++++++++++++
        //view all departments
        function viewAllDep() {
          pool.query('SELECT department.name AS Department_name, department.id AS Department_ID FROM department',
            function (err, { rows }) {

              // console.log(`${rows[i].id}`);

              console.log(`Information about ALL DEPARTMENTS:`);
              console.table(rows);

              // set to execute init() with 0.5sec later after updated ALL DEPARTMENTS table has been displayed.
              setTimeout(() => {
                init();
              }, 500);
            });

        };
        //+++++++++++++++++++++++++++++++++++++++++

        //WWWWWWWWWWWWWWWWWWWWWWWWWWWWWW
        if (data === "view all departments") {

          viewAllDep();

          // pool.query('CREATE VIEW [All Departments] SELECT department.name AS Department_name, department.id AS Department_ID FROM department', 
          //   //function (err, {rows}) {
          //   function (err, data) {

          //     // console.log(`${rows[i].id}`);

          //     // console.log(`Information about ALL DEPARTMENTS:`);
          //     // console.table(rows);

          //     // set to execute init() with 0.5sec later after updated ALL DEPARTMENTS table has been displayed.
          //     setTimeout(() => {
          //       init();
          //     }
          //     , 500);
          //   });   

        };

        //WWWWWWWWWWWWWWWWWWWWWWWWWWWWWW
        if (data === "view all roles") {
          pool.query('SELECT role.title AS Job_Title, role.id AS Role_ID, department.name AS Department, role.salary AS Salary FROM role LEFT JOIN department ON role.department_id = department.id',
            function (err, { rows }) {

              //console.log(rows);
              // console.log(`${rows[i].id}`);
              console.log(`Information about Managers:`);
              console.table(rows);
              init();

            }
          );
        };

        //WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW
        if (data === "view all employees") {

          // pool.query('SELECT employee.id AS Employee_ID, employee.first_name AS First_Name, employee.last_name AS Last_Name, role.title AS Jobe_Title, department.name AS Department, role.salary AS Salary, employee.manager_id AS Manager_ID FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id',
          pool.query('SELECT  e.id AS Employee_ID, e.first_name AS first_name, e.last_name AS last_name,  role.title AS Jobe_Title, department.name AS Department, role.salary AS Salary, m.first_name AS manager_first_name, m.last_name AS manager_last_name FROM  employee e LEFT JOIN employee m ON e.manager_id = m.id LEFT JOIN role ON e.role_id = role.id LEFT JOIN department ON role.department_id = department.id',
            function (err, { rows }) {
              console.log(`Information about ALL EMPLOYEES:`);
              console.table(rows);
              init();
            }
          );
        };

        // //WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW   DELETE THIS OPTION FROM QUESTIONARY!!!!!!!!!!!!
        // if (data === "view employee&manager") {
          
        // // source of code: chat GPT
        // // pool.query('SELECT employee.id AS Employee_ID, employee.first_name AS First_Name, employee.last_name AS Last_Name, employee.first_name AS First_Name, employee.last_name AS Last_Name FROM employee LEFT JOIN ??<employee>?? ON employee.manager_id = employee.id',
        // pool.query('SELECT e.first_name AS employee_first_name, e.last_name AS employee_last_name, m.first_name AS manager_first_name, m.last_name AS manager_last_name FROM  employee e LEFT JOIN employee m ON e.manager_id = m.id;',
        //     function (err, { rows }) {
        //       console.log(`Information about ALL EMPLOYEES:`);
        //       console.table(rows);
        //       init();
        //     }
        //   );
        // };

        //WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW
        if (data === "add a department") {

          console.log(`Please, unswer folloing questions to add a new department:`);
          inquirer
            .prompt([
              {
                type: "input",
                name: "departmentName",
                message: "What is the name of a new Department?",
              }
            ])
            .then((res) => {
              console.log(`A new Department is => ${res.departmentName}`);
              pool.query('INSERT INTO department (name) VALUES ($1)', [res.departmentName],
                function (err, { rows }) {
                  viewAllDep();
                }
              );
            });

        };

        //WWWWWWWWWWWWWWWWWWWWWWWWWW
        if (data === "add a role") {

          // console.log(`code for "add a role" is comming soon. It is under developing now.`);

          var options = 0;

          pool.query('SELECT department.name AS Department_name, department.id AS Department_ID FROM department',
            function (err, { rows }) {

              // console.log(`${rows[i].id}`);

              // console.log(`Information about ALL DEPARTMENTS you need to add a New Role:`);
              // console.table(rows);

              options = rows;
              //console.log(options);
              inquirer
                .prompt([
                  {
                    type: "input",
                    name: "roleTitle",
                    message: "What is the title of a role?",
                  },
                  {
                    type: "input",
                    name: "roleSalary",
                    message: "What is the salary for the role?",
                  },

                  {
                    type: 'list',
                    name: 'roleDepartment',
                    message: 'What is the department name?',
                    //choices: options.map(({department_name}) => department_name),
                    choices: options.map((option) => {return {name: option.department_name, value: option.department_id}}),
                  }
                ])
                .then((res) => {

                  // console.log(`A new Role is ${res.roleTitle}`);
                  // console.log(`A new Role Salary is ${res.roleSalary}`);
                  // console.log(`A new Role Department is ${res.roleDepartment}`);

                  // const id = options.filter(({department_name}) => {
                  //   if (department_name === res.roleDepartment) {
                  //     return department_id; 
                  //   }
                  // });

                  // add a new role to the role-table to the db:
                  pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [res.roleTitle, res.roleSalary, res.roleDepartment],
                    //function (err, {rows}) {
                    function (err, data) {
                      //console.table(rows);
                      console.log('A new role has been added! Check "view all roles!"');
                      init();
                    }
                  );

                });
            });
          
        };

        //WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW
        if (data === "add an employee") {

          // console.log(`code for "add a employee" is comming soon. It is under developing now.`);
          
          //===================================START ONE================================
          var options = 0;

          pool.query('SELECT role_title AS employee_role, role.id AS role_id FROM role',
            function (err, { rows }) {

              // console.log(`${rows[i].id}`);

              // console.log(`Information about ALL DEPARTMENTS you need to add a New Role:`);
              // console.table(rows);

              options = rows;
              //console.log(options);
              inquirer
                .prompt([
                  {
                    type: "input",
                    name: "employeeFirstName",
                    message: "What is the First Name of a new employee?",
                  },
                  {
                    type: "input",
                    name: "employeeLastName",
                    message: "What is the Last Name of a new employee?",
                  },

                  {
                    type: 'list',
                    name: 'employeeRole',
                    message: 'Choose the role?',
                    choices: options.map(({employee_role}) => employee_role),
                  }
                ])
                .then((res) => {

                  console.log(`A new Role is ${res.roleTitle}`);
                  console.log(`A new Role Salary is ${res.roleSalary}`);
                  console.log(`A new Role Department is ${res.employee_role}`);
                  const id = options.filter(({employee_role}) => employee_role === res.employee_role).role_id;
                  // add a new employee to the employee to the db:
                  // pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [res.roleTitle, res.roleSalary, id],
                  //   //function (err, {rows}) {
                  //   function (err, data) {
                  //     //console.table(rows);
                  //     console.log('A new role has been added! Check "view all roles!"');
                  //     init();
                  //   }
                  // );

                });
            });
            //==============================END ONE===============================



          //=============================START TWO================================
          //   // 1. TODO display Role Titles so user can choose one:

          //   // 2. TODO display Manager first&last names  so user can choose one:

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

          //     // TODO get a role_id based on res.employeeRole:
          //     employeeRole_id = 1;

          //     // TODO get a manager_id based on res.employeeManager:
          //     employeeManager_id = 0;

          //     // TODO add a new employee to the employee-table to our db:
          //     pool.query('INSERT INTO role(first_name, last_name, role_id, manager_id)values(res.employeeFirstName, res.employeeLastName, employeeRole_id, employeeManager_id)', 
          //                 function (err, {rows}) {
          //                   console.log(rows);
          //                   pool.end();
          //                 }
          //     );

          //   });
          //==============================END TWO===================================

          init();
        };

        //WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW
        if (data === "update an employee role") {

          console.log(`code for "update an employee role" is comming soon. It is under developing now.`);

          // pool.query('SELECT * FROM role', 
          //             function (err, {rows}) {
          //               console.log(`code is needed to update this table:`);
          //               console.log(rows);
          //             }
          // );
          init();
        };

        //WWWWWWWWWWWWWWWWWWWWWWWWWW
        if (data === "Quit the App") {
          console.log(`Have a good rest of your day!`);
          console.log('Run "node server.js" to start this App again.');
          console.log('======================================================');
          console.log('=        Employee    Tracker   is   closed           =');
          console.log('======================================================');
          pool.end();
          process.exit();
        };

        // end of function TODO();    
      };

    });

  // end of function init();
};

init();


// source of code: https://www.youtube.com/watch?v=yguFIUQPFO4&list=LL&index=1