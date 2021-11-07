import { ButtonHTMLAttributes } from 'react'
import '../../styles/button.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined: boolean
}

export function Button({ isOutlined, className, ...props }: ButtonProps) {
  return (
    <button {...props} className={`${className} ${isOutlined && 'outlined'}`}>
      {props.children}
    </button>
  )
}
