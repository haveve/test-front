import React from "react";
import { ajax } from 'rxjs/ajax';
import { map, catchError } from 'rxjs';
import {
  useNavigate,
  Outlet
} from "react-router-dom";
import { getCookie,deleteCookie } from "../Api/login-logout";
import '../Styles/MainPage.css';
export function MainPage() {

  const navigate = useNavigate();

  const onClickHandler = (path: string) => {
    navigate(path);
  }

  ajax({
    url: "https://localhost:7226/graphql",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Authorization": "Bearer " + getCookie("access_token")
    },
    body: JSON.stringify({
      query: `query{
            signIn
          }`}),
    withCredentials: true,
  }).pipe(
    map((value): void => {

      if (200 > value.status && value.status > 300)
        throw "wrong data";

    }),
    catchError((error) => {
      throw error
    })
  ).subscribe({
    next: () => {
    },
    error: (value) => { console.log(JSON.stringify(value)); },
    complete: () => { }
  })
  return <div className="main-page">
    <div className="left-sidebar">
      <div className="navigation">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={32}
          height={32}
          fill="white"
          className="bi bi-clock"
          viewBox="0 0 16 16"
          onClick={() => onClickHandler(`/Timer`)}
        >
          <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
          <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={16}
          height={16}
          fill="currentColor"
          className="bi bi-people"
          viewBox="0 0 16 16"
          onClick={() => onClickHandler(`/Manage`)}
        >
          <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8Zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022ZM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816ZM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
        </svg>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-box-arrow-right"
        viewBox="0 0 16 16"
        onClick={()=>{
          deleteCookie("access_token");
          onClickHandler(`/Login`)
        }}
        >
        <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
        <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
      </svg>
    </div>
    <div className="main-content">
      <Outlet />
    </div>
  </div>;
}