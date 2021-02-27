import "./App.css"
import { useState, useEffect } from "react"

function App() {
  //const arr = useState([])
  //const todos = arr[0]
  //const setTodos = arr[1]
  const [todos, setTodos] = useState([])
  const [inputTodo, setInputTodo] = useState("")
  
  /*  function useState(arg) { 
        let currentArg = arg; 
        function setArg(newArg) {
          currenArg = newArg
        } 
        return [currentArg, setArg] 
      } */
  const url = "http://localhost:5000"
  useEffect(() => {
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    })
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        
        setTodos(data)
      })
  }, [])
  //console.log(todos)
  
  const removeTodo = (id) => {
    fetch(`${url}/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
    }).then((res) => {
        return res.json()
      })
      .then((data) => {
                setTodos(data)
      })         
  }
  const addTodo = () => {
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        todo: inputTodo,
        important: false,
        checked: false
      })
    }).then((res) => {
        return res.json()
      })
      .then((data) => {
        
        setTodos(data)
      })
     setInputTodo("")
  }
  const changeChecked = (id) =>{
    const currentTodo = todos.filter((item) => item._id === id)[0]
    fetch(`${url}/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify({
        todo: currentTodo.todo,
        important: currentTodo.important,
        checked: !currentTodo.checked
      })
    }).then((res) => {
        return res.json()
      })
      .then((data) => {
        setTodos(data)
      })         
  }

  const changeImportant = (id) =>{
    const currentTodo = todos.filter((item) => item._id === id)[0]
    fetch(`${url}/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify({
        todo: currentTodo.todo,
        important: !currentTodo.important,
        checked: currentTodo.checked
      })
    }).then((res) => {
        return res.json()
      })
      .then((data) => {
        setTodos(data)
      })         
  }

  return (
    <div className="App">
      <h1>do it!</h1>
      {
        <div className="container">
          <input 
            onChange={(e)=>setInputTodo(e.target.value)} 
            value={inputTodo} 
            placeholder="write smth"
          />
          <button onClick={addTodo}>Add</button>
          <div className="todos"> 
            {todos.map((todo) => (
              <div className="todo" key={todo._id}>
                <input 
                  type="checkbox" 
                  onChange={changeChecked.bind(null, todo._id)} 
                  checked={todo.checked}
                />
                <div 
                  className={todo.important ? "important": "main" } 
                  onClick={changeImportant.bind(null, todo._id)}
                >
                  {todo.todo}
                </div>
                <button onClick={removeTodo.bind(null, todo._id)}>delete</button>
             </div>
            ))}
          </div>
        </div>
      }
    </div>
  )
}

export default App
