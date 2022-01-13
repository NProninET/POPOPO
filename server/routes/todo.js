const express = require("express")
const router = express.Router()

const {
    getAllTodo,
    postCreateTodo,
    putUpdateTodo,
    deleteTodo,
    updateAllTodos,
    deleteCompletedTodos,
} = require("../controllers/todo")

router.get("/", getAllTodo)

router.post("/", postCreateTodo)

router.put("/:id", putUpdateTodo)

router.put("/", updateAllTodos)

router.delete("/:id", deleteTodo)

router.delete("/", deleteCompletedTodos)

module.exports = router