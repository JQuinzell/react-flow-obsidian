import { useCallback } from 'react'
import { Handle, Position } from '@xyflow/react'

const handleStyle = { left: 10 }

export function ObsidianNode({ data }: { data: any }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value)
  }, [])

  return (
    <div className='relative p-4 flex flex-col items-center justify-center'>
      <div className='rounded-full aspect-square w-12 bg-purple-900 flex items-center justify-center'></div>
      <p className='text-white text-sm absolute bottom-0 text-center'>
        {data.label}
      </p>
    </div>
  )
}
