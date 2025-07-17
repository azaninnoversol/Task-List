import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { auth, db } from "../config/firebase";

export const addTaskToFirestore = async (taskData) => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("User not authenticated");
  }

  const taskWithUser = {
    ...taskData,
    userId: user.uid,
    userEmail: user.email,
    createdAt: serverTimestamp(),
  };

  const docRef = await addDoc(collection(db, "tasks"), taskWithUser);
  return docRef.id;
};

export const getTasksForUser = async () => {
  const q = query(collection(db, "tasks"));
  const querySnapshot = await getDocs(q);

  const tasks = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return tasks;
};

export const deleteTaskById = async (taskId) => {
  if (!taskId) {
    throw new Error("Task ID is required to delete a task");
  }

  const taskDocRef = doc(db, "tasks", taskId);
  await deleteDoc(taskDocRef);
};
