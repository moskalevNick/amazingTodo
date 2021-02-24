import "./App.css"

function App() {
  const toDos = [
    {
      id: 1,
      todo: "buy spread",
      important: true,
      checked: false,
    },
    {
      id: 2,
      todo: "buy condons",
      important: false,
      checked: false,
    },
    {
      id: 3,
      todo: "buy pelmetosi",
      important: false,
      checked: true,
    },
  ]
  return (
    <div className="App">
      <h1>do it!</h1>
      <div className="container">
        {toDos.map((todo) => (
          <div key={todo.id}>{todo.todo}</div>
        ))}
      </div>
    </div>
  )
}

export default App
