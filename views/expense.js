document.addEventListener("DOMContentLoaded", () => {
    const expenseForm = document.getElementById("expense-form");
    const expenseList = document.getElementById("expense-list");
    const totalAmount = document.getElementById("total-amount");
    const filterCategory = document.getElementById("filter-category");
    const editFormContainer = document.getElementById("edit-form-container");
    const editExpenseForm = document.getElementById("edit-expense-form");

    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    let editingExpenseId = null;

    // Add Expense Form Submission
    if (expenseForm) {
        expenseForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = document.getElementById("expense-name").value;
            const amount = parseFloat(document.getElementById("expense-amount").value);
            const category = document.getElementById("expense-category").value;
            const date = document.getElementById("expense-date").value;

            const expense = {
                id: Date.now(),
                name,
                amount,
                category,
                date
            };

            expenses.push(expense);
            localStorage.setItem("expenses", JSON.stringify(expenses));

            // Redirect to view expenses page
            window.location.href = "view.html";
        });
    }

    // Display Expenses and Handle Actions
    if (expenseList) {
        displayExpenses(expenses);
        updateTotalAmount(expenses);

        expenseList.addEventListener("click", (e) => {
            if (e.target.classList.contains("delete-btn")) {
                const id = parseInt(e.target.dataset.id);
                expenses = expenses.filter(expense => expense.id !== id);
                localStorage.setItem("expenses", JSON.stringify(expenses));
                displayExpenses(expenses);
                updateTotalAmount(expenses);
            }

            if (e.target.classList.contains("edit-btn")) {
                const id = parseInt(e.target.dataset.id);
                const expense = expenses.find(expense => expense.id === id);

                document.getElementById("edit-expense-id").value = expense.id;
                document.getElementById("edit-expense-name").value = expense.name;
                document.getElementById("edit-expense-amount").value = expense.amount;
                document.getElementById("edit-expense-category").value = expense.category;
                document.getElementById("edit-expense-date").value = expense.date;

                editFormContainer.style.display = "block";
                editingExpenseId = id;
            }
        });

        filterCategory.addEventListener("change", (e) => {
            const category = e.target.value;
            if (category === "All") {
                displayExpenses(expenses);
                updateTotalAmount(expenses);
            } else {
                const filteredExpenses = expenses.filter(expense => expense.category === category);
                displayExpenses(filteredExpenses);
                updateTotalAmount(filteredExpenses);
            }
        });

        editExpenseForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const id = parseInt(document.getElementById("edit-expense-id").value);
            const name = document.getElementById("edit-expense-name").value;
            const amount = parseFloat(document.getElementById("edit-expense-amount").value);
            const category = document.getElementById("edit-expense-category").value;
            const date = document.getElementById("edit-expense-date").value;

            const updatedExpense = {
                id,
                name,
                amount,
                category,
                date
            };

            expenses = expenses.map(expense => (expense.id === id ? updatedExpense : expense));
            localStorage.setItem("expenses", JSON.stringify(expenses));

            editFormContainer.style.display = "none";
            displayExpenses(expenses);
            updateTotalAmount(expenses);
        });
    }

    function displayExpenses(expenses) {
        expenseList.innerHTML = "";
        expenses.forEach(expense => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${expense.name}</td>
                <td>$${expense.amount.toFixed(2)}</td>
                <td>${expense.category}</td>
                <td>${expense.date}</td>
                <td>
                    <button class="edit-btn" data-id="${expense.id}">Edit</button>
                    <button class="delete-btn" data-id="${expense.id}">Delete</button>
                </td>
            `;

            expenseList.appendChild(row);
        });
    }

    function updateTotalAmount(expenses) {
        const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
        totalAmount.textContent = total.toFixed(2);
    }
});
