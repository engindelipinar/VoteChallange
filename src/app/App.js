import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import s from './App.module.css';

const ListPage = lazy(() => import('../pages/ListPage'));
const AddPage = lazy(() => import('../pages/AddPage'));

function App() {
  return (
    <>
    <BrowserRouter>
      <Suspense fallback={<div className={s.ldsRing}><div></div><div></div><div></div><div></div></div>}>
        <Routes>
          <Route path="/" element={<ListPage />} />
          <Route path="/add" element={<AddPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
    </>
  );
}

export default App;
