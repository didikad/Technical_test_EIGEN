const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bookRoutes = require('./router/index');

app.use(express.json());

app.use('/api/books', bookRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
