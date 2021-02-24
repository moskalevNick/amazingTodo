//Создать блок  const table = document.createElement("название тега table")
//получить блок const app = document.querySelector("#айди, .класс, тег")
//поместить тег1 внутрь тега2: тег2.appendChild(тег1)
//свойство обьекта тега, которое дает доступ к внутренностям тега app.innerHTML

const app = document.querySelector("#app")
const h2 = document.createElement("h2")
const input = document.createElement("input")
const button = document.createElement("button")
const br = document.createElement("br")
const ul = document.createElement("ul")
const todoList = []
const url = "http://localhost:3000"

ul.innerHTML = "Does not have todos yet..."
h2.innerHTML = "write and do it, man!"
button.disabled = true
button.innerHTML = "Add"

app.appendChild(h2)
app.appendChild(input)
app.appendChild(br)
app.appendChild(button)
app.appendChild(ul)
;(async function () {
  const response = await fetch(url)
  const result = await response.json()
  result.forEach((todo) => {
    todoList.push(todo)
  })
  displayMessages()
})()

const disableButton = (e) => {
  input.value = e.target.value
  button.disabled = !e.target.value.trim()
}

const displayMessages = () => {
  ul.innerHTML = ""
  if (todoList.length === 0) ul.innerHTML = "Does not have todos yet..."

  todoList.forEach((item) => {
    const li = document.createElement("li")
    const checkbox = document.createElement("input")
    const label = document.createElement("label")

    li.id = item.id
    label.innerHTML = item.todo
    checkbox.type = "checkbox"
    checkbox.id = `${item.id}`
    checkbox.checked = item.checked ? "checked" : ""
    label.classList += item.important ? "important" : ""

    li.appendChild(checkbox)
    li.appendChild(label)
    ul.appendChild(li)
  })
}

const handleTodoEvent = (e) => {
  if (e.type === "click" || e.key === "Enter") {
    const todo = {
      id: Date.now(),
      todo: input.value,
      checked: false,
      important: false,
    }
    postTodos(todo)
    todoList.push(todo)
    input.value = ""
    button.disabled = true
  } else if (e.type === "change" || e.type === "contextmenu") {
    e.preventDefault()
    todoList.forEach((item, i) => {
      if (e.type === "change" && item.id.toString() === e.path[0].id) {
        item.checked = !item.checked
        putTodos(item)
      } else if (item.id.toString() === e.path[1].id && e.ctrlKey) {
        deleteTodos(item.id)
        todoList.splice(i, 1)
      } else if (item.id.toString() === e.path[1].id) {
        item.important = !item.important
        putTodos(item)
      }
    })
  }
  displayMessages()
}
async function deleteTodos(id) {
  await fetch(`${url}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  })
}
async function postTodos(todo) {
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(todo),
  })
}
async function putTodos(i) {
  await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(i),
  })
}
app.addEventListener("keydown", handleTodoEvent)
button.addEventListener("click", handleTodoEvent)
ul.addEventListener("change", handleTodoEvent)
ul.addEventListener("contextmenu", handleTodoEvent)
input.addEventListener("input", disableButton)
