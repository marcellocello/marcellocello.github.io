function alertMessage(text) {
    alert(text);
}

window.logger = (flutter_value) => {
    console.log({ js_context: this, flutter_value });
}
// example use
// js.context.callMethod('alertMessage', ['Flutter is calling upon Javascript!']);

// firebase.initializeApp({
//     apiKey: "AIzaSyBHANJaoMMzMj45JXq3srYEANgXW8BNqcc",
//     authDomain: "vms-caliana.firebaseapp.com",
//     projectId: "vms-caliana",
//     storageBucket: "vms-caliana.appspot.com",
//     messagingSenderId: "528352019403",
//     appId: "1:528352019403:web:f7a1027b00496a0e652c4e",
//     measurementId: "G-JQFF4Z2ER4"
// });

// const messaging = firebase.messaging();

// messaging.onMessage(function(payload) {
//     console.log('This is front handler');
//     console.log(payload);
//     window.notifData = {
//         notifData = payload['data']
//     };
// });

// // Request notification permission
// Notification.requestPermission().then(function(permission) {
//     if (permission === 'granted') {
//         messaging.getToken().then((currentToken) => {
//             window.userData = {
//                 token: currentToken,
//                 notifData: ''
//             };
//         });
//     }
// });