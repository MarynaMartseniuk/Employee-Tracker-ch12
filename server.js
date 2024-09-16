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
        choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role", "update an role", "Quit the App"],
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
              console.log(`Information about ALL ROLES:`);
              console.table(rows);
              init();

            }
          );
        };

        //WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW
        if (data === "view all employees") {
          pool.query('SELECT  e.id AS Employee_ID, e.first_name AS first_name, e.last_name AS last_name,  role.title AS Jobe_Title, department.name AS Department, role.salary AS Salary, m.first_name AS manager_first_name, m.last_name AS manager_last_name FROM  employee e LEFT JOIN employee m ON e.manager_id = m.id LEFT JOIN role ON e.role_id = role.id LEFT JOIN department ON role.department_id = department.id',
            function (err, { rows }) {
              console.log(`Information about ALL EMPLOYEES:`);
              console.table(rows);
              init();
            }
          );
        };

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
                    choices: options.map((option) => {return {name: option.department_name, value: option.department_id}}),
                  }
                ])
                .then((res) => {

                  // console.log(`A new Role is ${res.roleTitle}`);
                  // console.log(`A new Role Salary is ${res.roleSalary}`);
                  // console.log(`A new Role Department is ${res.roleDepartment}`);

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

          var options = 0;
          var managerData = 0;

          pool.query('SELECT  employee.id AS employee_id, employee.first_name AS employee_firstname, employee.last_name AS employee_lastname FROM employee',
            function (err,  {rows} ) {
              
                  let managerData =  rows;
                  console.log(managerData);
                  
                  pool.query('SELECT  role.id AS role_id, role.title AS Jobe_Title FROM role',
                    function (err, { rows }) {
        
                            console.log(` second: ${managerData}`);
                            let options = rows;
                            console.log(options);
                            
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
                                  choices: options.map((option) => {return {name: option.jobe_title, value: option.role_id}}),
                                },
                                {
                                  type: "list",
                                  name: "managerLastName",
                                  message: "What is the manager Last Name for this new employee?",
                                  choices: managerData.map((manager) => {return {name: manager.employee_lastname, value: manager.employee_id}}),
                                },
                                // {
                                //   type: "input",
                                //   name: "managerLastNameInput",
                                //   message: "What is the Last Name of the manager for a new employee?",
                                // }
                              ])
                              .then((res) => {
              
                                // console.log(`A new employee First Name is ${res.employeeFirstName}`);
                                // console.log(`A new employee First Name is ${res.employeeLastName}`);
                                // console.log(`A new employee Role ID is ${res.employeeRole}`);
                                // console.log(`A new employee Manager ID is ${res.managerLastName}`);
                                
                                // pool.query('SELECT employee.id FROM employee WHERE res.managerLastNameInput=employee.last_name', function (err, data) {
                                //   console.log(`the result of query for ID is down`);
                                //   console.log(data);
                                //   console.log(`the result of query for ID is up`);
                                // })
              
                                // console.log(`HI!!!!!`);
              
                                // add a new employee to the employee to the db:
                                pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [res.employeeFirstName, res.employeeLastName, res.employeeRole, res.managerLastName],
                                  function (err, data) {
                                    console.log('A new employee has been added! Check "view all employee!"');
                                    init();
                                  }
                                );
                        });
                    });
            });
          // pool.query('SELECT  role.id AS role_id, role.title AS Jobe_Title FROM role',
          //   function (err, { rows }) {


          //     options = rows;
          //     console.log(options);
          //     inquirer
          //       .prompt([
          //         {
          //           type: "input",
          //           name: "employeeFirstName",
          //           message: "What is the First Name of a new employee?",
          //         },
          //         {
          //           type: "input",
          //           name: "employeeLastName",
          //           message: "What is the Last Name of a new employee?",
          //         },
          //         {
          //           type: 'list',
          //           name: 'employeeRole',
          //           message: 'Choose the role?',
          //           choices: options.map((option) => {return {name: option.jobe_title, value: option.role_id}}),
          //         },
          //         // {
          //         //   type: "list",
          //         //   name: "managerLastName",
          //         //   message: "What is the manager Last Name for this new employee?",
          //         //   choices: options.map((option) => {return {name: option.manager_last_name, value: option.manager_id}}),
          //         // },
          //         {
          //           type: "input",
          //           name: "managerLastNameInput",
          //           message: "What is the Last Name of the manager for a new employee?",
          //         }
          //       ])
          //       .then((res) => {

          //         // console.log(`A new employee First Name is ${res.employeeFirstName}`);
          //         // console.log(`A new employee First Name is ${res.employeeLastName}`);
          //         // console.log(`A new employee Role ID is ${res.employeeRole}`);
          //         // console.log(`A new employee Manager ID is ${res.managerLastName}`);
                  
          //         // pool.query('SELECT employee.id FROM employee WHERE res.managerLastNameInput=employee.last_name', function (err, data) {
          //         //   console.log(`the result of query for ID is down`);
          //         //   console.log(data);
          //         //   console.log(`the result of query for ID is up`);
          //         // })

          //         // console.log(`HI!!!!!`);

          //         // add a new employee to the employee to the db:
          //         pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [res.employeeFirstName, res.employeeLastName, res.employeeRole, res.managerLastName],
          //           function (err, data) {
          //             console.log('A new employee has been added! Check "view all employee!"');
          //             init();
          //           }
          //         );
          //       });
          //   });
        };

        //WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW
        if (data === "update an employee role") {

          var options = 0;
          var allRoles = 0;

          //Step1 => Choose an employee from the all employees you want to update a role for. Then data (Employee ID, FirstName, Last Name, current Role, current Role Id), that user have chosen will be stored in a var 'employeeToUpdate'.

          //pool.query('SELECT employee.id AS employee-id, employee.last_name AS employee-lastname, employee.first_name AS employee-firstname FROM employee',

          // pool.query('SELECT role.title AS role-title, role.id AS role-id, employee.id AS employee-id, employee.last_name AS employee-lastname, employee.first_name AS employee-firstname FROM employee LEFT JOIN role ON employee.role_id = role.id',

          pool.query('SELECT  e.id AS employee_id, e.first_name AS first_name, e.last_name AS last_name,  e.role_id AS jobe_id, role.title AS jobe_title, department.name AS department, role.salary AS salary, m.first_name AS manager_first_name, m.last_name AS manager_last_name FROM  employee e LEFT JOIN employee m ON e.manager_id = m.id LEFT JOIN role ON e.role_id = role.id LEFT JOIN department ON role.department_id = department.id',
            function (err, { rows }) {

              // console.log(`${rows[i].id}`);
              // console.log(`Information about ALL DEPARTMENTS you need to add a New Role:`);
              // console.table(rows);

              options = rows;
              console.log(options);
              inquirer
                .prompt([

                  {
                    type: 'list',
                    name: 'employeeToUpdate',
                    message: 'Choose employee Last Name you would like to update role for:',
                    choices: options.map((option) => 
                      {return {
                              name: option.last_name, 
                              value: [option.employee_id, option.last_name, option.first_name, option.jobe_title, option.jobe_id]
                            }
                      }),
                  }
                ])
                .then((res) => {

                  //Step2 => Choose a new role for the employee from all roles. An update role (role ID and role title), that user have chosen will be stored in a var 'updatedEmployeeRole'. 
                  // user have an option do not make any changes and leave a default value

                  console.log(res.employeeToUpdate);
                  console.log(`To update a role you have selected  ${res.employeeToUpdate[2]} ${res.employeeToUpdate[1]}.`);
                  console.log(`Let's do a role uptade!`);

                  pool.query('SELECT role.id AS role_id, role.title AS role_title FROM role',
                    function (err,  { rows } ) {
                      // console.log(`${rows[i].role-title}`);
                      // console.table(rows);
        
                      allRoles = rows;
                      console.log(allRoles);
                      inquirer
                        .prompt([
                          {
                            type: 'list',
                            name: 'updatedEmployeeRole',
                            message: `Choose a new role for ${res.employeeToUpdate[2]} ${res.employeeToUpdate[1]}}`,
                            choices: allRoles.map((oneRole) => 
                              {return {name: oneRole.role_title, value: [oneRole.role_id, oneRole.role_title]}
                              }),
                            default() {
                              return {
                                name: res.employeeToUpdate[3], 
                                value: [res.employeeToUpdate[4], res.employeeToUpdate[3]]
                              }
                            }
                          }
                        ])
                        .then((updatedRes) => {

                          //Step3 => update in the emplyee table a role colunm for the employee with the id user chose in step1 (employee id is stored in a "res.roleToUpdate[0]"). 

                          console.log(`Data for upcoming updates:`);
                          console.log(`1. the ID of the employee is ${res.employeeToUpdate[0]}`);
                          console.log(`2. the Name of the employee is ${res.employeeToUpdate[2]} ${res.employeeToUpdate[1]}`);
                          console.log(`3. a new role ID is ${updatedRes.updatedEmployeeRole[0]}`);
                          console.log(`4. a new role is ${updatedRes.updatedEmployeeRole[1]}`);
        
                          // add a new role to the role-table to the db:
                           pool.query('UPDATE employee SET role_id = $1 WHERE id = $2', [ updatedRes.updatedEmployeeRole[0], res.employeeToUpdate[0]],
                          //pool.query(`UPDATE employee SET role_id = ${updatedRes.updatedEmployeeRole[1]} WHERE id = ${res.employeeToUpdate[0]}`, 
                            //function (err, {rows}) {
                            function (err, data) {
                              //console.table(rows);
                              //console.log(`The ${res.employeeToUpdate[3]} for ${res.employeeToUpdate[2]} ${res.employeeToUpdate[1]}  has been updated to ${updatedRes.updatedEmployeeRole[1]}! Check "view all roles!"`);
                              init();
                            }
                          );
                        });
                  });
                });
            });
        };
         
        //WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW
        if (data === "update an role") {
          
          console.log(`code for "update an role" is not fully done, it is under debugging. User input to update the role table is taken by the code correctly (as console.log shows on lines 517-521). But the database role table is not updaed with this new data.`);

          var options = 0;
          var allDepartments = 0;

          // pool.query('SELECT department.name AS Department_name, department.id AS Department_ID FROM department',
          pool.query('SELECT role.title AS job_title, role.id AS role_id, department.name AS department, department.id AS departmentid, role.salary AS salary FROM role LEFT JOIN department ON role.department_id = department.id',
            function (err, { rows }) {

              // console.log(`${rows[i].id}`);
              // console.log(`Information about ALL DEPARTMENTS you need to add a New Role:`);
              // console.table(rows);

              options = rows;
              //console.log(options);

              //get the role_id that we will update
              inquirer
                .prompt([
                  {
                    type: 'list',
                    name: 'roleToUpdate',
                    message: 'Choose the role you would like to update:',
                    choices: options.map((option) => 
                      {return {name: option.job_title, 
                              value: [option.role_id, option.job_title, option.salary, option.department, option.departmentid]
                              }
                      }),
                  }
                ])
                .then((res) => {

                  console.log(`A role_id to update is ${res.roleToUpdate[0]}`);

                  // get the new data for the role. If user do not want to change something then the current value will be saved by default() option.
                  pool.query('SELECT department.name AS Department_name, department.id AS Department_ID FROM department',
                    function (err, { rows }) {
        
                      // console.log(`${rows[i].id}`);
                      // console.log(`Information about ALL DEPARTMENTS you need to add a New Role:`);
                      // console.table(rows);
        
                      allDepartments = rows;
                      //console.log(options);
                      inquirer
                        .prompt([
                          {
                            type: "input",
                            name: "updatedRoleTitle",
                            message: "Type in the updated title of the role:",
                            default() {
                              return res.roleToUpdate[1];
                            },
                          },
                          {
                            type: "input",
                            name: "updatedRoleSalary",
                            message: "Type in the updated salary of the role:",
                            default() {
                              return res.roleToUpdate[2];
                            },
                          },
                          {
                            type: 'list',
                            name: 'updatedRoleDepartment',
                            message: 'Choose a department for udated role:',
                            choices: allDepartments.map((oneDepartment) => 
                              {return {name: oneDepartment.department_name, value: oneDepartment.department_id}
                              }),
                          }
                        ])
                        .then((updatedRes) => {
        
                          console.log(`the ID of the updated role is ${res.roleToUpdate[0]}`);
                          
                          console.log(`the Title of the updated role is ${updatedRes.updatedRoleTitle}`);
                          console.log(`the Salary of the updated role is ${updatedRes.updatedRoleSalary}`);
                          console.log(`the Department-ID of the updated role is  ${updatedRes.updatedRoleDepartment}`);
        
                          // add a new role to the role-table to the db:
                          // pool.query('UPDATE role SET (title, salary, department_id) VALUES ($1, $2, $3) WHERE id = $4', [ updatedRes.updatedRoleTitle, updatedRes.updatedRoleSalary, updatedRes.roleDepartment, res.roleToUpdate[0]],
                          pool.query(`UPDATE role SET title = ${updatedRes.updatedRoleTitle}, salary = ${updatedRes.updatedRoleSalary}, department_id = ${updatedRes.updatedRoleDepartment}) WHERE id = ${res.roleToUpdate[0]}`, 
                            //function (err, {rows}) {
                            function (err, data) {
                              //console.table(rows);
                              console.log(`The ${res.roleToUpdate[1]} role has been updated! Check "view all roles!"`);
                              init();
                            }
                          );
                        });
                    });
                });
            });
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