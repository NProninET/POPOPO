import taskReducer, { loadTasks } from "../store/taskSlice";

test("Should return the initial state", () => {
  expect(taskReducer(undefined, {})).toEqual({
    tasks: [],
    filter: "All",
    allChecked: false,
  });
});

describe('It should return tasks', ()=> {
    const action = {type: loadTasks.fulfilled, payload: {id: 1, title: "qwerty", completed: false, color: "#FFFFFF"}}
    
})
