export default {
  fetch: async (req, env) => {
    const { hostname } = new URL(req.url)
    const [tenant] = hostname.split('.')
    
    return new Response(`
      const body = await fetch('https://workers.cloudflare.com/cf.json').then(res => res.json())
      const beacon = await fetch(\`http://${tenant}.ılıl.to/api/beacon\`, { method: POST, body }).then(res => res.json())
      `, { headers: { 'content-type': 'application/js' }})
}
