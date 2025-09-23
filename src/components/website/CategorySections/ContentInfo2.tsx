'use server'
import React from 'react'
import Image from 'next/image'
import { CirclePlay } from 'lucide-react'
import { getContentBySlug } from '@/app/(website)/website-api/contentApi'
import { Content } from '@/types/website/Content'


const movie2 = {
  title: 'Valiant One',
  year: 2025,
  rating: 5.1,
  release: '2025-01-30T18:00:00.000Z',
  genres: [
    {
      id: 1,
      title: 'War',
    },
    {
      id: 1,
      title: 'Action'
    },
    {
      id: 1,
      title: 'Thriller'
    },
  ],
  overview:
    'A U.S. Army helicopter crashes in North Korean territory, forcing Captain Edward Brockman (Chase Stokes) and a team of tech specialists to navigate hostile terrain and escort a critical civilian across the Demilitarized Zone to safety.',
  runtime: 86,
  budget: '$1.2 million',
  director: 'Steve Barnett',
  cast: [
    'Chase Stokes',
    'Lana Condor',
    'Desmin Borges',
    'Callan Mulvey',
    'Jonathan Whitesell',
    'Daniel Jun',
  ],
  stream_url: 'https://example.com',
  trailer_url: 'https://example.com',
  poster:
    'https://lh3.googleusercontent.com/d/1TW5iNTEaOSU1c-bf2Zol9pZoDn5vDJ9x=w500', // replace with your poster
  download_links: [
    { name: '1080p.WEBRip', size: '1.3 GB' },
    { name: '2160p.WEB-DL', size: '9.6 GB' },
    { name: '1080p.WEB-DL', size: '5.1 GB' },
  ],
}

export default async function ContentInfo({slug}: {slug: string}) {
  const movie: Content = await getContentBySlug(slug)
  console.log('🩸🩸 ~ movie:', movie);

  return (
    <>
      {/* Row 1: 2 columns */}
      <div className="max-w-4xl grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-lg p-2">
          <div className="details-poster-wrapper rounded-lg shadow-lg overflow-hidden">
            <Image
              src={movie.poster_image_url}
              alt={movie.title}
              width={400}
              height={500}
              className="object-cover object-center transition-transform"
            />
          </div>
          <div className="hidden md:block mt-4 space-y-2 text-sm movie-details-info">
            <p><strong className='text-orange-500'>Director:</strong> {movie.director || 'N/A'}</p>
            <p><strong className='text-orange-500'>Running Time:</strong> {movie.running_time || 'N/A'}</p>
            <p><strong className='text-orange-500'>Budget:</strong> {movie.budget || 'N/A'}</p>
            <p><strong className='text-orange-500'>Cast:</strong> {movie.cast || 'N/A'}</p>
          </div>
        </div>
        <div className="col-span-2 rounded-lg p-4">
          <div className="md:w-3/3">
            <div className="flex justify-between items-start">
              <h2 className="text-3xl text-orange-500 font-bold mb-2">{movie.title} <span className="text-2xl font-normal text-gray-400">({new Date(movie.release_date).getFullYear()})</span></h2>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {(movie?.genres ?? []).map((genre, i) =>(
                <span key={i}  className="bg-neutral-700 text-gray-300 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">
                  {genre.title}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-4 mb-4 text-gray-400">
              <span>Rating: <span className="font-bold text-lg text-orange-500">★ {movie.rating.toFixed(1)}</span> / 10</span>
              <p>Release: {new Date(movie.release_date).toLocaleDateString()}</p>
            </div>
            <h3 className="text-lg text-orange-500 font-semibold mb-2">Overview</h3>
            <p className="leading-relaxed text-sm mb-2">{movie.description}</p>
            <div className="block md:hidden mt-4 space-y-2 text-sm movie-details-info">
              <p><strong>Director:</strong> {movie.director || 'N/A'}</p>
              <p><strong>Running Time:</strong> {movie.running_time || 'N/A'}</p>
              <p><strong>Budget:</strong> {movie.budget || 'N/A'}</p>
              <p><strong>Cast:</strong> {movie.cast || 'N/A'}</p>
            </div>

            <div className="flex gap-2">
              {movie.stream_url &&
                <>
                  <button
                    // onclick="playStream('${movie.stream_url}')"
                    className="flex bg-green-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-green-700">
                    <CirclePlay className='h-5 w-5 me-2' />
                    Stream Now
                  </button>
                </>
              }
              {movie.trailer_url &&
                <button
                  // onclick="playTrailer('${movie.trailer_url}')"
                  className="flex bg-white/10 text-white font-semibold px-4 py-2 rounded-lg hover:bg-white/20">
                  <CirclePlay className='h-5 w-5 me-2' />
                  Watch Trailer
                </button>
              }
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2 text-orange-500">Download Options</h3>
              <div className="grid grid-cols-2 gap-2">
                {(movie.downloadLinks ?? []).map((link, i) =>
                  <button
                    key={i}
                    // onclick="openDownloadLinks(event, ${movie.id}, '${link.name}', '${link.url || '#'}')"
                    className="bg-gray-500 text-white font-semibold px-3 py-2 rounded-lg hover:bg-orange-500 text-sm truncate">
                    {link.name} {link.size ? `(${link.size})` : ''}
                  </button>
                )}
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3 details-label">Share this Movie</h3>
              <div className="flex gap-2" id="mobile-share-buttons">

                <button
                  // onclick="shareMovie('facebook', '${movie.title}', ${movie.id})"
                  className="bg-blue-600 text-white p-2 rounded-full">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.14 9.5 5.32v2.14H6v4h3.5v10h4V11.46h3.77l.72-4z" /></svg>
                </button>
                <button
                  // onclick="shareMovie('twitter', '${movie.title}', ${movie.id})"
                  className="bg-black text-white p-2 rounded-full"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 16 16"><path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.602.75Zm-2.25 13.05h1.694L5.405 2.165H3.555z" /></svg>
                </button>
                <button
                  // onclick="shareMovie('whatsapp', '${movie.title}', ${movie.id})"
                  className="bg-green-500 text-white p-2 rounded-full"><svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M16.75 13.96c.25.5.12 1.04-.12 1.41a1.98 1.98 0 0 1-1.52.85c-.34 0-.68-.06-1.02-.18c-1.44-.55-2.83-1.48-4-2.65c-1.17-1.17-2.1-2.56-2.65-4c-.12-.34-.18-.68-.18-1.02c0-.58.29-1.12.85-1.52c.37-.24.91-.37 1.41-.12c.5.25.83.71.96 1.25c.13.54.06 1.11-.2 1.61l-.48.96c-.13.25-.06.56.18.8l1.79 1.79c.24.24.55.31.8.18l.96-.48c.5-.26 1.07-.33 1.61-.2c.54.13 1 .46 1.25.96zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.85 0 3.59-.55 5.07-1.49L22 22l-1.49-4.93A9.95 9.95 0 0 0 22 12C22 6.48 17.52 2 12 2z" /></svg>
                </button>
              </div>

            </div>

          </div>
        </div>
      </div>

      {/* Row 2: 1 column */}
      {/* <div className="mt-4 rounded-lg border p-4">Full-width Content (Row 2)</div> */}
    </>

  )
}
