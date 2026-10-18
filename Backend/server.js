const app = require("./app");
const connectDB = require("./utils/db");
const port = process.env.PORT || 3002;
connectDB();
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});