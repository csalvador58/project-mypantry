# My Pantry

For test use only:

Deployed At: project-mypantry-frontend-production.up.railway.app
See Project Board for status: https://github.com/users/csalvador58/projects/4



Description:

```mermaid
sequenceDiagram
%%{init: {'theme':'forest'}}%%

box Authorization
participant User
participant (Route) /register
participant (Route) /login
participant (DAO) Create/Update JWT token
participant (Middleware) Validate User
end

box Routes (After Login)
participant (Route) /pantry
participant (Route) /recipe
end

box External Components
participant (External) Recipe API
participant (External) AI Chat
end

box Mongo DB
participant db_user
participant db_user_Pantry
end

%% Create a new account
rect rgb(200, 226, 200)
User ->> (Route) /register: Sends new username and password
(Route) /register ->> db_user: Checks for duplicate username
db_user -->> (Route) /register: Confirms with Success/Fail
(Route) /register -->> User: Response - Success/Fail
end

%% Any User logs in
rect rgb(170, 226, 170)
User ->> (Route) /login: Sends request to Login with email/password
(Route) /login ->> db_user: Retrieve user data and encrypted password
db_user -->> (Route) /login: Confirms with data + Success/Fail
(Route) /login ->> db_user_Pantry: Retrieve user pantry data
db_user_Pantry -->> (Route) /login: Confirms with data + Success/Fail
(Route) /login ->> (DAO) Create/Update JWT token: Validates login with bcrypt and request a new JWT Token
(DAO) Create/Update JWT token -->> (Route) /login: Generates new JWT Token with UserId with a timed token expiration
(Route) /login -->> User: Response - JWT token/Error not authorized
end

%% User requests with token
rect rgb(140, 226, 140)
User ->> (Middleware) Validate User: All requests require a valid token
(Middleware) Validate User -->> User: Response - Error invalid token
end

%% Create a new pantry item
rect rgb(110, 226, 110)
(Middleware) Validate User ->> (Route) /pantry : Sends Name, Qty, Fav, Price, Notes
(Route) /pantry ->> db_user_Pantry: Store userId and pantry item data
db_user_Pantry -->> (Route) /pantry: Confirms with Success/Fail and sends updated pantry data
(Route) /pantry -->> User: Response - Success/Fail
end

%% Read pantry
rect rgb(110, 226, 110)
(Middleware) Validate User ->> (Route) /pantry : Sends userId
(Route) /pantry ->> db_user_Pantry: Read pantry data by userId
db_user_Pantry -->> (Route) /pantry: Confirms with Success/Fail and sends updated pantry data
(Route) /pantry -->> User: Response - Success/Fail
end

%% Read favorite recipes
rect rgb(110, 226, 110)
(Middleware) Validate User ->> (Route) /recipe : Sends userId
(Route) /recipe ->> db_user_Pantry: Read recipe data by userId
db_user_Pantry -->> (Route) /recipe: Confirms with Success/Fail and sends updated pantry data
(Route) /recipe -->> User: Response - Success/Fail
end

%% Update a pantry item
rect rgb(80, 226, 80)
(Middleware) Validate User ->> (Route) /pantry : Sends updated Name, Qty, Fav, Price, Notes
(Route) /pantry ->> db_user_Pantry: Update with userId and pantry item data by itemId
db_user_Pantry -->> (Route) /pantry: Confirms with Success/Fail and sends updated pantry data
(Route) /pantry -->> User: Response - Success/Fail
end

%% Delete a pantry item
rect rgb(80, 226, 80)
(Middleware) Validate User ->> (Route) /pantry : Sends pantry item name
(Route) /pantry ->> db_user_Pantry: Remove pantry item by itemId
db_user_Pantry -->> (Route) /pantry: Confirms with Success/Fail and sends updated pantry data
(Route) /pantry -->> User: Response - Success/Fail
end

%% Recipe Suggestions from an API
rect rgb(50, 226, 50)
(Middleware) Validate User ->> (Route) /recipe : Sends recipe filters
(Route) /recipe ->> (External) Recipe API: Fetch recipes from API 
(External) Recipe API -->> (Route) /recipe: Receive recipes from API 
(Route) /recipe -->> User: Response - Success/Fail
end

%% Recipe Suggestions from AI chat
rect rgb(50, 226, 50)
(Middleware) Validate User ->> (Route) /recipe : Sends user chat message with pantry data and favorite recipes
(Route) /recipe ->> (External) AI Chat: Fetch recipes from API chat 
(External) AI Chat -->> (Route) /recipe: Receive recipes from API chat
(Route) /recipe -->> User: Response - Success/Fail
end
```






