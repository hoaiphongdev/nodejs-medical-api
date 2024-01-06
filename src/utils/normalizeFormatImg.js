const normalizeFormatImg = (url) => {
  if (url.includes('.jpg')) return '.jpg'
  if (url.includes('.png')) return '.png'
  if (url.includes('.jpeg')) return '.jpeg'
}

module.exports = normalizeFormatImg
