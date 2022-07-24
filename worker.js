export default {
  fetch: async (req, env) => {
    const { hostname } = new URL(req.url)
    const [tenant] = hostname.split('.')
    const { tlsClientAuth, tlsVersion, ...cf} = req.cf
    
    const meta = {
      id: req.headers.get('cf-ray') + '-' + req.cf.colo,
      headers: [...req.headers],
      ...cf
    }
    
    return new Response(`
<script>
  // Initialize the agent at application startup.
  // You can also use https://openfpcdn.io/fingerprintjs/v3/esm.min.js
  const fpPromise = import('https://openfpcdn.io/fingerprintjs/v3')
    .then(FingerprintJS => FingerprintJS.load())

  // Get the visitor identifier when you need it.
  fpPromise
    .then(fp => fp.get())
    .then(result => console.log(result.visitorId))
    
  const body = ${JSON.stringify(meta)}
  fetch('https://workers.cloudflare.com/cf.json')
    .then(res => res.json())
    .then(body => fetch('https://workers.cloudflare.com/cf.json', { method: POST, body }))
    .then(fetch('http://${tenant}.ılıl.to/api/beacon/${id}', { method: POST, body })
    `, { headers: { 'content-type': 'application/js' }})
    
</script>
`
  }
}
