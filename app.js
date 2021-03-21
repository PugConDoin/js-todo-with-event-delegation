/*******************
 ***  VARIABLES  ***
 ******************/
const addForm = document.querySelector('.add')
const list = document.querySelector('.todos')
const search = document.querySelector('.search input')

/**************************************
 ***  ADD NEW TODO ELEMENT TO PAGE  ***
 *************************************/
// create function to add new todos to the list when a user submits a new todo item.
// take in the user submitted value stored in the 'todo' variable
// 1. use a template string to create a new list item template
// 2. pass in the value of the new 'todo'
// 3. that we will add to our 'list'
// 4. add our newly created html template to our 'list'
const generateTemplate = (todo) => {
  const html = `
   <li class="list-group-item d-flex justify-content-between align-items-center">
    <span>${todo}</span>
    <i class="far fa-trash-alt delete"></i>
   </li>
  `
  list.innerHTML += html
}

/****************************************************
 ***  HANDLE FORM SUBMIT EVENT TO ADD NEW TO DOs  ***
 ***************************************************/
// 1. prevent page refreshing on submit
// 2. create a varaible 'todo' that will take in user submitted values for a new todo
// 3. passs this into the 'generateTemplate' function above
// 4. use .trim() to remove any leading whitespace
// 5. check that the submitted value has length and ensure that an empty string can't be created as a new todo
// 6. test that 'todo.length' evaluates to true, if so, then
// 7. call the function to generate new template and pass in the new todo
// 8. clear input form after submission using reset()
addForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const todo = addForm.add.value.trim()
  if (todo.length) {
    generateTemplate(todo)
    addForm.reset()
  }
})

/**********************
 ***  DELETE TODOS  ***
 *********************/
// use event delegation by adding an event listener to the entire UL element that will handle all delete events, then check the target, instead of having an event listener for all delete icons. This also handles new todos created inside the UL we're listening on.
// 1. listen for a click on the entire UL using the 'list' variable.
// 2. establish if the clicked target is a delete icon by seeing 'if' the target for the 'e'vent contains the icon class 'delete'.
// 3. the entire 'li' is the parent of the delete icon, use remove() to delete it.
list.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete')) {
    e.target.parentElement.remove()
  }
})

/************************************************************
 *** FILTER TODOS OUT FROM LIST BASED ON SEARCH CRITERIA  ***
 ************************************************************/
// the 'todos' are 'li' elements within our 'list' which itself is a 'ul' element.
// the 'todo's are children of the 'list' but they are a collection of HTML, not an array
// 1. access the HTML collection of all the children in the list
// 2. create an array from this HTMLCollection in order to use array methods such as 'filter()' and 'forEach()'
// 3. return only those todos which do NOT include the term, by !negating the boolean
// 4. cycle through and apply a new 'filtered' class using 'foreEach()'
// 5. add 'filtered' class rule to CSS
const filterTodos = (term) => {
  Array.from(list.children)
    .filter((todo) => !todo.textContent.toLowerCase().includes(term))
    .forEach((todo) => todo.classList.add('filtered'))

  // REMOVE 'filtered' CLASS IF SEARCH TERM IS CHANGED
  // 1. reverse the boolean test in the filter method
  // 2. replace .add() with .remove() method
  Array.from(list.children)
    .filter((todo) => todo.textContent.toLowerCase().includes(term))
    .forEach((todo) => todo.classList.remove('filtered'))
}

/*********************
 ***  SEARCH FORM  ***
 ********************/
// 1. callback function to listen for a key-up event
// 2. .trim() out leading whitespaces
// 3. remove case sesnitivity by forcing all search text .toLowerCase()
// 4. pass the serach 'term' to 'filterToDos' function
search.addEventListener('keyup', () => {
  const term = search.value.trim().toLowerCase()
  filterTodos(term)
})
