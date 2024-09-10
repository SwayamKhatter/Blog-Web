import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Layout.jsx';
import Home from './components/Home.jsx';
import Register from './components/Register.jsx';
import Login from './components/Login.jsx';
import ArticleList from './components/ArticleList.jsx';
import MyArticles from './components/MyArticles.jsx';
import ArticleDetail from './components/ArticleDetail.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>, // Use Layout as the main wrapper
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "articles",
        element: <ArticleList />,
      },
      {
        path:"myarticles",
        element: <MyArticles />
      },
      {
        path: "articles/:id",
        element: <ArticleDetail />,
      },
         
      
      {
        path: "signup",
        element: <Register />,
      },
      {
        path: "signin",
        element: <Login />,
      }

    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
