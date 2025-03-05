import { motion } from "framer-motion";

const Spinner = () => {
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-60 backdrop-blur-md z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </motion.div>
  );
};

export default Spinner;
