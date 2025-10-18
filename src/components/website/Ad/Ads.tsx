import { Ads } from '@/types/website/Ads'
import Image from 'next/image';
import React from 'react'

const AdsBlock = ({ads}: {ads: Ads[]}) => {
    return (
        <>
            {ads.map((ad: Ads, i: number) => (
                <div key={i} className="mb-4">
                    <a href={ad.url} target="_blank" rel="noopener noreferrer">
                        {/* {ad.title} */}
                        <div className="w-full max-w-[728px] flex items-center justify-center">
                            {/* <div className=" font-medium tracking-wide">
                                {ad.title}
                            </div> */}
                            <Image
                                src={ad.url}
                                alt={ad.title}
                                width={ad.size?.split('x')[0] ? parseInt(ad.size.split('x')[0]) : 120}
                                height={ad.size?.split('x')[1] ? parseInt(ad.size.split('x')[1]) : 320}
                                // className="object-contain"
                                className="object-cover object-center transition-transform cursor-pointer"

                            />
                        </div>
                    </a>
                </div>
            ))}
        </>
    )
}

export default AdsBlock