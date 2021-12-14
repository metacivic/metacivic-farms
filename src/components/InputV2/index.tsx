import React, { forwardRef, memo, useCallback } from 'react'

import { InputBSCProps, InputBSCRef } from './index.d'
import './index.less'

const Input = memo<InputBSCProps>(forwardRef<InputBSCRef,InputBSCProps>((props) => {
  const {left, right, value, placeholder, change, type = 'text'} = props
  const handleChange = useCallback((e) => {
    if (change) {
      change(e)
    }
  }, [change])
  return (
    <div
      placeholder={placeholder}
      className='bsc-input'
    >
      {left&&(
        <div
          className='bsc-input-left'
        >
          {left}
        </div>
      )}
      <input
        {...(value ? { value } : {  })}
        onChange={handleChange}
        type={type}
      />
      {right&&(
        <div
          className='bsc-input-right'
        >
          {right}
        </div>
      )}
    </div>
  )
}))
export * from './index.d'
export default Input