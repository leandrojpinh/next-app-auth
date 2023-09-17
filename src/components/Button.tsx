import { ButtonHTMLAttributes } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
}


export default function Button({ label, className, ...rest }: ButtonProps) {
  return (
    <button {...rest} className={className}>
      {label}
    </button>
  )

}