import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAxQCMnDwIkKkaJbfekmmmqEVZ8dxgIJd4",
    authDomain: "wallet-wise-backup.firebaseapp.com",
    projectId: "wallet-wise-backup",
    storageBucket: "wallet-wise-backup.appspot.com",
    messagingSenderId: "710739347504",
    appId: "1:710739347504:web:25cb8098341eb5f95ec5f5"
  };

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };