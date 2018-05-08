import React from 'react'

export function FormControl({ className, style, onClick, children }) {
  return (
    <div style={style} className={className} onClick={onClick}>
      {children}
    </div>
  )
}
