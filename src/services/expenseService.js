import {
  collection, addDoc, deleteDoc,
  doc, onSnapshot, serverTimestamp, query, orderBy
} from "firebase/firestore";
import { db } from "../firebase";

export function subscribeToExpenses(roomId, callback) {
  const q = query(
    collection(db, "rooms", roomId, "expenses"),
    orderBy("createdAt", "desc")
  );
  return onSnapshot(q, (snap) => {
    callback(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  });
}

export async function addExpense(roomId, expense) {
  await addDoc(collection(db, "rooms", roomId, "expenses"), {
    ...expense,
    createdAt: serverTimestamp(),
  });
}

export async function deleteExpense(roomId, id) {
  await deleteDoc(doc(db, "rooms", roomId, "expenses", id));
}