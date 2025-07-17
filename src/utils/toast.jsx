import toast from "react-hot-toast";

export const successToast = (msg) => {
  toast.success(msg, {
    duration: 3000,
    position: "top-center",
    style: {
      borderRadius: "8px",
      background: "#4caf50",
      color: "#fff",
      padding: "10px 15px",
      fontWeight: "bold",
    },
  });
};

export const errorToast = (msg) => {
  toast.error(msg, {
    duration: 4000,
    position: "top-center",
    style: {
      borderRadius: "8px",
      background: "#f44336",
      color: "#fff",
      padding: "10px 15px",
      fontWeight: "bold",
    },
  });
};
