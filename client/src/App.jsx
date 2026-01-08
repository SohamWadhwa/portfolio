import { useState, useEffect } from "react";
import Sidebar from "./components/sidebar.jsx";
import Hero from "./components/Hero.jsx";
import Navigation from "./components/Navigation.jsx";
import About from "./components/About.jsx";
import Projects from "./components/Projects.jsx";
import Skills from "./components/Skills.jsx";
import Contact from "./components/Contact.jsx";
import Index from "./components/Background.jsx";

const navItems = [
  { id: "about", label: "About me" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

function App() {
  const [theme, setTheme] = useState("dark");
  const [activeItem, setActiveItem] = useState("about");
  const [bgReady, setBgReady] = useState(false);

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
    <div className="relative flex h-screen w-screen overflow-x-hidden overflow-y-hidden bg-transparent dark:bg-transparent">
      <Index onReady={() => setBgReady(true)} />
      {bgReady && (
        <>
          <Sidebar theme={theme} toggleTheme={toggleTheme} />
          <div className="flex flex-col w-1/2 relative z-10">
            <Hero />
            <Navigation
              navItems={navItems}
              activeItem={activeItem}
              setActiveItem={setActiveItem}
            />
          </div>
          <div className="w-1/2 relative z-10">
            {activeItem === "about" && <About />}
            {activeItem === "projects" && <Projects />}
            {activeItem === "skills" && <Skills />}
            {activeItem === "contact" && <Contact />}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
