document.addEventListener('DOMContentLoaded', function () {
  dataLoader()
})

const form = document.querySelector('.add-form')
form.addEventListener('submit', addExpense)
const removeExpense = document.querySelector('.delete-icon')
removeExpense.addEventListener('click', deleteExpense)

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
  let delIcon
  if (!e.target.matches('.delete-icon')) {
    return false
  } else {
    delIcon = e.target.closest('i')
    console.log(delIcon)
  }
}

function createExpenseTable (data) {
  const tBody = document.querySelector('tbody')

  tBody.innerHTML += `
    <tr>
      <td>${data[0]}</td>
      <td colspan="4">${data[1]}</td>
      <td colspan="3">${data[2]}</td>
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
