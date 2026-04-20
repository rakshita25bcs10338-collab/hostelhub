import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export async function getRoom(roomId) {
  const snap = await getDoc(doc(db, "rooms", roomId));
  return snap.exists() ? snap.data() : null;
}

export async function saveMembers(roomId, members) {
  await setDoc(doc(db, "rooms", roomId), { members }, { merge: true });
}