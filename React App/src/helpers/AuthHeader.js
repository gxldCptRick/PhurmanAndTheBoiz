export default function AuthHeader() {
  let userJson = localStorage.getItem("user");
  if (userJson === undefined) return;
  let user = JSON.parse(userJson);
  if(user === null || user === undefined) throw new Error("User Parsing Failed");
  let authHeader = { "Authorization": `Bearer ${user.token || ""}` };
  console.log(authHeader);
  return authHeader;
}
