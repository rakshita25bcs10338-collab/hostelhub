import { useState, useEffect } from "react";
import {
  subscribeToNotices,
  addNotice as addNoticeService,
  deleteNotice as deleteNoticeService
} from "../services/noticeService";

export function useNotices(roomId) {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    if (!roomId) return;
    const unsub = subscribeToNotices(roomId, setNotices);
    return unsub;
  }, [roomId]);

  async function addNotice(text, author) {
    await addNoticeService(roomId, { text, author });
  }

  async function deleteNotice(id) {
    await deleteNoticeService(roomId, id);
  }

  return { notices, addNotice, deleteNotice };
}