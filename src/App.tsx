import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import InfiniteScroll from './components/InfiniteScroll';
import Pagination from './components/Pagination';

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<InfiniteScroll />} />
        <Route path="/pagination" element={<Pagination />} />
      </Routes>
    </Router>
  );
};

export default App;