const express = require('express')
const app = express()
const port = 3000
const {db}=require('./config/db.config');
app.use(express.json());

const userConroller=require('./routes/user.routes');
const photoConroller=require('./routes/photo.routes');
app.use('/users',userConroller);
app.use('/photos',photoConroller);
db();

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))