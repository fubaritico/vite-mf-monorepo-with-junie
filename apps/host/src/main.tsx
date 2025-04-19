import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App';
import Loading from './components/Loading';
import ErrorBoundary from './components/ErrorBoundary';

// Define the routes with lazy loading
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        async lazy() {
          // Lazy load the List component from the 'list' remote
          const { default: List } = await import('list/List');
          return { Component: List };
        },
      },
      // We'll just implement the home route with the list for now
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Suspense fallback={<Loading />}>
        <RouterProvider router={router} />
      </Suspense>
    </ErrorBoundary>
  </React.StrictMode>,
);
