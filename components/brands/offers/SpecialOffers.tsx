// // // 'use client'
// // // import React, { useEffect, useState } from 'react'
// // // import { useTranslations } from 'next-intl'
// // // import { useAppContext } from '@/context/appContext'
// // // import {  TrashIcon, PlusIcon } from '@heroicons/react/24/outline'
// // // import { Dialog, DialogContent } from '@/components/ui/dialog'
// // // import { useForm } from 'react-hook-form'
// // // import toast from 'react-hot-toast'
// // // import { Select } from '@/components/ui/select'
// // // import Table from '@/components/ui/Table'

// // // interface SpecialOffer {
// // //     id: number
// // //     brandId: number
// // //     type: 'Basic' | 'Standard' | 'VIP'
// // //     validFrom: string
// // //     validTo: string
// // //     ratio: number
// // //     createdAt: string
// // //     updatedAt: string
// // //     brand?: {
// // //         id: number
// // //         name: string
// // //         logo: string
// // //     }
// // //     userType?: {
// // //         id: number
// // //         userType: string
// // //         ratio: number
// // //         color: string
// // //         buyAmount: number
// // //     }
// // // }

// // // interface OfferFormData {
// // //     type: 'Basic' | 'Standard' | 'VIP'
// // //     ratio: number
// // //     validFrom: string
// // //     validTo: string
// // // }

// // // interface Badge {
// // //     id: number
// // //     name: string
// // //     userType: {
// // //         userType: string
// // //     } | null
// // // }

// // // const SpecialOffers = ({ brandId }: { brandId: string }) => {
// // //     const [offers, setOffers] = useState<SpecialOffer[]>([])
// // //     const [badges, setBadges] = useState<Badge[]>([])
// // //     const [loading, setLoading] = useState(false)
// // //     const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
// // //     const { token } = useAppContext()
// // //     const t = useTranslations('brand')

// // //     const { register, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm<OfferFormData>({
// // //         defaultValues: {
// // //             type: undefined,
// // //             ratio: undefined,
// // //             validFrom: undefined,
// // //             validTo: undefined
// // //         }
// // //     })
// // //     const [currentPage, setCurrentPage] = useState(1)
// // //     const [pageSize, setPageSize] = useState(10)

// // //     useEffect(() => {
// // //         fetchSpecialOffers()
// // //         fetchBadges()
// // //     }, [brandId])

// // //     const handlePageChange = (page: number) => {
// // //         setCurrentPage(page)
// // //     }

// // //     const handlePageSizeChange = (newPageSize: number) => {
// // //         setPageSize(newPageSize)
// // //         setCurrentPage(1)
// // //     }

// // //     const fetchSpecialOffers = async () => {
// // //         try {
// // //             setLoading(true)
// // //             const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/brand/special-offer/${brandId}`, {
// // //                 headers: {
// // //                     'Authorization': `Bearer ${token}`
// // //                 }
// // //             })

// // //             if (!response.ok) throw new Error('Failed to fetch offers')
// // //             const data = await response.json()
// // //             setOffers(data.offers || [])
// // //         } catch (error) {
// // //             console.error('Error:', error)
// // //             toast.error('Failed to load offers')
// // //         } finally {
// // //             setLoading(false)
// // //         }
// // //     }

// // //     const fetchBadges = async () => {
// // //         try {
// // //             const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/badges`, {
// // //                 headers: {
// // //                     'Authorization': `Bearer ${token}`
// // //                 }
// // //             })

// // //             if (!response.ok) throw new Error('Failed to fetch badges')
// // //             const data = await response.json()
// // //             setBadges(data.badges || [])
// // //         } catch (error) {
// // //             console.error('Error fetching badges:', error)
// // //             toast.error('Failed to load badges')
// // //         }
// // //     }

// // //     const formatDate = (dateString: string) => {
// // //         return new Date(dateString).toLocaleDateString()
// // //     }

// // //     const onSubmit = async (data: OfferFormData) => {
// // //         try {
// // //             setLoading(true)

// // //             // Format dates to match the required format YYYY/MM/DD
// // //             const formatDate = (dateStr: string) => {
// // //                 const date = new Date(dateStr)
// // //                 return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
// // //             }

// // //             const body = JSON.stringify({
// // //                 type: data.type,
// // //                 ratio: Number(data.ratio),
// // //                 validFrom: formatDate(data.validFrom),
// // //                 validTo: formatDate(data.validTo)
// // //             })

// // //             const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/brand/special-offer/${brandId}`, {
// // //                 method: 'POST',
// // //                 headers: {
// // //                     'Authorization': `Bearer ${token}`,
// // //                     'Content-Type': 'application/json'
// // //                 },
// // //                 body
// // //             })

// // //             if (!response.ok) {
// // //                 const errorData = await response.json()
// // //                 throw new Error(errorData.message || t('failed_to_save_offer'))
// // //             }

// // //             const result = await response.json()
// // //             console.log('Offer created:', result)

// // //             toast.success(t('offer_added_successfully'))
// // //             await fetchSpecialOffers()
// // //             handleCloseDialog()
// // //         } catch (error: unknown) {
// // //             const err = error as Error
// // //             console.error('Error:', err)
// // //             toast.error(err.message || t('failed_to_save_offer'))
// // //         } finally {
// // //             setLoading(false)
// // //         }
// // //     }

// // //     const handleCloseDialog = () => {
// // //         setIsAddDialogOpen(false)
// // //         reset({
// // //             type: undefined,
// // //             ratio: undefined,
// // //             validFrom: undefined,
// // //             validTo: undefined
// // //         })
// // //     }

// // //     const handleDelete = async (offerId: number) => {
// // //         if (!window.confirm('Are you sure you want to delete this offer?')) return

// // //         try {
// // //             setLoading(true)
// // //             const response = await fetch(
// // //                 `${process.env.NEXT_PUBLIC_BASE_URL}/api/brand/special-offer/${brandId}/${offerId}`,
// // //                 {
// // //                     method: 'DELETE',
// // //                     headers: {
// // //                         'Authorization': `Bearer ${token}`
// // //                     },
// // //                 }
// // //             )

// // //             if (!response.ok) throw new Error('Failed to delete offer')

// // //             toast.success('Offer deleted successfully')
// // //             fetchSpecialOffers()
// // //         } catch (error) {
// // //             console.error('Error:', error)
// // //             toast.error('Failed to delete offer')
// // //         } finally {
// // //             setLoading(false)
// // //         }
// // //     }

// // //     // Update the Select component in the form
// // //     const renderUserTypeSelect = () => {
// // //         // Filter out badges without userType and create options
// // //         const badgeOptions = badges
// // //             .filter(badge => badge.userType)
// // //             .map(badge => ({
// // //                 value: badge.userType?.userType || '',
// // //                 label: badge.userType?.userType || ''
// // //             }))

// // //         return (
// // //             <div>
// // //                 <label className="block text-sm mb-1">{t('Tablecomponent.special_offers_table_Type')}</label>
// // //                 <Select
// // //                     value={watch('type') || ''}
// // //                     onValueChange={(value) => {
// // //                         if (value) {
// // //                             setValue('type', value as 'Basic' | 'Standard' | 'VIP')
// // //                         }
// // //                     }}
// // //                     options={badgeOptions}
// // //                     placeholder={t('selectType')}
// // //                 />
// // //                 {errors.type && (
// // //                     <p className="text-sm text-red-500 mt-1">{t('Enter vaild user type name')}</p>
// // //                 )}
// // //             </div>
// // //         )
// // //     }

// // //     // Update the form to use single ratio input
// // //     const renderRatioInput = () => (
// // //         <div>
// // //             <label className="block text-sm mb-1">{t('Tablecomponent.special_offers_table_point_back')}</label>
// // //             <input
// // //                 type="number"
// // //                 step="0.1"
// // //                 {...register('ratio', { 
// // //                     required: t('pointbackratio_required'),
// // //                     min: { value: 0, message: t('GreaterThanZero') }
// // //                 })}
// // //                 className="w-full px-3 py-2 border rounded-lg"
// // //             />
// // //         </div>
// // //     )

// // //     const headers = [
// // //         { name: 'special_offers_table_id' },
// // //         { name: 'special_offers_table_Type' },
// // //         { name: 'special_offers_table_point_back' },
// // //         { name: 'special_offers_table_valid_from' },
// // //         { name: 'special_offers_table_valid_to' },
// // //         { name: 'special_offers_table_actions' }
// // //     ]

// // //     const renderTableRows = () => {
// // //         return offers.map((offer) => (
// // //             <tr key={offer.id} className="odd:bg-white even:bg-primary/5 border-b">
// // //                 <td className="px-6 py-4">
// // //                     {offer.id.toString().padStart(3, '0')}
// // //                 </td>
// // //                 <td className="px-6 py-4 font-medium">
// // //                     {offer.type}
// // //                 </td>
// // //                 <td className="px-6 py-4">
// // //                     {offer.ratio}%
// // //                 </td>
// // //                 <td className="px-6 py-4">
// // //                     {formatDate(offer.validFrom)}
// // //                 </td>
// // //                 <td className="px-6 py-4">
// // //                     {formatDate(offer.validTo)}
// // //                 </td>
// // //                 <td className="px-6 py-4">
// // //                     <div className="flex gap-2">
// // //                         <button 
// // //                             onClick={() => handleDelete(offer.id)}
// // //                             className="p-1 hover:bg-slate-100 rounded"
// // //                             disabled={loading}
// // //                             title={t('delete')}
// // //                         >
// // //                             <TrashIcon className="w-4 h-4 text-red-500" />
// // //                         </button>
// // //                     </div>
// // //                 </td>
// // //             </tr>
// // //         ))
// // //     }

// // //     return (
// // //         <div className="mt-8">
// // //             <Table
// // //                 data={offers}
// // //                 headers={headers}
// // //                 count={offers.length}
// // //                 loading={loading}
// // //                 showDateFilter={false}
// // //                 pageSize={pageSize}
// // //                 currentPage={currentPage}
// // //                 onPageChange={handlePageChange}
// // //                 onPageSizeChange={handlePageSizeChange}
// // //                 showExport={true}
// // //                 bgColor="#dfe2e8"
// // //                 initialData={offers}
// // //             >
// // //                 {renderTableRows()}
// // //             </Table>

// // //             {/* Add Button */}
// // //             <div className="flex justify-center mt-4">
// // //                 <button
// // //                     onClick={() => setIsAddDialogOpen(true)}
// // //                     className="p-2 bg-teal-500 text-white rounded-full hover:bg-teal-600 transition-colors"
// // //                     title={t('add_special_offer')}
// // //                 >
// // //                     <PlusIcon className="w-5 h-5" />
// // //                 </button>
// // //             </div>

