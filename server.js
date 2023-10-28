const express =  require('express');
const cors = require('cors');
const PORT = 3000;

const {paymentRouter} = require('./src/routes/payment.routes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/api",paymentRouter)

app.listen(PORT,()=>{
    console.log('Server running');
    console.log(`Press CRTL + click ==>   http://localhost:${PORT}`);
})