import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NotFound } from '../pages/404';
import { Details } from '../pages/details';
import { Home } from '../pages/home';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details" element={<Details />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
