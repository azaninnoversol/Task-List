import React, { useState, useRef, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../Button/Button";
import { BiChevronDown, BiXCircle } from "react-icons/bi";

function Dropdown({ label = "All Month", options = [], onSelect }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    setSelected(option);
    onSelect?.(option.value);
    setOpen(false);
  };

  const onCancelValue = (e) => {
    e.stopPropagation();
    setSelected(null);
    setOpen(false);
  };

  return (
    <div className="relative inline-block w-36" ref={dropdownRef}>
      <Button
        onClick={() => setOpen((prev) => !prev)}
        className="px-0 py-2 flex items-center justify-between capitalize"
      >
        {selected?.value || label}
        {selected?.value ? (
          <BiXCircle
            className="text-red-500 ml-2 w-4 h-4 cursor-pointer"
            onClick={onCancelValue}
          />
        ) : (
          <BiChevronDown className={`ml-2 h-4 w-4 transition-transform`} />
        )}
      </Button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 mt-2 w-full rounded-md bg-card border border-border-soft shadow-lg overflow-hidden"
          >
            {options.map((option, index) => (
              <li
                key={index}
                onClick={() => handleSelect(option)}
                className="px-4 py-2 text-sm text-text hover:bg-border cursor-pointer transition"
              >
                {option.value}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export default memo(Dropdown);