// // //             {/* Add Dialog */}
// // //             <Dialog open={isAddDialogOpen} onOpenChange={handleCloseDialog}>
// // //                 <DialogContent>
// // //                     <h2 className="text-lg font-semibold mb-4">{t('add_special_offer')}</h2>
// // //                     <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
// // //                         {renderUserTypeSelect()}
// // //                         {watch('type') && renderRatioInput()}
// // //                         <div>
// // //                             <label className="block text-sm mb-1">{t('Tablecomponent.special_offers_table_valid_from')}</label>
// // //                             <input
// // //                                 type="date"
// // //                                 {...register('validFrom', { required: t('validFrom_required') })}
// // //                                 className="w-full px-3 py-2 border rounded-lg"
// // //                             />
// // //                         </div>
// // //                         <div>
// // //                             <label className="block text-sm mb-1">{t('Tablecomponent.special_offers_table_valid_to')}</label>
// // //                             <input
// // //                                 type="date"
// // //                                 {...register('validTo', { required: t('validTo_required') })}
// // //                                 className="w-full px-3 py-2 border rounded-lg"
// // //                             />
// // //                         </div>
// // //                         <div className="flex justify-end gap-4">
// // //                             <button
// // //                                 type="button"
// // //                                 onClick={handleCloseDialog}
// // //                                 className="px-4 py-2 border rounded-lg"
// // //                             >
// // //                                 {t('cancel')}
// // //                             </button>
// // //                             <button
// // //                                 type="submit"
// // //                                 disabled={loading || !watch('type')}
// // //                                 className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 disabled:opacity-50"
// // //                             >
// // //                                 {loading ? t('saving') : t('add')}
// // //                             </button>
// // //                         </div>
// // //                     </form>
// // //                 </DialogContent>
// // //             </Dialog>
// // //         </div>
// // //     )
// // // }

// // // export default SpecialOffers

// // // 'use client'
// // // import React, { useEffect, useState } from 'react'
// // // import { useTranslations } from 'next-intl'
// // // import { useAppContext } from '@/context/appContext'
// // // import {  TrashIcon, PlusIcon } from '@heroicons/react/24/outline'
// // // import { Dialog, DialogContent } from '@/components/ui/dialog'
// // // import { useForm } from 'react-hook-form'
// // // import toast from 'react-hot-toast'
// // // import { Select } from '@/components/ui/select'
// // // import Table from '@/components/ui/Table'

// // // interface SpecialOffer {
// // //     id: number
// // //     brandId: number
// // //     type: 'Basic' | 'Standard' | 'VIP'
// // //     validFrom: string
// // //     validTo: string
// // //     ratio: number
// // //     createdAt: string
// // //     updatedAt: string
// // //     brand?: {
// // //         id: number
// // //         name: string
// // //         logo: string
// // //     }
// // //     userType?: {
// // //         id: number
// // //         userType: string
// // //         ratio: number
// // //         color: string
// // //         buyAmount: number
// // //     }
// // // }

// // // interface OfferFormData {
// // //     type: string
// // //     ratios: {
// // //         [key: string]: number
// // //     }
// // //     validFrom: string
// // //     validTo: string
// // // }

// // // interface Badge {
// // //     id: number
// // //     name: string
// // //     userType: {
// // //         userType: string
// // //         ratio: number
// // //     } | null
// // // }

// // // const SpecialOffers = ({ brandId }: { brandId: string }) => {
// // //     const [offers, setOffers] = useState<SpecialOffer[]>([])
// // //     const [badges, setBadges] = useState<Badge[]>([])
// // //     const [loading, setLoading] = useState(false)
// // //     const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
// // //     const [deleteConfirmationId, setDeleteConfirmationId] = useState<number | null>(null)
// // //     const { token } = useAppContext()
// // //     const t = useTranslations('brand')

// // //     const { register, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm<OfferFormData>({
// // //         defaultValues: {
// // //             type: undefined,
// // //             ratios: {},
// // //             validFrom: undefined,
// // //             validTo: undefined
// // //         }
// // //     })
// // //     const [currentPage, setCurrentPage] = useState(1)
// // //     const [pageSize, setPageSize] = useState(10)

// // //     useEffect(() => {
// // //         fetchSpecialOffers()
// // //         fetchBadges()
// // //     }, [brandId])

// // //     const handlePageChange = (page: number) => {
// // //         setCurrentPage(page)
// // //     }

// // //     const handlePageSizeChange = (newPageSize: number) => {
// // //         setPageSize(newPageSize)
// // //         setCurrentPage(1)
// // //     }

// // //     const fetchSpecialOffers = async () => {
// // //         try {
// // //             setLoading(true)
// // //             const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/brand/special-offer/${brandId}`, {
// // //                 headers: {
// // //                     'Authorization': `Bearer ${token}`
// // //                 }
// // //             })

// // //             if (!response.ok) throw new Error('Failed to fetch offers')
// // //             const data = await response.json()
// // //             setOffers(data.offers || [])
// // //         } catch (error) {
// // //             console.error('Error:', error)
// // //             toast.error('Failed to load offers')
// // //         } finally {
// // //             setLoading(false)
// // //         }
// // //     }

// // //     const fetchBadges = async () => {
// // //         try {
// // //             const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/badges?sort=points`, {
// // //                 headers: {
// // //                     'Authorization': `Bearer ${token}`
// // //                 }
// // //             })

// // //             if (!response.ok) throw new Error('Failed to fetch badges')
// // //             const data = await response.json()
// // //             setBadges(data.badges || [])
// // //         } catch (error) {
// // //             console.error('Error fetching badges:', error)
// // //             toast.error('Failed to load badges')
// // //         }
// // //     }

// // //     const formatDate = (dateString: string) => {
// // //         return new Date(dateString).toLocaleDateString()
// // //     }

// // //     // Sort badges by ratio to establish hierarchy
// // //     const sortedBadges = [...badges].sort((a, b) => 
// // //         (a.userType?.ratio || 0) - (b.userType?.ratio || 0)
// // //     )

// // //     const getHigherTierBadges = (selectedType: string) => {
// // //         const selectedBadgeIndex = sortedBadges.findIndex(b => b.userType?.userType === selectedType)
// // //         if (selectedBadgeIndex === -1) return []
// // //         return sortedBadges.slice(selectedBadgeIndex + 1)
// // //     }

// // //     const renderRatioInputs = () => {
// // //         const selectedType = watch('type')
// // //         if (!selectedType) return null

// // //         const higherTierBadges = getHigherTierBadges(selectedType)
        
// // //         return (
// // //             <div className="space-y-4">
// // //                 {/* Selected badge ratio input */}
// // //                 <div>
// // //                     <label className="block text-sm mb-1">
// // //                         {`${selectedType} ${t('Tablecomponent.special_offers_table_point_back')}`}
// // //                     </label>
// // //                     <input
// // //                         type="number"
// // //                         step="0.1"
// // //                         {...register(`ratios.${selectedType}`, {
// // //                             required: t('pointbackratio_required'),
// // //                             min: { value: 0, message: t('GreaterThanZero') },
// // //                             onChange: (e) => {
// // //                                 const currentValue = parseFloat(e.target.value)
// // //                                 // Reset higher tier values if they're lower than current
// // //                                 higherTierBadges.forEach(badge => {
// // //                                     const higherValue = watch(`ratios.${badge.userType?.userType}`)
// // //                                     if (!higherValue || higherValue < currentValue) {
// // //                                         setValue(`ratios.${badge.userType?.userType}`, currentValue)
// // //                                     }
// // //                                 })
// // //                             }
// // //                         })}
// // //                         className="w-full px-3 py-2 border rounded-lg"
// // //                     />
// // //                     {errors.ratios?.[selectedType] && (
// // //                         <p className="text-sm text-red-500 mt-1">
// // //                             {errors.ratios[selectedType]?.message}
// // //                         </p>
// // //                     )}
// // //                 </div>

// // //                 {/* Higher tier badge ratio inputs */}
// // //                 {higherTierBadges.map((badge, index) => {
// // //                     // Get the previous badge in the hierarchy
// // //                     const previousBadge = index === 0 ? selectedType : higherTierBadges[index - 1].userType?.userType

// // //                     return (
// // //                         <div key={badge.id}>
// // //                             <label className="block text-sm mb-1">
// // //                                 {`${badge.userType?.userType} ${t('Tablecomponent.special_offers_table_point_back')}`}
// // //                             </label>
// // //                             <input
// // //                                 type="number"
// // //                                 step="0.1"
// // //                                 {...register(`ratios.${badge.userType?.userType}`, {
// // //                                     required: t('pointbackratio_required'),
// // //                                     min: {
// // //                                         value: watch(`ratios.${previousBadge}`) || 0,
// // //                                         message: t('MustBeGreaterThanPreviousTier')
// // //                                     },
// // //                                     validate: value => {
// // //                                         const previousValue = watch(`ratios.${previousBadge}`)
// // //                                         if (!value || !previousValue) return true
// // //                                         return Number(value) > Number(previousValue) || 
// // //                                             t('MustBeGreaterThanPreviousTier')
// // //                                     },
// // //                                     onChange: (e) => {
// // //                                         const currentValue = parseFloat(e.target.value)
// // //                                         // Update subsequent tiers if they're lower than current
// // //                                         higherTierBadges.slice(index + 1).forEach(nextBadge => {
// // //                                             const nextValue = watch(`ratios.${nextBadge.userType?.userType}`)
// // //                                             if (!nextValue || Number(nextValue) <= currentValue) {
// // //                                                 setValue(
// // //                                                     `ratios.${nextBadge.userType?.userType}`, 
// // //                                                     currentValue + 0.1  // Remove toString(), keep as number
// // //                                                 )
// // //                                             }
// // //                                         })
// // //                                     }
// // //                                 })}
// // //                                 className="w-full px-3 py-2 border rounded-lg"
// // //                             />
// // //                             {errors.ratios?.[badge.userType?.userType || ''] && (
// // //                                 <p className="text-sm text-red-500 mt-1">
// // //                                     {errors.ratios[badge.userType?.userType || '']?.message}
// // //                                 </p>
// // //                             )}
// // //                         </div>
// // //                     )
// // //                 })}
// // //             </div>
// // //         )
// // //     }

// // //     const onSubmit = async (data: OfferFormData) => {
// // //         try {
// // //             setLoading(true)

// // //             const formatDate = (dateStr: string) => {
// // //                 const date = new Date(dateStr)
// // //                 return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
// // //             }

// // //             // Get the selected badge and higher tier badges
// // //             const selectedBadgeIndex = sortedBadges.findIndex(b => b.userType?.userType === data.type)
// // //             const relevantBadges = sortedBadges.slice(selectedBadgeIndex)
// // //             const relevantBadgeTypes = relevantBadges.map(b => b.userType?.userType).filter(Boolean) as string[]

// // //             // Create offers for each relevant badge type
// // //             const offerPromises = relevantBadgeTypes.map(async (type) => {
// // //                 const body = JSON.stringify({
// // //                     type: type,
// // //                     ratio: Number(data.ratios[type]),
// // //                     validFrom: formatDate(data.validFrom),
// // //                     validTo: formatDate(data.validTo)
// // //                 })

// // //                 const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/brand/special-offer/${brandId}`, {
// // //                     method: 'POST',
// // //                     headers: {
// // //                         'Authorization': `Bearer ${token}`,
// // //                         'Content-Type': 'application/json'
// // //                     },
// // //                     body
// // //                 })

// // //                 if (!response.ok) {
// // //                     const errorData = await response.json()
// // //                     throw new Error(errorData.message || t('failed_to_save_offer'))
// // //                 }

// // //                 return response.json()
// // //             })

// // //             // Wait for all offers to be created
// // //             await Promise.all(offerPromises)

// // //             toast.success(t('offer_added_successfully'))
// // //             await fetchSpecialOffers()
// // //             handleCloseDialog()
// // //         } catch (error: unknown) {
// // //             const err = error as Error
// // //             console.error('Error:', err)
// // //             toast.error(err.message || t('failed_to_save_offer'))
// // //         } finally {
// // //             setLoading(false)
// // //         }
// // //     }

// // //     const handleCloseDialog = () => {
// // //         setIsAddDialogOpen(false)
// // //         reset({
// // //             type: undefined,
// // //             ratios: {},
// // //             validFrom: undefined,
// // //             validTo: undefined
// // //         })
// // //     }

// // //     const handleDelete = async (offerId: number) => {
// // //         try {
// // //             setLoading(true)
// // //             const response = await fetch(
// // //                 `${process.env.NEXT_PUBLIC_BASE_URL}/api/brand/special-offer/${brandId}/${offerId}`,
// // //                 {
// // //                     method: 'DELETE',
// // //                     headers: {
// // //                         'Authorization': `Bearer ${token}`
// // //                     },
// // //                 }
// // //             )

// // //             if (!response.ok) throw new Error('Failed to delete offer')

// // //             toast.success('Offer deleted successfully')
// // //             fetchSpecialOffers()
// // //         } catch (error) {
// // //             console.error('Error:', error)
// // //             toast.error('Failed to delete offer')
// // //         } finally {
// // //             setLoading(false)
// // //             setDeleteConfirmationId(null)
// // //         }
// // //     }

// // //     // Update the Select component in the form
// // //     const renderUserTypeSelect = () => {
// // //         // Create options from badges array, filtering out badges without userType
// // //         const badgeOptions = sortedBadges
// // //             .filter(badge => badge.userType)
// // //             .map(badge => ({
// // //                 value: badge.userType?.userType || '',
// // //                 label: badge.userType?.userType || ''
// // //             }))

// // //         return (
// // //             <div>
// // //                 <label className="block text-sm mb-1">{t('Tablecomponent.special_offers_table_Type')}</label>
// // //                 <Select
// // //                     value={watch('type') || ''}
// // //                     onValueChange={(value) => {
// // //                         if (value) {
// // //                             setValue('type', value)
// // //                             // Reset ratios when changing type
// // //                             setValue('ratios', {})
// // //                         }
// // //                     }}
// // //                     options={badgeOptions}
// // //                     placeholder={t('selectType')}
// // //                 />
// // //                 {errors.type && (
// // //                     <p className="text-sm text-red-500 mt-1">{t('Enter vaild user type name')}</p>
// // //                 )}
// // //             </div>
// // //         )
// // //     }

// // //     const headers = [
// // //         { name: 'special_offers_table_id' },
// // //         { name: 'special_offers_table_Type' },
// // //         { name: 'special_offers_table_point_back' },
// // //         { name: 'special_offers_table_valid_from' },
// // //         { name: 'special_offers_table_valid_to' },
// // //         { name: 'special_offers_table_actions' }
// // //     ]

// // //     const renderTableRows = () => {
// // //         return offers.map((offer) => (
// // //             <tr key={offer.id} className="odd:bg-white even:bg-primary/5 border-b">
// // //                 <td className="px-6 py-4">
// // //                     {offer.id.toString().padStart(3, '0')}
// // //                 </td>
// // //                 <td className="px-6 py-4 font-medium">
// // //                     {offer.type}
// // //                 </td>
// // //                 <td className="px-6 py-4">
// // //                     {offer.ratio}%
// // //                 </td>
// // //                 <td className="px-6 py-4">
// // //                     {formatDate(offer.validFrom)}
// // //                 </td>
// // //                 <td className="px-6 py-4">
// // //                     {formatDate(offer.validTo)}
// // //                 </td>
// // //                 <td className="px-6 py-4">
// // //                     <div className="flex gap-2">
// // //                         <button 
// // //                             onClick={() => setDeleteConfirmationId(offer.id)}
// // //                             className="p-1 hover:bg-slate-100 rounded"
// // //                             disabled={loading}
// // //                             title={t('delete')}
// // //                         >
// // //                             <TrashIcon className="w-4 h-4 text-red-500" />
// // //                         </button>
// // //                     </div>
// // //                 </td>
// // //             </tr>
// // //         ))
// // //     }

// // //     return (
// // //         <div className="mt-8">
// // //             <Table
// // //                 data={offers}
// // //                 headers={headers}
// // //                 count={offers.length}
// // //                 loading={loading}
// // //                 showDateFilter={false}
// // //                 pageSize={pageSize}
// // //                 currentPage={currentPage}
// // //                 onPageChange={handlePageChange}
// // //                 onPageSizeChange={handlePageSizeChange}
// // //                 showExport={true}
// // //                 bgColor="#dfe2e8"
// // //                 initialData={offers}
// // //             >
// // //                 {renderTableRows()}
// // //             </Table>

// // //             {/* Add Button */}
// // //             <div className="flex justify-center mt-4">
// // //                 <button
// // //                     onClick={() => setIsAddDialogOpen(true)}
// // //                     className="p-2 bg-teal-500 text-white rounded-full hover:bg-teal-600 transition-colors"
// // //                     title={t('add_special_offer')}
// // //                 >
// // //                     <PlusIcon className="w-5 h-5" />
// // //                 </button>
// // //             </div>

// // //             {/* Add Dialog */}
// // //             <Dialog open={isAddDialogOpen} onOpenChange={handleCloseDialog}>
// // //                 <DialogContent>
// // //                     <h2 className="text-lg font-semibold mb-4">{t('add_special_offer')}</h2>
// // //                     <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
// // //                         {renderUserTypeSelect()}
// // //                         {watch('type') && renderRatioInputs()}
// // //                         <div>
// // //                             <label className="block text-sm mb-1">{t('Tablecomponent.special_offers_table_valid_from')}</label>
// // //                             <input
// // //                                 type="date"
// // //                                 {...register('validFrom', { required: t('validFrom_required') })}
// // //                                 className="w-full px-3 py-2 border rounded-lg"
// // //                             />
// // //                         </div>
// // //                         <div>
// // //                             <label className="block text-sm mb-1">{t('Tablecomponent.special_offers_table_valid_to')}</label>
// // //                             <input
// // //                                 type="date"
// // //                                 {...register('validTo', { required: t('validTo_required') })}
// // //                                 className="w-full px-3 py-2 border rounded-lg"
// // //                             />
// // //                         </div>
// // //                         <div className="flex justify-end gap-4">
// // //                             <button
// // //                                 type="button"
// // //                                 onClick={handleCloseDialog}
// // //                                 className="px-4 py-2 border rounded-lg"
// // //                             >
// // //                                 {t('cancel')}
// // //                             </button>
// // //                             <button
// // //                                 type="submit"
// // //                                 disabled={loading || !watch('type')}
// // //                                 className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 disabled:opacity-50"
// // //                             >
// // //                                 {loading ? t('saving') : t('add')}
// // //                             </button>
// // //                         </div>
// // //                     </form>
// // //                 </DialogContent>
// // //             </Dialog>

// // //             {/* Delete Confirmation Dialog */}
// // //             <Dialog open={!!deleteConfirmationId} onOpenChange={() => setDeleteConfirmationId(null)}>
// // //                 <DialogContent>
// // //                     <h2 className="text-lg font-semibold mb-4">{t('branddeleteButton')}</h2>
// // //                     <p className="mb-4">{t('deleteMessage')}</p>
// // //                     <div className="flex justify-end gap-4">
// // //                         <button
// // //                             onClick={() => setDeleteConfirmationId(null)}
// // //                             className="px-4 py-2 border rounded-lg"
// // //                         >
// // //                             {t('cancel_delete_brand')}
// // //                         </button>
// // //                         <button
// // //                             onClick={() => deleteConfirmationId && handleDelete(deleteConfirmationId)}
// // //                             className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
// // //                             disabled={loading}
// // //                         >
// // //                             {loading ? 'Deleting...' : t('deleteBrand')}
// // //                         </button>
// // //                     </div>
// // //                 </DialogContent>
// // //             </Dialog>
// // //         </div>
// // //     )
// // // }

// // // export default SpecialOffers


// // 'use client'
// // import React, { useEffect, useState } from 'react'
// // import { useTranslations } from 'next-intl'
// // import { useAppContext } from '@/context/appContext'
// // import {  TrashIcon, PlusIcon } from '@heroicons/react/24/outline'
// // import { Dialog, DialogContent } from '@/components/ui/dialog'
// // import { useForm } from 'react-hook-form'
// // import toast from 'react-hot-toast'
// // import { Select } from '@/components/ui/select'
// // import Table from '@/components/ui/Table'
// // import { TrashIconn , PluseCircelIcon} from '@/components/icons'

// // interface SpecialOffer {
// //     id: number
// //     brandId: number
// //     type: 'Basic' | 'Standard' | 'VIP'
// //     validFrom: string
// //     validTo: string
// //     ratio: number
// //     createdAt: string
// //     updatedAt: string
// //     brand?: {
// //         id: number
// //         name: string
// //         logo: string
// //     }
// //     userType?: {
// //         id: number
// //         userType: string
// //         ratio: number
// //         color: string
// //         buyAmount: number
// //     }
// // }

