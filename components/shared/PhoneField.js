'use client';
import React from 'react';
import { Label } from '@/components/ui/label';
import PhoneInput from "react-phone-number-input";
import { cn } from "@/lib/utils";

export default function PhoneField({ label, error, value, onChange, className, ...props }) {

  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}
      <div className="flex gap-2">
        <PhoneInput
          international
          countryCallingCodeEditable={false}
          defaultCountry="GE"
          value={value}
          onChange={onChange}
          className={cn(`w-full gap-1 h-12 pl-4 pr-[2px] overflow-hidden rounded-lg border border-gray-200 bg-white [&_input]:w-full [&_input]:h-[42px] [&_input]:border-none [&_input]:rounded-lg
             [&_input:focus]:outline-none
              [&_input:focus]:ring-2
              [&_input:focus]:ring-[#0F6A4F]
              [&_input:focus]:border-transparent`, className || "")}

          {...props}
        />
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}