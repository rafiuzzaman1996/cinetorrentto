import DownloadGuide from '@/components/website/shared/DownloadGuide';
import Footer from '@/components/website/shared/Footer';
import Header from '@/components/website/shared/Header';
import React from 'react'

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Header />
      {children}
      <DownloadGuide />
      <Footer />
    </>
  )
}

export default layout