// // interface OfferFormData {
// //     type: string
// //     ratios: {
// //         [key: string]: number
// //     }
// //     validFrom: string
// //     validTo: string
// // }

// // interface Badge {
// //     id: number
// //     name: string
// //     userType: {
// //         userType: string
// //         ratio: number
// //     } | null
// // }

// // const SpecialOffers = ({ brandId }: { brandId: string }) => {
// //     const [offers, setOffers] = useState<SpecialOffer[]>([])
// //     const [badges, setBadges] = useState<Badge[]>([])
// //     const [loading, setLoading] = useState(false)
// //     const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
// //     const [deleteConfirmationId, setDeleteConfirmationId] = useState<number | null>(null)
// //     const { token } = useAppContext()
// //     const t = useTranslations('brand')

// //     const { register, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm<OfferFormData>({
// //         defaultValues: {
// //             type: undefined,
// //             ratios: {},
// //             validFrom: undefined,
// //             validTo: undefined
// //         }
// //     })
// //     const [currentPage, setCurrentPage] = useState(1)
// //     const [pageSize, setPageSize] = useState(10)

// //     useEffect(() => {
// //         fetchSpecialOffers()
// //         fetchBadges()
// //     }, [brandId])

// //     const handlePageChange = (page: number) => {
// //         setCurrentPage(page)
// //     }

// //     const handlePageSizeChange = (newPageSize: number) => {
// //         setPageSize(newPageSize)
// //         setCurrentPage(1)
// //     }

// //     const fetchSpecialOffers = async () => {
// //         try {
// //             setLoading(true)
// //             const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/brand/special-offer/${brandId}`, {
// //                 headers: {
// //                     'Authorization': `Bearer ${token}`
// //                 }
// //             })

// //             if (!response.ok) throw new Error('Failed to fetch offers')
// //             const data = await response.json()
// //             setOffers(data.offers || [])
// //         } catch (error) {
// //             console.error('Error:', error)
// //             toast.error('Failed to load offers')
// //         } finally {
// //             setLoading(false)
// //         }
// //     }

// //     const fetchBadges = async () => {
// //         try {
// //             const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/badges?sort=points`, {
// //                 headers: {
// //                     'Authorization': `Bearer ${token}`
// //                 }
// //             })

// //             if (!response.ok) throw new Error('Failed to fetch badges')
// //             const data = await response.json()
// //             setBadges(data.badges || [])
// //         } catch (error) {
// //             console.error('Error fetching badges:', error)
// //             toast.error('Failed to load badges')
// //         }
// //     }

// //     const formatDate = (dateString: string) => {
// //         return new Date(dateString).toLocaleDateString()
// //     }

// //     // Sort badges by ratio to establish hierarchy
// //     const sortedBadges = [...badges].sort((a, b) => 
// //         (a.userType?.ratio || 0) - (b.userType?.ratio || 0)
// //     )

// //     const getHigherTierBadges = (selectedType: string) => {
// //         const selectedBadgeIndex = sortedBadges.findIndex(b => b.userType?.userType === selectedType)
// //         if (selectedBadgeIndex === -1) return []
// //         return sortedBadges.slice(selectedBadgeIndex + 1)
// //     }

// //     const renderRatioInputs = () => {
// //         const selectedType = watch('type')
// //         if (!selectedType) return null

// //         const higherTierBadges = getHigherTierBadges(selectedType)
        
// //         return (
// //             <div className="space-y-4">
// //                 {/* Selected badge ratio input */}
// //                 <div>
// //                     <label className="block text-sm mb-1">
// //                         {`${selectedType} ${t('Tablecomponent.special_offers_table_point_back')}`}
// //                     </label>
// //                     <input
// //                         type="number"
// //                         step="0.1"
// //                         {...register(`ratios.${selectedType}`, {
// //                             required: t('pointbackratio_required'),
// //                             min: { value: 0, message: t('GreaterThanZero') },
// //                             onChange: (e) => {
// //                                 const currentValue = parseFloat(e.target.value)
// //                                 // Reset higher tier values if they're lower than current
// //                                 higherTierBadges.forEach(badge => {
// //                                     const higherValue = watch(`ratios.${badge.userType?.userType}`)
// //                                     if (!higherValue || higherValue < currentValue) {
// //                                         setValue(`ratios.${badge.userType?.userType}`, currentValue)
// //                                     }
// //                                 })
// //                             }
// //                         })}
// //                         className="w-full px-3 py-2 border rounded-lg"
// //                     />
// //                     {errors.ratios?.[selectedType] && (
// //                         <p className="text-sm text-red-500 mt-1">
// //                             {errors.ratios[selectedType]?.message}
// //                         </p>
// //                     )}
// //                 </div>

// //                 {/* Higher tier badge ratio inputs */}
// //                 {higherTierBadges.map((badge, index) => {
// //                     // Get the previous badge in the hierarchy
// //                     const previousBadge = index === 0 ? selectedType : higherTierBadges[index - 1].userType?.userType

// //                     return (
// //                         <div key={badge.id}>
// //                             <label className="block text-sm mb-1">
// //                                 {`${badge.userType?.userType} ${t('Tablecomponent.special_offers_table_point_back')}`}
// //                             </label>
// //                             <input
// //                                 type="number"
// //                                 step="0.1"
// //                                 {...register(`ratios.${badge.userType?.userType}`, {
// //                                     required: t('pointbackratio_required'),
// //                                     min: {
// //                                         value: watch(`ratios.${previousBadge}`) || 0,
// //                                         message: t('MustBeGreaterThanPreviousTier')
// //                                     },
// //                                     validate: value => {
// //                                         const previousValue = watch(`ratios.${previousBadge}`)
// //                                         if (!value || !previousValue) return true
// //                                         return Number(value) > Number(previousValue) || 
// //                                             t('MustBeGreaterThanPreviousTier')
// //                                     },
// //                                     onChange: (e) => {
// //                                         const currentValue = parseFloat(e.target.value)
// //                                         // Update subsequent tiers if they're lower than current
// //                                         higherTierBadges.slice(index + 1).forEach(nextBadge => {
// //                                             const nextValue = watch(`ratios.${nextBadge.userType?.userType}`)
// //                                             if (!nextValue || Number(nextValue) <= currentValue) {
// //                                                 setValue(
// //                                                     `ratios.${nextBadge.userType?.userType}`, 
// //                                                     currentValue + 0.1  // Remove toString(), keep as number
// //                                                 )
// //                                             }
// //                                         })
// //                                     }
// //                                 })}
// //                                 className="w-full px-3 py-2 border rounded-lg"
// //                             />
// //                             {errors.ratios?.[badge.userType?.userType || ''] && (
// //                                 <p className="text-sm text-red-500 mt-1">
// //                                     {errors.ratios[badge.userType?.userType || '']?.message}
// //                                 </p>
// //                             )}
// //                         </div>
// //                     )
// //                 })}
// //             </div>
// //         )
// //     }

// //     const onSubmit = async (data: OfferFormData) => {
// //         try {
// //             setLoading(true)

// //             const formatDate = (dateStr: string) => {
// //                 const date = new Date(dateStr)
// //                 return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
// //             }

// //             // Get the selected badge and higher tier badges
// //             const selectedBadgeIndex = sortedBadges.findIndex(b => b.userType?.userType === data.type)
// //             const relevantBadges = sortedBadges.slice(selectedBadgeIndex)
// //             const relevantBadgeTypes = relevantBadges.map(b => b.userType?.userType).filter(Boolean) as string[]

// //             // Create offers for each relevant badge type
// //             const offerPromises = relevantBadgeTypes.map(async (type) => {
// //                 const body = JSON.stringify({
// //                     type: type,
// //                     ratio: Number(data.ratios[type]),
// //                     validFrom: formatDate(data.validFrom),
// //                     validTo: formatDate(data.validTo)
// //                 })

// //                 const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/brand/special-offer/${brandId}`, {
// //                     method: 'POST',
// //                     headers: {
// //                         'Authorization': `Bearer ${token}`,
// //                         'Content-Type': 'application/json'
// //                     },
// //                     body
// //                 })

// //                 if (!response.ok) {
// //                     const errorData = await response.json()
// //                     throw new Error(errorData.message || t('failed_to_save_offer'))
// //                 }

// //                 return response.json()
// //             })

// //             // Wait for all offers to be created
// //             await Promise.all(offerPromises)

// //             toast.success(t('offer_added_successfully'))
// //             await fetchSpecialOffers()
// //             handleCloseDialog()
// //         } catch (error: unknown) {
// //             const err = error as Error
// //             console.error('Error:', err)
// //             toast.error(err.message || t('failed_to_save_offer'))
// //         } finally {
// //             setLoading(false)
// //         }
// //     }

// //     const handleCloseDialog = () => {
// //         setIsAddDialogOpen(false)
// //         reset({
// //             type: undefined,
// //             ratios: {},
// //             validFrom: undefined,
// //             validTo: undefined
// //         })
// //     }

// //     const handleDelete = async (offerId: number) => {
// //         try {
// //             setLoading(true)
// //             const response = await fetch(
// //                 `${process.env.NEXT_PUBLIC_BASE_URL}/api/brand/special-offer/${brandId}/${offerId}`,
// //                 {
// //                     method: 'DELETE',
// //                     headers: {
// //                         'Authorization': `Bearer ${token}`
// //                     },
// //                 }
// //             )

// //             if (!response.ok) throw new Error('Failed to delete offer')

// //             toast.success('Offer deleted successfully')
// //             fetchSpecialOffers()
// //         } catch (error) {
// //             console.error('Error:', error)
// //             toast.error('Failed to delete offer')
// //         } finally {
// //             setLoading(false)
// //             setDeleteConfirmationId(null)
// //         }
// //     }

// //     // Update the Select component in the form
// //     const renderUserTypeSelect = () => {
// //         // Create options from badges array, filtering out badges without userType
// //         const badgeOptions = sortedBadges
// //             .filter(badge => badge.userType)
// //             .map(badge => ({
// //                 value: badge.userType?.userType || '',
// //                 label: badge.userType?.userType || ''
// //             }))

