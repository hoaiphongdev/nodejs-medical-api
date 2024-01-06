const appExpress = require('./src/app')

const PORT = process.env.PORT || 5000

appExpress.listen(PORT, () => {
  console.log(`🟡 Server started on http://localhost:${PORT} 🔥🔥🔥`)
})