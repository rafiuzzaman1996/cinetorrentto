import { Ads } from '@/types/admin/Ads'
import React from 'react'

export const FooterAd = ({ ads }: { ads: Ads[] }) => {
    return (
        <>
            {ads.map((ad: Ads, i: number) => (
                <div key={i} className="w-full max-w-[728px] h-[90px] flex items-center justify-center border-2 border-dashed">
                    <div className=" font-medium tracking-wide">
                        <a href={ad.url} target="_blank" rel="noopener noreferrer">
                            {/* {ad.title} */}
                            {ad.title}
                        </a>
                    </div>
                </div>
            ))}
        </>
    )
}
