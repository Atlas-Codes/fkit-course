import { initializeApp } from "firebase/app";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import { getAuth, onAuthStateChanged, type User } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { writable, type Readable, derived } from "svelte/store";

const firebaseConfig = {
  apiKey: "AIzaSyC5GnIwr017c_aVCU364kQ5iIfKF9EWq40",
  authDomain: "churn-ff73e.firebaseapp.com",
  projectId: "churn-ff73e",
  storageBucket: "churn-ff73e.appspot.com",
  messagingSenderId: "983431901870",
  appId: "1:983431901870:web:64aca3c3b137a0fe6d733f",
  measurementId: "G-NNZWS7JJ2F"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();

/**
 * @returns a store with the current firebase user
 */
function userStore() {
  let unsubscribe: () => void;

  if (!auth || !globalThis.window) {
    console.warn('Auth is not initialized or not in browser');
    const { subscribe } = writable<User | null>(null);
    return {
      subscribe,
    }
  }

  const { subscribe } = writable(auth?.currentUser ?? null, (set) => {
    unsubscribe = onAuthStateChanged(auth, (user) => {
      set(user);
    });

    return () => unsubscribe();
  });

  return {
    subscribe,
  };
}

export const user = userStore();

/**
 * @param  {string} path document path or reference
 * @param  {any} startWith optional default data
 * @returns a store with realtime updates on document data
 */
export function docStore<T>(
  path: string,
) {
  let unsubscribe: () => void;

  const docRef = doc(db, path);

  const { subscribe } = writable<T | null>(null, (set) => {
    unsubscribe = onSnapshot(docRef, (snapshot) => {
      set((snapshot.data() as T) ?? null);
    });

    return () => unsubscribe();
  });

  return {
    subscribe,
    ref: docRef,
    id: docRef.id,
  };
}

interface CardData {
  bankName: string;
  dateLastCancelled: string; // consider using firebase.firestore.Timestamp in the future
  dateEligible: string;
  spendRequirement: string;
  timeframeForSpend: string;
  notes: string;
}

export const userData: Readable<CardData | null> = derived(user, ($user, set) => { 
  if ($user) {
    return docStore<CardData>(`users/${$user.uid}`).subscribe(set);
  } else {
    set(null); 
  }
});  

export function userCardDataStore(userID: string) {
  return docStore<CardData>(`data/${userID}`);
}
