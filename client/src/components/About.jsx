import { motion } from "framer-motion";

const About = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { when: "beforeChildren", staggerChildren: 0.4 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 16 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 500, damping: 12 }
        }
    };
    return (
        <motion.div
            className="flex flex-col justify-center text-black gap-4 m-16 p-16 text-xl dark:text-[#edf6f9] bg-gray-300/20 rounded-4xl backdrop-blur-sm shadow-2xl"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.span variants={itemVariants}>
                I am a developer with a strong focus on computer vision, machine learning, and full-stack problem solving. My primary interest lies in building systems that move beyond theory and work reliably in real-world conditions—whether that is handling extreme camera angles, noisy data, or operational constraints.
            </motion.span>

            <motion.span variants={itemVariants}>
                I enjoy working at the intersection of deep learning, classical computer vision, and software engineering, where design decisions matter as much as model accuracy. I am particularly interested in end-to-end systems: from data ingestion and model development to deployment, monitoring, and scalability.
            </motion.span>

            <motion.span variants={itemVariants}>
                Alongside this, I actively strengthen my fundamentals in data structures, algorithms, and system design, ensuring that my solutions are not only intelligent but also efficient and maintainable. I value clean architecture, reproducible pipelines, and code that can be trusted in production environments.
            </motion.span>

            <motion.span variants={itemVariants}>
                I am driven by curiosity, consistency, and a desire to build technology that solves tangible problems rather than demos that only work under ideal conditions.
            </motion.span>
        </motion.div>
    )
}

export default About;