# Personal Project, a Cafe e-commerce web application built majorly with Typescript, Redux-Toolkit, Contentful-CMS and firebase

This project is a Cafe e-commerce web application. 
It is a project where cafe shops can allow online interactions on their website. interactions like Authenticating, Purhchases, News and many more.

Users have the option of looking through the website, without making any purchase, in this case, any product added to their cart will be stored in local-storage.
Once the user authenticates, the products the user added to the cart prior to being authenticated will be automatically stored in the firestore database which is NoSQL.

THe entire state of the project is managed by Redux, from the loading the state, to how data / product is passed around the application.

Below are technologies involved:

- Typescript
- React
- Redux
- Redux-toolkit
- Contentful-CMS
- Firebase
- TailwindCSS
- Firestore
- Firebase Auth
- React-Router-Dom
- React-Icons
- Toastify
- Animate.CSS

In the project directory, after cloning, 

You need to create an account on firebase to be able to use the firestore api added in this project.
You will be given api key and other keys that you will add to your firebaseconfig.js file using .env

You will also need to get secret key and api key for contenful by creating an account on contentful-cms to get your keys

after that, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.
