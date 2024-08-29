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

// TODO write "Employee Manager" using special symbols: |_-/\ etc. (issue #19)
console.log(`.---------------------.`);
console.log(`|                     |`);
console.log(`|  Employee Manager   |`);
console.log(`|                     |`);
console.log(`.---------------------.`);
function init() {

  inquirer
    .prompt([
      {
        type: "list",
        message: "Choose what you would like to do:",
        name: "TODO",
        choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role", "Quit"],
      }
    ])
    .then((res) => {

      // console.log(res);
      // console.log(res.TODO);

      actionTODO(res.TODO);

      function actionTODO (data) {

        // console.log(`you have chosen to ${data}. `);
        
        //+++++++++++++++++++++++++++++++++++++
        //++++++  Modularization part: ++++++++
        //+++++++++++++++++++++++++++++++++++++
        // Get Department Name by ID
        function depName() {
          let depNameData = [];
          pool.query('SELECT * FROM department', 
            function (err, {rows}) {
                for (let i = 0; i < rows.length; i++) {
                depNameData = depNameData.push(rows[i].name);
                
              };
          });
          console.log(`dep array is ${depNameData}`);
          return depNameData;
        };
        //+++++++++++++++++++++++++++++++++++++++++
        //view all departments
        function viewAllDep() {
          pool.query('SELECT * FROM department', 
            function (err, {rows}) {
              // TODO table size needs adjustments
              console.log(`====================================`);
              console.log(`|       All Departments data:      |`);
              console.log(`====================================`);
              console.log(`| Department id |  Depatment Name  |`);
              console.log(`====================================`);
              for (let i = 0; i < rows.length; i++) {
                console.log(`|       ${rows[i].id}       |  ${rows[i].name}   `);
              };
              console.log(`====================================`);

              // // the code below displayes only Department Table by row-layout:
              // console.log(`/source: viewAllDep();/ DATA for All Departments:`)
              // console.log(rows);
              // console.log(rows[0].name);
              const dep = rows;
              return dep;
            });
        };
        //+++++++++++++++++++++++++++++++++++++++++

        //WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW
        //WWWWW handle user request part:  WWWW
        //WwWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW
        if (data === "view all departments") {

        // pool.query('SELECT * FROM department', 
        //           function (err, {rows}) {
        //             // TODO table size needs adjustments
        //             console.log(`====================================`);
        //             console.log(`|       All Departments data:      |`);
        //             console.log(`====================================`);
        //             console.log(`| Department id |  Depatment Name  |`);
        //             console.log(`====================================`);
        //             for (let i = 0; i < rows.length; i++) {
        //               console.log(`|       ${rows[i].id}       |  ${rows[i].name}   `);
        //             };
        //             console.log(`====================================`);

        //             // // the code below displayes only Department Table by row-layout:
        //             // console.log(rows);
        //             // console.log(rows[0].name);
        //             // pool.end();
        //           }
        // );

        viewAllDep(); 

          // TODO get reqDep, now it is udefined
          // console.log(reqDep);
          console.log(`To do other choice you need to restart the App. Please, click 'ctrl+C' for GitBush.`);
        };

        //WWWWWWWWWWWWWWWWWWWWWWWWWWWWWW
        if (data === "view all roles") {
          pool.query('SELECT * FROM role', 
          //pool.query('SELECT role.title AS Role Title, role.id AS Role ID, department.id AS Department, role.salary AS Salary FROM role JOIN department ON role.department_id = department.id',
                      function (err, {rows}) {

                        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
                        // // maybe one of the way to get Dapartments names if do not use tables join:
                        // depNameArray = depName();
                        // console.log(`depNameArray has gotren data: ${depNameArray}`);
                        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
                        
                        // TODO Consolelog join of Role&Department Tables by table-layout:
                        // TODO table size needs adjustments
                        console.log(`======================================================`);
                        console.log(`|                   All Role data:                   |`);
                        console.log(`======================================================`);
                        console.log(`| Role ID |  Job Title   |   Department  |   Salary   |`);
                        console.log(`======================================================`);
                        for (let i = 0; i < rows.length; i++) {
                          console.log(`|    ${rows[i].id}    |  ${rows[i].title}   |   ${rows[i].department_id}   |   ${rows[i].salary}   `);
                        };
                        console.log(`======================================================`);


                        console.log(`This table data format is under developing now. Names of Department instead of Department ID is coming soon.`);
                        console.log(`To do other choice you need to restart the App. Please, click 'ctrl+C' for GitBush.`);

                        // the code below displayes only Role Table by row-layout:
                        //console.log(rows);
                      }
          );

        };

        //WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW
        if (data === "view all employees") {

          pool.query('SELECT * FROM employee', 
                      function (err, {rows}) {

                        // TODO get Role&Employee&Department Tables join (req-data).

                        // TODO display join of Role&Employee&Department Tables by table-layout:

                        // TODO table size needs adjustments
                        console.log(`===================================================================================`);
                        console.log(`|                                  All Employee data:                              |`);
                        console.log(`===================================================================================`);
                        console.log(`| Employee ID | First Name | Last Name | Job Title | Department | Salary | Manager |`);
                        console.log(`===================================================================================`);

                        // TODON use a 'for loop' throught req-data to display it. If manager_id is NULL, then display 'N/A' in Manager column.
                    

                        // the code below displayes only Role Table by row-layout:
                        console.log(rows);

                        console.log(`This data format is under developing now to be able be inserted in a table above. Names of Department/Role instead of DepartmentID/RoleID is coming soon.`);
                        console.log(`To do other choice you need to restart the App. Please, click 'ctrl+C' for GitBush.`);

                      }
          );
        };

        // //WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW
        if (data === "add a department") {

          console.log(`code for "add a department" is comming soon. It is under developing now.`);
          console.log(`To do other choice you need to restart the App. Please, click 'ctrl+C' for GitBush.`);

          // console.log(`These are departments you can choose among:`)
          // viewAllDep();

          // // console.log(`Please, unswer folloing questions to add a new department:`);
          // inquirer
          // .prompt([
          //   {
          //     type: "input",
          //     depName: "departmentName",
          //     message: "What is the name of a new Department?",
          //   }
          // ])
          // .then((res) => {

          //   console.log(`A new Department is ${res.departmentName}`);

          //   // pool.query('INSERT INTO department(name)values(res.departmentName)', 
          //   //             function (err, {rows}) {
          //   //               console.log(rows);
          //   //               //pool.end();
          //   //             }
          //   // );
          
          // });

        };

        //WWWWWWWWWWWWWWWWWWWWWWWWWW
        if (data === "add a role") {

          console.log(`code for "add a role" is comming soon. It is under developing now.`);
          console.log(`To do other choice you need to restart the App. Please, click 'ctrl+C' for GitBush.`);

          // 1. TODO display Department Names to add them to promt below:

          // // 2. get user input (user data) about a new role:
          // inquirer
          // .prompt([
          //   {
          //     type: "input",
          //     rTitle: "roleTitle",
          //     message: "What is the title of a role?",
          //   },
          //   {
          //     type: "input",
          //     rSalary: "roleSalary",
          //     message: "What is the salary for the role?",
          //   },
          //   {
          //     type: 'list',
          //     rDep: 'roleDepartment',
          //     message: 'Chose the Department you would like to assign this role to:',
          //     choices: ['Workshop', 'Human Resources', 'IT', 'Office', 'Security', 'Medical'],
          //     // filter(val) {
          //     //   return val.toLowerCase();
          //     // },
          //   }
          // ])
          // .then((res) =>{

          //   console.log(`A new Role is ${res.roleTitle}`);
          //   console.log(`A new Role Salary is ${res.roleTitle}`);
          //   console.log(`A new Role Department is ${res.roleDepartment}`);

          //   // get a department_id based on res.roleDepartment:
          //   roleDepartment_id = 
          
          //   // add a new role to the role-table to our db:
          //   pool.query('INSERT INTO role(title, salary, department_id)values(res.roleTitle, res.roleSalary, roleDepartment_id)', 
          //               function (err, {rows}) {
          //                 console.log(rows);
          //                 pool.end();
          //               }
          //   );
          
          // });
        };

        //WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW
        if (data === "add an employee") {

          console.log(`code for "add a employee" is comming soon. It is under developing now.`);
          console.log(`To do other choice you need to restart the App. Please, click 'ctrl+C' for GitBush.`);

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

        };

        //WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW
        if (data === "update an employee role") {

          console.log(`code for "update an employee role" is comming soon. It is under developing now.`);
          console.log(`To do other choice you need to restart the App. Please, click 'ctrl+C' for GitBush.`);

          // pool.query('SELECT * FROM role', 
          //             function (err, {rows}) {
          //               console.log(`code is needed to update this table:`);
          //               console.log(rows);
          //             }
          // );
        };

        //WWWWWWWWWWWWWWWWWWWWWWWWWW
        if (data === "Quit") {

          console.log(`code for "Quit" is comming soon. It is under developing now.`);
          console.log(`To "Quit" of App now click 'ctrl+C' for GitBush.`);
        };

        return;
      };

    });

  // //=============================================
  // // ask user if he/she would like to do anything else
  // initNext()          
        
// end of function init();
};

// function to handle next user request
function initNext() {
  inquirer.prompt([
    {
      type: "list",
      message: "would you like to do anything else?",
      name: "keepWork",
      choices: ["yes", "no"],
    }
  ])
  .then((res) =>{
    if (res.keepWork === "yes") {
      init();
    } else {
      return console.log('you have chosen to STOP App');
      // TODO function to stop App
    }
  });
};

init();


// source of code: https://www.youtube.com/watch?v=yguFIUQPFO4&list=LL&index=1