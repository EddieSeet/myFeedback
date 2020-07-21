//used by the auth0's jwt library to retrieve the token from localstorage.
export function tokenGetter() {
    //get the item "id_token"
    //which is the coded token
    return localStorage.getItem("id_token");
}