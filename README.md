# linkShareApi

## API description

- It is a website where users post entries on links.

- Each post has title, description, url.

- Each post can be voted with a score between 1 and 5.

- In more detail, this API allows the following actions:
    - registration
    - anonymous registration (limited to see the page and vote, no registration needed controler with "AuthUserOptional")
    - share links (URL, title, description)
    - see history of posting
    - erase a post
    - user votes
    - edit user profile 
        - password
        - avatar

## Install

1. Install the dependencies (node_modules) using the `npm install` or `npm i` command.

2. Save the `.env.example` file as `.env` and fill in the necessary data. We have left some additional data on the `.env.example` for the email service to work.

3. Run `npm run initDb` to create the necessary tables in the database.

4. Run `npm run dev` or `node --watch app.js` to launch the server.

5. When using `Postman` keep in mind that, in order to be able to change the password with the recovery code, you need to register with a real and fucntioning email to be able to receive the temporary code that allows you to change passwords.

## Users Endpoints
- **POST** - [`/users/register`] -  create a new user - Eve ✅
- **POST**  - [`/users/login`]  - login - Eve ✅
- **GET** - [`/users`] - see profile ➡️ `Token`- ✅ karol 
- **PUT**  - [`/users/avatar`] - see avatar ➡️ `Token`  ** ✅ 
- **PUT** - [`/users/password`] - change password ➡️ `Token` - karol ✅
- **POST** - [`/users/password/recover`] - send an password recovery email - Eve ✅
- **PUT** - [`/users/password/reset`] - to update the password with a recovery code - Eve ✅


## APP endpoints
- **POST** - [`/links`] - create a post (URL, title, description) ➡️ `Token` - Ana ✅
- **GET** - [`/links`] - see list of posted links (including previous days) - Ana ✅
- **GET**  - [`/links/:linkId`] -  see a specific post - Ana ✅
- **DELETE** - [`/links/:linkId] - erase previous posts created by user - Ana ✅
- **POST** - [`/links/:linkId/votes`] - vote a post - Ana ✅
