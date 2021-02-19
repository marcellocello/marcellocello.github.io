importScripts("https://www.gstatic.com/firebasejs/8.2.7/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.7/firebase-messaging.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.7/firebase-analytics.js");

firebase.initializeApp({
    apiKey: "AIzaSyBHANJaoMMzMj45JXq3srYEANgXW8BNqcc",
    authDomain: "vms-caliana.firebaseapp.com",
    projectId: "vms-caliana",
    storageBucket: "vms-caliana.appspot.com",
    messagingSenderId: "528352019403",
    appId: "1:528352019403:web:f7a1027b00496a0e652c4e",
    measurementId: "G-JQFF4Z2ER4"
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
    const promiseChain = clients.matchAll({
        type: 'window',
        includeUncontrolled: true
    }).then(windowClients => {
        for (let i = 0; i < windowClients.length; i++) {
            const windowClient = windowClients[i];
            windowClient.postMessage(payload);
        }
    }).then(() => {
        const title = payload.notification.title;
        const options = {
            body: payload.notification.score
        };

        return registration.showNotification(title, options);
    });

    return promiseChain;
});

self.addEventListener('notificationclick', function(event) {
    console.log('notification received: ', event);
});

// messaging.onBackgroundMessage(function(payload) {
//     console.log('This is background handler');
//     console.log(payload['data']);
//     self.notifData = {
//         notifData = payload['data']
//     };
// });