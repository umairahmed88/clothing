import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDZVPPGph7DfnZ_04jALzJxkWoTQJ0GZBk",
    authDomain: "clothing-db-e7b9c.firebaseapp.com",
    databaseURL: "https://clothing-db-e7b9c.firebaseio.com",
    projectId: "clothing-db-e7b9c",
    storageBucket: "clothing-db-e7b9c.appspot.com",
    messagingSenderId: "780400644346",
    appId: "1:780400644346:web:a17626ff788d531de47943",
    measurementId: "G-ZMJD27KMDC"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error created by user', error.message);
        }
    } 
    return userRef;
  };

  export const addCollectionAndDocuments = async (collectionKey, objectToAdd) => {
      const collectionRef = firestore.collection(collectionKey);

      const batch = firestore.batch();
      objectToAdd.forEach(obj => {
          const newDocRef = collectionRef.doc();
          batch.set(newDocRef, obj)
      });
      return await batch.commit()
};

    export const convertCollectionsSnapshotToMap = (collections) => {
        const transformedCollection = collections.docs.map(doc => {
            const { title, items } =doc.data();

            return {
                routeName: encodeURI(title.toLowerCase()),
                id: doc.id,
                title, 
                items
            };
        });

        return transformedCollection.reduce((accumulator, collection) => {
            accumulator[collection.title.toLowerCase] = collection;
            return accumulator;
        }, {});
    };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;