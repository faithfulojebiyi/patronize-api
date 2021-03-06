import 'dotenv/config'

export default {
  DATABASE_URL: process.env.PATRONIZE_DATABASE_URL,
  FLUTTER_WAVE_SECRET_KEY: process.env.FLUTTER_WAVE_LIVE_SECRET,
  FLUTTER_WAVE_PUBLIC_KEY: process.env.FLUTTER_WAVE_LIVE_PUBLIC,
  FLUTTER_WAVE_ENCRYPTION_KEY: process.env.FLUTTER_WAVE_LIVE_ENCRYPTION
}
