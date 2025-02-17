'use client'
import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface InfoSectionProps {
    title: string
    content: string
    direction: 'ltr' | 'rtl'
    onEdit?: (value: string) => void
    onSave?: () => void
    isEdited?: boolean
}

const InfoSection = ({ 
    title, 
    content, 
    direction,
    onEdit,
    onSave,
    isEdited 
}: InfoSectionProps) => {
    const [isExpanded, setIsExpanded] = useState(false)
    const [isEditing, setIsEditing] = useState(false)

    return (
        <div className={cn(
            "mb-2 overflow-hidden",
            direction === 'rtl' ? 'text-right' : 'text-left'
        )}>
            <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className={cn(
                    "w-full px-5 py-3 flex items-center justify-between",
                    "bg-gray-100/90 hover:bg-gray-200/90 transition-colors duration-200",
                    "rounded-lg"
                )}
            >
                <h3 className="text-base font-medium text-gray-700 hover:brightness-125">
                    {title}
                </h3>
                <ChevronDown 
                    className={cn(
                        "h-5 w-5 text-teal-500 transition-all duration-200",
                        "hover:drop-shadow-[0_0_8px_rgba(20,184,166,0.5)] hover:text-teal-400",
                        "filter hover:brightness-125",
                        isExpanded ? "transform rotate-180" : ""
                    )}
                />
            </button>

            <div className={cn(
                "transition-all duration-200 ease-in-out bg-white rounded-lg mt-1",
                isExpanded ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
            )}>
                <div className="p-4">
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                            {isEditing ? (
                                <textarea
                                    value={content}
                                    onChange={(e) => onEdit?.(e.target.value)}
                                    className={cn(
                                        "w-full p-3 text-sm rounded-lg",
                                        "border border-gray-200",
                                        "focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none",
                                        "text-gray-700 placeholder:text-gray-400",
                                        direction === 'rtl' ? 'text-right' : 'text-left'
                                    )}
                                    rows={5}
                                    placeholder={`Enter ${title}`}
                                />
                            ) : (
                                <div className={cn(
                                    "w-full p-4 rounded-lg",
                                    "bg-gray-200/80 border-2 drop-shadow-2xl ",
                                    "text-gray-600 min-h-[120px] text-base",
                                    direction === 'rtl' ? 'text-right' : 'text-left'
                                )}>
                                    {content || `No ${title} content available`}
                                </div>
                            )}
                        </div>
                        
                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            className={cn(
                                "px-3 py-1.5 text-xs rounded-lg",
                                "transition-colors duration-200 bg-gray-100/90 border border-gray-200 hover:bg-gray-200/90",
                                isEditing 
                                    ? "text-gray-600 hover:text-gray-800" 
                                    : "text-teal-500 hover:text-teal-600"
                            )}
                        >
                            {isEditing ? 'Cancel' : 'Edit'}
                        </button>
                    </div>

                    {isEdited && onSave && isEditing && (
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={() => {
                                    onSave()
                                    setIsEditing(false)
                                }}
                                className={cn(
                                    "px-4 py-1.5 text-xs font-medium rounded-lg",
                                    "bg-teal-500 text-white",
                                    "transition-colors duration-200",
                                    "hover:bg-teal-600 active:bg-teal-700"
                                )}
                            >
                                Save Changes
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default InfoSection 