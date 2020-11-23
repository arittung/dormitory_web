var express = require('express');
var fs = require('fs');

// 세션용 모듈


var session = require('express-session');


var bodyParser = require('body-parser');


var app = express();


app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:false}))



// 세션모듈의 설정


app.use(session({


    secret: 'a98yhfi&o2u3bn0(rfuw-gvjoiah3@0945u23r#',


    resave: false,


    saveUninitialized: true


}));



app.get('/count', function(req, res){


    if(req.session.count){


        req.session.count++;    


    }


    else{


        req.session.count = 1;


    }


    res.send('count : ' + req.session.count);


});



// 사용자 페이지, 세션값 유무에 따라서 다른 메세지를 표시


app.get('/welcome', function(req, res){

    
    if(req.session.displayName){


        res.send(`


            <h2>Hello, ${req.session.displayName} </h2>


            <a href="/auth/logout">logout</a>


        `);


    } else {


        res.send(`


            <h2>Please login..</h2>


            <a href="/auth/login">login</a>


        `);


    }


});



// 로그인 폼 페이지


app.get('/login', function(req, res){

    res.writeHead(200,{"Content-Type":"text/html"});
    fs.createReadStream("./index.html").pipe(res);



    /*var output = `


    <h1>Login</h1>


    <form action="/auth/login" method="post" >


        <p>


            <input type="text" name="username" placeholder="username" />


        </p>


        <p>


            <input type="password" name="password" placeholder="password" />


        </p>


            <input type="submit" />


    </form>


    `;


    res.send(output);*/


});



// 로그아웃 처리 - 세션 삭제 후 리다이렉트

app.get('/introduction-facilities',function(req,res){
    fs.readFile('introduction-facilities.html',function(error,data){
        res.writeHead(200, {'Content-Type':'text/html'});
        res.end(data);
    })
});
app.get('/index',function(req,res){
    fs.readFile('index.html',function(error,data){
        res.writeHead(200, {'Content-Type':'text/html'});
        res.end(data);
    })
});

app.get('/community',function(req,res){
    fs.readFile('community.html',function(error,data){
        res.writeHead(200, {'Content-Type':'text/html'});
        res.end(data);
    })
});
app.get('/index_login',function(req,res){
    fs.readFile('index_login.ejs',function(error,data){
        res.writeHead(200, {'Conten-Type':'text/html'});
        res.end(data);
        
    })
    
    //res.render('index', { title: 'The index page!' });
});
app.get('student-sleepout',function(req,res){
    fs.readFile('student-sleepout.html',function(error,data){
        res.writeHead(200, {'Content-Type':'text/html'});
        res.end(data);
    })
});


app.get('/indexcss',function(req,res){
    fs.readFile('index.css',function(error,data){
        res.writeHead(200, {'Content-Type':'text/css'});
        res.end(data);
    })
});

app.get('/style',function(req,res){
    fs.readFile('style.css',function(error,data){
        res.writeHead(200, {'Content-Type':'text/css'});
        res.end(data);
    })
});

app.get('/imgs/dorm-main',function(req,res){
    fs.readFile('dorm_main.png',function(error,data){
        res.writeHead(200, {'Content-Type':'text/html'});
        res.end(data);
    })
});
app.get('/auth/logout', function(req, res){


    delete req.session.displayName;


    res.redirect('/welcome');


});



// 로그인 처리 - 아이디와 패스워드 비교해서 일치하면 세션에 값을 부여하고 리다이렉트


app.post('/index', function(req, res){


    var user = {


        username:'kangseungsu',


        password:'1234',


        displayName:'kss'


    };



    var uname = req.body.user_id;


    var pwd = req.body.user_pw;


    


    if(uname === user.username && pwd === user.password){


        

        res.redirect('/community')


    } else { 
        res.redirect('/introduction-facilities');

        /*res.writeHead(200,{"Content-Type":"text/html"});
        fs.createReadStream("/index_login").pipe(res);*/
        //res.send('Who are you? <a href="index.html">login</a>');


    }



    res.send(uname);


});



app.listen(3003, function(){


    console.log('Connected 3003 port!!!');


});
