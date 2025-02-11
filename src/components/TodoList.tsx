"use client";

import {
  TodoItem,
  TodoText,
  TodoInput,
  Button,
  EmptyMessage,
  Card,
} from "./styles";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { updateTodo, deleteTodo } from "../store/todosSlice";
import {
  updateTodoApi,
  deleteTodoApi,
  updateTodoStatusApi,
} from "../api/todoApi";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { toggleStatus } from "../store/todosSlice";

export default function TodoList() {
  const todos = useSelector((state: RootState) => state.todos.todos);
  const loading = useSelector((state: RootState) => state.todos.loading);
  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [updatedTitle, setUpdatedTitle] = useState("");

  const handleEdit = async (id: string) => {
    try {
      const token = await getAccessTokenSilently();
      const headers = { Authorization: `Bearer ${token}` };
      const updatedTodo = await updateTodoApi(id, updatedTitle, headers);
      dispatch(updateTodo(updatedTodo));
      setEditingId(null);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleStatusToggle = async (id: string) => {
    dispatch(toggleStatus(id));

    try {
      const token = await getAccessTokenSilently();
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const updatedTodo = await updateTodoStatusApi(id, headers);
      dispatch(updateTodo(updatedTodo));
    } catch (error) {
      console.error("Error updating todo status:", error);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the item?`
    );
    if (!confirmDelete) return;

    try {
      const token = await getAccessTokenSilently();
      const headers = { Authorization: `Bearer ${token}` };
      await deleteTodoApi(id, headers);
      dispatch(deleteTodo(id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const startEditing = (id: string, currentTitle: string) => {
    setEditingId(id);
    setUpdatedTitle(currentTitle);
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <Card>
      {todos.length === 0 ? (
        <EmptyMessage>No todos to show</EmptyMessage>
      ) : (
        <ul>
          {todos.map((todo) => (
            <TodoItem key={todo._id}>
              {editingId === todo._id ? (
                <>
                  <TodoInput
                    type="text"
                    value={updatedTitle}
                    onChange={(e) => setUpdatedTitle(e.target.value)}
                  />
                  <Button color="#28a745" onClick={() => handleEdit(todo._id)}>
                    Save
                  </Button>
                  <Button color="#6c757d" onClick={() => setEditingId(null)}>
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <TodoText
                    onClick={() => handleStatusToggle(todo._id)}
                    $status={todo.status}
                  >
                    {todo.title}
                  </TodoText>

                  <Button
                    color="#007bff"
                    onClick={() => startEditing(todo._id, todo.title)}
                  >
                    Edit
                  </Button>
                  <Button
                    color="#dc3545"
                    onClick={() => handleDelete(todo._id)}
                  >
                    Delete
                  </Button>
                </>
              )}
            </TodoItem>
          ))}
        </ul>
      )}
    </Card>
  );
}
