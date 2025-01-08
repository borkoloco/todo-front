"use client";

import { Provider } from "react-redux";
import { store } from "../store/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchTodos } from "../api/todoApi";
import { setLoading, addTodo } from "../store/todosSlice";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import Navbar from "@/components/Navbar";

function TodosLoader({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const loadTodos = async () => {
      dispatch(setLoading(true));
      try {
        const token = await getAccessTokenSilently();
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const todos = await fetchTodos(headers);
        todos.forEach((todo) => dispatch(addTodo(todo)));
      } catch (error) {
        console.error("Failed to load todos:", error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    loadTodos();
  }, [dispatch, getAccessTokenSilently]);

  return <>{children}</>;
}

const domain = process.env.NEXT_PUBLIC_AUTH0_DOMAIN!;
const clientId = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID!;
const audience = process.env.NEXT_PUBLIC_AUTH0_AUDIENCE!;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    document.title = "My Todo List";
  }, []);
  return (
    <html lang="en">
      <body>
        <Auth0Provider
          domain={domain}
          clientId={clientId}
          authorizationParams={{
            redirect_uri:
              typeof window !== "undefined" ? window.location.origin : "",
            audience: audience,
          }}
        >
          <Provider store={store}>
            <TodosLoader>
              <Navbar />
              {children}
            </TodosLoader>
          </Provider>
        </Auth0Provider>
      </body>
    </html>
  );
}
