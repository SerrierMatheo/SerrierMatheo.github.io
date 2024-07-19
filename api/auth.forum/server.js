import app from "./index.js";

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server ready at https://localhost:${process.env.PORT}`);
});