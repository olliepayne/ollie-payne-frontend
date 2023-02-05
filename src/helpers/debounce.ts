const debounce = (callback: any, delay: number) => {
  let handler: any

  return (...args: any) => {
    if (handler) clearTimeout(handler)
    handler = setTimeout(() => {
      callback(...args)
    }, delay)
  }
}

export default debounce
