import { ajax } from 'rxjs/ajax';
import { map, catchError, Observer } from 'rxjs';
import {
  redirect,
  useNavigate,
} from "react-router-dom";


const url= "https://localhost:7226/";

export function ajaxForLoginLogout(path: string, value: {}) {
  return ajax({
    url: url+path,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(value),
    withCredentials:true,
  }).pipe(
    map((value): void => {

      var response = value.response as {access_token:string}

      if((200>value.status&&value.status>300)||!response||!response.access_token)
        throw "you are lox";

      setCookie({name : "access_token", value : response.access_token, expires_second: 365*24*60*60,path:"/" });

    }),
    catchError((error) => {
      throw error
    })
  );
}

type navigateType = ReturnType<typeof useNavigate>;

export const getQueryObserver = (setError:(value:string)=>void,commitNavigate:navigateType,path:string):Observer<any>=> {
  return {
    next: () => {
      commitNavigate(path);
      },
    error: (value) =>{setError("User does not exist"); console.log(JSON.stringify(value));},
    complete: () => { }
  }
}


export function getCookie(name:string) {
  name = name +"=";
  var ca = document.cookie.split(';');
  for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while(c.charAt(0)==' ') {
          c = c.substring(1);
      }
      if(c.indexOf(name) == 0) {
          return decodeURIComponent( c.substring(name.length,c.length) );
      }
  }
  return null;
}

export function setCookie(cookieParams:setCookieParamas){
  var s = cookieParams.name+'='+encodeURIComponent(cookieParams.value)+';';
 if( cookieParams.expires_second ){
 var d=new Date();
 d.setTime( d.getTime()+ cookieParams.expires_second*1000  );
 s+=' expires='+d.toUTCString()+';';
 }
 if(cookieParams.path) s+=' path='+cookieParams.path+';';
 if(cookieParams.domain) s+=' domain='+cookieParams.domain+';';
 if(cookieParams.secure)s+=' secure;';
 document.cookie=s;
}

export function deleteCookie(name:string){
  document.cookie=name+'=; expires='+Date();}

export function getTokenOrNavigate(isLoginRedirect:boolean = false){
  var token = getCookie("access_token");
  if(!token && !isLoginRedirect){
    return redirect("/Login");
  }
  else if (isLoginRedirect && token)
  return redirect("/");

  return token;
}

  type setCookieParamas = {name:string, value:string, expires_second?:number, path?:string, domain?:string, secure?:boolean}

