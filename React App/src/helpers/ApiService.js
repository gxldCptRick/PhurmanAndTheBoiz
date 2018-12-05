/* eslint-disable no-console, no-unused-vars */
import * as Path from "path";
import AuthHeader from "./AuthHeader";
import fetch from "node-fetch";
const rootPath = "https://gxldcptrick-demo-app.herokuapp.com/api/dnd";

export function DeleteResource(resourceName: string, id: string = "") {
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
  });
}

export function PutToResource(
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
  });
}

export function PostToResource(
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
  });
}

export function GetResource(
  resourceName: string,
  id: string = ""
): Promise<Response> {
  let path = `${rootPath}/${resourceName}/${id}`;
  console.log(path);
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
export function LoginUser(user): Promise<any> {
  return PostToResource(SpecialPaths.Login, user)
    .then(response => response.json())
    .then(json => {
      localStorage.setItem("user", JSON.stringify(json));
      return json;
    });
}

export function RegisterUser(user: any): Promise<any> {
  return PostToResource(SpecialPaths.Register, user)
  .then(response => response.json())
}

export const Resource = {
  Users: "User",
  Characters: "CharacterSheet",
  Maps: "Map",
  Items: "Item",
  UserCharacter: 'Charactersheet/User',
};
