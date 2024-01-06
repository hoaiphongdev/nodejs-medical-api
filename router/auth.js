const express = require('express')
const router = express.Router()
const User = require('../models/User')
const authorize = require('../middleware/authorize')

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = require('../config/index')
const { OAuth2Client } = require('google-auth-library')
const signJWT = require('../utils/signJWT')

const oAuthClient = new OAuth2Client(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET)

// @route    GET api/auth
// @desc     Get user by token
// @access   Private
router.get('/', authorize(), async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    if (user) return res.json(user)
    return res.status(400).json({ errors: 'Please try again' })
  } catch (err) {
    res.status(500).send('Server Error')
  }
})

// @route  POST api/auth/google
// @desc   SignIn/SignUp by Google
// @access Public
router.post('/google', async (req, res) => {
  try {
    const {
      body: { idToken }
    } = req

    await oAuthClient
      .verifyIdToken({ idToken, audience: GOOGLE_CLIENT_ID })
      .then(async (authRes) => {
        const {
          email,
          email_verified,
          name,
          given_name,
          family_name,
          picture
        } = authRes.getPayload()

        if (!email_verified)
          return res
            .status(401)
            .json({ errors: 'Google Login failed, please try again' })

        User.findOne({ email }).exec(async (err, user) => {
          if (user) {
            const token = await signJWT(user._id)
            return res.json({ token })
          }
          const newUser = new User({
            email,
            name,
            firstName: given_name,
            lastName: family_name,
            avatar: picture
          })

          await newUser.save()
          const token = await signJWT(newUser._id)
          return res.json({ token })
        })
      })
      .catch((err) => {
        return res
          .status(400)
          .json({ errors: 'Failed to authorize with this google account', err })
      })
  } catch (e) {
    res.status(401).send()
  }
})

module.exports = router
