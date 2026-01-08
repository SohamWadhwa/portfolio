const Dot = ({ size = "w-2 h-2", color = "bg-black" }) => {
  return <div className={`${size} ${color} rounded-full dark:bg-white`}></div>;
};

export default Dot;
