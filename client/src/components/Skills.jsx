import { motion } from "framer-motion";

const Skills = () => {
	const categories = [
		{
			title: "Languages",
			skills: ["Python", "JavaScript", "TypeScript", "SQL", "C", "C++"],
		},
		{
			title: "Frontend",
			skills: ["React", "Tailwind CSS", "Vite", "Next"],
		},
		{
			title: "Backend",
			skills: ["Node.js", "Express", "FastAPI", "Flask", "Inngest" ],
		},
		{
			title: "AI / ML",
			skills: [
				"TensorFlow",
				"Keras",
				"scikit-learn",
				"OpenCV",
				"Pandas",
				"NumPy",
                "Matplotlib", 
                "Seaborn"
			],
		},
		{
			title: "Database",
			skills: ["SQLite", "PostgreSQL", "MongoDB", "Firebase", "AWS S3", "AWS DynamoDB"],
		},
		{
			title: "Tools",
			skills: ["Git", "GitHub", "Hoppscotch", "Vercel", "Render"],
		},
	];

	// Match Projects.jsx animation and card design language
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
		<motion.section
			className="flex flex-col items-center text-black gap-6 w-full min-h-screen p-8 sm:p-12 md:p-16 text-base sm:text-lg md:text-xl dark:text-[#edf6f9]"
			variants={pageVariants}
			initial="hidden"
			animate="visible"
		>
			{/* <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight mb-2 dark:text-white">
				Skills
			</h2> */}
			

			<motion.div
				className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 gap-6 "
				variants={gridVariants}
				initial="hidden"
				animate="visible"
				layout
			>
				{categories.map((cat) => (
					<motion.div
						key={cat.title}
						className="rounded-xl border border-black/10 dark:border-white/10 p-5 bg-white/30 dark:bg-white/5 backdrop-blur-sm shadow-sm"
						variants={cardVariants}
						initial="hidden"
						animate="visible"
						whileHover={{ scale: 1.05 }}
						layout
					>
						<h3 className="font-semibold text-lg mb-3 dark:text-white">
							{cat.title}
						</h3>
						<div className="flex flex-wrap gap-2">
							{cat.skills.map((s) => (
								<motion.span
									key={s}
									className="text-xs px-2 py-1 rounded-full bg-black/5 dark:bg-white/10 text-black/80 dark:text-white/80"
									whileHover={{ scale: 1.06 }}
									transition={{ type: "spring", stiffness: 300, damping: 20 }}
								>
									{s}
								</motion.span>
							))}
						</div>
					</motion.div>
				))}
			</motion.div>
		</motion.section>
	);
};

export default Skills;

