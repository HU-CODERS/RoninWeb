import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter as cBr,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import './index.css';

// Pages
import Home from './pages/Home';
import Error404 from './pages/Error404';

const App = () => {

  const router = cBr(
    createRoutesFromElements(
      <>
        <Route path="*" element={<Error404 />} />
        <Route path="/" element={<Home />} />
      </>
    )
  );

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
};

// Solo crear el root una vez
const container = document.getElementById('root')! as HTMLElement & { __reactRoot?: any };

if (!container.__reactRoot) {
  container.__reactRoot = ReactDOM.createRoot(container);
}

container.__reactRoot.render(<App />);
