import React from 'react'

export function FormControl({ classes: { root }, onClick, children }) {
  return (
    <div className={root} onClick={onClick}>
      {children}
    </div>
  )
}
