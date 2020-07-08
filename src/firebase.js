import * as firebase from 'firebase/app';
import 'firebase/auth';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
    authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.VUE_APP_FIREBASE_APP_ID,
    measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const fb = {
    login(serviceProvider) {
        let provider = new firebase.auth.GoogleAuthProvider();
        if(serviceProvider == "facebook") {
            provider = new firebase.auth.FacebookAuthProvider();
        }
        
        return firebase.auth().signInWithPopup(provider)
                .then(function(result) {
                    return {success: true, data: firebase.auth().currentUser};
                })
                .catch(function(error){
                    return {success: false, data: null, error: error.message};
                });
    },
    logout() {
        return firebase.auth().signOut()
            .then(function() {
                return {success: true};
            })
            .catch(function(error) {
                return {success: false, error: error};
            });
    },
    getToken() {
        return firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
            return idToken;
        }).catch(function(error) {
            return null;
        });
    }
}

export default fb