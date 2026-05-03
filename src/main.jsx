import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/montserrat'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import router from './router';

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />,
)
