# EV-test
"npm start" to start our application

First We need to Create Admin user 

http://localhost:4000/api/user  with Post method
{
  "email":"joseph@gmail.com",
  "password":"admin",
  "isAdmin":true
}
second You login with admincredential with post method
http://localhost:4000/api/user/login
{
  "email":"joseph@gmail.com",
  "password":"admin",
  }
  
 Now give the token in the Header part section Authorization Bearer token method
 Authorization : Bearser Token  in Header
 Now Admin can Create or manupulate Articles by its Id ,
http://localhost:4000/api/article  with post method and update with Put method


{
  "title":"Make High Dreams",
  "content":"content of artile Here"
}

{
  "title":"Life is Beautiful",
  "content":"Enjoy every moment in your life",
  "id":1
}
