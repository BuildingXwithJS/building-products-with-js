// npm packages
import React from 'react';

import Footer from '../components/footer';

export default ({children}) => (
  <div className="container">
    {children}
    <Footer />
  </div>
);
