const amqp = require('amqplib');
const Todo = require('../service/todo');
var channel, connection;
connect();
async function connect() {
    console.log('connecting to rabbitmq');
    try {
    connection = await amqp.connect('amqp://localhost:5672');
    channel = await connection.createChannel();
    await channel.assertQueue('rabbit', { durable: true });
    channel.consume('rabbit', (msg) => {
        console.log(msg.content);
        const todo = JSON.parse(msg.content.toString());
        await Todo.create(todo);
        channel.ack(msg);
    });
    } catch (err) {
    throw err;
    }
}