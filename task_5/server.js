const http = require('http');
const url = require('url');
const { getUser, getUsers, createUser, updateUser, deleteUser } = require('./userController');
const { addHobby, deleteHobby, getUserHobbies } = require('./hobbyController');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const { pathname } = parsedUrl;

    if (req.method === 'GET' && pathname === '/users') {
        getUsers(req, res);
    } else if (req.method === 'GET' && pathname.startsWith('/users/')) {
        getUser(req, res);
    } else if (req.method === 'POST' && pathname === '/users') {
        createUser(req, res);
    } else if (req.method === 'PUT' && pathname.startsWith('/users/')) {
        updateUser(req, res);
    } else if (req.method === 'DELETE' && pathname.startsWith('/users/')) {
        deleteUser(req, res);
    } else if (req.method === 'POST' && pathname.startsWith('/hobbies/')) {
        addHobby(req, res);
    } else if (req.method === 'DELETE' && pathname.startsWith('/hobbies/')) {
        deleteHobby(req, res);
    } else if (req.method === 'GET' && pathname.startsWith('/users/')) {
        getUserHobbies(req, res);
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Not Found' }));
    }
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
