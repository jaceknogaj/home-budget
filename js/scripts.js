const incomeList = [];
const expenseList = [];

function addIncome() {
  const name = document.getElementById("incomeName").value;
  const amount = parseFloat(document.getElementById("incomeAmount").value);

  if (name && !isNaN(amount) && amount > 0) {
    incomeList.push({ name, amount });
    updateIncomeList();
    calculateBalance();
  }

  document.getElementById("incomeName").value = "";
  document.getElementById("incomeAmount").value = "";
}

function addExpense() {
  const name = document.getElementById("expenseName").value;
  const amount = parseFloat(document.getElementById("expenseAmount").value);

  if (name && !isNaN(amount) && amount > 0) {
    expenseList.push({ name, amount });
    updateExpenseList();
    calculateBalance();
  }

  document.getElementById("expenseName").value = "";
  document.getElementById("expenseAmount").value = "";
}

function updateIncomeList() {
  const incomeListElement = document.getElementById("incomeList");
  incomeListElement.innerHTML = "";
  incomeList.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `<div class="textList"><div class="textLeft">${item.name}:</div><div class="textRight"> ${item.amount} PLN</div></div>`;

    const buttonContainer = document.createElement("div");
    buttonContainer.className = "buttons";

    const editButton = document.createElement("button");
    editButton.className = "editBtn";
    editButton.textContent = "Edytuj";
    editButton.onclick = () => editIncome(index);

    const deleteButton = document.createElement("button");
    deleteButton.className = "deleteBtn";
    deleteButton.textContent = "Usuń";
    deleteButton.onclick = () => deleteIncome(index);

    buttonContainer.appendChild(editButton);
    buttonContainer.appendChild(deleteButton);

    li.appendChild(buttonContainer);

    incomeListElement.appendChild(li);
  });
}

function updateExpenseList() {
  const expenseListElement = document.getElementById("expenseList");
  expenseListElement.innerHTML = "";
  expenseList.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `<div class="textList"><div class="textLeft">${item.name}:</div><div class="textRight"> ${item.amount} PLN</div></div>`;

    const buttonContainer = document.createElement("div");
    buttonContainer.className = "buttons";

    const editButton = document.createElement("button");
    editButton.className = "editBtn";
    editButton.textContent = "Edytuj";
    editButton.onclick = () => editExpense(index);

    const deleteButton = document.createElement("button");
    deleteButton.className = "deleteBtn";
    deleteButton.textContent = "Usuń";
    deleteButton.onclick = () => deleteExpense(index);

    buttonContainer.appendChild(editButton);
    buttonContainer.appendChild(deleteButton);

    li.appendChild(buttonContainer);

    expenseListElement.appendChild(li);
  });
}
function calculateTotalIncome() {
  const totalIncomeElement = document.getElementById("totalIncome");
  const total = incomeList.reduce((sum, item) => sum + item.amount, 0);
  totalIncomeElement.textContent = total.toFixed(2);
}

function calculateTotalExpense() {
  const totalExpenseElement = document.getElementById("totalExpense");
  const total = expenseList.reduce((sum, item) => sum + item.amount, 0);
  totalExpenseElement.textContent = total.toFixed(2);
}

function calculateBalance() {
  const totalIncome = incomeList.reduce((acc, item) => acc + item.amount, 0);
  const totalExpense = expenseList.reduce((acc, item) => acc + item.amount, 0);

  const balance = totalIncome - totalExpense;
  const balanceMessage = document.getElementById("balanceMessage");

  if (balance > 0) {
    balanceMessage.innerHTML = `Możesz jeszcze wydać <span class="balance">${balance}</span> PLN`;
  } else if (balance === 0) {
    balanceMessage.innerHTML = "Bilans wynosi zero";
  } else {
    balanceMessage.innerHTML = `Bilans jest ujemny. Jesteś na minusie <span class="balance">${Math.abs(
      balance
    )}</span> PLN`;
  }
  calculateTotalIncome();
  calculateTotalExpense();
}

function editIncome(index) {
  const newName = prompt("Podaj nową nazwę przychodu:");
  const newAmount = parseFloat(prompt("Podaj nową kwotę przychodu:"));

  if (newName && !isNaN(newAmount) && newAmount > 0) {
    incomeList[index].name = newName;
    incomeList[index].amount = newAmount;
    updateIncomeList();
    calculateBalance();
  }
}

function editExpense(index) {
  const newName = prompt("Podaj nową nazwę wydatku:");
  const newAmount = parseFloat(prompt("Podaj nową kwotę wydatku:"));

  if (newName && !isNaN(newAmount) && newAmount > 0) {
    expenseList[index].name = newName;
    expenseList[index].amount = newAmount;
    updateExpenseList();
    calculateBalance();
  }
}

function deleteIncome(index) {
  incomeList.splice(index, 1);
  updateIncomeList();
  calculateBalance();
}

function deleteExpense(index) {
  expenseList.splice(index, 1);
  updateExpenseList();
  calculateBalance();
}
