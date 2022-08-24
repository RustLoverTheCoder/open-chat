import { Component } from 'solid-js'
import { iconType } from '../../types'

const ChevronLeft: Component<iconType> = (props) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' fill='none' {...props} viewBox='0 0 24 24' stroke-width='1.5'
         stroke='currentColor'
         class='w-6 h-6'>
      <path stroke-linecap='round' stroke-linejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
    </svg>
  )
}

export default ChevronLeft
