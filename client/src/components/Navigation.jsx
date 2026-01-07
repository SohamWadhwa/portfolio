import { useState } from "react";

const Navigation = ({ navItems, activeItem, setActiveItem }) => {
    const [hoveredItem, setHoveredItem] = useState(null);

    const getItemStyle = (id) => {
        const isActive = activeItem === id;
        const isHovered = hoveredItem === id;
        const isScaled = isActive || isHovered;

        return {
            transform: isScaled ? 'scale(1.4) translateZ(0)' : 'scale(1) translateZ(0)',
            transformOrigin: 'left center',
            transition: 'transform 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94), color 300ms ease, font-weight 300ms ease',
            willChange: 'transform',
            color: isScaled 
                ? 'var(--nav-active-color)' 
                : 'var(--nav-inactive-color)',
            fontWeight: isScaled ? 800 : 600,
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
            textRendering: 'optimizeLegibility',
            backfaceVisibility: 'hidden',
        };
    };

    return (
        <div className="w-1/2 h-1/2 [--nav-active-color:rgba(0,0,0,1)] [--nav-inactive-color:rgba(0,0,0,0.35)] dark:[--nav-active-color:rgba(255,255,255,1)] dark:[--nav-inactive-color:rgba(255,255,255,0.35)]">
            <div className="flex flex-col items-start text-3xl w-1/2 h-1/2 p-16 pr-1 gap-2 antialiased">
                {navItems.map((item) => (
                    <a
                        key={item.id}
                        onClick={() => setActiveItem(item.id)}
                        onMouseEnter={() => setHoveredItem(item.id)}
                        onMouseLeave={() => setHoveredItem(null)}
                        style={getItemStyle(item.id)}
                        className="cursor-pointer py-2"
                    >
                        {item.label}
                    </a>
                ))}
            </div>
        </div>
    );
};

export default Navigation;