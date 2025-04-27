import { QueryClient } from '@tanstack/react-query';
import './List.css';
import type { FC } from 'react';
type ThisComponent = FC & {
    loader: (queryClient: QueryClient) => () => Promise<MovieListResponse>;
};
declare const List: ThisComponent;
export default List;
