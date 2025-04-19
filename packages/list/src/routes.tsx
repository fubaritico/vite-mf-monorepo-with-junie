import { RouteObject } from 'react-router-dom';
import App from './App';
import List from './components/List';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <List />,
      },
    ],
  },
];
