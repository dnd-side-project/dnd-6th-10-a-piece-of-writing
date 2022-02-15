import baxios from '@/server/axios/baxios'

export const extractImage = async (formData: FormData) => {
  console.log({ formDataGet: formData.get('file') })
  try {
    const res = await baxios({
      method: 'post',
      url: '/posts/img-extract',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    console.log({ res })
  } catch (e) {}
}
