import app from './app';

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App server is listening on http://localhost:${port}`);
});