// //         return (
// //             <div>
// //                 <label className="block text-sm mb-1">{t('Tablecomponent.special_offers_table_Type')}</label>
// //                 <Select
// //                     value={watch('type') || ''}
// //                     onValueChange={(value) => {
// //                         if (value) {
// //                             setValue('type', value)
// //                             // Reset ratios when changing type
// //                             setValue('ratios', {})
// //                         }
// //                     }}
// //                     options={badgeOptions}
// //                     placeholder={t('selectType')}
// //                 />
// //                 {errors.type && (
// //                     <p className="text-sm text-red-500 mt-1">{t('Enter vaild user type name')}</p>
// //                 )}
// //             </div>
// //         )
// //     }

// //     const headers = [
// //         { name: 'special_offers_table_id' },
// //         { name: 'special_offers_table_Type' },
// //         { name: 'special_offers_table_point_back' },
// //         { name: 'special_offers_table_valid_from' },
// //         { name: 'special_offers_table_valid_to' },
// //         { name: 'special_offers_table_actions' }
// //     ]

// //     const renderTableRows = () => {
// //         return offers.map((offer) => (
// //             <tr key={offer.id} className="odd:bg-white even:bg-primary/5 border-b">
// //                 <td className="px-6 py-4">
// //                     {offer.id.toString().padStart(3, '0')}
// //                 </td>
// //                 <td className="px-6 py-4 font-medium">
// //                     {offer.type}
// //                 </td>
// //                 <td className="px-6 py-4">
// //                     {offer.ratio}%
// //                 </td>
// //                 <td className="px-6 py-4">
// //                     {formatDate(offer.validFrom)}
// //                 </td>
// //                 <td className="px-6 py-4">
// //                     {formatDate(offer.validTo)}
// //                 </td>
// //                 <td className="px-6 py-4">
// //                     <div className="flex gap-2">
// //                         <button 
// //                             onClick={() => setDeleteConfirmationId(offer.id)}
// //                             className="p-1 hover:bg-slate-100 rounded"
// //                             disabled={loading}
// //                             title={t('delete')}
// //                         >
// //                             <TrashIconn className="w-4 h-4 text-red-500" />
// //                         </button>
// //                     </div>
// //                 </td>
// //             </tr>
// //         ))
// //     }

// //     return (
// //         <div className="mt-8">
// //             <Table
// //                 data={offers}
// //                 headers={headers}
// //                 count={offers.length}
// //                 loading={loading}
// //                 showDateFilter={false}
// //                 pageSize={pageSize}
// //                 currentPage={currentPage}
// //                 onPageChange={handlePageChange}
// //                 onPageSizeChange={handlePageSizeChange}
// //                 showExport={true}
// //                 bgColor="#dfe2e8"
// //                 initialData={offers}
// //             >
// //                 {renderTableRows()}
// //             </Table>

// //             {/* Add Button */}
// //             <div className="flex justify-center mt-4">
// //                 <button
// //                     onClick={() => setIsAddDialogOpen(true)}
// //                     className="p-2 bg-teal-500 text-white rounded-full hover:bg-teal-600 transition-colors"
// //                     title={t('add_special_offer')}
// //                 >
// //                     <PlusIcon className="w-5 h-5" />
// //                 </button>
// //             </div>

// //             {/* Add Dialog */}
// //             <Dialog open={isAddDialogOpen} onOpenChange={handleCloseDialog}>
// //                 <DialogContent>
// //                     <h2 className="text-lg font-semibold mb-4 text-center">{t('add_special_offer')}</h2>
// //                     <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
// //                         {renderUserTypeSelect()}
// //                         {watch('type') && renderRatioInputs()}
// //                         <div>
// //                             <label className="block text-sm mb-1">{t('Tablecomponent.special_offers_table_valid_from')}</label>
// //                             <input
// //                                 type="date"
// //                                 {...register('validFrom', { required: t('validFrom_required') })}
// //                                 className="w-full px-3 py-2 border rounded-lg"
// //                             />
// //                         </div>
// //                         <div>
// //                             <label className="block text-sm mb-1">{t('Tablecomponent.special_offers_table_valid_to')}</label>
// //                             <input
// //                                 type="date"
// //                                 {...register('validTo', { required: t('validTo_required') })}
// //                                 className="w-full px-3 py-2 border rounded-lg"
// //                             />
// //                         </div>
// //                         <div className="flex justify-end gap-4">
// //                             <button
// //                                 type="button"
// //                                 onClick={handleCloseDialog}
// //                                 className="px-4 py-2 border rounded-lg"
// //                             >
// //                                 {t('cancel')}
// //                             </button>
// //                             <button
// //                                 type="submit"
// //                                 disabled={loading || !watch('type')}
// //                                 className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 disabled:opacity-50"
// //                             >
// //                                 {loading ? t('saving') : t('add')}
// //                             </button>
// //                         </div>
// //                     </form>
// //                 </DialogContent>
// //             </Dialog>

// //             {/* Delete Confirmation Dialog */}
// //             <Dialog open={!!deleteConfirmationId} onOpenChange={() => setDeleteConfirmationId(null)}>
// //                 <DialogContent>
// //                     <h2 className="text-lg font-semibold mb-4 text-center">{t('branddeleteButton')}</h2>
// //                     <p className="mb-4">{t('deleteMessage')}</p>
// //                     <div className="flex justify-end gap-4">
// //                         <button
// //                             onClick={() => setDeleteConfirmationId(null)}
// //                             className="px-4 py-2 border rounded-lg"
// //                         >
// //                             {t('cancel_delete_brand')}
// //                         </button>
// //                         <button
// //                             onClick={() => deleteConfirmationId && handleDelete(deleteConfirmationId)}
// //                             className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
// //                             disabled={loading}
// //                         >
// //                             {loading ? t('brand_deleteLoading') : t('deleteBrand')}
// //                         </button>
// //                     </div>
// //                 </DialogContent>
// //             </Dialog>
// //         </div>
// //     )
// // }

// // export default SpecialOffers

// 'use client'
// import React, { useEffect, useState } from 'react'
// import { useTranslations } from 'next-intl'
// import { useAppContext } from '@/context/appContext'
// import {  TrashIcon, PlusIcon } from '@heroicons/react/24/outline'
// import { Dialog, DialogContent } from '@/components/ui/dialog'
// import { useForm } from 'react-hook-form'
// import toast from 'react-hot-toast'
// import { Select } from '@/components/ui/select'
// import Table from '@/components/ui/Table'
// import { TrashIconn , PluseCircelIcon} from '@/components/icons'

// interface SpecialOffer {
//     id: number
//     brandId: number
//     badgeId: number
//     type?: string
//     validFrom: string
//     validTo: string
//     ratio: number
//     createdAt: string
//     updatedAt: string
//     brand?: {
//         id: number
//         name: string
//         logo: string
//     }
//     userType?: {
//         id: number
//         userType: string
//         ratio: number
//         color: string
//         buyAmount: number
//     }
// }

// interface OfferFormData {
//     type: string
//     ratios: {
//         [key: string]: number
//     }
//     validFrom: string
//     validTo: string
// }

// interface Badge {
//     id: number
//     name: string
//     userType: {
//         id: number
//         userType: string
//         ratio: number
//     } | null
// }

// const SpecialOffers = ({ brandId }: { brandId: string }) => {
//     const [offers, setOffers] = useState<SpecialOffer[]>([])
//     const [badges, setBadges] = useState<Badge[]>([])
//     const [loading, setLoading] = useState(false)
//     const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
//     const [deleteConfirmationId, setDeleteConfirmationId] = useState<number | null>(null)
//     const { token } = useAppContext()
//     const t = useTranslations('brand')

//     const { register, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm<OfferFormData>({
//         defaultValues: {
//             type: undefined,
//             ratios: {},
//             validFrom: undefined,
//             validTo: undefined
//         }
//     })
//     const [currentPage, setCurrentPage] = useState(1)
//     const [pageSize, setPageSize] = useState(10)

//     useEffect(() => {
//         fetchSpecialOffers()
//         fetchBadges()
//     }, [brandId])

//     const handlePageChange = (page: number) => {
//         setCurrentPage(page)
//     }

//     const handlePageSizeChange = (newPageSize: number) => {
//         setPageSize(newPageSize)
//         setCurrentPage(1)
//     }

//     const fetchSpecialOffers = async () => {
//         try {
//             setLoading(true)
//             const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/brand/special-offer/${brandId}?sort=ratio`, {
//                 headers: {
//                     'Authorization': `Bearer ${token}`
//                 }
//             })

//             if (!response.ok) throw new Error('Failed to fetch offers')
//             const data = await response.json()
//             console.log('Fetched offers:', data.offers)
            
//             // Map the response to include the badge type
//             const mappedOffers = data.offers.map((offer: any) => ({
//                 ...offer,
//                 type: sortedBadges.find(b => b.id === offer.badgeId)?.userType?.userType
//             }))
//             console.log('Mapped offers:', mappedOffers)
            
//             setOffers(mappedOffers)
//         } catch (error) {
//             console.error('Error:', error)
//             toast.error('Failed to load offers')
//         } finally {
//             setLoading(false)
//         }
//     }

//     const fetchBadges = async () => {
//         try {
//             const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/badges?sort=points`, {
//                 headers: {
//                     'Authorization': `Bearer ${token}`
//                 }
//             })

//             if (!response.ok) throw new Error('Failed to fetch badges')
//             const data = await response.json()
//             setBadges(data.badges || [])
//         } catch (error) {
//             console.error('Error fetching badges:', error)
//             toast.error('Failed to load badges')
//         }
//     }

//     const formatDate = (dateString: string) => {
//         return new Date(dateString).toLocaleDateString()
//     }

//     // Sort badges by ratio to establish hierarchy
//     const sortedBadges = [...badges].sort((a, b) => 
//         (a.userType?.ratio || 0) - (b.userType?.ratio || 0)
//     )

//     const getHigherTierBadges = (selectedType: string) => {
//         const selectedBadgeIndex = sortedBadges.findIndex(b => b.userType?.userType === selectedType)
//         if (selectedBadgeIndex === -1) return []
//         return sortedBadges.slice(selectedBadgeIndex + 1)
//     }

//     const renderRatioInputs = () => {
//         const selectedType = watch('type')
//         if (!selectedType) return null

//         const higherTierBadges = getHigherTierBadges(selectedType)
        
