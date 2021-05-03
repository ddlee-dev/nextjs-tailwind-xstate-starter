import { FC, ReactNode, ButtonHTMLAttributes } from 'react';

const theme: { [key: string]: string } = {
  default: 'border-gray-300 bg-gray-200 hover:bg-gray-300 hover:shadow-md text-gray-800',
  primary: 'bg-blue-600 hover:bg-blue-700 hover:shadow-md text-white',
  secondary: 'bg-red-600 hover:bg-red-700 hover:shadow-md text-white'
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'secondary';
  className?: string;
  children: ReactNode;
}

const Button: FC<ButtonProps> = ({ variant = 'default', className = '', children, ...props }) => {
  return (
    <button
      className={`relative shadow border font-normal py-2 px-4 rounded-md w-max ${theme[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
