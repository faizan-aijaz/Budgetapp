var showTotal = document.getElementById("show-total");
var showExpense = document.getElementById("show-expense");
var showBalance = document.getElementById("show-balance");

var totalAmount = document.getElementById("totalAmount");
var tempAmount = 0;

function setBudget() {
  tempAmount = totalAmount.value;
  if (tempAmount === "" || tempAmount < 0) {
    document.getElementById("bgt-error").style.display = "block";
  } else {
    document.getElementById("bgt-error").style.display = "none";
    showTotal.innerHTML = tempAmount;
  }
  totalAmount.value = "";
}

var arrayExpense = [];

function addExpenses() {
  var expenseCategories = document.getElementById("exp-categories").value;
  var expenseAmount = document.getElementById("expenseAmount").value;

  if (!expenseAmount || expenseAmount === "") {
    document.getElementById("bgt-error2").style.display = "block";
  } else {
    document.getElementById("bgt-error2").style.display = "none";
    var expense = parseFloat(expenseAmount);
    var remainingBalance = tempAmount - expense;

    if (remainingBalance < 0) {
      alert("Expense amount exceeds the budget");
      return;
    }

    showExpense.innerHTML = parseFloat(showExpense.innerHTML) + expense;
    showBalance.innerHTML = remainingBalance;

    arrayExpense.push({
      category: expenseCategories,
      expense: expense

    });

    displayExpense();
  }

  document.getElementById("exp-categories").value = "";
  document.getElementById("expenseAmount").value = "";
}

function displayExpense() {
  var table = document.getElementById("expenseTable");
  table.innerHTML = "";

  
  var headerRow = table.insertRow();
  headerRow.innerHTML =
    "<th>Category</th><th>Expense</th><th>Date</t><th>Edit</th><th>Delete</th>";

  for (var i = 0; i < arrayExpense.length; i++) {
    var row = table.insertRow();

    var categoryCell = row.insertCell();
    categoryCell.innerHTML = arrayExpense[i].category;

    var expenseCell = row.insertCell();
    expenseCell.innerHTML = arrayExpense[i].expense;

    var dateCell = row.insertCell();
    var currentdDate = new Date();
    currentdDate.getDate();
    dateCell.innerHTML = currentdDate.toDateString();

    var editCell = row.insertCell();
    editCell.innerHTML = "<i class='fa-solid fa-pen-to-square' onclick='editExpense(" + i + ")'></i>";

    var deleteCell = row.insertCell();
    deleteCell.innerHTML = "<i class='fa-solid fa-trash' onclick='deleteExpense(" + i + ")'></i>";

  }
}

//edit function
function editExpense(index) {
  var newCategory = prompt("Enter new category:");
  var newExpense = parseFloat(prompt("Enter new expense:"));

  if (newCategory && newExpense) {
    arrayExpense[index].category = newCategory;
    arrayExpense[index].expense = newExpense;
    displayExpense();
  }
}
//delete function
function deleteExpense(index) {
  arrayExpense.splice(index, 1);
  displayExpense();
}

