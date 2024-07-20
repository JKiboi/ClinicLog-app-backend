const Log = require('../models/Log');

exports.createLog = async (req, res) => {
  const { date, patientId, description, procedures, notes } = req.body;

  try {
    const newLog = new Log({
      user: req.user.id,
      date,
      patientId,
      description,
      procedures,
      notes  // Ensure notes is included here
    });

    const log = await newLog.save();
    res.json(log);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getLogs = async (req, res) => {
  //console.log('Fetching logs for user:', req.user.id);
  try {
    const logs = await Log.find({ user: req.user.id });
    //console.log('Logs found:', logs);
    res.json(logs);
  } catch (err) {
    console.error('Error fetching logs:', err.message); // Log the error message
    res.status(500).send('Server error');
  }
};

exports.getLogById = async (req, res) => {
  try {
    const log = await Log.findById(req.params.id);

    if (!log) {
      return res.status(404).json({ msg: 'Log not found' });
    }

    res.json(log);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.updateLog = async (req, res) => {
  const { date, patientId, description, procedures, notes } = req.body;

  try {
    let log = await Log.findById(req.params.id);

    if (!log) {
      return res.status(404).json({ msg: 'Log not found' });
    }

    log.date = date || log.date;
    log.patientId = patientId || log.patientId;
    log.description = description || log.description;
    log.procedures = procedures || log.procedures;
    log.notes = notes || log.notes;  // Ensure notes is updated here

    await log.save();
    res.json(log);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.deleteLog = async (req, res) => {
  try {
    const log = await Log.findById(req.params.id);

    if (!log) {
      return res.status(404).json({ msg: 'Log not found' });
    }

    await log.remove();
    res.json({ msg: 'Log removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get activity feed
exports.getActivityFeed = async (req, res) => {
  //console.log('Fetching activity feed');
  try {
    const activityFeed = await Log.find().sort({ dateCreated: -1 }).limit(10);
    //console.log('Activity Feed:', activityFeed);
    res.json(activityFeed);
  } catch (error) {
    console.error('Error fetching activity feed:', error);
    res.status(500).json({ message: 'Error fetching activity feed', error });
  }
};


// Get log statistics
exports.getStatistics = async (req, res) => {
  try {
    const logs = await Log.aggregate([
      { $unwind: "$procedures" },
      { $group: { _id: "$procedures", count: { $sum: 1 } } }
    ]);

    res.json(logs);
  } catch (error) {
    console.error('Error fetching log statistics:', error);
    res.status(500).json({ message: 'Error fetching log statistics', error });
  }
};

