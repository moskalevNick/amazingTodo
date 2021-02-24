const express = require("express")
const { Router } = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const mongoose = require("mongoose")

const app = express()
const router = Router()
const PORT = 3000
const uri = "mongodb+srv://keks:22101995@cluster0.o9t1k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

app.use(cors())
app.use(bodyParser.json())
app.use(router)
app.use(express.urlencoded({ extended: true }))

const toDos = [
  {
    id: 1,
    todo: "купить хлеб",
    checked: true,
    important: false,
  },
  {
    id: 2,
    todo: "вынести мусор",
    checked: true,
    important: true,
  },
  {
    id: 3,
    todo: "поесть",
    checked: false,
    important: false,
  },
  {
    id: 4,
    todo: "поспать",
    checked: false,
    important: true,
  },
]

router.get("/", (req, res) => {
  res.json(toDos)
})

router.post("/", (req, res) => {
  toDos.push(req.body)
  res.send("success")
})

router.delete("/:id", (req, res) => {
  const newtoDos = toDos.filter((item) => item.id.toString() !== req.params.id)
  toDos.splice(0, toDos.length)
  newtoDos.forEach((item) => toDos.push(item))
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
