import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  getDocs,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
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

export const updateTaskById = async (taskId, updatedData) => {
  const user = auth.currentUser;

  if (!taskId) {
    throw new Error("Task ID is required to update a task");
  }

  const taskDocRef = doc(db, "tasks", taskId);

  await updateDoc(taskDocRef, {
    ...updatedData,
    userId: user.uid,
    userEmail: user.email,
    createdAt: serverTimestamp(),
  });

  return true;
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

export const getTaskById = async (taskId) => {
  if (!taskId) {
    throw new Error("Task ID is required to fetch task");
  }

  const taskDocRef = doc(db, "tasks", taskId);
  const taskSnap = await getDoc(taskDocRef);

  if (!taskSnap.exists()) {
    throw new Error("Task not found");
  }

  return {
    id: taskSnap.id,
    ...taskSnap.data(),
  };
};

export const deleteTaskById = async (taskId) => {
  if (!taskId) {
    throw new Error("Task ID is required to delete a task");
  }

  const taskDocRef = doc(db, "tasks", taskId);
  await deleteDoc(taskDocRef);
};