//         return (
//             <div className="space-y-4">
//                 {/* Selected badge ratio input */}
//                 <div>
//                     <label className="block text-sm mb-1">
//                         {`${selectedType} ${t('Tablecomponent.special_offers_table_point_back')}`}
//                     </label>
//                     <input
//                         type="number"
//                         step="0.1"
//                         {...register(`ratios.${selectedType}`, {
//                             required: t('pointbackratio_required'),
//                             min: { value: 0, message: t('GreaterThanZero') },
//                             onChange: (e) => {
//                                 const currentValue = parseFloat(e.target.value)
//                                 // Reset higher tier values if they're lower than current
//                                 higherTierBadges.forEach(badge => {
//                                     const higherValue = watch(`ratios.${badge.userType?.userType}`)
//                                     if (!higherValue || higherValue < currentValue) {
//                                         setValue(`ratios.${badge.userType?.userType}`, currentValue)
//                                     }
//                                 })
//                             }
//                         })}
//                         className="w-full px-3 py-2 border rounded-lg"
//                     />
//                     {errors.ratios?.[selectedType] && (
//                         <p className="text-sm text-red-500 mt-1">
//                             {errors.ratios[selectedType]?.message}
//                         </p>
//                     )}
//                 </div>

//                 {/* Higher tier badge ratio inputs */}
//                 {higherTierBadges.map((badge, index) => {
//                     // Get the previous badge in the hierarchy
//                     const previousBadge = index === 0 ? selectedType : higherTierBadges[index - 1].userType?.userType

//                     return (
//                         <div key={badge.id}>
//                             <label className="block text-sm mb-1">
//                                 {`${badge.userType?.userType} ${t('Tablecomponent.special_offers_table_point_back')}`}
//                             </label>
//                             <input
//                                 type="number"
//                                 step="0.1"
//                                 {...register(`ratios.${badge.userType?.userType}`, {
//                                     required: t('pointbackratio_required'),
//                                     min: {
//                                         value: watch(`ratios.${previousBadge}`) || 0,
//                                         message: t('MustBeGreaterThanPreviousTier')
//                                     },
//                                     validate: value => {
//                                         const previousValue = watch(`ratios.${previousBadge}`)
//                                         if (!value || !previousValue) return true
//                                         return Number(value) > Number(previousValue) || 
//                                             t('MustBeGreaterThanPreviousTier')
//                                     },
//                                     onChange: (e) => {
//                                         const currentValue = parseFloat(e.target.value)
//                                         // Update subsequent tiers if they're lower than current
//                                         higherTierBadges.slice(index + 1).forEach(nextBadge => {
//                                             const nextValue = watch(`ratios.${nextBadge.userType?.userType}`)
//                                             if (!nextValue || Number(nextValue) <= currentValue) {
//                                                 setValue(
//                                                     `ratios.${nextBadge.userType?.userType}`, 
//                                                     currentValue + 0.1  // Remove toString(), keep as number
//                                                 )
//                                             }
//                                         })
//                                     }
//                                 })}
//                                 className="w-full px-3 py-2 border rounded-lg"
//                             />
//                             {errors.ratios?.[badge.userType?.userType || ''] && (
//                                 <p className="text-sm text-red-500 mt-1">
//                                     {errors.ratios[badge.userType?.userType || '']?.message}
//                                 </p>
//                             )}
//                         </div>
//                     )
//                 })}
//             </div>
//         )
//     }

//     const onSubmit = async (data: OfferFormData) => {
//         try {
//             setLoading(true)

//             const formatDate = (dateStr: string) => {
//                 const date = new Date(dateStr)
//                 return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
//             }

//             // Get the selected badge and higher tier badges
//             const selectedBadge = sortedBadges.find(b => b.userType?.userType === data.type)
//             if (!selectedBadge) {
//                 throw new Error('Selected badge not found')
//             }

//             const selectedBadgeIndex = sortedBadges.findIndex(b => b.userType?.userType === data.type)
//             const relevantBadges = sortedBadges.slice(selectedBadgeIndex)

//             // Create offers for each relevant badge
//             const offerPromises = relevantBadges.map(async (badge) => {
//                 if (!badge.userType?.userType) return

//                 const body = JSON.stringify({
//                     badgeId: badge.id, // Using badge ID instead of type
//                     ratio: Number(data.ratios[badge.userType.userType]),
//                     validFrom: formatDate(data.validFrom),
//                     validTo: formatDate(data.validTo)
//                 })

//                 const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/brand/special-offer/${brandId}`, {
//                     method: 'POST',
//                     headers: {
//                         'Authorization': `Bearer ${token}`,
//                         'Content-Type': 'application/json'
//                     },
//                     body
//                 })

//                 if (!response.ok) {
//                     const errorData = await response.json()
//                     throw new Error(errorData.message || t('failed_to_save_offer'))
//                 }

//                 return response.json()
//             })

//             // Wait for all offers to be created
//             await Promise.all(offerPromises)

//             toast.success(t('offer_added_successfully'))
//             await fetchSpecialOffers()
//             handleCloseDialog()
//         } catch (error: unknown) {
//             const err = error as Error
//             console.error('Error:', err)
//             toast.error(err.message || t('failed_to_save_offer'))
//         } finally {
//             setLoading(false)
//         }
//     }

//     const handleCloseDialog = () => {
//         setIsAddDialogOpen(false)
//         reset({
//             type: undefined,
//             ratios: {},
//             validFrom: undefined,
//             validTo: undefined
//         })
//     }

//     const handleDelete = async (offerId: number) => {
//         try {
//             setLoading(true)
            
//             // Find the offer being deleted
//             const offerToDelete = offers.find(offer => offer.id === offerId)
//             if (!offerToDelete) {
//                 throw new Error('Offer not found')
//             }
//             console.log('Offer to delete:', offerToDelete)

//             // Find the badge directly using badgeId
//             const badge = sortedBadges.find(b => b.id === offerToDelete.badgeId)
//             if (!badge) {
//                 throw new Error(`Badge not found for ID: ${offerToDelete.badgeId}`)
//             }
//             console.log('Found badge:', badge)

//             // Get all badges in order of hierarchy (lower or equal ratio badges)
//             const badgeHierarchy = sortedBadges
//                 .filter(b => b.userType && b.userType.ratio <= (badge.userType?.ratio || 0))
//                 .map(b => b.id)
//             console.log('Badge hierarchy:', badgeHierarchy)

//             // Get all offers that need to be deleted (current and lower tiers)
//             const offersToDelete = offers.filter(offer => 
//                 badgeHierarchy.includes(offer.badgeId)
//             )
//             console.log('Offers to delete:', offersToDelete)

//             // Delete all affected offers
//             const deletePromises = offersToDelete.map(async offer => {
//                 const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/brand/special-offer/${brandId}/${offer.id}`
//                 console.log('Deleting offer at URL:', url)
                
//                 const response = await fetch(url, {
//                     method: 'DELETE',
//                     headers: {
//                         'Authorization': `Bearer ${token}`
//                     },
//                 })

//                 if (!response.ok) {
//                     const errorData = await response.json().catch(() => null)
//                     console.error('Delete response not OK:', {
//                         status: response.status,
//                         statusText: response.statusText,
//                         errorData
//                     })
//                     throw new Error(`Failed to delete offer ${offer.id}: ${response.statusText}`)
//                 }

//                 return response
//             })

//             try {
//                 await Promise.all(deletePromises)
//                 toast.success(t('offers_deleted_successfully'))
//                 await fetchSpecialOffers()
//             } catch (deleteError) {
//                 console.error('Error during delete operations:', deleteError)
//                 throw deleteError
//             }

//         } catch (error) {
//             console.error('Delete operation failed:', error)
//             toast.error(error instanceof Error ? error.message : 'Failed to delete offers')
//         } finally {
//             setLoading(false)
//             setDeleteConfirmationId(null)
//         }
//     }

//     // Update the Select component in the form
//     const renderUserTypeSelect = () => {
//         // Create options from badges array, filtering out badges without userType
//         const badgeOptions = sortedBadges
//             .filter(badge => badge.userType)
//             .map(badge => ({
//                 value: badge.userType?.userType || '',
//                 label: badge.userType?.userType || ''
//             }))

//         return (
//             <div>
//                 <label className="block text-sm mb-1">{t('Tablecomponent.special_offers_table_Type')}</label>
//                 <Select
//                     value={watch('type') || ''}
//                     onValueChange={(value) => {
//                         if (value) {
//                             setValue('type', value)
//                             // Reset ratios when changing type
//                             setValue('ratios', {})
//                         }
//                     }}
//                     options={badgeOptions}
//                     placeholder={t('selectType')}
//                 />
//                 {errors.type && (
//                     <p className="text-sm text-red-500 mt-1">{t('Enter vaild user type name')}</p>
//                 )}
//             </div>
//         )
//     }

//     const headers = [
//         { name: 'special_offers_table_id' },
//         { name: 'special_offers_table_Type' },
//         { name: 'special_offers_table_point_back' },
//         { name: 'special_offers_table_valid_from' },
//         { name: 'special_offers_table_valid_to' },
//         { name: 'special_offers_table_actions' }
//     ]

//     const renderTableRows = () => {
//         return offers.map((offer) => (
//             <tr key={offer.id} className="odd:bg-white even:bg-primary/5 border-b">
//                 <td className="px-6 py-4">
//                     {offer.id.toString().padStart(3, '0')}
//                 </td>
//                 <td className="px-6 py-4 font-medium">
//                     {offer.type}
//                 </td>
//                 <td className="px-6 py-4">
//                     {offer.ratio}%
//                 </td>
//                 <td className="px-6 py-4">
//                     {formatDate(offer.validFrom)}
//                 </td>
//                 <td className="px-6 py-4">
//                     {formatDate(offer.validTo)}
//                 </td>
//                 <td className="px-6 py-4">
//                     <div className="flex gap-2">
//                         <button 
//                             onClick={() => setDeleteConfirmationId(offer.id)}
//                             className="p-1 hover:bg-slate-100 rounded"
//                             disabled={loading}
//                             title={t('delete')}
//                         >
//                             <TrashIconn className="w-4 h-4 text-red-500" />
//                         </button>
//                     </div>
//                 </td>
//             </tr>
//         ))
//     }

//     return (
//         <div className="mt-8">
//             <Table
//                 data={offers}
//                 headers={headers}
//                 count={offers.length}
//                 loading={loading}
//                 showDateFilter={false}
//                 pageSize={pageSize}
//                 currentPage={currentPage}
//                 onPageChange={handlePageChange}
//                 onPageSizeChange={handlePageSizeChange}
//                 showExport={true}
//                 bgColor="#dfe2e8"
//                 initialData={offers}
//             >
//                 {renderTableRows()}
//             </Table>

