import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PeoplePage from '../../pages/peoplePage';
import ErrorPage from '../../pages/errorPage';
import AboutPage from '../../pages/aboutPage';

const navigationRoutes = [
  { path: '/', element: <PeoplePage /> },
  { path: '/:page', element: <PeoplePage /> },
  { path: '/:page/:detailsId', element: <PeoplePage /> },
  { path: '/about', element: <AboutPage /> },
  { path: '*', element: <ErrorPage /> },
];

export default function AppRoutes() {
  return (
    <BrowserRouter basename="/starwars-rsschool">
      <Routes>
        {navigationRoutes.map((el) => (
          <Route key={el.path} path={el.path} element={el.element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}
