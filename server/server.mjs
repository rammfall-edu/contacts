import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import fastifyMultipart from "@fastify/multipart";

const server = fastify({
    logger: true,
});
server.register(fastifyCors);
server.register(fastifyMultipart, {
    addToBody: true,
});
let users = [
    {
        name: 'Bohdan',
        phoneNumber: '123412341234',
        id: 1,
    }
];

server.get('/users', () => {
    return users;
});

server.post('/users', (request) => {
    console.log(request.body)
    const { name, phoneNumber } = request.body;

    users.push({
        name,
        phoneNumber,
        id: Math.random(),
    });

    return users;
});

server.delete('/users/:id', (request) => {
    const { id } = request.params;
    users = users.filter((user) => user.id.toString() !== id);

    return users;
});

server.put('/users/:id', (request) => {
    const { id } = request.params;
    const { name, phoneNumber } = request.body;
    const user = users.find((user) => user.id.toString() === id);

    user.phoneNumber = phoneNumber;
    user.name = name;

    return users;
})


server.listen({
    port: 8082,
    host: '0.0.0.0'
});
