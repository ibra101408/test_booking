import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
import services from "./services/services.json";

import App from './App';
import Header from "./header";
import Services from "./services/";
import Welcome from "./welcome";
import Choose_style from "./chooseStyle"

const images = [
    "1_1.jpg",
    "1_2.jpg",
    "2_1.jpg",
]

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);
/*
<Header />

<Welcome />
<Services services={services}/>
<Choose_style images={images}/>*/