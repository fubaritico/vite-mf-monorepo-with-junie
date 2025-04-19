declare module 'list/List' {
  import { FC } from 'react';
  const List: FC;
  export default List;
}

declare module 'list/routes' {
  import { RouteObject } from 'react-router-dom';
  export const routes: RouteObject[];
}

declare module 'detail/Detail' {
  import { FC } from 'react';
  const Detail: FC;
  export default Detail;
}

declare module 'detail/routes' {
  import { RouteObject } from 'react-router-dom';
  export const routes: RouteObject[];
}
