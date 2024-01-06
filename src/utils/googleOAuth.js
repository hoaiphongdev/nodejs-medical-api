const { OAuth2Client } = require('google-auth-library')

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = require('../config')

const client = new OAuth2Client(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  'postmessage'
)

exports.getProfileInfo = async (code) => {
  const r = await client.getToken(code)
  const idToken = r.tokens.id_token

  const ticket = await client.verifyIdToken({
    idToken,
    audience: GOOGLE_CLIENT_ID,
  })

  const payload = ticket.getPayload()

  return payload
}
