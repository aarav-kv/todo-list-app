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
  console.log("fetching data")
  res.json(tasks);
});

app.post('/tasks', async (req, res) => {
    console.log("Inserting task....")
    const { _id, name, important, lastModifiedDate, syncStatus } = req.body;
    const taskVal = { _id, name, important, lastModifiedDate, syncStatus};
    const task = new Task({...taskVal, syncStatus: 'synced'});
    await task.save();
    res.json(task);
});

app.delete('/tasks', async (req, res) => {
    try {
        const { checkedTaskIds } = req.body; // Expect an array of IDs
        console.log("Deleting task....")
        await Task.deleteMany({ _id: { $in: checkedTaskIds } });
        res.json({ success: true, message: "Tasks deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting tasks" });
    }
});

app.put('/task', async (req,res)=>{
    console.log("updating task details..")
    const taskData = req.body.data;
    const { _id, taskName, edited } = taskData;
    try {
        const updatedTask = await Task.updateOne({ _id:_id }, { name : taskName },   { new: true }  );
        console.log(updatedTask)
        res.json({ success: updatedTask.acknowledged });
        
    console.log("updating task completed..")
    } catch (error) {
       res.status(500).json({ success: false });
        console.error("Error updating task:", error);
    }
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
 