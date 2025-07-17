import React, { memo, useState } from "react";
import { motion } from "framer-motion";
import { MdDelete, MdEdit } from "react-icons/md";
import DeleteModal from "../DeleteModal/DeleteModal";

const getDayName = (dateStr) => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayIndex = new Date(dateStr).getDay();
  return days[dayIndex];
};

function TaskCard({
  task = "Task Title",
  time = "1h 30m",
  problem = "No problem given.",
  date = "2025-07-10",
  solution = "Link",
  id,
  deleteTask = () => {},
  onNavigate = () => {},
}) {
  const [isModalOpen, setIsModalOpen] = useState(null);

  const onConfirm = () => {
    deleteTask();
    setIsModalOpen(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      whileHover={{
        scale: 1.02,
        transition: "all easeInOut 1s",
        background:
          "linear-gradient(135deg, var(--color-card), var(--color-accent))",
      }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 20,
        background: { duration: 0.5, ease: "easeInOut", delay: 0.05 },
      }}
      className="group w-full sm:w-[300px] rounded-xl border border-[var(--color-border-soft)] p-5 text-[var(--color-text)] bg-[var(--color-card)] transition-all duration-500 ease-in-out"
    >
      <div className="flex justify-between items-baseline">
        <h3 className="text-lg font-semibold mb-2">{task}</h3>

        <div className="hidden  items-center gap-2 transition-all duration-300 group-hover:flex">
          <MdEdit
            color="white"
            size={20}
            className="cursor-pointer"
            onClick={onNavigate}
          />
          <MdDelete
            color="white"
            size={20}
            className="cursor-pointer"
            onClick={() => setIsModalOpen(id)}
          />
        </div>
      </div>

      <div className="text-sm space-y-1">
        <p>
          <strong>Problem:</strong> {problem}
        </p>
        <p>
          <strong>Time:</strong> {time}
        </p>
        <p>
          <strong>Date:</strong> {date}{" "}
          <span className="text-xs opacity-70">({getDayName(date)})</span>
        </p>
        <p>
          <strong>Solution:</strong>{" "}
          <a href="#" className="text-[var(--color-accent)] underline">
            {solution}
          </a>
        </p>
      </div>

      <DeleteModal
        isOpen={isModalOpen === id}
        onClose={() => setIsModalOpen(null)}
        onConfirm={onConfirm}
      />
    </motion.div>
  );
}

export default memo(TaskCard);
