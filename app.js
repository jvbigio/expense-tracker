const form = document.querySelector('.add-form')
const date = document.getElementById('date')
// console.log(date)
form.addEventListener('submit', addItem)

function addItem (e) {
  e.preventDefault()
  const dataArray = []
  dataArray.push(date.value) // works on submit
  console.log(dataArray)
  // console.log('clicked')
  // document.addEventListener('change', function (e) {
  //   console.log(e.target.value)
  // })
  // e.date.value
  // date.addEventListener('change', event => {
  //   console.log(event.target.value)
  // })
  // document.getElementById('date').addEventListener('change', function (event) {
  //   console.log(event.target.value)
  // })
}
