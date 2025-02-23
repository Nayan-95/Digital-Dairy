import { useState, useEffect } from "react";
import { Snackbar, Alert } from "@mui/material";
import { motion } from "framer-motion";

export default function Notification({ msg }) {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Snackbar open={open} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
      >
        <Alert severity="success" sx={{ borderRadius: "12px", boxShadow: 3 }}>
          {msg}
        </Alert>
      </motion.div>
    </Snackbar>
  );
}
