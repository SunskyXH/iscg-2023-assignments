import { ButtonHTMLAttributes, forwardRef, memo } from 'react'
import cx from 'classnames'

export type Props = {} & ButtonHTMLAttributes<HTMLButtonElement>

const Button = forwardRef<HTMLButtonElement, Props>((props, ref) => {
  const { className, ...buttonProps } = props

  return (
    <button
      type="submit"
      {...buttonProps}
      ref={ref}
      className={cx(
        'rounded-lg  bg-black px-4 py-2 text-base font-semibold text-white disabled:cursor-not-allowed',
        buttonProps.disabled && '!bg-gray-200 !text-black',
        className,
      )}
    />
  )
})
Button.displayName = 'Button'
export default memo(Button)
