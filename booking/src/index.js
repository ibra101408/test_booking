import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
import App from './App';
import SectionTest from "./section_test";
import Header from "./header";
import Services from "./services/";
import Service_test from "./services/service_test";
import Button from "./button";
import Welcome from "./welcome";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Header />
      <Welcome />
      <Services />
  </React.StrictMode>
);