//             {/* Add Button */}
//             <div className="flex justify-center mt-4">
//                 <button
//                     onClick={() => setIsAddDialogOpen(true)}
//                     className="p-2 bg-teal-500 text-white rounded-full hover:bg-teal-600 transition-colors"
//                     title={t('add_special_offer')}
//                 >
//                     <PlusIcon className="w-5 h-5" />
//                 </button>
//             </div>

//             {/* Add Dialog */}
//             <Dialog open={isAddDialogOpen} onOpenChange={handleCloseDialog}>
//                 <DialogContent>
//                     <h2 className="text-lg font-semibold mb-4 text-center">{t('add_special_offer')}</h2>
//                     <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//                         {renderUserTypeSelect()}
//                         {watch('type') && renderRatioInputs()}
//                         <div>
//                             <label className="block text-sm mb-1">{t('Tablecomponent.special_offers_table_valid_from')}</label>
//                             <input
//                                 type="date"
//                                 {...register('validFrom', { required: t('validFrom_required') })}
//                                 className="w-full px-3 py-2 border rounded-lg"
//                             />
//                         </div>
//                         <div>
//                             <label className="block text-sm mb-1">{t('Tablecomponent.special_offers_table_valid_to')}</label>
//                             <input
//                                 type="date"
//                                 {...register('validTo', { required: t('validTo_required') })}
//                                 className="w-full px-3 py-2 border rounded-lg"
//                             />
//                         </div>
//                         <div className="flex justify-end gap-4">
//                             <button
//                                 type="button"
//                                 onClick={handleCloseDialog}
//                                 className="px-4 py-2 border rounded-lg"
//                             >
//                                 {t('cancel')}
//                             </button>
//                             <button
//                                 type="submit"
//                                 disabled={loading || !watch('type')}
//                                 className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 disabled:opacity-50"
//                             >
//                                 {loading ? t('saving') : t('add')}
//                             </button>
//                         </div>
//                     </form>
//                 </DialogContent>
//             </Dialog>

//             {/* Delete Confirmation Dialog */}
//             <Dialog open={!!deleteConfirmationId} onOpenChange={() => setDeleteConfirmationId(null)}>
//                 <DialogContent>
//                     <h2 className="text-lg font-semibold mb-4 text-center">{t('branddeleteButton')}</h2>
//                     <p className="mb-4">{t('deleteMessage')}</p>
//                     <div className="flex justify-end gap-4">
//                         <button
//                             onClick={() => setDeleteConfirmationId(null)}
//                             className="px-4 py-2 border rounded-lg"
//                         >
//                             {t('cancel_delete_brand')}
//                         </button>
//                         <button
//                             onClick={() => deleteConfirmationId && handleDelete(deleteConfirmationId)}
//                             className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
//                             disabled={loading}
//                         >
//                             {loading ? t('brand_deleteLoading') : t('deleteBrand')}
//                         </button>
//                     </div>
//                 </DialogContent>
//             </Dialog>
//         </div>
//     )
// }

// export default SpecialOffers


'use client'
import React, { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { useAppContext } from '@/context/appContext'
import {  TrashIcon, PlusIcon } from '@heroicons/react/24/outline'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Select } from '@/components/ui/select'
import Table from '@/components/ui/Table'
import { TrashIconn , PluseCircelIcon} from '@/components/icons'

interface SpecialOffer {
    id: number
    brandId: number
    badgeId: number
    userTypeId: number
    type?: string
    badge?: {
        id: number
        name: string
        points: number
        color: string
        userType?: {
            id: number
            userType: string
            ratio: number
            color: string
            buyAmount: number
        }
    }
    displayName?: string
    badgeColor?: string
    userTypeColor?: string
    validFrom: string
    validTo: string
    ratio: number
    createdAt: string
    updatedAt: string
    brand?: {
        id: number
        name: string
        logo: string
    }
    userType?: {
        id: number
        userType: string
        ratio: number
        color: string
        buyAmount: number
    }
}

interface OfferFormData {
    type: string
    ratios: {
        [key: string]: number
    }
    validFrom: string
    validTo: string
}

interface Badge {
    id: number
    name: string
    points: number
    color: string
    userType: {
        id: number
        userType: string
        ratio: number
        color: string
        buyAmount: number
        badgeId: number
    } | null
}

