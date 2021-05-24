import app from 'firebase/app';
import 'firebase/storage';
// import 'firebase/firestore';
// import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDP7aMPBf3lTXFv8f08g1RSwhkrqpXuMU0',
  authDomain: 'buku-warung-clone.firebaseapp.com',
  databaseURL: 'https://buku-warung-clone.firebaseio.com',
  projectId: 'buku-warung-clone',
  storageBucket: 'buku-warung-clone.appspot.com',
  messagingSenderId: '599996913411',
  appId: '1:599996913411:web:8a5514712f45a3ef417b36',
  measurementId: 'G-903YS1Z6YY',
};

if (!app.apps.length) {
  app.initializeApp(firebaseConfig);
}

// export const timestamp = app.firestore.FieldValue.serverTimestamp;
// export const db = app.firestore();
// export const auth = app.auth();
export const storage = app.storage();
