import { motion } from "framer-motion";

const LoadingSpinner = ({ smallHeight }) => {
  return (
    <div
      className={`${smallHeight ? "h-[250px]" : "h-[70vh]"} 
      flex justify-center items-center`}
    >
      <motion.div
        className="w-12 h-12 border-4 border-l-transparent border-[#FF6B35] rounded-full"
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 0.7,
          ease: "linear",
        }}
      />
    </div>
  );
};

export default LoadingSpinner;
