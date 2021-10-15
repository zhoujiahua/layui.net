const express = require("express");
const path = require("path");
const app = express();

//Set public folder
app.use(express.static(path.join(__dirname, "public")));
app.use('/mirror', express.static(path.join(__dirname, "mirror")));
app.use('/docs', express.static(path.join(__dirname, "docs")));

// Home page
app.get("/", (req, res) => {
    return res.redirect('/mirror/www.layui.net/index.htm')
});

const port = process.env.PORT || 7000;
app.listen(port, () => console.log(`http://localhost:${port}`));
