import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ITodo {
  _id: string;
  title: string;
  status?: boolean;
}

interface TodosState {
  todos: ITodo[];
  loading: boolean;
}

const initialState: TodosState = {
  todos: [],
  loading: false,
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    addTodo: (state, action: PayloadAction<ITodo>) => {
      state.todos.push(action.payload);
    },
    updateTodo: (state, action: PayloadAction<ITodo>) => {
      const index = state.todos.findIndex(
        (todo) => todo._id === action.payload._id
      );
      if (index !== -1) {
        state.todos[index] = action.payload;
      }
    },
    toggleStatus: (state, action: PayloadAction<string>) => {
      const index = state.todos.findIndex(
        (todo) => todo._id === action.payload
      );
      if (index !== -1) {
        state.todos[index].status = !state.todos[index].status;
      }
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => todo._id !== action.payload);
    },
  },
});

export const { setLoading, addTodo, updateTodo, toggleStatus, deleteTodo } =
  todosSlice.actions;

export default todosSlice.reducer;
