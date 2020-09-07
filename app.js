document.addEventListener('DOMContentLoaded', function () {
  dataLoader()
})

const form = document.querySelector('.add-form')
form.addEventListener('submit', addExpense)
// const tBody = document.getElementsByTagName('tbody')
const tBody = document.querySelector('tbody')
// console.log(tBody)

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
  console.log(dataArray)
  createExpenseTable(dataArray)
  dataSaver(dataArray)
  console.log(dataSaver)
  date.value = ''
  description.value = ''
  category.value = ''
  amount.value = ''
}

// dataSet is the plural set of data, data is the single
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

function createExpenseTable (data) {
  const table = document.querySelector('table')
  table.appendChild(tBody)
  tBody.innerHTML = `
    <tr>
      <td>${data.date}</td>
      <td colspan="4">${data.description}</td>
      <td colspan="3">${data.category}</td>
      <td>${data.amount}</td>
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
