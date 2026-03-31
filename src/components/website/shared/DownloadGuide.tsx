'use client'
import React from 'react'
import { Button } from "@/components/ui/button"

const DownloadGuide = () => {
    const links = {
        fdm: "https://play.google.com/store/apps/details?id=org.freedownloadmanager.fdm&hl=en&referrer=utm_source%3Dgoogle%26utm_medium%3Dorganic%26utm_term%3Dfdm&pcampaignid=APPU_1_XB7LZ_HnK63H4-EP8PnbgQw",
        adm: "https://play.google.com/store/apps/details?id=com.dv.adm&hl=en&referrer=utm_source%3Dgoogle%26utm_medium%3Dorganic%26utm_term%3Dadm&pcampaignid=APPU_1_IJLMZ9iVB-nG4-EPlr-RuQM",
        utorrent: "https://play.google.com/store/apps/details?id=com.utorrent.client&hl=en&referrer=utm_source%3Dgoogle%26utm_medium%3Dorganic%26utm_term%3Dutorrent&pcampaignid=APPU_1_B5LMZ-W0IM6XjuMP1I3T0Q4",
        bittorrent: "https://play.google.com/store/apps/details?id=com.bittorrent.client&hl=en&referrer=utm_source%3Dgoogle%26utm_medium%3Dorganic%26utm_term%3Dbittorrent&pcampaignid=APPU_1_2pHMZ7LTG9Oq4-EP3qnzsQQ",
        pc_fdm: "https://files2.freedownloadmanager.org/6/latest/fdm_x64_setup.exe",
        pc_utorrent: "https://www.utorrent.com/web/downloads/complete/track/stable/os/win/ ",
    }
    return (
        <div className="container mx-auto px-6 py-8 rounded-lg bg-gray-100 text-gray-900 dark:bg-neutral-800 dark:text-white text-center">
            <p className="mb-2 text-sm md:text-base">
                Please let us know in the comments if you have any problems downloading.
                We will resolve the issue quickly.
            </p>
            <p className="mb-6 text-sm md:text-base opacity-80">
                (ডাউনলোড করতে সমস্যা হলে অবশ্যই কমেন্টে জানাবেন। আমরা সমস্যার দ্রুত সমাধান করব।)
            </p>

            <p className="mb-2 text-sm md:text-base">
                To download, you must have one of the following 4 apps installed.
                If not, please install it using the links below.
            </p>
            <p className="mb-8 text-sm md:text-base opacity-80">
                (ডাউনলোড করার জন্য নিচের ৪টি অ্যাপ এর মধ্যে যেকোনো একটি ইনস্টল থাকতে হবে।
                না থাকলে অনুগ্রহ করে নিচের লিঙ্কগুলো থেকে ইনস্টল করে নিন।)
            </p>

            <div className="grid md:grid-cols-2 gap-8 justify-center">
                {/* Android Section */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Android User</h3>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Button onClick={() => window.open(links.fdm, '_blank')}
                                className="rounded-full px-6 py-2 bg-gray-800 dark:bg-gray-300 hover:bg-gray-600 dark:hover:bg-gray-600 dark:hover:text-gray-100  cursor-pointer">FDM</Button>
                        <Button onClick={() => window.open(links.adm, '_blank')}
                                className="rounded-full px-6 py-2 bg-gray-800 dark:bg-gray-300 hover:bg-gray-600 dark:hover:bg-gray-600 dark:hover:text-gray-100  cursor-pointer">ADM</Button>
                        <Button onClick={() => window.open(links.utorrent, '_blank')}
                                className="rounded-full px-6 py-2 bg-gray-800 dark:bg-gray-300 hover:bg-gray-600 dark:hover:bg-gray-600 dark:hover:text-gray-100  cursor-pointer">µTorrent</Button>
                        <Button onClick={() => window.open(links.bittorrent, '_blank')}
                                className="rounded-full px-6 py-2 bg-gray-800 dark:bg-gray-300 hover:bg-gray-600 dark:hover:bg-gray-600 dark:hover:text-gray-100  cursor-pointer">BitTorrent</Button>
                    </div>
                </div>

                {/* PC Section */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">PC User</h3>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Button onClick={() => window.open(links.pc_fdm, '_blank')}
                            className="rounded-full px-6 py-2 bg-gray-800 dark:bg-gray-300 hover:bg-gray-600 dark:hover:bg-gray-600 dark:hover:text-gray-100  cursor-pointer">FDM</Button>
                        <Button onClick={() => window.open(links.pc_utorrent, '_blank')}
                            className="rounded-full px-6 py-2 bg-gray-800 dark:bg-gray-300 hover:bg-gray-600 dark:hover:bg-gray-600 dark:hover:text-gray-100  cursor-pointer">µTorrent</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DownloadGuide