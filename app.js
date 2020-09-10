document.addEventListener('DOMContentLoaded', function () {
  dataLoader()
})

const form = document.querySelector('.add-form')
form.addEventListener('submit', addExpense)
// const removeExpense = document.querySelector('.delete-icon')
// removeExpense.addEventListener('click', deleteExpense)
const tBody = document.querySelector('tbody')
tBody.addEventListener('click', deleteExpense)

function addExpense (e) {
  const date = document.getElementById('date')
  const description = document.getElementById('description').value
  const category = document.getElementById('category').value
  const amount = document.getElementById('amount').value
  // unable to disable date if blank, fix later
  if (date === '' && description === '' && category === '' && amount === '') {
    e.preventDefault()
    return false
  }
  e.preventDefault()

  const dataObj = {
    id: id(),
    date: date.value,
    description: description,
    category: category,
    amount: amount
  }
  createExpenseTable(dataObj)
  dataSaver(dataObj)
  console.log(dataObj)
  form.reset()
}

function getUniqueId () {
  let i = 0
  return function () {
    return i++
  }
}
const id = getUniqueId()

function dataSaver (dataArray) {
  const dataSet = dataStorageHelper()
  dataSet.push(dataArray)
  localStorage.setItem('dataSet', JSON.stringify(dataSet))
}

function dataLoader () {
  const dataSet = dataStorageHelper()
  dataSet.forEach(data => {
    createExpenseTable(data)
  })
}

function deleteExpense (e) {
  let tableRow
  if (!e.target.matches('.delete-icon')) {
    return false
  } else {
    tableRow = e.target.closest('tr')
    const rowText = tableRow.innerText
    console.log(rowText) // string
    let storedExpenses = dataStorageHelper()
    // console.log(storedExpenses) // array
    storedExpenses = storedExpenses.filter(expense => expense !== rowText)
    localStorage.setItem('dataSet', JSON.stringify(storedExpenses))
    tableRow.remove()
  }
}

function createExpenseTable (data) {
  const tBody = document.querySelector('tbody')

  tBody.innerHTML += `
    <tr>
    <td>${data.date}</td>
    <td>${data.description}</td>
    <td>${data.category}</td>
    <td>${data.amount}</td>
    <td>${data.id}</td>
      <td><i class="fas fa-minus-circle delete-icon"></i></td>
    </tr>
  `
}

function dataStorageHelper () {
  const dataGetter = JSON.parse(localStorage.getItem('dataSet'))
  let dataSet
  if (!dataGetter) {
    dataSet = []
  } else {
    dataSet = JSON.parse(localStorage.getItem('dataSet'))
  }
  return dataSet
}
