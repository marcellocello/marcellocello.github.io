function alertMessage(text) {
    alert(text);
}

function getAllUrlParams(url) {
    var queryString = url ? url.split('?')[1] : window.location.search.slice(1);
    var obj = {};
  
    if (queryString) {
        queryString = queryString.split('#')[0];
        var arr = queryString.split('&');
  
        for (var i = 0; i < arr.length; i++) {
            var a = arr[i].split('=');
            var paramName = a[0];
            var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];
    
            paramName = paramName.toLowerCase();
            if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();
    
            if (paramName.match(/\[(\d+)?\]$/)) {
                var key = paramName.replace(/\[(\d+)?\]/, '');
                if (!obj[key]) obj[key] = [];
    
                if (paramName.match(/\[\d+\]$/)) {
                    var index = /\[(\d+)\]/.exec(paramName)[1];
                    obj[key][index] = paramValue;
                } else {
                    obj[key].push(paramValue);
                }
            } else {
                if (!obj[paramName]) {
                    obj[paramName] = paramValue;
                } else if (obj[paramName] && typeof obj[paramName] === 'string'){
                    obj[paramName] = [obj[paramName]];
                    obj[paramName].push(paramValue);
                } else {
                    obj[paramName].push(paramValue);
                }
            }
        }
    }
  
    return obj;
} 

var obj = JSON.stringify(getAllUrlParams(window.location.href), null, 2);
var keys = Object.keys(JSON.parse(obj));

window.urlKey = {
    key: keys
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