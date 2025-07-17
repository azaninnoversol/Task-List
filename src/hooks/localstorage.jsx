import { useState } from "react";

export const STORAGE_KEYS = {
  TOKEN: "token",
};

export const useLocalStorage = (key, initialValue = "") => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item !== null ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error reading localStorage key", key, error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error("Error setting localStorage key", key, error);
    }
  };

  const removeValue = () => {
    try {
      localStorage.removeItem(key);
      setStoredValue(undefined);
    } catch (error) {
      console.error("Error removing localStorage key", key, error);
    }
  };

  return [storedValue, setValue, removeValue];
};

function saveInLocalStorge(key, data) {
  let res;
  if (typeof data === "object") {
    res = localStorage.setItem(key, JSON.stringify(data));
  } else {
    res = localStorage.setItem(key, data);
  }
  return res;
}

function getFromLocalStorage(key) {
  const user = localStorage.getItem(key);
  return user ? JSON.parse(user) : null;
}

export { saveInLocalStorge, getFromLocalStorage };
