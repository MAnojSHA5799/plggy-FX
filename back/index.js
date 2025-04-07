const express = require('express');
const cors = require('cors');
const quotesRoutes = require('./routes/quotes');

require('dotenv').config();

const app = express();
app.use(cors());
app.use('/api', quotesRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
