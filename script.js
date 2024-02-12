// Employee class
class Employee {
  constructor(name, address, id, designation) {
    this.name = name;
    this.address = address;
    this.id = id;
    this.designation = designation;
  }
}

// Global array to store employees
let employees = [];
// Global array to store employee IDs
let employeeIds = [];

// Function to add employee
function addEmployee() {
  const name = document.getElementById("name").value;
  const address = document.getElementById("address").value;
  const id = document.getElementById("employeeId").value;
  const designation = document.getElementById("designation").value;

  // Check if all fields are filled
  if (!name || !address || !id || !designation) {
    alert("Please fill all fields");
    return;
  }

  // Check if ID is a positive number and not already used
  if (!/^\d+$/.test(id) || id < 0) {
    alert("Employee ID must be a positive integer.");
    return;
  }

  // Check if ID is already used
  if (employeeIds.includes(id)) {
    alert("Employee ID already exists. Please choose a different one.");
    return;
  }

  const employee = new Employee(name, address, id, designation);
  employees.push(employee);
  employeeIds.push(id);

  renderEmployees();
  clearAddEmployeeForm();
}

// Function to delete employee
function deleteEmployee(id) {
  employees = employees.filter((emp) => emp.id !== id);
  renderEmployees();
}

// Function to edit employee
function editEmployee(id) {
  const employee = employees.find((emp) => emp.id === id);
  document.getElementById("editName").value = employee.name;
  document.getElementById("editAddress").value = employee.address;
  document.getElementById("editEmployeeId").value = employee.id;
  document.getElementById("editDesignation").value = employee.designation;

  document.getElementById("addEmployeeForm").style.display = "none";
  document.getElementById("editEmployeeForm").style.display = "block";
}

// Function to save edited employee
function saveEditedEmployee() {
  const name = document.getElementById("editName").value;
  const address = document.getElementById("editAddress").value;
  const id = document.getElementById("editEmployeeId").value;
  const designation = document.getElementById("editDesignation").value;

  const index = employees.findIndex((emp) => emp.id === id);

  if (index !== -1) {
    employees[index] = new Employee(name, address, id, designation);
    renderEmployees();
    clearEditEmployeeForm();
  }
}

// Function to clear Add Employee form after submission
function clearAddEmployeeForm() {
  document.getElementById("name").value = "";
  document.getElementById("address").value = "";
  document.getElementById("employeeId").value = "";
  document.getElementById("designation").value = "";
}

// Function to clear Edit Employee form after submission
function clearEditEmployeeForm() {
  document.getElementById("editName").value = "";
  document.getElementById("editAddress").value = "";
  document.getElementById("editEmployeeId").value = "";
  document.getElementById("editDesignation").value = "";

  document.getElementById("editEmployeeForm").style.display = "none";
  document.getElementById("addEmployeeForm").style.display = "block";
}

// Function to render employees in table
function renderEmployees() {
  const tableBody = document.querySelector("#employeeTable tbody");
  tableBody.innerHTML = "";

  employees.forEach((employee) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${employee.name}</td>
            <td>${employee.address}</td>
            <td>${employee.id}</td>
            <td>${employee.designation}</td>
            <td>
              <button onclick="editEmployee('${employee.id}')">Edit</button>
              <button onclick="deleteEmployee('${employee.id}')" class="delete-button">Delete</button>
            </td>
          `;
    tableBody.appendChild(row);
  });
}

// Initial render
renderEmployees();
