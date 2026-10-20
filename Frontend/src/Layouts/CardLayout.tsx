import React from 'react'
const CardLayout = ({children,className}:React.PropsWithChildren & {className?:string}) => {
  return (
    <div className={`p-4 shadow-md bg-white rounded-lg ${className}`}> 
        {children}
    </div>
  )
}

export default CardLayout