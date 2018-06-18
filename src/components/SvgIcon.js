import React from 'react'

export function SvgIcon(props) {
  let width = props.width || 24
  let height = props.height || 24

  const containerStyle = {
    width,
    height,
    display: 'inline-block',
    fill: '#000',
    color: 'rgba(0, 0, 0, 0.87)',
    userSelect: 'none',
    transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms'
  }

  return (
    <svg viewBox="0 0 24 24" style={containerStyle}>
      {props.children}
    </svg>
  )
}
