import { QueryClient } from '@tanstack/react-query';
import type { FC } from 'react';
import type { Params } from 'react-router-dom';
import './Detail.css';
import '../index.css';
type ThisComponent = FC & {
    loader: (queryClient: QueryClient) => ({ params }: {
        params: Params<'id'>;
    }) => Promise<Movie>;
};
declare const Detail: ThisComponent;
export default Detail;
