

function logout() {


    localStorage.clear()

    location.href = './signup/Index.html'


}












//  EMS





const balance = document.getElementById("balance");
const money_plus = document.getElementById('money-plus')
const money_minus = document.getElementById('money-minus')
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');






const localStorageTransactions = JSON.parse(localStorage.getItem("transactions"))
let transactions = localStorage.getItem("transactions") !== null ? localStorageTransactions : []  ;

// Add Transactions:

function addTransaction(e) {
    e.preventDefault();
    if (
        text.value.trim() === "" || amount.value.trim() === ""
    ) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please fill all fields',
           
          })    
    }
    else {
        const transaction = {
            id: generateID(),
            text: text.value,
            amount: +amount.value,
        };
        transactions.push(transaction);
        addTransactionDOM(transaction);
        updateLocalStorage();
        updateValues();
        text.value = "",
            amount.value = "";

    }


}

// Generate id
function generateID() {
    return Math.floor(Math.random() * 100000000)
}



function addTransactionDOM(transaction) {
    const sign = transaction.amount < 0 ? "-" : "+";
    const item = document.createElement("li")


    item.classList.add(
        transaction.amount < 0 ? "minus" : "plus"
    )

    item.innerHTML = `
    ${transaction.text}<span>${sign}${Math.abs(transaction.amount)}</span>
    <button class+ "delete-btn" onclick="removeTransactions(${transaction.id})">X</button>

    `;

    list.appendChild(item);

}

//remove transactions

function removeTransactions(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    updateLocalStorage();
    Init();

}



// update updateValues

function updateValues() {
    const amounts = transactions.map(transaction => transaction.amount);
    const Total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
    const income = amounts.filter(item => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2)
    const expense = (
        amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1
    ).toFixed(2);

    balance.innerText = `$${Total}`;
    money_plus.innerText = `$${income}`;
    money_minus.innerText = `$${expense}`;

}

// update local storage 

function updateLocalStorage() {
    localStorage.setItem(
        "transactions", JSON.stringify(transactions)
    );
}




// Init App

function Init() {
    list.innerHTML = "";
    transactions.forEach(addTransactionDOM);
    updateValues();
}



Init();

form.addEventListener("submit", addTransaction)