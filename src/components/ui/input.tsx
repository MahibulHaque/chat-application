import * as React from "react";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
  onIconClick?: () => void; // Callback function to handle icon click
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, onIconClick, ...props }, ref) => {
    return (
      <div className='relative'>
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed",
            className
          )}
          ref={ref}
          {...props}
        />
        {icon && (
          <div className='absolute top-0 right-0 h-full flex items-center pr-2'>
            <div onClick={onIconClick} className='cursor-pointer'>
              {icon}
            </div>
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
