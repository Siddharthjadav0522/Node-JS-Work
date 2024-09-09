const http = require('http')

    http.createServer((req,res)=>{
        res.write('<h1>siddharth Jadav</h1>')
        res.end()
    }).listen(7000);