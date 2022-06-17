import amqp from 'amqplib';

const queue = 'rabbit-tes';
const connection = await amqp.connect('amqp://user:user@172.21.169.154:31002');

connection.createChannel().then((ch) => {
  const que = ch.assertQueue(queue);
  if (que) {
    que
      .then(() => {
        return ch.consume(
          queue,
          (msg) => console.log('+ Received', msg.content.toString()),
          { noAck: true },
        );
      })
      .then(() => {
        console.log('* Waiting for messages.');
      });
  }
});
