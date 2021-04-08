const express = require('express');
const mongoose = require('mongoose');
const { v4 } = require('uuid');
const path = require('path');
const WebSocket = require("ws");
const { createServer } = require("http");
require('dotenv').config();

const users = require('./routes/api/Users');
const auth = require('./routes/api/Auth');
const rooms = require('./routes/api/Rooms'); 

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
app.use('/api/rooms', function (req, res, next) {
    req.rooms = {games};
    next();
}, rooms);

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


    /*
    //socket disconnection
    webSocket.on('close', function close() {
        console.log('disconnected');
      });
    */

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
            const host = result.username;

            const gameId = v4();
            games[gameId] = {
                "id": gameId,
                "clients": [],
                "host": host
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

            const game = games[result.gameId];

            game.clients.push({
                "clientId": result.clientId,
                "spells": result.spells,
                "selectedSpell": null,
                "health": result.health,
                "maxHealth":result.maxHealth,
                "debuffs": [],
                "buffs":[],
                "previousSpell": null,
                "gameId": result.gameId,
                "username": result.username,
                "damageResult":0,
                "shieldResult":0,
                "shield": result.shield,
                "maxShield": result.maxShield
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
            
            //find the current player in the game clients
            let game = games[result.gameId]
            let index = -1;
            for(let i=0; i<game.clients.length; i++){
                if(game.clients[i].clientId === clientId){
                    index = i;
                }
            }

            //set the selected spell of the current player
            game.clients[index].selectedSpell = result.spell;

            if(game.clients.length === 2){

                //if both players have submitted spells evaluate the damage done
                if((game.clients[0].selectedSpell !== null) && (game.clients[1].selectedSpell !== null)){

                    //get the damage and heal values from the players spells
                    let player1 = {
                        health: game.clients[0].health,
                        damage: game.clients[0].selectedSpell.damage,
                        heal: game.clients[0].selectedSpell.heal,
                        shield: game.clients[0].shield,
                        maxHealth: game.clients[0].maxHealth,
                        maxShield: game.clients[0].maxShield,
                        debuffs: game.clients[0].debuffs,
                        buffs: game.clients[0].buffs,
                        selectedSpell: game.clients[0].selectedSpell,
                    }

                    let player2 = {
                        health: game.clients[1].health,
                        damage: game.clients[1].selectedSpell.damage,
                        heal: game.clients[1].selectedSpell.heal,
                        shield: game.clients[1].shield,
                        maxHealth: game.clients[1].maxHealth,
                        maxShield: game.clients[1].maxShield,
                        debuffs: game.clients[1].debuffs,
                        buffs: game.clients[1].buffs,
                        selectedSpell: game.clients[1].selectedSpell,
                    }

                    {/*Combat Sequence*/}
                    //players deal damage

                    //check if the players spell has critical

                    if(player1.selectedSpell.criticalDamageChance !== 0){
                        player1 = setCriticalDamage(player1);
                    }

                    if(player2.selectedSpell.criticalDamageChance !== 0){
                        player2 = setCriticalDamage(player2);
                    }

                    if(player1.selectedSpell.criticalHealChance !== 0){
                        player1 = setCriticalHeal(player1);
                    }

                    if(player2.selectedSpell.criticalHealChance !== 0){
                        player2 = setCriticalHeal(player2);
                    }

                    if(player1.selectedSpell.criticalShieldChance !==0){
                        player1 = setCriticalShield(player1);
                    }

                    if(player2.selectedSpell.criticalShieldChance !==0){
                        player2 = setCriticalShield(player2);
                    }

                    //check if each player has damage over time attached to them
                    player1 = getDebuffs(player1, player2);
                    player2 = getDebuffs(player2, player1);

                    player1 = getBuffs(player1, player2);
                    player2 = getBuffs(player2, player1);

                    //if a players spell contains damage over time add it to the opponents debuff list
                    player1 = setDebuffs(player1, player2);
                    player2 = setDebuffs(player2, player1);

                    player1 = setBuffs(player1, player2);
                    player2 = setBuffs(player2, player1);

                    player1.shield += player1.selectedSpell.shield;
                    player2.shield += player2.selectedSpell.shield;

                    player1 = setShield(player1, player2)
                    player2 = setShield(player2, player1)

                    game.clients[0].damageResult = game.clients[0].health - player1.health;
                    game.clients[1].damageResult = game.clients[1].health - player2.health;

                    game.clients[0].shieldResult = game.clients[0].shield - player1.shield;
                    game.clients[1].shieldResult = game.clients[1].shield- player2.shield;

                    //update the game object to send back as a payload to the front end
                    game.clients[0].health = player1.health;
                    game.clients[1].health = player2.health;

                    game.clients[0].shield = player1.shield;
                    game.clients[1].shield = player2.shield;

                    //set the players previous spell before setting the selected spell to null
                    game.clients[0].previousSpell = game.clients[0].selectedSpell;
                    game.clients[1].previousSpell = game.clients[1].selectedSpell;                    

                    game.clients[0].selectedSpell = null;
                    game.clients[1].selectedSpell = null;

                    game.clients[0].debuffs = player1.debuffs;
                    game.clients[1].debuffs = player2.debuffs;

                    //construct the payload to send back to both clients
                    const payLoad = {
                        "method":"evaluate",
                        "game": game
                    }

                    game.clients.forEach(c => {
                        clients[c.clientId].connection.send(JSON.stringify(payLoad))
                    })
                    
                }
            }
        }
    })

});

//generate a random number from 0 - 99
let max = 101;
let min = 0;

