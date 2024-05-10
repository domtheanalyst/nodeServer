const http = require('node:http');
const os = require('node:os');

function delayResponse() {
    return new Promise((resolve)=>{
        const delay = Math.floor(Math.random()*5000);
        setTimeout(resolve(`response after ${delay} miliseconds`), delay);
    });
}

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if(req.method === 'GET' && req.url === '/info') {
        const cpuInfo = os.cpus();
        const osInfo = {
            platform: os.platform(),
            release: os.release(),
            freememory: os.freemem(),
        }

        delayResponse().then( (response) => {
            res.writeHead(200, { 'Content-Type': 'application/json'});
            res.end(
                JSON.stringify(
                    {   cpu: cpuInfo[0], 
                        os: osInfo,
                        message: response
                    })
            );
        }

        )
    } else {

        res.writeHead(404, {'Content-Type':'text/plain'});
        res.end("404! Not Found!")
    }

})


const PORT = 3000;

server.listen(PORT, ()=>{
    console.log(`Server listening on port ${PORT}.`);
})