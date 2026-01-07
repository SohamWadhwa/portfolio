const Dot = ({ size = "w-2 h-2", color = "bg-white" }) => {
  return <div className={`${size} ${color} rounded-full dark:bg-black`}></div>;
};

export default Dot;
