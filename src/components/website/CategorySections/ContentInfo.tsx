import React from 'react'
export interface Content {
    title: string;
    genres: {
        id: number,
        title: string
    }[];
    release_date: number;
    rating: number;
    poster_image_url: string;
}

interface ContentProps {
    content: Content;
}

const ContentInfo: React.FC<ContentProps> = ({ content }) => {
  return (
    <div className='flex'>
        <div className="w-1/2">ContentInfo {content.title}</div>
        <div className="w-1/2">
            <h3 className=''>{content.title}</h3>
        </div>
    </div>
  )
}

export default ContentInfo