const transactionUl = document.querySelector('#transactions')

const incomeDisplay = document.querySelector('#money-plus')
const expenseDisplay = document.querySelector('#money-minus')
const balanceDisplay = document.querySelector('#balance')
const form = document.querySelector('#form')
const inputTransactionName = document.querySelector('#text')
const inputTransactionAmount = document.querySelector('#amount')


const localStorageTransactions = JSON.parse(localStorage
        .getItem('transactions'))
let  transactions = localStorage
        .getItem('transactions') !== null ? localStorageTransactions : [] 

const addTransactionIntoDOM = ({amount, name, id}) => {
    const operator = amount < 0 ? '-' : '+'
    const CSSClass = amount < 0 ? 'minus' : 'plus'
    const amountWithoutOperator = Math.abs(amount)
    const li = document.createElement('li')

const removeTransaction = ID => {
    transactions = transactions.filter(transaction =>
         id !== ID)
    updateLocalStorage()
    init()
}
    
    li.classList.add(CSSClass)
    li.innerHTML = `
        ${name} 
        <span>${operator} R$ ${amountWithoutOperator}
        </span> 
        <button class="delete-btn" onClick="removeTransaction(${id})">x</button>
    `
    transactionUl.append (li)

}

const getIncome = transactionsAmounts => transactionsAmounts
    .filter(value => value > 0)
    .reduce((accumulator, value) => accumulator + value, 0)
    .toFixed(2)

const getExpense = transactionsAmounts => Math.abs(transactionsAmounts
    .filter(value => value < 0)
    .reduce((accumulator, value) => accumulator + value, 0))
    .toFixed(2)

const getTotal = transactionsAmounts => transactionsAmounts
    .reduce((accumulator, transaction) => accumulator + transaction, 0)
    .toFixed(2)

const updateBalanceValues = () => {
    const transactionsAmounts = transactions.map(({amount}) => amount)
    
    const total = getTotal(transactionsAmounts)
    const income = getIncome(transactionsAmounts)
    const expense = getExpense(transactionsAmounts)
    
        
    balanceDisplay.textContent = `R$ ${total}`
    incomeDisplay.textContent = `R$ ${income}`
    expenseDisplay.textContent = `R$ ${expense}`
}

const init = () => {
    transactionUl.innerHTML = ''
    transactions.forEach(addTransactionIntoDOM)
    updateBalanceValues()
}

init()

const updateLocalStorage = () => {
    localStorage.setItem('transactions',JSON.stringify(transactions))
}

const generateID = () => Math.round(Math.random() * 1000)

const addToTransactionsArray = (transactionName, transactionAmount) => {
    transactions.push({
        id: generateID(), 
        name: transactionName, 
        amount: Number(transactionAmount)
    })
}

const cleanInputs = () =>{
    inputTransactionName.value = ''
    inputTransactionAmount.value = ''

}

const handleFormSubmit = event => {
    event.preventDefault()

    const transactionName = inputTransactionName.value.trim()
    const transactionAmount = inputTransactionAmount.value.trim()
    const isSomeInputEmpty = transactionName === '' || transactionAmount ===''
    if (isSomeInputEmpty){
        alert('Por favor, preencha tanto o nome quanto o valor da tranasação')
        return
    }

    addToTransactionsArray(transactionName, transactionAmount)
    init()
    updateLocalStorage()
    cleanInputs()
    
}

form.addEventListener('submit', handleFormSubmit )

// const dummyTransactions = [
//     {id: 1, name: 'Bolo de brigadeiro', amount: -20},
//     {id: 2, name: 'Salário', amount: 300},
//     {id: 1, name: 'Torta de Frenago', amount: -10},
//     {id: 1, name: 'Violaão', amount: 150}
// ]

// const addTransactionIntoDOM = transaction => {
//     const operator = transaction.amount < 0 ? '-' : '+'
//     const CSSClass = transaction.amount < 0 ? 'minus' : 'plus'
//     const li = document.createElement('li') 


//     li.classList.add(CSSClass)
//     li.innerHTML = `
//        ${transaction.name} <span>-$400</span><button class="delete-btn">x</button>
//      `
//     console.log(li)
     
// }

// addTransactionIntoDOM(dummyTransactions[1])