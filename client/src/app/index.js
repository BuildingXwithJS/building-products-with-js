// npm packages
import React from 'react';

import Header from '../components/header';
import Footer from '../components/footer';

export default ({children}) => (
  <div className="container">
    <Header />
    {children}
    <Footer />
  </div>
);
