import DownloadGuide from '@/components/shared/DownloadGuide';
import Footer from '@/components/shared/Footer';
import Header from '@/components/shared/Header';
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