const express = require('express');
const {v4 : uuidv4} = require('uuid');

const app = express()
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server start on port ${PORT}`)
})