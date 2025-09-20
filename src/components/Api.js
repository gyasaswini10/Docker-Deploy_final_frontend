// CallApi
export const BASEURL= "http://localhost:8083/";
export function callApi(reqmethod, url, data, responseHandler){
  var option;
  if(reqmethod === "GET" || reqmethod === "DELETE")
       option = {method : reqmethod, headers: {'Content-Type' : 'application/json'}};
  else
       option = {method : reqmethod, headers: {'Content-Type' : 'application/json'}, body : data};
  fetch(url, option)
       .then(response => {
            if(!response.ok)
                 throw new Error(response.status + " " + response.statusText);
            return response.text();
       })
       .then(data => responseHandler(data))
       .catch(error => alert(error));
}










export function setSession(sesname, sesvalue, expday) {
  let D = new Date();
  D.setTime(D.getTime() + expday * 3600000);
  document.cookie = `${sesname}=${sesvalue};expires=${D.toUTCString()};path=/`;
}











export function getSession(sesname) {
  let decodedCookie = decodeURIComponent(document.cookie);
  let cookieData = decodedCookie.split(';');
  for (let x in cookieData)
    if (cookieData[x].includes(sesname))
      return cookieData[x].substring(cookieData[x].indexOf(sesname) + sesname.length + 1);
  return "";
}
