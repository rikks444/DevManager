import { createSlice } from '@reduxjs/toolkit'
import { IStoreState } from '../../interfaces/task'

const InitialTaskList: IStoreState = {
    tasks: [],
}


export const taskSlice = createSlice({
    name: 'Task',
    initialState: InitialTaskList,
    reducers: {
      addTask: (state, action) => {
        return {
            ...state,
            tasks: [...state.tasks, action.payload]
        }
      },
      removeTask: (state, action) => {
        return {
            ...state,
            tasks: state.tasks.filter(task => task.id !== action.payload)
        }
      },
      updateTask: (state, action) => {
        return {
          ...state,
          tasks: state.tasks.map(task => {
            if(task.id === action.payload.id){
              return action.payload
            }

            return task
          })
        }
      }
    },
  })
  
  // Action creators are generated for each case reducer function
  export const TaskActions = taskSlice.actions
  
  export default taskSlice.reducer  