import { Dispatch } from "@reduxjs/toolkit";
import { Task } from "../../interfaces/task";
import { TaskActions } from "../reducers/task";
import {v4 as uuid} from 'uuid'

export const addTaskAction = (task: Task) => (dispatch: Dispatch) => {
    const taskToAdd = {
        ...task,
        id: uuid()
    }
    dispatch(TaskActions.addTask(taskToAdd))
}

export const updateTaskAction = (task: Task) => (dispatch: Dispatch) => {
    dispatch(TaskActions.updateTask(task))
}

export const removeTaskAction = (taskId: string) => (dispatch: Dispatch) => {
    dispatch(TaskActions.removeTask(taskId))
}