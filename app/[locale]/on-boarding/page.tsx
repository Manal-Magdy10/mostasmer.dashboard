import OnBoardingHeader from '@/components/onBoarding/OnBoardingHeader'
import { fetchData } from '@/lib/fetchData'
import React from 'react'

const page = async () => {
    const { data, error, loading } = await fetchData('/api/on-boarding', { cache: "no-store" })

    return (
        <div className='p-container space-y-10 pb-5'>
            <OnBoardingHeader data={data} />
        </div>
    )
}

export default page

// // 

// import { fetchData } from '@/lib/fetchData';
// import { cookies } from 'next/headers';
// import React from 'react'

// const page = async ({ searchParams }: { searchParams: any }) => {
//     const queryParams = new URLSearchParams({
//         fields: "id,name,description,price,stock,purchaseCount,available,categoryId,images=id-url,discounts",
//         limit: searchParams.limit ?? '10',
//         items: 'fullname,phone,email'
//     });

//     const token = cookies().get('token')?.value
//     const userData = await fetchData(`/api/verify-me`, {
//         method: "GET",
//         credentials: "include",
//         headers: {
//             "Authorization": `Bearer ${token}`
//         }
//     })
//     if (userData?.data?.user?.role != 'admin') queryParams.append('sellerId', userData?.data?.user?.id);
//     if (searchParams.skip) queryParams.append("skip", searchParams.skip);
//     if (searchParams.keyword) queryParams.append("keyword", searchParams.keyword);

//     const { data, error } = await fetchData(`/api/products?${queryParams.toString()}`, {
//         method: "GET",
//         credentials: "include",
//         cache: "no-cache"
//     });

//     return (
//         <div>
        
//         onboarding
//         </div>
//     )
// }

// export default page