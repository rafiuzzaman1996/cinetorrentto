import React from 'react'

export default function Back() {
    return (
        <div>
            <button
                onClick={() => window.history.back()}
                className="text-orange-500 hover:text-orange-600"
            >
                &larr; Back
            </button>
        </div>
    )
}
