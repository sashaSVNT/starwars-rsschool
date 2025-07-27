import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PeoplePage from '../../pages/peoplePage';
import ErrorPage from '../../pages/errorPage';

export default function AppRoutes() {
  const navigationRoutes = [
    { path: '/', element: <PeoplePage /> },
    { path: '/:page', element: <PeoplePage /> },
    { path: '/:page/:detailsId', element: <PeoplePage /> },
    { path: '*', element: <ErrorPage /> },
  ];

  return (
    <BrowserRouter basename="/starwars-rsschool">
      <Routes>
        {navigationRoutes.map((el, i) => (
          <Route key={i} path={el.path} element={el.element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}
