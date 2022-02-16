import { atom } from 'jotai'

type ImageInfo = {
  url: string
  blob?: Blob
}
export const postTextAtom = atom('흰 봉투에 눈을 한 줌 옇고\n' + '글씨도 쓰지 말고\n' + '우표도 부치지 말고')

export const backgroundImagesAtom = atom((get) => [...get(addedImagesAtom), ...get(previewImagesAtom)])
export const addedImagesAtom = atom<ImageInfo[]>([])
export const previewImagesAtom = atom<ImageInfo[]>([
  { url: 'https://picsum.photos/id/10/400/400' },
  { url: 'https://picsum.photos/id/1022/400/400' },
  { url: 'https://picsum.photos/id/1002/400/400' },
  { url: 'https://picsum.photos/id/1019/400/400' },
])
export const selectedBackgroundImageIndexAtom = atom<number>(0)
export const selectedBackgroundImageAtom = atom<ImageInfo>(
  (get) => get(backgroundImagesAtom)[get(selectedBackgroundImageIndexAtom)] ?? { url: 'https://fakeimg.pl/100x100/' },
)

export const isUploadModalOpenAtom = atom<boolean>(false)
export const isRecognitionModalOpenAtom = atom<boolean>(false)
