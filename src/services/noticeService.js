import {
  collection, addDoc, deleteDoc,
  doc, onSnapshot, serverTimestamp, query, orderBy
} from "firebase/firestore";
import { db } from "../firebase";

export function subscribeToNotices(roomId, callback) {
  const q = query(
    collection(db, "rooms", roomId, "notices"),
    orderBy("createdAt", "desc")
  );
  return onSnapshot(q, (snap) => {
    callback(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  });
}

export async function addNotice(roomId, notice) {
  await addDoc(collection(db, "rooms", roomId, "notices"), {
    ...notice,
    createdAt: serverTimestamp(),
  });
}

export async function deleteNotice(roomId, id) {
  await deleteDoc(doc(db, "rooms", roomId, "notices", id));
}