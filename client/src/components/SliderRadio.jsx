import React, { useEffect, useRef, useState } from 'react';

// Normalize options to { label, value }
const normalizeOptions = (options) =>
  options.map((o) => (typeof o === 'string' ? { label: o, value: o } : o));

// Choice chips with a sliding indicator under the selected chip
const SliderRadio = ({
  options = ['Option 1', 'Option 2', 'Option 3'],
  value,
  defaultIndex = 0,
  onChange,
  className = '',
  size = 'md',
  disabled = false,
}) => {
  const items = normalizeOptions(options);

  const [selectedIndex, setSelectedIndex] = useState(() => {
    if (value != null) {
      const idx = items.findIndex((i) => i.value === value);
      return idx >= 0 ? idx : 0;
    }
    return Math.min(defaultIndex, items.length - 1);
  });

  const containerRef = useRef(null);
  const chipRefs = useRef([]);
  const [sliderStyle, setSliderStyle] = useState({ width: 0, x: 0 });

  const updateSlider = (idx) => {
    const container = containerRef.current;
    const chip = chipRefs.current[idx];
    if (!container || !chip) return;
    const containerRect = container.getBoundingClientRect();
    const chipRect = chip.getBoundingClientRect();
    const width = chipRect.width;
    const x = chipRect.left - containerRect.left;
    setSliderStyle({ width, x });
  };

  useEffect(() => {
    updateSlider(selectedIndex);
    const onResize = () => updateSlider(selectedIndex);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIndex, items.length]);

  // Keep controlled `value` in sync
  useEffect(() => {
    if (value != null) {
      const idx = items.findIndex((i) => i.value === value);
      if (idx >= 0) setSelectedIndex(idx);
    }
  }, [value, items]);

  const handleSelect = (idx) => {
    if (disabled) return;
    setSelectedIndex(idx);
    onChange?.(items[idx].value, idx);
  };

  const sizes = {
    sm: 'text-sm px-3 py-1',
    md: 'text-base px-4 py-1.5',
    lg: 'text-lg px-5 py-2',
  };

  const onKeyDown = (e) => {
    if (disabled) return;
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault();
      const delta = e.key === 'ArrowRight' ? 1 : -1;
      const next = (selectedIndex + delta + items.length) % items.length;
      handleSelect(next);
      chipRefs.current[next]?.focus();
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative inline-flex items-center rounded-full bg-black/5 dark:bg-white/10 p-1 ${
        disabled ? 'opacity-50 pointer-events-none' : ''
      } ${className}`}
      role="radiogroup"
      aria-disabled={disabled}
      onKeyDown={onKeyDown}
    >
      {/* Sliding indicator */}
      <div
        className="absolute top-1 left-0 h-[calc(100%-0.5rem)] rounded-full bg-black shadow-sm dark:bg-white/15"
        style={{
          width: sliderStyle.width,
          transform: `translateX(${sliderStyle.x}px)`,
          transition: 'transform 300ms ease-out, width 300ms ease-out',
        }}
        aria-hidden="true"
      />

      {/* Chips */}
      {items.map((opt, idx) => {
        const active = idx === selectedIndex;
        return (
          <button
            key={opt.value ?? idx}
            ref={(el) => (chipRefs.current[idx] = el)}
            type="button"
            role="radio"
            aria-checked={active}
            className={`relative flex justify-center text-center cursor-pointer z-10 rounded-full ${sizes[size]} transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:focus-visible:ring-white/20 ${
              active ? 'text-white dark:text-white' : 'text-black/60 dark:text-white/60'
            }`}
            onClick={() => handleSelect(idx)}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
};

export default SliderRadio;
