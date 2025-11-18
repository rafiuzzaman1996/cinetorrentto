import DownloadGuide from '@/components/website/shared/DownloadGuide';
import Footer from '@/components/website/shared/Footer';
import Header from '@/components/website/shared/Header';
import { ScrollToTop } from '@/components/website/shared/ScrollToTop';
import React from 'react'
import { getAds } from './website-api/AdsApi';
import { Ads } from '@/types/admin/Ads';
import SocialInfo from '@/components/website/shared/SocialInfo';
import { AdsStoreProvider } from '@/providers/ads-store-providers';
interface LayoutProps {
  children: React.ReactNode
}
const layout = async ({ children }: Readonly<LayoutProps>) => {
  const getAdsData = await getAds({
    page: 1,
    limit: 100,
  });
  const AllAds = getAdsData?.data || [];

  const filterAds = AllAds.filter((ad: Ads) => ad.placement === 'filter');
  const menuAds = AllAds.filter((ad: Ads) => ad.placement === 'menu');
  const footerAds = AllAds.filter((ad: Ads) => ad.placement === 'footer');
  const initialAds = AllAds;
  return (
    <>
      <AdsStoreProvider initialAds={initialAds}>
        <Header filterAds={filterAds} menuAds={menuAds} />
        {children}
        <DownloadGuide />
        <Footer ads={footerAds} />
        <ScrollToTop />
        <SocialInfo />
      </AdsStoreProvider>
    </>
  )
}

export default layout