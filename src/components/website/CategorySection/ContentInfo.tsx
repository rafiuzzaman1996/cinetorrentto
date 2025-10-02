'use client';
import React from 'react';
import Image from 'next/image';
import {Download} from 'lucide-react';
import {Content} from '@/types/website/Content';
import { TrailerDialog } from './TrailerDialog';
import { StreamDialog } from './StreamDialog';

export default function ContentInfo({content}: {content: Content}) {

    return (
        <>
            {/* Row 1: 2 columns */}
            <div className="max-w-4xl grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="rounded-lg p-2">
                    <div className="details-poster-wrapper rounded-lg shadow-lg overflow-hidden">
                        <Image src={content.poster_image_url} alt={content.title} width={400} height={500} className="object-cover object-center transition-transform" />
                    </div>
                    <div className="hidden md:block mt-4 space-y-2 text-sm movie-details-info">
                        <p>
                            <strong className="text-orange-500">Director:</strong> {content.director || 'N/A'}
                        </p>
                        <p>
                            <strong className="text-orange-500">Running Time:</strong> {content.running_time || 'N/A'}
                        </p>
                        <p>
                            <strong className="text-orange-500">Budget:</strong> {content.budget || 'N/A'}
                        </p>
                        <p>
                            <strong className="text-orange-500">Cast:</strong> {content.cast || 'N/A'}
                        </p>
                    </div>
                </div>
                <div className="col-span-2 rounded-lg p-4">
                    <div className="md:w-3/3">
                        <div className="flex justify-between items-start">
                            <h2 className="text-3xl text-orange-500 font-bold mb-2">
                                {content.title} <span className="text-2xl font-normal text-gray-400">({new Date(content.release_date).getFullYear()})</span>
                            </h2>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {(content?.genres ?? []).map((genre, i) => (
                                <span key={i} className="bg-neutral-700 text-gray-300 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">
                                    {genre.title}
                                </span>
                            ))}
                        </div>
                        <div className="flex items-center gap-4 mb-4 text-gray-400">
                            <span>
                                Rating: <span className="font-bold text-lg text-orange-500">★ {content?.rating?.toFixed(1)}</span> / 10
                            </span>
                            <p>Release: {new Date(content.release_date).toLocaleDateString()}</p>
                        </div>
                        <h3 className="text-lg text-orange-500 font-semibold mb-2">Overview</h3>
                        <p className="leading-relaxed text-sm mb-2">{content.description}</p>
                        <div className="block md:hidden mt-4 space-y-2 text-sm movie-details-info">
                            <p>
                                <strong>Director:</strong> {content.director || 'N/A'}
                            </p>
                            <p>
                                <strong>Running Time:</strong> {content.running_time || 'N/A'}
                            </p>
                            <p>
                                <strong>Budget:</strong> {content.budget || 'N/A'}
                            </p>
                            <p>
                                <strong>Cast:</strong> {content.cast || 'N/A'}
                            </p>
                        </div>

                        <div className="flex gap-2">
                            {content.stream_url && (
                                <StreamDialog streamUrl={content.stream_url} />
                            )}
                            {content.trailer_url && (
                                    <TrailerDialog trailerUrl={content.trailer_url} />
                            )}
                        </div>

                        <div className="mt-6">
                            <h3 className="text-lg font-semibold mb-2 text-orange-500">Download Options</h3>
                            <div className="grid grid-cols-2 gap-2">
                                {(content.downloadLinks ?? []).map((link, i) => (
                                    <button
                                        key={i}
                                        // open download links in new tab
                                        onClick={() => window.open(link.url, '_blank')}
                                        className="flex items-center bg-gray-500 text-white font-semibold px-3 py-2 rounded-lg hover:bg-orange-500 text-sm truncate cursor-pointer"
                                    >
                                        <Download className="h-3 w-3 me-2" />
                                        {link.name} {link.size ? `(${link.size})` : ''}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mt-6">
                            <h3 className="text-lg font-semibold mb-3 details-label">Share this Movie</h3>
                            <div className="flex gap-2" id="mobile-share-buttons">
                                <button
                                    // onclick="shareMovie('facebook', '${content.title}', ${content.id})"
                                    className="bg-blue-600 text-white p-2 rounded-full cursor-pointer"
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.14 9.5 5.32v2.14H6v4h3.5v10h4V11.46h3.77l.72-4z" />
                                    </svg>
                                </button>
                                <button
                                    // onclick="shareMovie('twitter', '${content.title}', ${content.id})"
                                    className="bg-black text-white p-2 rounded-full cursor-pointer"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.602.75Zm-2.25 13.05h1.694L5.405 2.165H3.555z" />
                                    </svg>
                                </button>
                                <button
                                    // onclick="shareMovie('whatsapp', '${content.title}', ${content.id})"
                                    className="bg-green-500 text-white p-2 rounded-full cursor-pointer"
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M16.75 13.96c.25.5.12 1.04-.12 1.41a1.98 1.98 0 0 1-1.52.85c-.34 0-.68-.06-1.02-.18c-1.44-.55-2.83-1.48-4-2.65c-1.17-1.17-2.1-2.56-2.65-4c-.12-.34-.18-.68-.18-1.02c0-.58.29-1.12.85-1.52c.37-.24.91-.37 1.41-.12c.5.25.83.71.96 1.25c.13.54.06 1.11-.2 1.61l-.48.96c-.13.25-.06.56.18.8l1.79 1.79c.24.24.55.31.8.18l.96-.48c.5-.26 1.07-.33 1.61-.2c.54.13 1 .46 1.25.96zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.85 0 3.59-.55 5.07-1.49L22 22l-1.49-4.93A9.95 9.95 0 0 0 22 12C22 6.48 17.52 2 12 2z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Row 2: 1 column */}
            {/* <div className="mt-4 rounded-lg border p-4">Full-width Content (Row 2)</div> */}
        </>
    );
}
