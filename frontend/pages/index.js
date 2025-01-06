import { useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [accuracy, setAccuracy] = useState(null);
  const [responseTime, setResponseTime] = useState(null);
  const [history, setHistory] = useState([]);

  const handleSubmit = async () => {
    try {
      const res = await axios.post('/api/evaluate', { prompt });
      const { response, accuracy, responseTime } = res.data;
      setResponse(response);
      setAccuracy(accuracy);
      setResponseTime(responseTime);
      
      // Save history for charting
      setHistory([...history, { accuracy, responseTime }]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const chartData = {
    labels: history.map((_, index) => `Request ${index + 1}`),
    datasets: [
      {
        label: 'Accuracy',
        data: history.map((item) => item.accuracy),
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
      },
      {
        label: 'Response Time (seconds)',
        data: history.map((item) => item.responseTime),
        borderColor: 'rgba(153, 102, 255, 1)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div>
      <h1>LLM Evaluation Dashboard</h1>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your prompt"
      />
      <button onClick={handleSubmit}>Evaluate</button>

      <h3>Response:</h3>
      <pre>{response}</pre>
      <p>Accuracy: {accuracy}</p>
      <p>Response Time: {responseTime}s</p>

      <h3>Metrics History</h3>
      <Line data={chartData} />
    </div>
  );
}
