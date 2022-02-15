import { atom } from 'jotai'

type ImageInfo = {
  url: string
  blob?: Blob
}

export const backgroundImagesAtom = atom((get) => [...get(addedImagesAtom), ...get(previewImagesAtom)])
export const addedImagesAtom = atom<ImageInfo[]>([])
export const previewImagesAtom = atom<ImageInfo[]>([
  { url: 'https://fakeimg.pl/100x100/' },
  { url: 'https://fakeimg.pl/100x100/' },
  { url: 'https://fakeimg.pl/100x100/' },
])
export const selectedBackgroundImageIndexAtom = atom<number>(0)
export const selectedBackgroundImageAtom = atom<ImageInfo>(
  (get) => get(backgroundImagesAtom)[get(selectedBackgroundImageIndexAtom)] ?? { url: 'https://fakeimg.pl/100x100/' },
)

export const isUploadModalOpenAtom = atom<boolean>(false)
