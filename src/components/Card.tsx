import { FC, HTMLProps, ReactNode } from 'react'
interface props {
    children?: ReactNode,
    className?: HTMLProps<HTMLDivElement>['className']
}
const Card: FC<props> = ({ children = '', className = '' }) => {
    return (
        <div className={'shadow-md rounded-md bg-white pt-3 py-6 lg:px-7 px-4 ' + className}>{children}</div>
    )
}

export default Card