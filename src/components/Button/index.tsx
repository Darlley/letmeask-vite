import { ButtonHTMLAttributes } from 'react';
import '../../styles/button.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    isOutlined: boolean;
}

export function Button({isOutlined, ...props}: ButtonProps) {
    return (
        <button {...props} className={`${props.className} ${isOutlined && 'outlined'}`} >
            {props.children}
        </button>
    )
}