const form = document.querySelector('.add-form')
const date = document.getElementById('date')
// const description = document.getElementById('description').value
// const category = document.getElementById('category')
// const amount = document.getElementById('amount')
// console.log(date)
form.addEventListener('submit', addItem)

function addItem (e) {
  const expenseDate = date.value
  // const expenseDescription = description
  // const expenseCategory = category.value
  // const expenseAmount = amount.value
  const description = document.getElementById('description').value
  const category = document.getElementById('category').value
  const amount = document.getElementById('amount').value
  e.preventDefault()
  const dataArray = []
  dataArray.push(date.value, description, category, amount) // works on submit
  // dataArray.push(description)
  console.log(dataArray)
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

// function dataLoader () {
//   const dataSet = dataStorageHelper()
//   dataSet.forEach(data => {

//   })
// }

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
