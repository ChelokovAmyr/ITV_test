import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const mockData = {
  user: { id: 123, name: 'John Doe', city: 'London' },
  weatherMoscow: { city: 'Moscow', temperature: 15, description: 'Cloudy' },
  weatherLondon: { city: 'London', temperature: 18, description: 'Sunny' },
  stocks: [
    { symbol: 'AAPL', price: 150.25, change: 1.5 },
    { symbol: 'GOOG', price: 2750.75, change: -10.2 },
  ],
  dashboard: [
    { id: 1, component: 'UserProfile', settings: { userId: 123 } },
    { id: 2, component: 'Weather', settings: { defaultCity: 'Moscow' } },
    { id: 3, component: 'StockTicker', settings: { symbols: ['AAPL', 'GOOG'] } }
  ]
};

app.get('/api/users/:id', (req, res) => {
  setTimeout(() => {
    res.json(mockData.user);
  }, 500);
});

app.get('/api/weather', (req, res) => {
  const city = req.query.city;
  setTimeout(() => {
    if (city === 'Moscow') {
      res.json(mockData.weatherMoscow);
    } else if (city === 'London') {
      res.json(mockData.weatherLondon);
    } else {
      res.status(404).json({ error: 'Город не найден' });
    }
  }, 800);
});

app.get('/api/stocks', (req, res) => {
  setTimeout(() => {
    res.json(mockData.stocks);
  }, 600);
});

app.get('/api/dashboard', (req, res) => {
  setTimeout(() => {
    res.json(mockData.dashboard);
  }, 300);
});

app.listen(PORT, () => {
  console.log(`Mock API сервер запущен на http://localhost:${PORT}`);
});

