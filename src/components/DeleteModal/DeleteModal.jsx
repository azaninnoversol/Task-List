import React, { memo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../Button/Button";

const backdropVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};

function DeleteModal({ isOpen, onClose, onConfirm }) {
  const modalRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center"
          style={{
            backgroundColor: "rgba(17, 24, 39, 0.8)",
            zIndex: 1000,
          }}
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div
            ref={modalRef}
            className="rounded-lg p-6 w-80"
            style={{
              backgroundColor: "var(--color-card)",
              color: "var(--color-text)",
              border: `1px solid var(--color-border)`,
            }}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <h2 className="text-xl font-semibold mb-4">Delete Confirmation</h2>
            <p className="mb-6">
              Are you sure you want to delete this item? This action cannot be
              undone.
            </p>
            <div className="flex justify-end gap-4">
              <Button
                onClick={onClose}
                style={{
                  backgroundColor: "transparent",
                  border: `1px solid var(--color-border-soft)`,
                  color: "var(--color-text)",
                  padding: "8px 16px",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
                className="hover:bg-gray-700 transition"
              >
                Cancel
              </Button>
              <Button
                onClick={onConfirm}
                style={{
                  backgroundColor: "var(--color-primary)",
                  border: "none",
                  color: "var(--color-text)",
                  padding: "8px 16px",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
                className="hover:bg-blue-700 transition"
              >
                Delete
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default memo(DeleteModal);
