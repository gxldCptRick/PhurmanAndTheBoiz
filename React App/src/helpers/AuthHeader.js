export default function AuthHeader() {
  let userJson = localStorage.getItem("user");
  let user = JSON.parse(userJson);
  if(user === null || user === undefined) return;
  let authHeader = { "Authorization": `Bearer ${user.token || ""}` };
  return authHeader;
}
