import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
import services from "./services/services.json";

import App from './App';
import Header from "./header";
import Services from "./services/";
import Welcome from "./welcome";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Header />
      <Welcome />
      <Services services={services}/>
  </React.StrictMode>
);
