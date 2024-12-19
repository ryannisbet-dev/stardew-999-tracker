import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PageTemplate from './pages/pageTemplate';
import Header from './components/header';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/:id" element={<PageTemplate />} />
      </Routes>
    </>
  );
}

export default App;