import React from 'react';
import ReactDOM from 'react-dom/client';
import './Styles/index.css';
import Login from './Features/Login';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import { MainPage } from './Features/MainPage';
import { getTokenOrNavigate } from './Api/login-logout';


export const loader =(isLoginRedirect:boolean = false)=> async()=>{
  const tokenOrRedirect = getTokenOrNavigate(isLoginRedirect);
  return tokenOrRedirect;
}

const router = createBrowserRouter([{
  path: "/",
  element: <MainPage />,
  errorElement: <div>Olex lox</div>,
  loader: loader(false),
  children:[
    {
      path:"/",
      element:<div>Timer</div>   
    },
    {
      path:"/Timer",
      element:<div>Timer</div>   
    },
    {
      path:"/Manage",
      element:<div>Manage</div>   
    }
  ]
},
{
  path:"/Login",
  element: <Login />,
  errorElement: <div>Olex lox</div>,
  loader: loader(true)
}]);


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
