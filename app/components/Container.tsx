import { FC, ReactNode } from "react"
import clsx from "clsx"

interface ContainerProps {
	children: ReactNode
}
const Container: FC<ContainerProps> = ({ children }) => {
	const containerClass = clsx("max-w-[1920px] mx-auto xl:px-20 md:px-2 px-4")
	return <div className={containerClass}>{children}</div>
}

export default Container
