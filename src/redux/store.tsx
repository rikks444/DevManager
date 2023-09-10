import { configureStore } from '@reduxjs/toolkit'
import taskReducer from "./reducers/task"

export default configureStore({
    reducer: {
      task: taskReducer,
    },
  })