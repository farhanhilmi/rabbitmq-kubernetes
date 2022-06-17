import express from 'express';
import amqp from 'amqplib';

const app = express();
const queue = 'rabbit-tes';

let channel, connection;

async function connect() {
  try {
    connection = await amqp.connect('amqp://user:user@172.21.169.154:31002');
    channel = await connection.createChannel();

    await channel.assertQueue(queue);
  } catch (error) {
    console.log(error);
  }
}

app.post('/publish/', async (req, res, next) => {
  channel.sendToQueue(
    queue,
    Buffer.from(
      JSON.stringify({
        say: `helllooo ${Math.floor(Math.random() * 1000)}`,
        date: new Date(),
      }),
    ),
  );
  res.status(200).json({ status: 'Message published' });
});

try {
  app.listen(8000, () => {
    connect();
    console.log(`Server running on port 8000`);
  });
} catch (error) {
  console.log(error);
}
