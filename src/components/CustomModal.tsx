import { ReactNode } from "react"
import Button from "./Button"

type CustomModalProps = {
  children: ReactNode,
  isOpen: boolean,
  closeHandle: () => void
}

const CustomModal = ({ children, isOpen, closeHandle }: CustomModalProps) => {
  if(!isOpen) return
  return (
    <div className="fixed top-0 bottom-0 right-0 left-0 bg-black bg-opacity-40 z-[10]">
      <div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 dark:bg-black bg-white z-1 p-2 md:p-4 max-w-xl w-full rounded-lg">
        <div className='realtive p-2'>
          <Button
            text="&times;"
            styles="absolute top-2 right-4 text-3xl"
            handleClick={closeHandle}
          />
          {children}
        </div>
      </div>
    </div>
  )
}

export default CustomModal