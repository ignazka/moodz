import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
// import notifMessage from './components/Notification';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
// Notification.requestPermission(function(status) {
//   console.log('Notification permission status:', status);
  
//    notifyMe();
  
 
  
// });

// function notifyMe() {
//   // Let's check if the browser supports notifications
//   if (!("Notification" in window)) {
//     alert("This browser does not support desktop notification");
//   }

//   // Let's check whether notification permissions have alredy been granted
//   else if (Notification.permission === "granted") {
//     // If it's okay let's create a notification
//     var notification = new Notification("Hi there!");
//     <notifMessage />
//   }

//   // Otherwise, we need to ask the user for permission
//   else if (Notification.permission !== 'denied') {
//     console.log("ask for permisson");
//     Notification.requestPermission(function (permission) {
//       // If the user accepts, let's create a notification
//       if (permission === "granted") {
//         var notification = new Notification("Hi there!");
//         <notifMessage />
//       }
//     });
//   }

//   // At last, if the user has denied notifications, and you
//   // want to be respectful there is no need to bother them any more.
// }




// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
