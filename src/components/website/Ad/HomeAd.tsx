import { getAds } from '@/app/(website)/website-api/AdsApi'
import { Ads } from '@/types/website/Ads'
import React from 'react'
import AdsBlock from './Ads';

const HomeAds = async () => {
    const getAdsData = await getAds({
        page: 1,
        limit: 100,
        filters: 'filter.placement=$eq:home-right',
    });
    const homeAds: Ads[] = getAdsData?.data || [];
    return (
        <>
        <AdsBlock ads={homeAds} />
        </>
    )
}

export default HomeAds