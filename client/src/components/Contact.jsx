import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

const Contact = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [errors, setErrors] = useState({});
	const [submitted, setSubmitted] = useState(false);

	const pageVariants = {
		hidden: { opacity: 0 },
		visible: { opacity: 1, transition: { when: "beforeChildren", staggerChildren: 0.08 } },
	};

	const gridVariants = {
		hidden: { opacity: 0 },
		visible: { opacity: 1 },
	};

	const cardVariants = {
		hidden: { opacity: 0, y: 300 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { type: "spring", stiffness: 100, damping: 12 },
		},
	};

	const validate = () => {
		const errs = {};
		if (!name.trim()) errs.name = "Name is required";
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!email.trim()) errs.email = "Email is required";
		else if (!emailRegex.test(email)) errs.email = "Enter a valid email";
		if (!message.trim()) errs.message = "Message is required";
		setErrors(errs);
		return Object.keys(errs).length === 0;
	};

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setSubmitted(false);

        try {
            await emailjs.send(
            "service_3laz1rt",   // ⬅ your EmailJS Service ID
            "template_iyhm9te",  // ⬅ your EmailJS Template ID
            {
                user_name: name,
                user_email: email,
                message: message,
            },
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY // or process.env.REACT_APP_EMAILJS_PUBLIC_KEY
            );

            setSubmitted(true);
            setName("");
            setEmail("");
            setMessage("");
            setErrors({});
        } catch (err) {
            console.error("EmailJS error:", err);
            setErrors({ submit: "Failed to send message. Please try again." });
        }
    };

	return (
		<motion.section
			className="flex flex-col items-center text-black gap-6 w-full min-h-screen p-8 sm:p-12 md:p-16 text-base sm:text-lg md:text-xl dark:text-[#edf6f9]"
			variants={pageVariants}
			initial="hidden"
			animate="visible"
		>
			<h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight mb-2 dark:text-white">
				Contact
			</h2>
			<p className="text-black/70 dark:text-white/70 mb-4 text-sm sm:text-base text-center">
				Have a question or an opportunity? Send me a message.
			</p>

			<motion.div
				className="w-full max-w-3xl grid grid-cols-1 gap-6"
				variants={gridVariants}
				initial="hidden"
				animate="visible"
				layout
			>
				<motion.form
					onSubmit={handleSubmit}
					className="rounded-xl border border-black/10 dark:border-white/10 p-5 bg-white/30 dark:bg-white/5 backdrop-blur-sm shadow-sm"
					variants={cardVariants}
					initial="hidden"
					animate="visible"
					layout
				>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<div>
							<label className="block text-sm mb-1 dark:text-white">Name</label>
							<input
								type="text"
								value={name}
								onChange={(e) => setName(e.target.value)}
								className="w-full rounded-md border border-black/10 dark:border-white/10 bg-white/50 dark:bg-white/10 px-3 py-2 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
								placeholder="Your name"
							/>
							{errors.name && (
								<div className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.name}</div>
							)}
						</div>
						<div>
							<label className="block text-sm mb-1 dark:text-white">Email</label>
							<input
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="w-full rounded-md border border-black/10 dark:border_white/10 bg-white/50 dark:bg-white/10 px-3 py-2 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
								placeholder="you@example.com"
							/>
							{errors.email && (
								<div className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.email}</div>
							)}
						</div>
					</div>

					<div className="mt-4">
						<label className="block text-sm mb-1 dark:text-white">Message</label>
						<textarea
							value={message}
							onChange={(e) => setMessage(e.target.value)}
							rows={5}
							className="w-full max-h-60 rounded-md border border-black/10 dark:border-white/10 bg-white/50 dark:bg-white/10 px-3 py-2 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="How can I help?"
						/>
						{errors.message && (
							<div className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.message}</div>
						)}
					</div>

					<div className="mt-6 flex items-center justify-between">
						<motion.button
							type="submit"
							whileHover={{ scale: 1.03 }}
							whileTap={{ scale: 0.98 }}
							className="rounded-md bg-black dark:bg-gray-400/20 text-white px-4 py-2 text-sm shadow-sm cursor-pointer"
						>
							Send Message
						</motion.button>
                        {errors.submit && (
                            <div className="mt-2 text-xs text-red-600 dark:text-red-400">
                                {errors.submit}
                            </div>
                        )}

						{submitted && (
							<motion.span
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								className="text-xs text-black/70 dark:text-white/70"
							>
								Submission sent!
							</motion.span>
						)}
					</div>
				</motion.form>
			</motion.div>
		</motion.section>
	);
};

export default Contact;

