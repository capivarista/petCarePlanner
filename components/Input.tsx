// components/Input.tsx
"use client";
import { InputHTMLAttributes, useState } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    success?: boolean;
}

export default function Input({ label, error, success, ...rest }: InputProps) {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className="field">
            {label && (
                <label className="label" htmlFor={rest.id}>
                    {label}
                </label>
            )}

            <input
                className={`input ${error ? 'error' : ''} ${success ? 'success' : ''} ${
                    isFocused ? 'focused' : ''
                }`}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                {...rest}
            />

            {error && (
                <span className="error-message" style={{
                    fontSize: '12px',
                    color: 'var(--red)',
                    paddingLeft: '8px',
                    marginTop: '4px'
                }}>
          {error}
        </span>
            )}
        </div>
    );
}