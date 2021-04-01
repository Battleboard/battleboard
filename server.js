const express = require('express');
const mongoose = require('mongoose');
const { v4 } = require('uuid');
const path = require('path');
const WebSocket = require("ws");
const { createServer } = require("http");
require('dotenv').config();

const users = require('./routes/api/Users')
const auth = require('./routes/api/Auth')

const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());

const server = createServer(app);
server.listen(port, () => console.log(`Server started and listening on port ${port}`));

const clients = {};
const games = {};

const db = process.env.mongoURI;

//connect to mongoose database
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .then(() => console.log('Connected to mongoose database'))
    .catch(error => console.log(error));

//routes
app.use('/api/auth', auth);
app.use('/api/users', users);

//Serve static assets if in production
if(process.env.NODE_ENV === 'production'){
    //set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });

}

const webSocketServer = new WebSocket.Server({ server });
webSocketServer.on("connection", (webSocket, request) => {

    //was previously sending the id prefaced with: /?id= and accesing it from url with 'request.resourceURL.query.id' using websocket
    {/* on initial connection parse out the client id (and send back the id to the client) < probably not neccessary to send back*/}
    clientId = request.url.substring(1);
    clients[clientId] = {
        "connection": webSocket
    }
    const payload = {
        "method":"connect",
        "clientId": clientId
    }
    webSocket.send(JSON.stringify(payload));

    {/* when the client sends a message*/}
    webSocket.on("message", message => {
        const result = JSON.parse(message);

        {/* create a game room */}
        if(result.method === 'create'){
            const clientId = result.clientId;
            const gameId = v4();
            games[gameId] = {
                "id": gameId,
                "clients": []
            };
            const payLoad = {
                "method": "create",
                "game": games[gameId]
            }
            const con = clients[clientId].connection;
            con.send(JSON.stringify(payLoad))
        }

        {/* join a game room*/}
        if(result.method === "join"){
            const clientId = result.clientId;
            const gameId = result.gameId;
            const game = games[gameId];
            const spells = result.spells;
            const health = result.health;
            game.clients.push({
                "clientId": clientId,
                "spells": spells,
                "selectedSpell": null,
                "health": health
            })
            const payLoad = {
                "method":"join",
                "game": game
            }
            game.clients.forEach(c => {
                clients[c.clientId].connection.send(JSON.stringify(payLoad))
            })
        }

        {/* evaluate the outcome of each players spell*/}
        if(result.method === 'evaluate'){

            let clientId = result.clientId;
            let gameId = result.gameId;
            let spell = result.spell;

            //find the current player in the game clients
            let game = games[gameId]
            let index = -1;
            for(let i=0; i<game.clients.length; i++){
                if(game.clients[i].clientId == clientId){
                    index = i;
                }
            }

            //set the selected spell of the current player
            game.clients[index].selectedSpell = spell;

            if(game.clients.length == 2){

                //if both players have submitted spells evaluate the damage done
                if((game.clients[0].selectedSpell !== null) && (game.clients[1].selectedSpell !== null)){

                    console.log("Evaluate damage");

                    let p0Damage = game.clients[0].selectedSpell.damage;
                    let p1Damage = game.clients[1].selectedSpell.damage;

                    let p0Heal = game.clients[0].selectedSpell.heal;
                    let p1Heal = game.clients[1].selectedSpell.heal;

                    let p0Health = game.clients[0].health - p1Damage;
                    let p1Health = game.clients[1].health - p0Damage;

                    console.log("p0 damage: ", p0Damage);
                    console.log("p1 damage: ", p1Damage);
                    console.log("p0 heal: ", p0Heal);
                    console.log("p1 heal: ", p1Heal);
                    console.log("p0health: ", p0Health);
                    console.log("p1health: ", p1Health);

                    //update the game object to send back as a payload to the front end
                    game.clients[0].health = p0Health;
                    game.clients[1].health = p1Health;

                    game.clients[0].selectedSpell = null;
                    game.clients[1].selectedSpell = null;

                    //construct the payload to send back to both clients
                    const payLoad = {
                        "method":"evaluate",
                        "game": game
                    }
                    console.log("Payload (evaluate): ", payLoad);
                    game.clients.forEach(c => {
                        clients[c.clientId].connection.send(JSON.stringify(payLoad))
                    })
                }
            }
        }


    })

});