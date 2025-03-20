const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const uri = "mongodb+srv://aaravkv13:aaravkv13@studing-cluster.ddfz2.mongodb.net/Todo?retryWrites=true&w=majority&appName=studing-cluster";
const app = express();
const PORT = 5000;
const Task = require('./models/Task');

app.use(express.json());
app.use(cors()); 

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error(err));

app.get('/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.post('/tasks', async (req, res) => {
    console.log(req.body) 
    const { _id, name, important, lastModifiedDate, syncStatus } = req.body;
    const taskVal = { _id, name, important, lastModifiedDate, syncStatus};
    const task = new Task({...taskVal, syncStatus: 'synced'});
    await task.save();
    res.json(task);
});

app.delete('/tasks', async (req, res) => {
    try {
        const { checkedTaskIds } = req.body; // Expect an array of IDs
        console.log(checkedTaskIds);
        await Task.deleteMany({ _id: { $in: checkedTaskIds } });
        res.json({ success: true, message: "Tasks deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting tasks" });
    }
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
 