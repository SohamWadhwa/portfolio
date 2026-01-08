import "@theme-toggles/react/css/Around.css"
import { Around } from "@theme-toggles/react"
import Dot from "./Dot";
import { useRef, useCallback, useState } from "react";

const Sidebar = ({ theme, toggleTheme }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const clickRef = useRef(null);
    const hoverRef = useRef(null);
    const lastHoverTime = useRef(0);
    const themeRef = useRef(null);

    const playThemeSound = () => {
        if (!themeRef.current) return;

        themeRef.current.currentTime = 0;
        themeRef.current.volume = 0.35;
        themeRef.current.play().catch(() => {});
    };

    const playHover = useCallback(() => {
        const now = Date.now();

        // prevent rapid re-triggering
        if (now - lastHoverTime.current < 150) return;

        lastHoverTime.current = now;
        hoverRef.current.currentTime = 0;
        hoverRef.current.volume = 0.25;
        hoverRef.current.play().catch(() => {});
    }, []);

    const playClick = () => {
        clickRef.current.currentTime = 0;
        clickRef.current.volume = 0.5;
        clickRef.current.play().catch(() => {});
    };

    const toggleMenu = () => {
        playClick();
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            {/* Desktop Sidebar */}
            <div className="hidden md:flex flex-col items-center justify-between gap-4 w-28 h-full bg-sky-100/60 dark:bg-black text-black dark:text-[#f7f7f7] text-3xl p-16 shadow-2xl backdrop-blur-xl" >
                <span className="font-semibold text-3xl rotate-270 p-8">Portfolio.</span>
                <div className="flex justify-between items-center gap-1 rotate-270 font-light text-gray-600">
                    <a className="text-xl hover:text-[#213547] dark:hover:text-[#edf6f9] transition-colors duration-200 p-2 cursor-pointer" onClick={playClick} onMouseEnter={playHover}>LinkedIn</a>
                    <Dot size="w-2 h-2"/>
                    <a className="text-xl hover:text-[#213547] dark:hover:text-[#edf6f9] transition-colors duration-200 p-2 cursor-pointer" onClick={playClick} onMouseEnter={playHover}>Github</a>
                    <Dot size="w-2 h-2"/>
                    <a className="text-xl hover:text-[#213547] dark:hover:text-[#edf6f9] transition-colors duration-200 p-2 cursor-pointer" onClick={playClick} onMouseEnter={playHover}>X</a>
                    <Dot size="w-2 h-2"/>
                    <a className="text-xl hover:text-[#213547] dark:hover:text-[#edf6f9] transition-colors duration-200 p-2 cursor-pointer" onClick={playClick} onMouseEnter={playHover}>Instagram</a>
                </div>
                <Around toggled={theme === "dark"} toggle={() => { playThemeSound(); toggleTheme(); }} duration={750} onMouseEnter={playHover}/>
            </div>

            {/* Mobile Navbar */}
            <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-[#f7f7f7] dark:bg-black text-black dark:text-[#f7f7f7]">
                <div className="flex items-center justify-between px-6 py-4">
                    <span className="font-semibold text-xl">Portfolio.</span>
                    <div className="flex items-center gap-4">
                        <Around toggled={theme === "dark"} toggle={() => { playThemeSound(); toggleTheme(); }} duration={750} onMouseEnter={playHover} className="text-2xl"/>
                        {/* Hamburger Button */}
                        <button 
                            onClick={toggleMenu} 
                            onMouseEnter={playHover}
                            className="flex flex-col justify-center items-center w-8 h-8 gap-1.5 cursor-pointer"
                            aria-label="Toggle menu"
                        >
                            <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                            <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                            <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="flex flex-col items-center gap-4 py-6 bg-[#f7f7f7] dark:bg-black border-t border-gray-200 dark:border-gray-800">
                        <a className="text-xl font-light text-gray-400 hover:text-[#213547] dark:hover:text-[#edf6f9] transition-colors duration-200 cursor-pointer" onClick={() => { playClick(); setIsMenuOpen(false); }} onMouseEnter={playHover}>LinkedIn</a>
                        <a className="text-xl font-light text-gray-400 hover:text-[#213547] dark:hover:text-[#edf6f9] transition-colors duration-200 cursor-pointer" onClick={() => { playClick(); setIsMenuOpen(false); }} onMouseEnter={playHover}>X</a>
                        <a className="text-xl font-light text-gray-400 hover:text-[#213547] dark:hover:text-[#edf6f9] transition-colors duration-200 cursor-pointer" onClick={() => { playClick(); setIsMenuOpen(false); }} onMouseEnter={playHover}>Instagram</a>
                    </div>
                </div>
            </div>

            {/* Mobile spacer to prevent content from being hidden under navbar */}
            <div className="md:hidden h-16"></div>

            <audio ref={clickRef} src="/audio/click.mp3" preload="auto" />
            <audio ref={hoverRef} src="/audio/typewrite.mp3" preload="auto" />
            <audio ref={themeRef} src="/audio/theme.wav" preload="auto" />
        </>
    );
};

export default Sidebar;