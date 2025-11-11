// components/Input.tsx
"use client";
import { InputHTMLAttributes } from "react";

export default function Input(props: InputHTMLAttributes<HTMLInputElement> & {label?:string}) {
    const { label, ...rest } = props;
    return (
        <div className="field">
            {label && <label className="label">{label}</label>}
            <input className="input" {...rest}/>
        </div>
    );
}
