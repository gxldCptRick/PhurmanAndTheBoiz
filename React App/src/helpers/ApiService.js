/* eslint-disable no-console, no-unused-vars */
import * as Path from "path";
import {} from 'react'
import AuthHeader from "./AuthHeader";
import fetch from "node-fetch";
const rootPath = "https://gxldcptrick-demo-app.herokuapp.com/api/dnd";

function DeleteResource(resourceName: string, id: string = "") {
  let path = `${rootPath}/${resourceName}/${id}`;
  return fetch(path, {
    method: "DELETE",
    mode: "cors",
    cache: "no-cache",
    redirect: "follow",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...AuthHeader()
    }
  }).then(function(response){
    if(response.status === 401) throw new Error("Must Login Before Attempting To Post.");
    return response;
  });
}

function PutToResource(
  resourceName: string,
  id: string = "",
  data: any
): Promise<Response> {
  if (data === undefined || data === null) {
    throw new TypeError("Cannot Put an undefined object");
  }
  let path = `${rootPath}/${resourceName}/${id}`;
  return fetch(path, {
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
  }).then(function(response){
    if(response.status === 401) throw new Error("Must Login Before Attempting To Post.");
    return response;
  });
}

function PostToResource(
  resourceName: string,
  data: any
): Promise<Response> {
  let path = `${rootPath}/${resourceName}`;
  return fetch(path, {
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
  }).then(function(response){
    if(response.status === 401) throw new Error("Must Login Before Attempting To Post.");
    return response;
  });
}

function GetResource(
  resourceName: string,
  id: string = ""
): Promise<Response> {
  let path = `${rootPath}/${resourceName}/${id}`;
  return fetch(path, {
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

const SpecialPaths = {
  Register: "User/Register",
  Login: "User/Authenticate",
};
export function LoginUser(user:any): Promise<any> {
  return PostToResource(SpecialPaths.Login, user)
    .then(response => response.json())
    .then(json => {
      localStorage.setItem("user", JSON.stringify(json));
      return json
    })
}

function RegisterUser(user: any): Promise<any> {
  return PostToResource(SpecialPaths.Register, user)
  .then(response => response.json())
}

const Resource = {
  Users: "User",
  Characters: "CharacterSheet",
  Maps: "Map",
  Items: "Item",
  UserCharacter: "Charactersheet/User",
  UserItem: "Item/User"
};
export {
  Resource,
  RegisterUser,
  GetResource,
  PostToResource,
  PutToResource,
  DeleteResource
}