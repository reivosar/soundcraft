import React from "react";

type KnobProps = {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
};

export const Knob: React.FC<KnobProps> = ({
  label,
  min,
  max,
  step,
  value,
  onChange,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(parseFloat(event.target.value));
  };

  return (
    <div className="flex flex-col items-center">
      <label className="text-white mb-2">{label}</label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        className="knob"
      />
      <span className="text-white mt-2">{value}</span>
    </div>
  );
};
