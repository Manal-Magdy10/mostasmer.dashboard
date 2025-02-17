'use client'
import React, { useEffect, useState } from 'react'
import { LoadingIcon } from '../icons'
import { useTranslations } from 'next-intl'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog'
import AddOnBoarding from './AddOnBoarding'
import { EditIcon, Trash2Icon } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { deleteOnBoarding, setOnBoarding } from '@/redux/reducers/onBoardsReducer'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useAppContext } from '@/context/appContext'
import Image from 'next/image'

const OnBoardingHeader = ({ data }: { data: any }) => {
    const t = useTranslations('onBoarding')
    const [open, setOpen] = useState(false)
    const [edit, setEdit] = useState(null as any)
    const [deleteBoard, setDeleteBoard] = useState(null as any)
    const [loading, setLoading] = useState(false)
    const { token } = useAppContext()

    const onBoardings = useAppSelector(s => s.onboarding.onboarding)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(setOnBoarding(data.onBoarding))
    }, [])

    const handleDelete = async () => {
        try {
            setLoading(true)
            await axios.delete(`/api/on-boarding/${deleteBoard}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            dispatch(deleteOnBoarding(deleteBoard))
            setDeleteBoard(false)
            toast.success(t('successDelete'))
            setLoading(false)
        } catch (error: any) {
            setLoading(false)
            console.error(error)
            toast.error(error?.response?.data?.message || 'There is an Error')
        }
    }

    return (
        <div className='p-6 bg-gray-200 rounded-lg shadow-2xl box-shadow-2xl'>
            {/* Header */}
            <div className='flex justify-between items-center mb-8'>
                <h1 className='text-2xl font-semibold'>{t('title')}</h1>
                <button
                    onClick={() => setOpen(true)}
                    className='px-4 py-2 bg-[#001529] text-white rounded-lg hover:bg-teal-700 transition-colors'
                >
                    + {t('add')}
                </button>
            </div>

            {/* Cards Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {onBoardings.map((board: any) => (
                    <div key={board.id} className='bg-gray-50 rounded-lg overflow-hidden'>
                        {/* Image */}
                        <div className='aspect-video relative'>
                            <Image
                                src={board.imageUrl}
                                alt={board.title}
                                fill
                                className='object-cover'
                            />
                        </div>

                        {/* Content */}
                        <div className='p-4'>
                            <h3 className='font-semibold text-lg mb-2'>{board.title}</h3>
                            <p className='text-gray-600 text-sm'>{board.content}</p>
                        </div>

                        {/* Actions */}
                        <div className='flex justify-end gap-2 p-4 border-t'>
                            <button
                                onClick={() => {
                                    setEdit(board)
                                    setOpen(true)
                                }}
                                className='p-2 hover:bg-gray-100 rounded-full transition-colors'
                            >
                                <EditIcon className='w-5 h-5 text-gray-600' />
                            </button>
                            <button
                                onClick={() => setDeleteBoard(board.id)}
                                className='p-2 hover:bg-gray-100 rounded-full transition-colors'
                            >
                                <Trash2Icon className='w-5 h-5 text-red-500' />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add/Edit Dialog */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{edit ? t('editTitle') : t('addTitle')}</DialogTitle>
                        <DialogDescription>
                            {edit ? t('editDescription') : t('addDescription')}
                        </DialogDescription>
                    </DialogHeader>
                    <AddOnBoarding
                        handleClose={() => {
                            setOpen(false)
                            setEdit(null)
                        }}
                        board={edit}
                    />
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={!!deleteBoard} onOpenChange={() => setDeleteBoard(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{t('deleteTitle')}</DialogTitle>
                        <DialogDescription>{t('deleteDescription')}</DialogDescription>
                    </DialogHeader>
                    <div className='flex justify-end gap-3'>
                        <button
                            onClick={() => setDeleteBoard(null)}
                            className='px-4 py-2 border rounded-lg hover:bg-gray-50'
                        >
                            {t('cancel')}
                        </button>
                        <button
                            onClick={handleDelete}
                            className='px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600'
                        >
                            {loading ? (
                                <LoadingIcon className='w-5 h-5 animate-spin' />
                            ) : (
                                t('delete')
                            )}
                        </button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default OnBoardingHeader