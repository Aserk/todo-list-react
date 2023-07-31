import { createSlice } from '@reduxjs/toolkit';
import { getTasksFromLocalStorage } from './tasksLocalStorage';

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: getTasksFromLocalStorage(),
        hideDone: false,
    },
    reducers: {
        addTask: ({ tasks }, { payload: newTask }) => {
            tasks.push(newTask);
        },
        toogleHideDone: state => {
            state.hideDone = !state.hideDone;
        },
        toogleTaskDone: ({ tasks }, { payload: taskId }) => {
            const index = tasks.findIndex(({ id }) => id === taskId);
            tasks[index].done = !tasks[index].done;
        },
        removeTask: ({ tasks }, { payload: taskId }) => {
            const index = tasks.findIndex(({ id }) => id === taskId);
            tasks.splice(index, 1);
        },
        setAllDone: ({ tasks }) => {
            for (const task of tasks) {
                task.done = true;
            }
        },
        fetchExampleTasks: () => {},
        setTasks: (state, {payload: tasks}) => {
            state.tasks = tasks;
        },
    },
});

export const {
    addTask,
    toogleHideDone,
    toogleTaskDone,
    removeTask,
    setAllDone,
    fetchExampleTasks,
    setTasks,
} = tasksSlice.actions;

const selectTasksState = state => state.tasks;

export const selectTasks = state => selectTasksState(state).tasks;
export const selectHideDone = state => selectTasksState(state).hideDone;
export const selectIsTasksEmpty = state => selectTasks(state).length === 0;
export const selectIsEveryTasksDone = state => selectTasks(state).every(({ done }) => done);

export default tasksSlice.reducer;