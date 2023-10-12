const users = [
    {
        id: 1,
        name: 'Ann',
        email: 'ann@google.com',
        hobbies: ['books', 'sport', 'dancing'],
    },
    {
        id: 2,
        name: 'Ben',
        email: 'ben@google.com',
        hobbies: ['series', 'sport'],
    },
];

const addHateoasLinks = (user) => {
    const userId = user.id;
    user.links = {
        self: `/users/${userId}`,
        hobbies: `/users/${userId}/hobbies`,
    };
};

const getUsers = (req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    const usersWithLinks = users.map((user) => {
        addHateoasLinks(user);
        return user;
    });
    res.end(JSON.stringify(usersWithLinks));
};

const getUser = (req, res) => {
    const { userId } = req.params;
    const user = users.find((user) => user.id === parseInt(userId));

    if (!user) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'User not found' }));
        return;
    }

    // Add HATEOAS link to retrieve user hobbies
    const userWithLinks = { ...user };
    userWithLinks.links = [
        {
            rel: 'user-hobbies',
            href: `/users/${user.id}/hobbies`,
            method: 'GET',
        },
    ];

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(userWithLinks));
};

const createUser = (req, res) => {
    let requestBody = '';
    req.on('data', (data) => {
        requestBody += data;
    });

    req.on('end', () => {
        try {
            const newUser = JSON.parse(requestBody);

            // Assign a unique ID to the new user (you can use a more robust ID generation logic)
            newUser.id = users.length + 1;

            users.push(newUser);

            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'User created successfully', user: newUser }));
        } catch (error) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Invalid request body' }));
        }
    });
};

const updateUser = (req, res) => {
    const { userId } = req.params;
    const userIndex = users.findIndex((user) => user.id === parseInt(userId));

    if (userIndex === -1) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'User not found' }));
        return;
    }

    let requestBody = '';
    req.on('data', (data) => {
        requestBody += data;
    });

    req.on('end', () => {
        try {
            const updatedProperties = JSON.parse(requestBody);

            // Update user properties if provided in the request
            if (updatedProperties.name) {
                users[userIndex].name = updatedProperties.name;
            }

            if (updatedProperties.email) {
                users[userIndex].email = updatedProperties.email;
            }

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'User updated successfully', user: users[userIndex] }));
        } catch (error) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Invalid request body' }));
        }
    });
};

const deleteUser = (req, res) => {
    const { userId } = req.params;
    const userIndex = users.findIndex((user) => user.id === parseInt(userId));

    if (userIndex === -1) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'User not found' }));
        return;
    }

    users.splice(userIndex, 1);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'User deleted successfully' }));
};

module.exports = { getUsers, getUser, createUser, updateUser, deleteUser };
