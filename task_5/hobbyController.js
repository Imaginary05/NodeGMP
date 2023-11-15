const addHobby = (req, res) => {
    const { userId } = req.params;
    const { hobby } = req.body;

    const user = users.find((user) => user.id === parseInt(userId));

    if (!user) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'User not found' }));
        return;
    }

    // Add the hobby to the user's list of hobbies
    user.hobbies.push(hobby);

    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Hobby added successfully' }));
};

const deleteHobby = (req, res) => {
    const { userId } = req.params;
    const { hobby } = req.body;

    const user = users.find((user) => user.id === parseInt(userId));

    if (!user) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'User not found' }));
        return;
    }

    // Remove the hobby from the user's list of hobbies
    const hobbyIndex = user.hobbies.indexOf(hobby);
    if (hobbyIndex !== -1) {
        user.hobbies.splice(hobbyIndex, 1);
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Hobby deleted successfully' }));
};

const getUserHobbies = (req, res) => {
    const { userId } = req.params;
    const user = users.find((user) => user.id === parseInt(userId));

    if (!user) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'User not found' }));
        return;
    }

    // Assume hobbies are relatively static and can be cached for an hour
    res.setHeader('Cache-Control', 'max-age=3600');
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(user.hobbies));
};

module.exports = { addHobby, deleteHobby, getUserHobbies };
