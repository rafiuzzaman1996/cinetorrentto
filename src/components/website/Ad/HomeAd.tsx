import { getAds } from '@/app/(website)/website-api/AdsApi'
import { Ads } from '@/types/website/Ads'
import React from 'react'

const HomeAds = async () => {
    const getAdsData = await getAds({
        page: 1,
        limit: 100,
        filters: 'filter.placement=$eq:home-right',
    });
    const homeAds = getAdsData?.data || [];
    return (
        <>
            {homeAds.map((ad: Ads, i: number) => (
                <div key={i} className="mb-4">
                    <a href={ad.url} target="_blank" rel="noopener noreferrer">
                        {/* {ad.title} */}
                        <div className="w-full max-w-[728px] h-[50px] flex items-center justify-center border-2 border-dashed">
                            <div className=" font-medium tracking-wide">
                                {ad.title}
                            </div>
                        </div>
                    </a>
                </div>
            ))}
        </>
    )
}

export default HomeAds