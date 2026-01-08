import { useState, useMemo } from "react";
import SliderRadio from "./SliderRadio";
import { motion, AnimatePresence } from "framer-motion";

const Projects = () => {

    const categories = ["Development", "AI&ML", "Miscellaneous"];
    const items = {
       "Development": [
            {
            id: "dev-1",
            title: "Movie App",
            description: "A movie app that allows users to search for movies and view details about them.",
            tech: ["React", "Tailwind"],
            link: "https://movie-app-kart.netlify.app/",
            github: null
            },
            {
            id: "dev-2",
            title: "OneSpace",
            description: "A collaborative platform for developers to share and work on projects together.",
            tech: ["React", "Tailwind", "Node.js", "PostGreSQL", "Inngest"],
            link: "https://onespace.systems/",
            github: "https://github.com/SohamWadhwa/project-management-main"
            }
        ],

        "AI&ML": [
            {
            id: "ml-1",
            title: "Plant Disease Detection",
            description: "A deep learning model to identify plant diseases(Potato and Bell Pepper) from leaf images. And provide recommendations for treatment.",
            tech: ["Python", "TensorFlow", "Keras", "BytesIO"],
            link: "https://vercel.com/soham-wadhwas-projects/plant-disease-prediction",
            github: "https://github.com/SohamWadhwa/Plant-Disease-Prediction-backend"
            },
            {
            id: "ml-2",
            title: "EDA Report on Zomato Dataset",
            description: "An exploratory data analysis report on Zomato's restaurant dataset to uncover insights and trends in the food industry.",
            tech: ["Python", "Pandas", "Matplotlib", "Seaborn"],
            link: "https://zomato-database-eda.streamlit.app/",
            github: "https://github.com/SohamWadhwa/Zomato-database-EDA"
            }
        ],

        // Keep key matched with the category label
        "Miscellaneous": [
            {
            id: "misc-1",
            title: "Credit Card Validator",
            description: "A simple command line program to validate credit card numbers using python.",
            tech: ["Python"],
            github: "https://github.com/SohamWadhwa/Projects"
            },
        ]
    };

    const [selectedCategory, setSelectedCategory] = useState(categories[0]);

    const visibleItems = useMemo(() => {
        return items[selectedCategory] ?? [];
    }, [items, selectedCategory]);

    // Animation variants
    const pageVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { when: "beforeChildren", staggerChildren: 0.08 } }
    };

    const gridVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 300 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 100, damping: 12 }
        }
    };

    return (
        <motion.div
            className="flex flex-col items-center text-black gap-6 w-full min-h-screen p-8 sm:p-12 md:p-16 text-base sm:text-lg md:text-xl dark:text-[#edf6f9]"
            variants={pageVariants}
            initial="hidden"
            animate="visible"
        >
            <SliderRadio
                options={categories}
                value={selectedCategory}
                onChange={(val) => setSelectedCategory(val)}
                className="mb-4"
            />

            <motion.div
                className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 gap-6 "
                variants={gridVariants}
                initial="hidden"
                animate="visible"
                layout
            >
                <AnimatePresence mode="popLayout">
                {visibleItems.map((proj) => (
                    <motion.div
                        key={proj.id}
                        className="rounded-xl border border-black/10 dark:border-white/10 p-5 bg-white/30 dark:bg-white/5 backdrop-blur-sm shadow-2xl"
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        exit={{ opacity: 0, y: -12 }}
                        whileHover={{ scale: 1.05 }}
                        layout
                    >
                        <h3 className="font-semibold text-lg mb-2 dark:text-white">{proj.title}</h3>
                        <p className="text-black/70 dark:text-white/70 text-sm mb-3">{proj.description}</p>
                        {proj.tech?.length ? (
                            <div className="flex flex-wrap gap-2 mb-4">
                                {proj.tech.map((t) => (
                                    <motion.span
                                        key={t}
                                        className="text-xs px-2 py-1 rounded-full bg-black/5 dark:bg-white/10 text-black/80 dark:text-white/80"
                                        whileHover={{ scale: 1.06 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    >
                                        {t}
                                    </motion.span>
                                ))}
                            </div>
                        ) : null}
                        <div className="flex items-center gap-3">
                            {proj.link && (
                                <a href={proj.link} target="_blank" rel="noreferrer" className="text-sm underline hover:no-underline text-blue-600 dark:text-blue-400">Live</a>
                            )}
                            {proj.github && (
                                <a href={proj.github} target="_blank" rel="noreferrer" className="text-sm underline hover:no-underline text-gray-800 dark:text-gray-200">Code</a>
                            )}
                        </div>
                    </motion.div>
                ))}
                {!visibleItems.length && (
                    <motion.div
                        className="col-span-full text-center text-black/60 dark:text-white/60"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        No projects in this category yet.
                    </motion.div>
                )}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    );
}

export default Projects;