"use client";

import Link from "next/link";


export default function SocialInfo() {
    const socials = [
        {
            name: "Facebook",
            url: "https://facebook.com",
            color: "#1877F2",
            svg: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                >
                    <path
                        fill="#1877F2"
                        d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0
            18.1 4.388 23.092 10.125 24v-8.437H7.078v-3.49h3.047V9.356c0-3.007
            1.793-4.668 4.533-4.668 1.312 0 2.686.235 2.686.235v2.953h-1.513c-1.492
            0-1.953.93-1.953 1.887v2.25h3.328l-.532 3.49h-2.796V24C19.612
            23.092 24 18.1 24 12.073z"
                    />
                </svg>
            ),
        },
        {
            name: "YouTube",
            url: "https://youtube.com",
            svg: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                >
                    <path
                        fill="#FF0000"
                        d="M23.498 6.186a2.974 2.974 0 0
            0-2.096-2.103C19.505 3.5 12 3.5 12
            3.5s-7.505 0-9.402.583A2.974 2.974
            0 0 0 .502 6.186C0 8.09 0 12 0
            12s0 3.91.502 5.814a2.974 2.974
            0 0 0 2.096 2.103C4.495 20.5 12
            20.5 12 20.5s7.505 0 9.402-.583a2.974
            2.974 0 0 0 2.096-2.103C24 15.91
            24 12 24 12s0-3.91-.502-5.814zM9.75
            15.568V8.432L15.818 12 9.75 15.568z"
                    />
                </svg>
            ),
        },
        {
            name: "WhatsApp",
            url: "https://wa.me/",
            svg: (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#25D366">
                    <path d="M16.75 13.96c.25.5.12 1.04-.12 1.41a1.98 1.98 0 0 1-1.52.85c-.34 0-.68-.06-1.02-.18c-1.44-.55-2.83-1.48-4-2.65c-1.17-1.17-2.1-2.56-2.65-4c-.12-.34-.18-.68-.18-1.02c0-.58.29-1.12.85-1.52c.37-.24.91-.37 1.41-.12c.5.25.83.71.96 1.25c.13.54.06 1.11-.2 1.61l-.48.96c-.13.25-.06.56.18.8l1.79 1.79c.24.24.55.31.8.18l.96-.48c.5-.26 1.07-.33 1.61-.2c.54.13 1 .46 1.25.96zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.85 0 3.59-.55 5.07-1.49L22 22l-1.49-4.93A9.95 9.95 0 0 0 22 12C22 6.48 17.52 2 12 2z" />
                </svg>
            ),
        },
        {
            name: "Telegram",
            url: "https://t.me/",
            svg: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                >
                    <path
                        fill="#0088CC"
                        d="M9.999 15.173 9.986
            19c.004.211.144.264.305.16l2.77-2.553
            4.861 3.57c.177.098.302.046.346-.164l3.381-15.787c.061-.275-.09-.382-.331-.274L2.424
            9.711c-.267.108-.264.257-.047.326l4.935
            1.54 11.471-7.227c.136-.083.262-.037.159.053z"
                    />
                </svg>
            ),
        },
        {
            name: "TikTok",
            url: "https://tiktok.com",
            svg: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                >
                    <path
                        fill="#000000"
                        d="M12.525 0h3.04c.165
            1.45.972 2.72 2.164 3.53
            1.02.686 2.27.95 3.474.86v3.14a6.63
            6.63 0 0 1-3.48-.94c-.46-.28-.87-.63-1.23-1.03v7.1c0
            3.63-2.97 6.6-6.6
            6.6s-6.6-2.97-6.6-6.6 2.97-6.6
            6.6-6.6c.21 0 .42.01.63.04v3.2a3.49
            3.49 0 0 0-.63-.06c-1.88
            0-3.41 1.53-3.41 3.41s1.53
            3.41 3.41 3.41 3.41-1.53
            3.41-3.41V0z"
                    />
                </svg>
            ),
        },
    ];

    return (
        <div className="fixed right-0 z-50 bg-gray-100/55 backdrop-blur supports-[backdrop-filter]:bg-gray-900/80 p-1 rounded-bl-md rounded-tl-md top-1/2 -translate-y-1/2 flex flex-col items-center space-y-4">
            {socials.map((social, index) => (
                <Link
                    key={index}
                    href={social.url}
                    target="_blank"
                    className="hover:opacity-80 transition"
                >
                    {social.svg}
                </Link>
            ))}
        </div>
    );
}
