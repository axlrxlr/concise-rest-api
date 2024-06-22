const express = require('express');
const bodyParser = require('body-parser');
const { sequelize, User, Group, UserGroup, Task } = require('./models');

const app = express();
app.use(bodyParser.json());

// Method untuk Users

app.post('/users', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.put('/users/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            await user.update(req.body);
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


app.delete('/users/:id', async (req, res) => {
try {
    const user = await User.findByPk(req.params.id);
    if (user) {
        await user.destroy();
        res.json({ message: 'User deleted' });
    } else {
        res.status(404).json({ error: 'User not found' });
    }
} catch (err) {
    res.status(400).json({ error: err.message });
}
});

app.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, {
            include: [Group, Task]
        });
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.get('/users', async (req, res) => {
    try {
        const users = await User.findAll({
            include: [Group]
        });
        res.json(users);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Method untuk Groups

app.post('/groups', async (req, res) => {
    try {
        const group = await Group.create(req.body);
        res.status(201).json(group);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.put('/groups/:id', async (req, res) => {
    try {
        const group = await Group.findByPk(req.params.id);
        if (group) {
            await group.update(req.body);
            res.json(group);
        } else {
            res.status(404).json({ error: 'Group not found' });
        }
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
});

app.delete('/groups/:id', async (req, res) => {
    try {
        const group = await Group.findByPk(req.params.id);
        if (group) {
            await group.destroy();
            res.json({ message: 'Group deleted' });
        } else {
            res.status(404).json({ error: 'Group not found' });
        }
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
});

app.get('/groups/:id', async (req, res) => {
    try {
        const group = await Group.findByPk(req.params.id, {
            include: [User]
        });
        if (group) {
            res.json(group);
        } else {
            res.status(404).json({ error: 'Group not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.get('/groups', async (req, res) => {
    try {
        const groups = await Group.findAll({
            include: [User]
        });
        res.json(groups);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Menambahkan User ke Group

app.post('/groups/:groupId/users/:userId', async (req, res) => {
    try {
        const group = await Group.findByPk(req.params.groupId);
        const user = await User.findByPk(req.params.userId);
        if (group && user) {
            await group.addUser(user);
            res.json({ message: 'User added to group' });
        } else {
            res.status(404).json({ error: 'Group or User not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Method untuk Task
app.post('/tasks', async (req, res) => {
    try {
        const { name, deadline, userId } = req.body;
        const task = await Task.create({ name, deadline, userId });
        res.json(task);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});
  
// Update Task by ID
app.put('/tasks/:id', async (req, res) => {
    try {
        const { name, deadline, userId } = req.body;
        const task = await Task.findByPk(req.params.id);
        if (task) {
            await task.update({ name, deadline, userId });
            res.json(task);
        } else {
            res.status(404).json({ error: 'Task not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.delete('/tasks/:id', async (req, res) => {
    try {
            const task = await Task.findByPk(req.params.id);
            if (task) {
            await task.destroy();
            res.json({ message: 'Task deleted' });
        } else {
            res.status(404).json({ error: 'Task not found' });
        }
    } catch (err) {
            res.status(400).json({ error: err.message });
    }
});

// Get Task data by ID
app.get('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id, {
        include: User
        });
        if (task) {
            res.json(task);
        } else {
            res.status(404).json({ error: 'Task not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// List All Tasks
app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.findAll({
            include: User
        });
        res.json(tasks);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    sequelize.sync();
});