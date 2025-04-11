document.addEventListener("DOMContentLoaded", function () {
  const expenseForm = document.getElementById("expense-form");
  const expenseNameInput = document.getElementById("expense-name");
  const expenseAmountInput = document.getElementById("expense-amount");
  const expenseListDisplay = document.getElementById("expense-list");
  const totalMsg = document.getElementById("total");
  const totalAmount = document.getElementById("total-amt");

  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  total = calculateTotal();
  totalAmount.textContent = total.toFixed(2);
  displayExpenses();
  expenseForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = expenseNameInput.value.trim();
    const amount = parseFloat(expenseAmountInput.value.trim());

    if (name !== "" && !isNaN(amount) && amount > 0) {
      const expenseObj = {
        id: Date.now(),
        name: name,
        amount: amount,
      };
      expenses.push(expenseObj);
      //   console.log(expenseObj.id);

      saveExpensestoLocal();
      updateTotal();
      displayExpenses();
      expenseNameInput.value = "";
      expenseAmountInput.value = "";
    }
  });
  function displayExpenses() {
    expenseListDisplay.innerHTML = "";
    expenses.forEach((expense) => {
      const li = document.createElement("li");
      li.innerHTML = `<span>${expense.name} - $${expense.amount.toFixed(
        2
      )}</span>
        <button data-id = "${expense.id}">Delete</button>`;
      li.classList.add("expense-item");
      expenseListDisplay.appendChild(li);
    });
  }

  function updateTotal() {
    total = calculateTotal();
    totalAmount.textContent = total.toFixed(2);
  }

  function saveExpensestoLocal() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }
  function calculateTotal() {
    return expenses.reduce((acc, expense) => acc + expense.amount, 0);
  }

  expenseListDisplay.addEventListener("click", function (e) {
    if (e.target.tagName === "BUTTON") {
      const expenseId = parseInt(e.target.getAttribute("data-id"));
      //   console.log(expenseId);

      expenses = expenses.filter((expense) => expense.id !== expenseId);
      saveExpensestoLocal();
      updateTotal();
      displayExpenses();
    }
  });
});
