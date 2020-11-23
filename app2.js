const express = require('express');
const bodyparser= require('body-parser');
const app = express();

app.use(express.static('public'))
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())
app.set('views', 'ejs');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.listen(3000, ()=>{
    console.log('3000번 포트에 대기중!')
})


app.get('/main', function(req, res) {
    res.render('main.html')
})

app.post('/email_reciver', function(req, res){

    res.render('main.html',{'email': req.body.email})
})