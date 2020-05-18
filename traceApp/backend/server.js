//I make a shitty server without any fucking node modules. happy??? I AM!!!
var http = require('http'),
fileSystem = require('fs'),
    path = require('path');

var id = 104;
let items = [//here is the "database"
    {name:'thing 1',quantity:3,numUpdates:1,id:101},
    {name:'thing 2',quantity:4,numUpdates:1,id:102},
    {name:'thing 3',quantity:5,numUpdates:1,id:103},
]

//create a server object:
function server(){
    let server = this;
    server.server = http.createServer(listener)
    this.start = function(port, callback){
        port = port || 3000;
        callback = callback || function(){console.log('server started on port '+port)}
        server.server.listen(port,callback)
    }

    function listener(req,res){
        if(req.url.startsWith('/api')) return api(req,res);
        let file = req.url == "/" ? "trace.html" : req.url
        var filePath = path.join(__dirname+"/../frontend", file);
        var stat = fileSystem.statSync(filePath);

        let fileType = file.split('.')[1];

        res.writeHead(200, {
            'Content-Type': 'text/'+fileType,
            'Content-Length': stat.size
        });

        var readStream = fileSystem.createReadStream(filePath);
        // We replaced all the event handlers with a simple call to readStream.pipe()
        readStream.pipe(res);
    }

    function api(req,res){
        setTimeout(()=>{
            var command = req.url.split('/api/')[1]
            if(command == 'getall'){
                res.write(JSON.stringify(items));
                res.end();
            }
            if(command == 'delete'){
                var body = "";
                req.on('data', function (chunk) {
                    body += chunk;
                });
                req.on('end', function () {
                    var id = body;
                    items = items.filter(x=>x.id != id)
                    res.writeHead(200);
                    res.end();
                });
            }
            if(command == 'update'){
                var body = "";
                req.on('data', function (chunk) {
                    body += chunk;
                });
                req.on('end', function () {
                    var updatedItem = JSON.parse(body);
                    var index = items.findIndex(x=>x.id == updatedItem.id)
                    items[index] = updatedItem;
                    items[index].numUpdates++;
                    res.write(JSON.stringify(items[index]));
                    res.end();
                });
            }
            if(command == 'add'){
                var newItem = {name:'new thing',quantity:0,id:id++,numUpdates:1}
                items.push(newItem);
                res.write(JSON.stringify(newItem));
                res.end();
            }
        },500)
    }
}
exports.server = new server()
