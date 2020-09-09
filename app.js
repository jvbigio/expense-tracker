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
  const dataArray = []
  dataArray.push(date.value, description, category, amount)
  createExpenseTable(dataArray)
  dataSaver(dataArray)
  form.reset()
}

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
    let rowText = tableRow.innerText
    console.log(rowText) // string
    // rowText = rowText.split('  ')
    // let newRowText = rowText.join(' ')
    rowText.replace(/\s{2,}/g, ' ')
    rowText = rowText.join()
    console.log(rowText)
    // console.log(newRowText)

    // const newData = Array.from(rowText)
    // // newData = Array.from(newData)
    // console.log(newData)
    const storedExpenses = dataStorageHelper()
    console.log(storedExpenses) // array
    // let newData = storedExpenses.map(a => a.join(' ')).join(', ')
    // newData = newData.split(',')
    // console.log(storedExpenses)
    // console.log(newData) // array
    // original:
    // storedExpenses = storedExpenses.filter(expense => expense !== rowText)
    // storedExpenses = storedExpenses.filter(expense => expense !== newData)
    // newData = newData.filter(expense => expense !== rowText)
    localStorage.setItem('dataSet', JSON.stringify(storedExpenses))
    tableRow.remove()
  }
}

function createExpenseTable (data) {
  const tBody = document.querySelector('tbody')

  tBody.innerHTML += `
    <tr>
      <td>${data[0]}</td>
      <td>${data[1]}</td>
      <td>${data[2]}</td>
      <td>${data[3]}</td>
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
