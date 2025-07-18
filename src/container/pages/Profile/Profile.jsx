import React, { memo, useEffect, useState } from "react";
import { auth } from "../../../config/firebase";
import Button from "../../../components/Button/Button";
import { onAuthStateChanged } from "firebase/auth";
import Spin from "../../../components/Loader/Spin";
import { successToast } from "../../../utils/toast";

function Profile() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserData({
          name: user.displayName || "No name set",
          email: user.email || "No email",
          uid: user.uid,
          photoURL:
            user.photoURL ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              user.displayName || "User"
            )}&background=10b981&color=fff&size=150`,
        });

        console.log(user, "user");
      } else {
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const copyUidToClipboard = () => {
    if (userData?.uid) {
      navigator.clipboard.writeText(userData.uid).then(() => {
        successToast("Copied to clipboard!");
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  if (userData === null) {
    return (
      <div className="fixed left-1/2 top-[40%] w-screen h-screen">
        <Spin />
      </div>
    );
  }

  return (
    <section
      className="max-w-sm mx-auto mt-10 p-6 rounded-xl shadow-lg border"
      style={{
        backgroundColor: "var(--color-card)",
        color: "var(--color-text)",
        borderColor: "var(--color-border-soft)",
      }}
    >
      <div className="flex flex-col items-center space-y-4">
        <img
          src={userData.photoURL}
          alt={`${userData.name} avatar`}
          className="w-24 h-24 rounded-full border-4"
          style={{ borderColor: "var(--color-accent)" }}
        />

        <h1 className="text-2xl font-semibold">{userData.name}</h1>
        <p className="text-sm text-[var(--color-border-soft)]">
          {userData.email}
        </p>

        <p
          onClick={copyUidToClipboard}
          className="text-xs text-[var(--color-border-soft)] cursor-pointer select-all"
          title="Click to copy UID"
          style={{ userSelect: "all" }}
        >
          {userData.uid}
        </p>

        <div className="flex gap-4 mt-4">
          <Button
            variant="danger"
            className="px-4 py-2 rounded-md font-medium border"
            style={{
              borderColor: "var(--color-border-soft)",
              color: "var(--color-text)",
              backgroundColor: "transparent",
            }}
          >
            Change Password
          </Button>
          <Button
            className="px-4 py-2 rounded-md font-medium"
            style={{
              backgroundColor: "var(--color-primary)",
              color: "var(--color-text)",
            }}
          >
            Edit Profile
          </Button>
        </div>
      </div>
    </section>
  );
}

export default memo(Profile);
