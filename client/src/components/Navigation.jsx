import React from "react";
import { useCallback, useRef, useState } from "react";

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

    const clickRef = useRef(null);
    const hoverRef = useRef(null);
    const lastHoverTime = useRef(0);


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

    return (
        <div className="w-1/2 h-1/2 [--nav-active-color:rgba(0,0,0,1)] [--nav-inactive-color:rgba(0,0,0,0.35)] dark:[--nav-active-color:rgba(255,255,255,1)] dark:[--nav-inactive-color:rgba(255,255,255,0.35)]">
            <div className="flex flex-col items-start text-3xl w-1/2 h-1/2 p-16 pr-1 gap-2 antialiased">
                {navItems.map((item) => (
                    <a
                        key={item.id}
                        onClick={() => { setActiveItem(item.id); playClick(); }}
                        onMouseEnter={() => { setHoveredItem(item.id); playHover(); }}
                        onMouseLeave={() => setHoveredItem(null)}
                        style={getItemStyle(item.id)}
                        className="cursor-pointer py-2"
                    >
                        {item.label}
                    </a>
                ))}
            </div>
            <audio ref={clickRef} src="/audio/click.mp3" preload="auto" />
            <audio ref={hoverRef} src="/audio/typewrite.mp3" preload="auto" />
        </div>
    );
};

export default Navigation;