//wiring up the search form from index.hbs
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
//JavaScript can target document tags like input and form above, by className ('.className') or by id (#id)
const messageOne = document.querySelector('#message-1') 
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => { //e stands for event
    e.preventDefault()

    const location = search.value //value extracts the search input from the search form
   
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            messageOne.textContent = data.error
        } else{
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }
     })
    })
})