const SpecialOffers = ({ brandId }: { brandId: string }) => {
    const [offers, setOffers] = useState<SpecialOffer[]>([])
    const [badges, setBadges] = useState<Badge[]>([])
    const [loading, setLoading] = useState(false)
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
    const [deleteConfirmationId, setDeleteConfirmationId] = useState<number | null>(null)
    const { token } = useAppContext()
    const t = useTranslations('brand')

    const { register, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm<OfferFormData>({
        defaultValues: {
            type: undefined,
            ratios: {},
            validFrom: undefined,
            validTo: undefined
        }
    })
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)

    useEffect(() => {
        const loadData = async () => {
            await fetchBadges() // Load badges first
            await fetchSpecialOffers() // Then load offers
        }
        loadData()
    }, [brandId])

    useEffect(() => {
        if (badges.length > 0 && offers.length > 0) {
            const mappedOffers = offers.map(offer => ({
                ...offer,
                type: badges.find(b => b.id === offer.badgeId)?.userType?.userType || ''
            }))
            console.log('Updating offers with badge types:', mappedOffers)
            setOffers(mappedOffers)
        }
    }, [badges])

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    const handlePageSizeChange = (newPageSize: number) => {
        setPageSize(newPageSize)
        setCurrentPage(1)
    }

    const fetchSpecialOffers = async () => {
        try {
            setLoading(true)
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/brand/special-offer/${brandId}?sort=ratio`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            if (!response.ok) throw new Error(t('failed_to_fetch_offers'))
            const data = await response.json()
            console.log('Fetched offers:', data.offers)
            
            // Store raw offers first
            const rawOffers = data.offers || []
            
            // Only map if we have badges data
            if (badges.length > 0) {
                const mappedOffers = rawOffers.map((offer: any) => ({
                    ...offer,
                    type: badges.find(b => b.id === offer.badgeId)?.userType?.userType || ''
                }))
                console.log('Mapped offers with types:', mappedOffers)
                setOffers(mappedOffers)
            } else {
                // Store raw offers if badges aren't loaded yet
                setOffers(rawOffers)
            }
        } catch (error) {
            console.error('Error:', error)
            toast.error(t('failed_to_load_offers'))
        } finally {
            setLoading(false)
        }
    }

    const fetchBadges = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/badges?sort=points`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            if (!response.ok) throw new Error(t('failed_to_fetch_badges'))
            const data = await response.json()
            setBadges(data.badges || [])
        } catch (error) {
            console.error('Error fetching badges:', error)
            toast.error(t('failed_to_load_badges'))
        }
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString()
    }

    // Sort badges by ratio to establish hierarchy
    const sortedBadges = [...badges].sort((a, b) => 
        (a.userType?.ratio || 0) - (b.userType?.ratio || 0)
    )

    const getHigherTierBadges = (selectedType: string) => {
        const selectedBadgeIndex = sortedBadges.findIndex(b => b.userType?.userType === selectedType)
        if (selectedBadgeIndex === -1) return []
        return sortedBadges.slice(selectedBadgeIndex + 1)
    }

    const renderRatioInputs = () => {
        const selectedType = watch('type')
        if (!selectedType) return null

        const higherTierBadges = getHigherTierBadges(selectedType)
        
        return (
            <div className="space-y-4">
                {/* Selected badge ratio input */}
                <div>
                    <label className="block text-sm mb-1">
                        {`${selectedType} ${t('special_offers_table_point_back')}`}
                    </label>
                    <input
                        type="number"
                        step="0.1"
                        {...register(`ratios.${selectedType}`, {
                            required: t('pointbackratio_required'),
                            min: { value: 0, message: t('GreaterThanZero') },
                            onChange: (e) => {
                                const currentValue = parseFloat(e.target.value)
                                // Reset higher tier values if they're lower than current
                                higherTierBadges.forEach(badge => {
                                    const higherValue = watch(`ratios.${badge.userType?.userType}`)
                                    if (!higherValue || higherValue < currentValue) {
                                        setValue(`ratios.${badge.userType?.userType}`, currentValue)
                                    }
                                })
                            }
                        })}
                        className="w-full px-3 py-2 border rounded-lg"
                    />
                    {errors.ratios?.[selectedType] && (
                        <p className="text-sm text-red-500 mt-1">
                            {errors.ratios[selectedType]?.message}
                        </p>
                    )}
                </div>

                {/* Higher tier badge ratio inputs */}
                {higherTierBadges.map((badge, index) => {
                    // Get the previous badge in the hierarchy
                    const previousBadge = index === 0 ? selectedType : higherTierBadges[index - 1].userType?.userType

                    return (
                        <div key={badge.id}>
                            <label className="block text-sm mb-1">
                                {`${badge.userType?.userType} ${t('special_offers_table_point_back')}`}
                            </label>
                            <input
                                type="number"
                                step="0.1"
                                {...register(`ratios.${badge.userType?.userType}`, {
                                    required: t('pointbackratio_required'),
                                    min: {
                                        value: watch(`ratios.${previousBadge}`) || 0,
                                        message: t('MustBeGreaterThanPreviousTier')
                                    },
                                    validate: value => {
                                        const previousValue = watch(`ratios.${previousBadge}`)
                                        if (!value || !previousValue) return true
                                        return Number(value) > Number(previousValue) || 
                                            t('MustBeGreaterThanPreviousTier')
                                    },
                                    onChange: (e) => {
                                        const currentValue = parseFloat(e.target.value)
                                        // Update subsequent tiers if they're lower than current
                                        higherTierBadges.slice(index + 1).forEach(nextBadge => {
                                            const nextValue = watch(`ratios.${nextBadge.userType?.userType}`)
                                            if (!nextValue || Number(nextValue) <= currentValue) {
                                                setValue(
                                                    `ratios.${nextBadge.userType?.userType}`, 
                                                    currentValue + 0.1  // Remove toString(), keep as number
                                                )
                                            }
                                        })
                                    }
                                })}
                                className="w-full px-3 py-2 border rounded-lg"
                            />
                            {errors.ratios?.[badge.userType?.userType || ''] && (
                                <p className="text-sm text-red-500 mt-1">
                                    {errors.ratios[badge.userType?.userType || '']?.message}
                                </p>
                            )}
                        </div>
                    )
                })}
            </div>
        )
    }

    const getAffectedOffers = (offerId: number) => {
        const offerToDelete = offers.find(offer => offer.id === offerId)
        if (!offerToDelete) return []

        const badge = sortedBadges.find(b => b.id === offerToDelete.badgeId)
        if (!badge) return []

        const badgeHierarchy = sortedBadges
            .filter(b => b.userType && b.userType.ratio <= (badge.userType?.ratio || 0))
            .map(b => b.id)

        return offers.filter(offer => badgeHierarchy.includes(offer.badgeId))
    }

    const DeleteConfirmationDialog = ({ offerId }: { offerId: number | null }) => {
        if (!offerId) return null

        const affectedOffers = getAffectedOffers(offerId)

        return (
            <Dialog open={!!offerId} onOpenChange={() => setDeleteConfirmationId(null)}>
                <DialogContent>
                    <h2 className="text-lg font-semibold mb-4 text-center">{t('branddeleteButton')}</h2>
                    <div className="mb-4">
                        <p className="mb-2">{t('deleteMessage')}</p>
                        {/* <div className="bg-gray-50 p-4 rounded-lg"> */}
                        <div className="bg-gray-100/90 border-2 border-l-4  drop-shadow-2xl p-4 rounded-lg">
                            <p className="text-sm text-red-600 mb-2 font-bold">{t('following_offers_will_be_deleted')}:</p>
                            <ul className="space-y-2">
                                {affectedOffers.map(offer => (
                                    <li key={offer.id} className="flex items-center space-x-2 text-sm">
                                        {/* <span className="font-medium">{offer.type}</span> */}
                                        <span className="text-gray-500">({offer.badge?.name})</span>
                                        <span className="text-gray-400">- {offer.ratio}%</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="flex justify-end gap-4">
                        <button
                            onClick={() => setDeleteConfirmationId(null)}
                            className="px-4 py-2 border rounded-lg"
                        >
                            {t('cancel_delete_brand')}
                        </button>
                        <button
                            onClick={() => offerId && handleDelete(offerId)}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                            disabled={loading}
                        >
                            {loading ? t('brand_deleteLoading') : t('deleteBrand')}
                        </button>
                    </div>
                </DialogContent>
            </Dialog>
        )
    }

    const onSubmit = async (data: OfferFormData) => {
        try {
            setLoading(true)

            const formatDate = (dateStr: string) => {
                const date = new Date(dateStr)
                return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
            }

            const selectedBadge = sortedBadges.find(b => b.userType?.userType === data.type)
            if (!selectedBadge) {
                throw new Error(t('selected_badge_not_found'))
            }

            const selectedBadgeIndex = sortedBadges.findIndex(b => b.userType?.userType === data.type)
            const relevantBadges = sortedBadges.slice(selectedBadgeIndex)

            const offerPromises = relevantBadges.map(async (badge) => {
                if (!badge.userType?.userType) return

                const body = JSON.stringify({
                    badgeId: badge.id,
                    userTypeId: badge.userType.id,
                    ratio: Number(data.ratios[badge.userType.userType]),
                    validFrom: formatDate(data.validFrom),
                    validTo: formatDate(data.validTo)
                })

                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/brand/special-offer/${brandId}`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body
                })

                if (!response.ok) {
                    const errorData = await response.json()
                    throw new Error(errorData.message || t('failed_to_save_offer'))
                }

                return response.json()
            })

            const results = await Promise.all(offerPromises)
            
            // Update the offers state with the new data
            setOffers(prevOffers => {
                const newOffers = [...prevOffers]
                results.forEach(result => {
                    if (result && result.offer) {
                        const badge = sortedBadges.find(b => b.id === result.offer.badgeId)
                        newOffers.push({
                            ...result.offer,
                            type: badge?.userType?.userType || '',
                            badge: badge,
                            userType: badge?.userType
                        })
                    }
                })
                return newOffers
            })

            toast.success(t('offer_added_successfully'))
            handleCloseDialog()
        } catch (error: unknown) {
            const err = error as Error
            console.error('Error:', err)
            toast.error(err.message || t('failed_to_save_offer'))
        } finally {
            setLoading(false)
        }
    }

    const handleCloseDialog = () => {
        setIsAddDialogOpen(false)
        reset({
            type: undefined,
            ratios: {},
            validFrom: undefined,
            validTo: undefined
        })
    }

    const handleDelete = async (offerId: number) => {
        try {
            setLoading(true)
            
            // Find the offer being deleted
            const offerToDelete = offers.find(offer => offer.id === offerId)
            if (!offerToDelete) {
                throw new Error(t('offer_not_found'))
            }
            console.log('Offer to delete:', offerToDelete)

            // Find the badge directly using badgeId
            const badge = sortedBadges.find(b => b.id === offerToDelete.badgeId)
            if (!badge) {
                throw new Error(`Badge not found for ID: ${offerToDelete.badgeId}`)
            }
            console.log('Found badge:', badge)

            // Get all badges in order of hierarchy (lower or equal ratio badges)
            const badgeHierarchy = sortedBadges
                .filter(b => b.userType && b.userType.ratio <= (badge.userType?.ratio || 0))
                .map(b => b.id)
            console.log('Badge hierarchy:', badgeHierarchy)

            // Get all offers that need to be deleted (current and lower tiers)
            const offersToDelete = offers.filter(offer => 
                badgeHierarchy.includes(offer.badgeId)
            )
            console.log('Offers to delete:', offersToDelete)

            // Delete all affected offers
            const deletePromises = offersToDelete.map(async offer => {
                const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/brand/special-offer/${brandId}/${offer.id}`
                console.log('Deleting offer at URL:', url)
                
                const response = await fetch(url, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                })

                if (!response.ok) {
                    const errorData = await response.json().catch(() => null)
                    console.error(t('offers_deleted_Failed'), {
                        status: response.status,
                        statusText: response.statusText,
                        errorData
                    })
                    throw new Error(`${t('offers_deleted_Failed')} ${offer.id}: ${response.statusText}`)
                }

                return response
            })

            try {
                await Promise.all(deletePromises)
                toast.success(t('offers_deleted_successfully'))
                await fetchSpecialOffers()
            } catch (deleteError) {
                console.error(t('offers_deleted_Failed'), deleteError)
                throw deleteError
            }

        } catch (error) {
            console.error(t('offers_deleted_Failed'), error)
            toast.error(error instanceof Error ? error.message : t('offers_deleted_Failed'))
        } finally {
            setLoading(false)
            setDeleteConfirmationId(null)
        }
    }

    // Update the Select component in the form
    const renderUserTypeSelect = () => {
        // Create options from badges array, filtering out badges without userType
        const badgeOptions = sortedBadges
            .filter(badge => badge.userType)
            .map(badge => ({
                value: badge.userType?.userType || '',
                label: badge.userType?.userType || ''
            }))

        return (
            <div>
                <label className="block text-sm mb-1">{t('special_offers_table_Type')}</label>
                <Select
                    value={watch('type') || ''}
                    onValueChange={(value) => {
                        if (value) {
                            setValue('type', value)
                            // Reset ratios when changing type
                            setValue('ratios', {})
                        }
                    }}
                    options={badgeOptions}
                    placeholder={t('selectType')}
                />
                {errors.type && (
                    <p className="text-lg text-gray-500 mt-1 font-bold">{t('Enter vaild user type name')}</p>
                )}
            </div>
        )
    }

    const headers = [
        { name: 'special_offers_table_id' },
        { name: 'special_offers_table_Type' },
        { name: 'special_offers_table_point_back' },
        { name: 'special_offers_table_valid_from' },
        { name: 'special_offers_table_valid_to' },
        { name: 'special_offers_table_actions' }
    ]

    const renderTableRows = () => {
        return offers.map((offer) => (
            <tr key={offer.id} className="odd:bg-white even:bg-primary/5 border-b">
                <td className="px-6 py-4">
                    {offer.id.toString().padStart(3, '0')}
                </td>
                <td className="px-6 py-4">
                    <div className="flex flex-col">
                        {/* <span className="font-medium">{offer.userType?.userType || ''}</span> */}
                        <span className="text-sm text-gray-500">{offer.badge?.name}</span>
                    </div>
                </td>
                <td className="px-6 py-4">
                    {offer.ratio}%
                </td>
                <td className="px-6 py-4">
                    {formatDate(offer.validFrom)}
                </td>
                <td className="px-6 py-4">
                    {formatDate(offer.validTo)}
                </td>
                <td className="px-6 py-4">
                    <div className="flex gap-2">
                        <button 
                            onClick={() => setDeleteConfirmationId(offer.id)}
                            className="p-1 hover:bg-slate-100 rounded"
                            disabled={loading}
                            title={t('delete')}
                        >
                            <TrashIconn className="w-4 h-4 text-red-500" />
                        </button>
                    </div>
                </td>
            </tr>
        ))
    }

    return (
        <div className="mt-8">
            <Table
                data={offers}
                headers={headers}
                count={offers.length}
                loading={loading}
                showDateFilter={false}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
                showExport={true}
                bgColor="#dfe2e8"
                initialData={offers}
            >
                {renderTableRows()}
            </Table>

            {/* Add Button */}
            <div className="flex justify-center mt-4">
                <button
                    onClick={() => setIsAddDialogOpen(true)}
                    className="p-2 bg-teal-500 text-white rounded-full hover:bg-teal-600 transition-colors"
                    title={t('add_special_offer')}
                >
                    <PlusIcon className="w-5 h-5" />
                </button>
            </div>

            {/* Add Dialog */}
            <Dialog open={isAddDialogOpen} onOpenChange={handleCloseDialog}>
                <DialogContent>
                    <h2 className="text-lg font-semibold mb-4 text-center">{t('add_special_offer')}</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {renderUserTypeSelect()}
                        {watch('type') && renderRatioInputs()}
                        <div>
                            <label className="block text-sm mb-1">{t('special_offers_table_valid_from')}</label>
                            <input
                                type="date"
                                {...register('validFrom', { required: t('validFrom_required') })}
                                className="w-full px-3 py-2 border rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="block text-sm mb-1">{t('special_offers_table_valid_to')}</label>
                            <input
                                type="date"
                                {...register('validTo', { required: t('validTo_required') })}
                                className="w-full px-3 py-2 border rounded-lg"
                            />
                        </div>
                        <div className="flex justify-end gap-4">
                            <button
                                type="button"
                                onClick={handleCloseDialog}
                                className="px-4 py-2 border rounded-lg"
                            >
                                {t('cancel')}
                            </button>
                            <button
                                type="submit"
                                disabled={loading || !watch('type')}
                                className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 disabled:opacity-50"
                            >
                                {loading ? t('saving') : t('add')}
                            </button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <DeleteConfirmationDialog offerId={deleteConfirmationId} />
        </div>
    )
}

export default SpecialOffers