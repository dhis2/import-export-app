import React from 'react'

export function FormControl({ className, onClick, children }) {
  return (
    <div className={className} onClick={onClick}>
      {children}
    </div>
  )
}
