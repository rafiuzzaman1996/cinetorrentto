import React from 'react'
import { Button } from "@/components/ui/button"

const DownloadGuide = () => {
    return (
        <div className="container mx-auto px-6 py-8 rounded-lg bg-gray-300 text-gray-900 dark:bg-gray-800 dark:text-white text-center">
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
                        <Button className="rounded-full px-6 py-2 bg-gray-800 dark:bg-gray-300 hover:bg-gray-600 dark:hover:bg-gray-600 dark:hover:text-gray-100  cursor-pointer">FDM</Button>
                        <Button className="rounded-full px-6 py-2 bg-gray-800 dark:bg-gray-300 hover:bg-gray-600 dark:hover:bg-gray-600 dark:hover:text-gray-100  cursor-pointer">ADM</Button>
                        <Button className="rounded-full px-6 py-2 bg-gray-800 dark:bg-gray-300 hover:bg-gray-600 dark:hover:bg-gray-600 dark:hover:text-gray-100  cursor-pointer">µTorrent</Button>
                        <Button className="rounded-full px-6 py-2 bg-gray-800 dark:bg-gray-300 hover:bg-gray-600 dark:hover:bg-gray-600 dark:hover:text-gray-100  cursor-pointer">BitTorrent</Button>
                    </div>
                </div>

                {/* PC Section */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">PC User</h3>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Button className="rounded-full px-6 py-2 bg-gray-800 dark:bg-gray-300 hover:bg-gray-600 dark:hover:bg-gray-600 dark:hover:text-gray-100  cursor-pointer">FDM</Button>
                        <Button className="rounded-full px-6 py-2 bg-gray-800 dark:bg-gray-300 hover:bg-gray-600 dark:hover:bg-gray-600 dark:hover:text-gray-100  cursor-pointer">µTorrent</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DownloadGuide