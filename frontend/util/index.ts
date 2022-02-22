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
