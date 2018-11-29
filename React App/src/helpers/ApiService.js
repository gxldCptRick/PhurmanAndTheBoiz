import * as Path from "path";
import AuthHeader from "./AuthHeader";
const rootPath = "http://gxldcptrick-demo-app.heroku/api/dnd";

function DeleteResource(resource: string, id:string){
    return fetch(Path.join(rootPath, resource, id), {
        method: "DELETE",
        mode: "cors",
        cache: "no-cache",
        redirect: "follow",
        credentials: "include",
        body: JSON.stringify(data),
        headers:{
           "Content-Type": "application/json; charset=utf-8",
           ...AuthHeader()
        }
    })
}

function PutToResource(resource: string, data): Promise<Response> {
  return fetch(Path.join(rootPath, resource), {
    method: "PUT",
    mode: "cors",
    cache: "no-cache",
    redirect: "follow",
    credentials: "include",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...AuthHeader()
    }
  });
}

function PostToResource(resource: string, data): Promise<Response> {
  return fetch(Path.join(rootPath, resource), {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    redirect: "follow",
    credentials: "include",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...AuthHeader()
    }
  });
}

function GetResource(resourceName: string, id = "": string): Promise<Response> {
  fetch(Path.join(rootPath, resourceName), {
    method: "GET",
    mode: "cors",
    redirect: "follow",
    credentials: "include",
    cache: "no-cache",
    headers: {
      ...AuthHeader()
    }
  });
}

export function GetAllTheUsers(): Promise<void | Response> {
  return GetResource("User").catch(err => console.warn(err));
}

export function GetSpecificUser(id: number): Promise<void | Response> {
  return GetResource(`User`, id.toString()).catch(err => console.warn(err));
}

export function Login(login: {
  userName: string,
  password: string
}): void {
  PostToResource("User/Authenticate", login)
  .then(function(response){
    if(response.status === 200){
      return response.json();
    }else {
      throw new TypeError(response.json());
    }
  })
  .then(function(user){
    localStorage.setItem("user", JSON.stringify(user));
  })
  .catch(function(err){
    console.log(err);
    throw err;
  });
}

export function RegisterUser(newUser): Promise<void | Response> {
  return PostToResource("User/Register", newUser).catch(err => console.warn(err));
}


export function DeleteUser(id): Promise<void | Response>{

}