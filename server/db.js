import {MongoClient} from 'mongodb';

const url ="";
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect()
  .then(() => console.log('CONNECTED TO DB'))
  .catch(error => {
    console.error(error);

    process.exit(1);
  });

export default connect;