const EventEmitter = require('events');
const eventEmitter = new EventEmitter();
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const crypto = require('crypto');
const path = require('path');
const WebSocketServer = require('websocket').server;
require('dotenv').config(); 
const { decrypt } = require('./utils/helpers');
const { readFile } = require('./utils/filesys');
const { DBUSER,DBPASS } = process.env;
const app = express();

app.set('view engine', 'ejs');
const server=app.listen(3000, ()=>{console.log("server is listining on port 3000")});
const io=require('socket.io')(server)

var dbName = "syook",arr=[];
var client =  new MongoClient(`mongodb+srv://${DBUSER}:${DBPASS}@cluster0-pg0ue.mongodb.net/${dbName}?retryWrites=true&w=majority`,{useNewUrlParser:true,useUnifiedTopology:true});

var connection;
client.connect((err, con)=>{

        if(!err)
        {
            connection = con;
            console.log("database connected successfully");
        }
        else{
            console.log("database could not connect");
        }
})

const wsServer = new WebSocketServer({
    httpServer: server
});

wsServer.on('request', function(request) {
    const connection = request.accept(null, request.origin);
    connection.on('message', function(message) {
      console.log('Received Data:', message.utf8Data);

    });
    connection.on('close', function(reasonCode, description) {
        console.log('Client has disconnected.');
    });
});

function renderingFile(req,res){
    res.render(path.join(__dirname+'/view/index'))

}

app.get('/',renderingFile);



let interval = setInterval(async function() {
    let result = await readFile("data.json");
    eventEmitter.emit('encrypedData',result);
}, 10000 );

eventEmitter.on('encrypedData', async (data) => {

    let splitString = data && data.split("|");

    if(splitString){

        for (const [i,iterator] of splitString.entries()) {

            let decrypedData = await decrypt(iterator)

            let obj= JSON.parse(decrypedData);

            const { name,origin,destination,secret_key } = obj;
            let hashobj={ name,origin,destination };

            var hash_Signature=crypto.createHash('md5').update((JSON.stringify(hashobj))).digest('hex');

            if(secret_key == hash_Signature){
                hashobj["timestamp"] = new Date();
                arr.push(hashobj)
            }
            
        }
        console.log(arr.length)
        wsServer.broadcastUTF(JSON.stringify(arr))
    }
});
// listen to the event

setInterval(() => {
    let stream ={
        stream:arr
    }
    var collection=connection.db(dbName).collection('person');

    collection.insert(stream,(err,result)=>{

        if(!err){
                console.log("data successfully inserted")
        }else{
                console.log("error occured")
        }
    })
    arr=[];

}, 60000);




