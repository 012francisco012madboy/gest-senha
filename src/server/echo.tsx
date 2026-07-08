import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

declare global {
  interface Window {
    Pusher: typeof Pusher
    Echo: Echo<'reverb'>
  }
}

window.Pusher = Pusher

const ApiEcho = new Echo<'reverb'>({
  broadcaster: "reverb",
  key: 'htuegypfsszgas6z6nhi',
  wsHost: '127.0.0.1',
  wsPort: 8080,
  forceTLS: false,
  // forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? 'https') === 'https',
  enabledTransports: ['ws'],
})

export default ApiEcho