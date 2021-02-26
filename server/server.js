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
  toDos.push(req.body)
  res.send("success")
})

router.delete("/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id)
  //const newtoDos = toDos.filter((item) => item.id.toString() !== req.params.id)
  //toDos.splice(0, toDos.length)
  //newtoDos.forEach((item) => toDos.push(item))
  res.send("delete")
})

router.put("/", (req, res) => {
  toDos.forEach(function (item, i) {
    if (req.body.id == item.id.toString()) {
      toDos[i] = req.body
    }
  })
  res.send("success")
})

async function start() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
  } catch (e) {
    console.log("Server Error", e.message)
    process.exit(1)
  }
}

start()
