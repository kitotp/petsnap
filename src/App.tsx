import { createBrowserRouter, RouterProvider } from "react-router-dom"
import HomePage from "./features/Home/HomePage"
import LoginPage from "./features/Login/LoginPage"
import AppLayout from "./ui/AppLayout"
import PostsPage from "./features/Posts/PostsPage"
import AdminPage from "./features/Admin/AdminPage"

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: '/login',
        element: <LoginPage />
      },
      {
        path: '/posts',
        element: <PostsPage />
      },
      {
        path: '/admin',
        element: <AdminPage />
      }
    ]
  },
])

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
