import { RouteObject } from 'react-router-dom';
import App from './App';
import Detail from './components/Detail';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'detail/:id',
        element: <Detail />,
      },
    ],
  },
];
