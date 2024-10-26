"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface NumberInputProps {
  onChange?: (value: number) => void;
  value?: number;
}

export function NumberInput({ onChange }: NumberInputProps) {
  const [input, setInput] = useState<number>(0);
  const handleIncrement = () => {
    setInput((prevValue) => prevValue + 1);
  };
  const handleDecrement = () => {
    if (input > 0) {
      setInput((prevValue) => prevValue - 1);
    }
  };
  return (
    <div className="flex items-center space-x-2">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={handleDecrement}
      >
        <MinusIcon className="w-5 h-5" />
      </Button>
      <Input
        value={input}
        onChange={(e) => {
          setInput(Number(e.target.value));
          if (onChange) {
            onChange(Number(e.target.value));
          }
        }}
        min={0}
        className="w-20 text-center"
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={handleIncrement}
      >
        <PlusIcon className="w-5 h-5" />
      </Button>
    </div>
  );
}

const MinusIcon = ({ className }: { className: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14" />
  </svg>
);

const PlusIcon = ({ className }: { className: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </svg>
);
