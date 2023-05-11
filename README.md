<h1>FlySimple - A flight tariff tracking website</h1>

<p>This is an Express.js application that allows users to create accounts, login, book flights, and sign out. The application uses JWT for user authentication and password hashing for enhanced security.</p>

<h3><i>Features</i></h3>
<ul>
<li>User registration and login with JWT authentication --> <a href="https://jwt.io/">JWT</a></li>
<li>Password hashing for secure storage of user credentials using bcrypt --> <a href="https://www.npmjs.com/package/bcrypt">bcrypt</a></li>
<li>Search and view available flights between source and destination</li>
</ul>

|Deployed Link|
| --- |
|`https://fly-simple-prod.vercel.app/`|

<strong>*Note: PUT AIRPORT CODES (e.g. DEL for New Delhi) TO SEARCH THE FLIGHTS in the production link*

<h3><i>Prerequisites</i></h3>
<ul>
<li>Node.js v14.15.0 or higher</li>
<li>NPM v6.14.8 or higher</li>
<li>MongoDB v4.4 or higher</li>
</ul>

<h3><i>Frontend Installation</i></h3>

## Clone the repo
```bash

git clone https://github.com/prithidevghosh/FlySimple.git

```
## Install the required packages
```bash

cd Frontend
npm install

```

## Start the frontend locally
```bash

npm start

```

<h3><i>Backend Installation</i></h3>

## Clone the repo
```bash

git clone https://github.com/prithidevghosh/FlySimple.git

```
## Install the required packages
```bash

cd Backend
npm install

```

## Start the server locally
```bash

node index.js

```

<h3><i>Configuration</i></h3>

<p>The application requires a MongoDB instance to be set up. You can configure the database connection by setting the following environment variables:</p>

```bash

DATABASE_URI = "URI of your mongoDB instance"
JWT_SECRET_KEY ="your own JWT secret key",
SESSION_SECRET_KEY ="your own key to encrypt the session information"

```
<p>You can set these environment variables in a .env file in the root directory of the application.</p>

<h3><i>API Endpoints</i></h3>

|Base URL|
| --- |
|`https://fly-simple.vercel.app`|

| Endpoint Name | Method | Purpose |
| --- | --- | --- |
| `/api/user/create` | POST | Create a new user |
| `/api/user/create-session` | POST | Create a session for user / Logging In User |
| `/api/user/delete-session` | POST | Deleting session for user / Signing Out User |
| `/api/flights/tariff/{source}/{destination}/{date}` | GET | Find flights between two airports |

*Test the APIs using any tool like <a href="https://www.postman.com/">Postman</a>*

 <h3><i>Screenshots</i></h3>
  
![Image](images/Home.png)
  
*Fig: Home Screen*
  
![Image](images/login.png)
  
*Fig: Login Screen*
 
![Image](images/signup.png)
  
*Fig: Signup Screen*
  
![Image](images/flightsearch.png)
  
*Fig: FlightSearch Screen*
  
![Image](images/results.png)
  
*Fig: search result Screen*

