const firebaseConfig = {
  apiKey: "AIzaSyDghSOuaWhAvXaKRPqvpMYCg5wU62ZoIws",
  authDomain: "doer3on3.firebaseapp.com",
  projectId: "doer3on3",
  storageBucket: "doer3on3.appspot.com",
  messagingSenderId: "962351624115",
  appId: "1:962351624115:web:a3e1cf738dd2dedf40e5c6",
};

function getFirebaseConfig() {
  if (!firebaseConfig || !firebaseConfig.apiKey) {
    throw new Error(
      "No Firebase configuration object provided." +
        "\n" +
        "Add your web app's configuration object to firebase-config.js"
    );
  } else {
    return firebaseConfig;
  }
}

export { getFirebaseConfig };
