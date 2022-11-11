import {MongoClient, ObjectId} from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

console.log(process.env.MONGODB_PWD)
const url =`mongodb+srv://admin:${process.env.MONGODB_PWD}@players.fm5gatu.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect()
  .then(() => console.log('CONNECTED TO DB'))
  .catch(error => {
    console.error(error);

    process.exit(1);
  });

  const players = client.db().collection('players');

  const getPlayers = () => {
    return players.find().toArray();
  }
  
  const addPlayer = async (newPlayer) => {
    await players.insertOne(newPlayer);
  }
  
  const updatePlayer = (id, playerName) => {
    players.updateOne({_id: ObjectId(id)}, {$set: { username: playerName } });
    return players.findOne({_id: ObjectId(id)});
  }
  
  const deletePlayer = (id) => {
    players.deleteOne({_id: ObjectId(id)})
  } 
  
  export {getPlayers, addPlayer, updatePlayer, deletePlayer};