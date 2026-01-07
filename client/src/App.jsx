import { useState, useEffect } from "react";
import Sidebar from "./components/sidebar.jsx";
import Hero from "./components/Hero.jsx";
import Navigation from "./components/Navigation.jsx";
import About from "./components/About.jsx";
import Projects from "./components/Projects.jsx";
import Skills from "./components/Skills.jsx";
import Contact from "./components/Contact.jsx";

const navItems = [
  { id: "about", label: "About me" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

function App() {
  const [theme, setTheme] = useState("light");
  const [activeItem, setActiveItem] = useState("about");

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    console.log("Theme changed to:", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div className="flex h-screen w-screen overflow-x-hidden overflow-y-hidden bg-[#F5F5DC] dark:bg-black">
      <Sidebar theme={theme} toggleTheme={toggleTheme} />
      <div className="flex flex-col w-1/2">
        <Hero />
        <Navigation 
          navItems={navItems} 
          activeItem={activeItem} 
          setActiveItem={setActiveItem} 
        />
      </div>
      <div className="w-1/2">
        {activeItem === "about" && <About />}
        {activeItem === "projects" && <Projects />}
        {activeItem === "skills" && <Skills />}
        {activeItem === "contact" && <Contact />}
      </div>
    </div>
  );
}

export default App;
