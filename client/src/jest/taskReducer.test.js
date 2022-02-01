import configureStore from "redux-mock-store";
import axios from "axios";
import thunk from "redux-thunk";
import reducer, {
  loadTasks,
  addTask,
  toggleTask,
  deleteTask,
} from "../store/taskSlice";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const DB = [
  {
    _id: "61f3edb5ed57256a2768d29b",
    title: "1",
    completed: false,
    color: "#FFFFFF",
    __v: 0,
  },
  {
    _id: "61f3edffed57256a2768d2b4",
    title: "2",
    completed: false,
    color: "#FFFFFF",
    __v: 0,
  },
  {
    _id: "61f3ee00ed57256a2768d2b6",
    title: "3",
    completed: false,
    color: "#FFFFFF",
    __v: 0,
  },
];

const initialState = {
  tasks: [],
  allChecked: false,
  filter: "all",
};

const fetchMock = jest.spyOn(axios, "get").mockImplementation(() =>
  Promise.resolve({
    status: 200,
    json: () => Promise.resolve({ payload: DB.data }),
  })
);

it("Should get all tasks", async () => {
  const getAllTasks = jest.spyOn(axios, "get");
  getAllTasks.mockImplementation(() =>
    Promise.resolve({
      status: 200,
      data: DB,
    })
  );
  const store = mockStore(initialState);
  const request = await store.dispatch(loadTasks());
});

it("Should add task", async () => {
  expect.assertions(1);
  const title = "Новое название";
  const newTask = jest.spyOn(axios, "post");
  newTask.mockImplementation(() =>
    Promise.resolve({
      status: 200,
      statusText: "OK",
      data: {
        data: {
          title,
          completed: false,
          color: "#FFFFFF",
          _id: "61f8059d87cfd56eb2401b47",
          __v: 0,
        },
      },
    })
  );

  const store = mockStore(initialState);
  const request = await store.dispatch(addTask(title));
  const newState = reducer(store.getState(), request);
  expect(newState.tasks).toContainEqual({
    title,
    completed: false,
    color: "#FFFFFF",
    _id: "61f8059d87cfd56eb2401b47",
    __v: 0,
  });
  expect(newState.tasks).toHaveLength[1];
});

it("Should toggle completed task", async () => {
  expect.assertions(1);
  const id = "1";
  const completed = false;
  const newToggledTask = jest.spyOn(axios, "put");
  newToggledTask.mockImplementation(() =>
    Promise.resolve({
      data: {
        data: {
          title: "Меняем completed",
          completed: !completed,
          color: "#FFFFFF",
          _id: id,
          __v: 0,
        },
      },
    })
  );

  const store = mockStore(initialState);
  const request = await store.dispatch(toggleTask(id, completed));
  const newState = reducer(store.getState(), request);
  expect(newToggledTask).toHaveBeenCalled();
});

it("Should remove task", async () => {
  expect.assertions(1);
  const id = "5";
  const deletedTask = jest.spyOn(axios, "delete");
  deletedTask.mockImplementation(() =>
    Promise.resolve({
      data: {
        data: {
          _id: "5",
          title: "Нужно удалить",
          completed: false,
          color: "#FFFFFF",
          __v: 0,
        },
      },
    })
  );

  const store = mockStore(initialState);
  const request = await store.dispatch(deleteTask(id));

  expect(deletedTask).toHaveBeenCalledWith(
    `http://localhost:8000/api/todo/${id}`
  );
});
