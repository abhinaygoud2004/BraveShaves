const amqp = require("amqplib");

let channel;

async function connectRabbitMQ() {
    const connection = await amqp.connect("amqp://rabbitmq:5672");
    channel=await connection.createChannel();
    await channel.assertExchange("brave.events","topic",{
        durable:true
    });;
    console.log("RabbitMQ connected");
}

function getChannel(){
    if(!channel){
        throw new Error("RabbitMQ not yet initialized");
    }
    return channel;
}

module.exports={
    connectRabbitMQ,
    getChannel
}