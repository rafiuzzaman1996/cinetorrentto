import DownloadGuide from '@/components/website/shared/DownloadGuide';
import Footer from '@/components/website/shared/Footer';
import Header from '@/components/website/shared/Header';
import { ScrollToTop } from '@/components/website/shared/ScrollToTop';
import React from 'react'
import { getAds } from './website-api/AdsApi';
import { Ads } from '@/types/admin/Ads';
import SocialInfo from '@/components/website/shared/SocialInfo';
import { AdsStoreProvider } from '@/providers/ads-store-providers';
import Script from 'next/script'

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
      {process.env.NEXT_PUBLIC_ENV === 'production' && (
        <>
          {/* Ads Scripts */}
          <Script
            id="popunder-script"
            src="https://momrollback.com/d6/6a/c2/d66ac2159f0c1208912faa1e262f2a9f.js"
            strategy="afterInteractive"
          />
          <Script
            id="social-banner-script"
            src="https://momrollback.com/a2/b3/8d/a2b38d5daec68607c06ce6b05a29268a.js"
            strategy="afterInteractive"
          />
          {/* <Script
            id="native-banner-script"
            async
            data-cfasync="false"
            src="https://momrollback.com/bf77290a294c5212fed193224e21a949/invoke.js"
            crossOrigin="anonymous"
            strategy="afterInteractive"
          /> */}
        </>
      )}
      {/* Ads Scripts End */}
      <AdsStoreProvider initialAds={initialAds}>
        <Header filterAds={filterAds} menuAds={menuAds} />
        <div id='container-bf77290a294c5212fed193224e21a949'>
          {children}
        </div>
        <DownloadGuide />
        <Footer ads={footerAds} />
        <ScrollToTop />
        <SocialInfo />
      </AdsStoreProvider>
    </>
  )
}

export default layout