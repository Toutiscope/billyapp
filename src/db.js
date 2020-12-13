import MongoClient from "mongodb";

console.log("hello");

const uri =
  "mongodb+srv://admin_vio:mR6YFNU4vnGIWj1p@clusterqb-0.7n3ux.mongodb.net/<dbname>?retryWrites=true&w=majority";

async function connectdb() {
  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB cluster
    await client.connect();
    console.log("Connected to MongoDB");

    // Make the appropriate DB calls
    await listDatabases(client);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

connectdb().catch(console.error);

async function listDatabases(client) {
  let databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
}

// exports.uri = uri;
