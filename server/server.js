const express = require("express")
const { Router } = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const mongoose = require("mongoose")
const { Schema, model } = require("mongoose")

const app = express()
const router = Router()
const PORT = 5000
const uri = "mongodb+srv://keks:22101995@cluster0.o9t1k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

app.use(cors())
app.use(bodyParser.json())
app.use(router)
app.use(express.urlencoded({ extended: true }))

const schema = new Schema({
  todo: { type: String, required: true },
  important: { type: Boolean, required: true },
  checked: { type: Boolean, required: true },
})

const Todo = model("Todo", schema)

router.get("/", async (req, res) => {
  const todos = await Todo.find({})
  res.json(todos)
})

router.post("/", async (req, res) => {
  const todo = new Todo(req.body)
  await todo.save()
  const todos = await Todo.find({})
  res.json(todos)
})

router.delete("/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id)
  const todos = await Todo.find({})
  res.json(todos)
})

router.put("/:id", async (req, res) => {
  await Todo.findByIdAndUpdate(req.params.id, req.body)
  const todos = await Todo.find({})
  res.json(todos)
})

async function start() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
  } catch (e) {
    console.log("Server Error", e.message)
    process.exit(1)
  }
}

start()
