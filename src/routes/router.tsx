import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from '../layout';
import { NotFound } from '../pages/404';
import { Details } from '../pages/details';
import { Home } from '../pages/home';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/details/:crypto" element={<Details />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
