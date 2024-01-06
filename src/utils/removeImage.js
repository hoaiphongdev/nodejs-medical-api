const cloudinary = require('cloudinary').v2

const removeImage = async (publidId) => {
  return await cloudinary.uploader.destroy(
    publidId,
    { invalidate: true, resource_type: 'image' },
    function (err, res) {
      if (err) {
        return res.status(400).json({
          ok: false,
          menssage: 'Error deleting file',
          errors: err
        })
      }
    }
  )
}

module.exports = removeImage
