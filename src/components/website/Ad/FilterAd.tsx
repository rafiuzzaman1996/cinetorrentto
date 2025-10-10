import { Ads } from '@/types/website/Ads'

const FilterAd = ({ads}: {ads: Ads[]}) => {
    return (
        <>
            {ads.map((ad: Ads, i: number) => (
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

export default FilterAd