const express = require("express")
const router = express.Router()

const {
    getAllTodo,
    postCreateTodo,
    putUpdateTodo,
    deleteTodo,
    getTodo,
} = require("../controllers/todo")

// router.get("/:id", getTodo)

router.get("/", getAllTodo)

router.post("/", postCreateTodo)

router.put("/:id", putUpdateTodo)

// router.put("/:id", putUpdateCompleteTodo)

router.delete("/:id", deleteTodo)

module.exports = router