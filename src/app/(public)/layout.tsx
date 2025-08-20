import DownloadGuide from '@/components/public/shared/DownloadGuide';
import Footer from '@/components/public/shared/Footer';
import Header from '@/components/public/shared/Header';
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