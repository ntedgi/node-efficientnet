const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const port = process.env.PORT || 3000;
const app = express();
const router = express.Router();

const upload = multer({
    limits: {
        fileSize: 4 * 1024 * 1024,
    }
});

router.get('/', async function (req, res) {
    await res.render('index');
});

router.post('/upload', upload.single('image'), async function (req, res) {


// use model here 

});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.listen(port, function () {
    console.log('Server is running on PORT',port);
});
