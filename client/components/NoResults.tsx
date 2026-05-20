import React from 'react'
import { FaMagnifyingGlass } from 'react-icons/fa6'

interface Props {
  message?: string
  subMessage?: string
}

function NoResults({ 
  message = "No matching gemz found", 
  subMessage = "Try adjusting your filters or search terms" 
}: Props) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in duration-300">
      <div className="mb-6 rounded-full bg-teal-50 p-8 text-teal-600">
        <FaMagnifyingGlass className="h-16 w-16" />
      </div>
      <h3 className="mb-2 text-2xl font-bold text-gray-800">{message}</h3>
      <p className="text-gray-600 max-w-xs mx-auto">
        {subMessage}
      </p>
    </div>
  )
}

export default NoResults
