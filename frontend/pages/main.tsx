import React from 'react'

const FAKE_IMAGE_URLS = [
  'https://fakeimg.pl/250x100/',
  'https://fakeimg.pl/300x400/',
  'https://fakeimg.pl/400x300/',
  'https://fakeimg.pl/250x250/',
  'https://fakeimg.pl/100x250/',
  'https://fakeimg.pl/100x200/',
  'https://fakeimg.pl/100x100/',
]

export default function main() {
  return (
    <div className="masonry before:box-inherit after:box-inherit">
      {FAKE_IMAGE_URLS.map((src, index) => (
        <div className="break-inside p-8 my-6 w-50 bg-gray-100 rounded-lg" key={`${src}_${index}`}>
          <img className="w-full" src={src} />
        </div>
      ))}
    </div>
  )
}