const setCriticalShield = (player) => {

    let random = Math.floor(Math.random() * (max - min) + min);
    //if the random number is less than the critical chance
    if(random < player.selectedSpell.criticalShieldChance){
        //add the critical damage to the players damage
        player.shield +=  player.selectedSpell.criticalShieldIncrease;
    }
    return player
}

const setCriticalHeal = (player) => {
    let random = Math.floor(Math.random() * (max - min) + min);
    //if the random number is less than the critical chance
    if(random < player.selectedSpell.criticalHealChance){
        //add the critical damage to the players damage
        player.heal +=  player.selectedSpell.criticalHealIncrease;
    }
    return player
}

const setCriticalDamage = (player) => {
    let random = Math.floor(Math.random() * (max - min) + min);
    //if the random number is less than the critical chance
    if(random < player.selectedSpell.criticalDamageChance){
        //add the critical damage to the players damage
        player.damage +=  player.selectedSpell.criticalDamageIncrease;
    }
    return player
}

//takes a player and opponent and returns a player with modified shield and health
const setShield = (player, opponent) => {
    //if the player has a shield PLAYER 1
    if(player.shield > 0){

        //check if the damage would come through the shield
        let difference = player.shield - opponent.damage;

        //if the difference is - add difference to health and set shield to 0
        if(difference < 0){

            player.shield = 0;
            player.health += difference;
            p0CappedHealReduction = cappedHealReduction(player.health, player.heal, player.maxHealth);
            player.health += player.heal + p0CappedHealReduction;

            
        //if the difference is + subtract damage from shield
        }else{
            player.shield = player.shield - opponent.damage;
            p0CappedHealReduction = cappedHealReduction(player.health, player.heal, player.maxHealth);
            player.health += player.heal + p0CappedHealReduction;                          


        }

    //if the player does not have a shield
    }else{

        player.health -= opponent.damage;
        p0CappedHealReduction = cappedHealReduction(player.health, player.heal, player.maxHealth);
        player.health += player.heal + p0CappedHealReduction;

    }

    return player;
}

//takes a players health and a maximum health and returns the amount to heal
const cappedHealReduction = (currentHealth, heal, maxHealth) => {
    let reduceHeal = 0;
    //check if the amount to heal would increase the health above its maxmimum 
    if(currentHealth + heal > maxHealth){
        //reduce the heal amount by the amount it would be over
        reduceHeal = maxHealth - (currentHealth + heal)
        return reduceHeal;
    }else{
        return reduceHeal;
    }
}


const getBuffs = (player, opponent) => {

    if(player.buffs.length > 0){

        let buffsToDelete = [];

        for(let i=0; i < player.buffs.length; i++){

            let type = player.buffs[i].type;
            
            if(type === 'heal'){
                player.heal += player.buffs[i].heal;
                //decrement the debuff duration / remove the debuff from the list
                if(player.buffs[i].duration == 1){
                    //remove the debuff
                    buffsToDelete.push(i);
                }else{
                    //decrement the debuff
                    player.buffs[i].duration -= 1;
                }
            }

            if(type === 'shield'){
                player.shield += player.buffs[i].shield;
                //decrement the debuff duration / remove the debuff from the list
                if(player.buffs[i].duration == 1){
                    //remove the debuff
                    buffsToDelete.push(i);
                }else{
                    //decrement the debuff
                    player.buffs[i].duration -= 1;
                }
            }


        }

        //sort the list of buffs to remove in descending order
        buffsToDelete.sort((a, b) => b - a)

        //delete all the debuffs that are going to zero
        for(let j=buffsToDelete.length - 1; j>=0; j--){
            player.buffs.splice(buffsToDelete[j],1);
        }
        
    }
    
    return player

}

const getDebuffs = (player, opponent) => {
    if(player.debuffs.length > 0){

        let debuffsToDelete = [];

        for(let i=0; i < player.debuffs.length; i++){

            let type = player.debuffs[i].type;
            
            if(type === 'damage'){
                opponent.damage += player.debuffs[i].damage;
                //decrement the debuff duration / remove the debuff from the list
                if(player.debuffs[i].duration == 1){
                    //remove the debuff
                    debuffsToDelete.push(i);
                }else{
                    //decrement the debuff
                    player.debuffs[i].duration -= 1;
                }
            }

        }
        //sort the list of buffs to remove in descending order
        debuffsToDelete.sort((a, b) => b - a)

        //delete all the debuffs that are going to zero
        for(let j=debuffsToDelete.length - 1; j>=0; j--){
            player.debuffs.splice(debuffsToDelete[j],1);
        }
    }
    
    return player
}

const setDebuffs = (player, opponent) => {
    if(player.selectedSpell.damageOverTime !== 0){
        opponent.debuffs.push({
            name: player.selectedSpell.name, 
            icon: player.selectedSpell.source,
            damage: player.selectedSpell.damageOverTime, 
            duration: player.selectedSpell.damageOverTimeDuration,
            type: "damage"
        })
    }
    return player
}

const setBuffs = (player, opponent) => {

    if(player.selectedSpell.healOverTime !== 0){
        player.buffs.push({
            name: player.selectedSpell.name, 
            icon: player.selectedSpell.source,
            heal: player.selectedSpell.healOverTime, 
            duration: player.selectedSpell.healOverTimeDuration,
            type: "heal"
        })       
    }

    if(player.selectedSpell.shieldOverTime !== 0){
        player.buffs.push({
            name: player.selectedSpell.name, 
            icon: player.selectedSpell.source,
            shield: player.selectedSpell.shieldOverTime, 
            duration: player.selectedSpell.shieldOverTimeDuration,
            type: "shield"
        })       
    }

    return player
}