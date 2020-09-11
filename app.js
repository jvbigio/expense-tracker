document.addEventListener('DOMContentLoaded', function () {
  dataLoader()
})

const form = document.querySelector('.add-form')
form.addEventListener('submit', addExpense)
const tBody = document.querySelector('tbody')
tBody.addEventListener('click', deleteExpense)

function addExpense (e) {
  const date = document.getElementById('date')
  const description = document.getElementById('description').value
  const category = document.getElementById('category').value
  const amount = document.getElementById('amount').value
  // unable to disable date if blank, fix later
  if (description === '' && category === '' && amount === '') {
    e.preventDefault()
    return false
  }
  e.preventDefault()

  const dataObj = {
    date: date.value,
    description: description,
    category: category,
    amount: amount,
    id: new Date().getMilliseconds()
  }
  createExpenseTable(dataObj)
  dataSaver(dataObj)
  form.reset()
}

function dataSaver (dataObj) {
  const dataSet = dataStorageHelper()
  dataSet.push(dataObj)
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
    const storedExpenses = dataStorageHelper()
    const id = e.target.parentElement.previousSibling.previousSibling.textContent
    const filteredExpenses = storedExpenses.filter(expense => expense.id.toString() !== id)

    localStorage.setItem('dataSet', JSON.stringify(filteredExpenses))
    tableRow.remove()
  }
}

function createExpenseTable (data) {
  const tBody = document.querySelector('tbody')

  tBody.innerHTML += `
    <tr>
      <td class="date-row">${data.date}</td>
      <td class="description-row">${data.description}</td>
      <td class="category-row">${data.category}</td>
      <td class="amount-row">${data.amount}</td>
      <td class="id-row">${data.id}</td>
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

// INCOMPLETE, SORT FUNCTIONALITY COMING SOON //
const tableHeaders = document.getElementsByClassName('fa-sort')
let clicked = false
// sort functionality not complete yet
for (const header of tableHeaders) {
  let newData
  header.addEventListener('click', function (e) {
    const dataSet = JSON.parse(localStorage.getItem('dataSet'))
    newData = dataSet.slice()
    if (!clicked) {
      newData = newData.sort((a, b) => {
        return a.description.toLowerCase() > b.description.toLowerCase() ? 1 : -1
      })
    }
    clicked = true
    localStorage.setItem('dataSet', JSON.stringify(newData))
  })
  header.addEventListener('click', function (e) {
    if (clicked) {
      newData = newData.slice().sort().reverse()
    }
    localStorage.setItem('dataSet', JSON.stringify(newData))
    clicked = false
  })
}
