const cloudinary = require('cloudinary').v2
const { Readable } = require('stream')

const bufferUpload = async (buffer, path, tags, width, height) => {
  return new Promise(async (resolve, reject) => {
    const writeStream = cloudinary.uploader.upload_chunked_stream(
      {
        folder: path,
        tags,
        transformation: [{ height, width, crop: 'fill', quality: '90' }],
      },
      (err, result) => {
        if (err) {
          console.log(`Error in bufferUpload: ${err.message}`)
          reject(err)
          return
        }
        resolve(result)
      }
    )

    const readStream = new Readable({
      read() {
        this.push(buffer)
        this.push(null)
      },
    })
    readStream.pipe(writeStream)
  })
}

module.exports = bufferUpload
