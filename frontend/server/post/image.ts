import baxios from '@/server/axios/baxios'
import { RESPONSE_TYPE } from '@/server/user'

interface ExtractImageResult extends RESPONSE_TYPE {
  data?: string
}

export const extractImage = async (formData: FormData): Promise<ExtractImageResult> => {
  try {
    const res = await baxios({
      method: 'post',
      url: '/posts/img-extract',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    if (res.status === 200) return { success: true, message: '이미지 추출 성공!', data: res.data.data }
    return { success: false, message: '이미지 추출 실패!' }
  } catch (e) {
    return { success: false, message: '이미지 추출 실패!' }
  }
}
