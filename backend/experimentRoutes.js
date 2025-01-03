const express = require('express');
const router = express.Router();
const { Experiment, TestCase, ExperimentResult } = require('../models');

// Create a new experiment
router.post('/experiments', async (req, res) => {
  try {
    const { prompt, modelName, provider } = req.body;
    const newExperiment = await Experiment.create({ prompt, modelName, provider });
    res.status(201).json(newExperiment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create experiment' });
  }
});

// Get all experiments
router.get('/experiments', async (req, res) => {
  try {
    const experiments = await Experiment.findAll();
    res.json(experiments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch experiments' });
  }
});

// Create a new test case
router.post('/testcases', async (req, res) => {
  try {
    const { experimentId, userMessage, expectedOutput, grader } = req.body;
    const newTestCase = await TestCase.create({ experimentId, userMessage, expectedOutput, grader });
    res.status(201).json(newTestCase);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create test case' });
  }
});

// Get all test cases
router.get('/testcases', async (req, res) => {
  try {
    const testCases = await TestCase.findAll();
    res.json(testCases);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch test cases' });
  }
});

// Run an experiment (using LLM API like OpenAI"
router.post('/runExperiment', async (req, res) => {
  try {
    const { experimentId, testCaseId } = req.body;
    const experiment = await Experiment.findByPk(experimentId);
    const testCase = await TestCase.findByPk(testCaseId);

    if (!experiment || !testCase) {
      return res.status(404).json({ error: 'Experiment or TestCase not found' });
    }

    // Simulate running the experiment (you can integrate the LLM call here)
    const result = await runLLM(experiment, testCase);  // You'll need to define runLLM

    const experimentResult = await ExperimentResult.create({
      experimentId,
      testCaseId,
      result: result,  // Assuming result has been calculated in runLLM
    });

    res.json(experimentResult);
  } catch (error) {
    res.status(500).json({ error: 'Failed to run experiment' });
  }
});

module.exports = router;
