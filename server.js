const express = require('express')
const serveStatic = require('serve-static')
const path = require('path')

const app = express()

//here we are configuring dist to serve app files
app.use('/', serveStatic(path.join(__dirname, '/dist')))

// this * route is to serve project on different page routes except root `/`
app.get(/.*/, function (req, res) {
	res.sendFile(path.join(__dirname, '/dist/index.html'))
})

const port = process.env.PORT || 8080

const fetchAuthConfig = () => fetch("/auth_config.json")
const configureClient = async () => {
	const response = await fetchAuthConfig();
	const config = await response.json();
  
	auth0 = await createAuth0Client({
	  domain: config.domain,
	  client_id: config.clientId
	});
}


app.listen(port)
console.log(`app is listening on port: ${port}`)