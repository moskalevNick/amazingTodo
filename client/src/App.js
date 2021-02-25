import "./App.css"
import { useState, useEffect } from "react"

function App() {
  //const arr = useState([])
  //const todos = arr[0]
  //const setTodos = arr[1]
  const [todos, setTodos] = useState([])
  /*  function useState(arg) { 
        let currentArg = arg; 
        function setArg(newArg) {
          currenArg = newArg
        } 
        return [currentArg, setArg] 
      } */
  useEffect(() => {
    fetch("http://localhost:5000", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    })
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        console.log(data)
        setTodos(data)
      })
  }, [])
  console.log(todos)

  return (
    <div className="App">
      <h1>do it!</h1>
      {
        <div className="container">
          {todos.map((todo) => (
            <div key={todo._id}>{todo.todo}</div>
          ))}
        </div>
      }
    </div>
  )
}

export default App
