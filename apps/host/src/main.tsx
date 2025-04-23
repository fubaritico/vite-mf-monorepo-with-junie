import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <div>Loading...</div>,
  },
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App
