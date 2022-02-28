export const isBrowser = typeof window !== 'undefined'

export const share = (imgUrl: string) => {
  if (!isBrowser) return
  if (!document.queryCommandSupported('copy')) {
    return alert('복사하기가 지원되지 않는 브라우저입니다.')
  }

  const textarea = document.createElement('textarea')
  textarea.value = imgUrl
  textarea.style.top = '0'
  textarea.style.left = '0'
  textarea.style.position = 'fixed'
  document.body.appendChild(textarea)
  textarea.focus()
  textarea.select()
  document.execCommand('copy')
  document.body.removeChild(textarea)
  alert('클립보드에 복사되었습니다.')
}

export const download = (imgUrl: string, text = 'image') => {
  if (!isBrowser) return
  fetch(imgUrl, {
    method: 'GET',
  })
    .then((response) => {
      response.arrayBuffer().then(function (buffer) {
        const url = window.URL.createObjectURL(new Blob([buffer]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', `${text?.slice(0, 10) ?? 'image'}.png`) //or any other extension
        document.body.appendChild(link)
        link.click()
      })
    })
    .catch((err) => {
      console.log(err)
    })
}

export const dataURItoBlob = (dataURI: string): Blob => {
  // convert base64/URLEncoded data component to raw binary data held in a string
  let byteString
  if (dataURI.split(',')[0].indexOf('base64') >= 0) byteString = atob(dataURI.split(',')[1])
  else byteString = unescape(dataURI.split(',')[1])
  // 마임타입 추출
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
  // write the bytes of the string to a typed array
  const ia = new Uint8Array(byteString.length)
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }
  return new Blob([ia], { type: mimeString })
}
