var express = require('express');
var fs = require('fs');
var session = require('express-session');
var bodyParser = require('body-parser');
var app = express();
session.login_check=0;
session.login_name="";

// index.html
var main_a=`
    <!DOCTYPE html>
    <html>
        <head>
            <title>Dormitory</title>
            <script>
            </script>
            <meta charset="utf-8">
            <link rel="stylesheet" href="/style"></link>
            <link rel="stylesheet" href="/indexcss"></link>
        </head>
        
        <body>
            <!-- Header -->
            <a href="/index.html"><img src="/logo.png" class="main" href="/index.html"></a>
            <table class="logotable">
                <tr>
                    <th class="table_set"><a href="/introduction-facilities">기숙사 소개</a></th>
                    <th class="table_set"><a href="/community">커뮤니티</a></th>
                    <th class="table_set"><a href="/student-sleepout">학생 생활</a></th>
                    <th class="table_set"><a href="/mypage-myinformation">마이페이지</a></th>
                </tr>
            </table>
            <!-- /Header --> 
            <!-- Body -->
            <div class="row">
            `

var login=`
                <!-- Login Form -->
                <div class="login">
                    <form name="loginForm" id="loginForm" action="/index" method="post">
                        <h2>
                            <span class="hidden">LOGIN</span>
                        </h2>
                        <div class="entry_line">
                            <ul class="entry_box">
                                <li>
                                    <input class="i_text" id="userid" type="text" name="user_id">
                                </li>
                                <li>
                                    <input class="i_text" id="userpassword" type="password" name="user_pw">
                                </li>
                            </ul>

                            <div class="login_button">
                                <!-- <input type="image" src="" alt="로그인"> -->
                                <button input_type="submit" class="login_btn" /*onclick="userlogin()"*/>로그인</button>
                            </div>
                        </div>
                    
                        <ul class="login_opt">
                            <hr>
                            <li>
                                <a href="findid.html">아이디 / 비밀번호 찾기</a>
                            </li>
                        </ul>
                    </form>
                </div>
                `

var login_2_1=`
            <div class="login">
            <form name="loginForm" id="loginForm" action="/index" method="post">
                <h3>
                    <span class="hidden"><br>&nbsp&nbsp&nbsp`
var login_2_2=`</span> 님 환영합니다. <br><br><br>
                </h3>
                <div class="entry_line">
                </div>

                <ul class="login_opt">
                    <hr>
                    <li>
                        <a href="mypage-myinformation.html">마이페이지 / </a>
                        <a href="main.html">로그아웃</a>
                    </li>
                </ul>
            </form>
            </div>
            `

var main_b=`
                <div class="main_image">
                    <img src="/imgs/dorm-main" alt="Main_Image" class="dormitory_img">
                </div>
            </div>

            <div class="row">
                <!-- Notice Form-->
                <div class="notice">
                    <div class="notice_header">
                        <h2>
                            <span class="hidden">공지사항</span> 
                        </h2>
                        <button class="more_notice" onclick="location.href='community.html';">+ 더보기</button>
                    </div>

                    <div class="notice_contents">
                        <ul>
                            <li>
                                <a href="" class="notice_lists">공지사항 5</a><hr> <!-- 해당 공지 link -->
                            </li>
                            <li>
                                <a href="" class="notice_lists">공지사항 4</a><hr>
                            </li>
                            <li>
                                <a href="" class="notice_lists">공지사항 3</a><hr>
                            </li>
                            <li>
                                <a href="" class="notice_lists">공지사항 2</a><hr>
                            </li>
                            <li>
                                <a href="" class="notice_lists">공지사항 1</a><hr>
                            </li>
                        </ul>
                    </div>
                </div>
                

                <!-- Daily Menu -->
                <div class="menu">
                    <h2>
                        <span class="hidden">오늘의 식단</span>
                    </h2>
                    <table class="menu_table" border="1">
                        <tr>
                            <td class="time">아침</td>
                            <td class="menu_contents"></td>
                        </tr>
                        <tr>
                            <td class="time">점심</td>
                            <td class="menu_contents"></td>
                        </tr>
                        <tr>
                            <td class="time">저녁</td>
                            <td class="menu_contents"></td>
                        </tr>
                    </table>
                </div>
                
            </div>
            <!-- /Body -->

            <!-- Footer -->
            <footer class="footer">
                <div class="land_copyright">
                    <p>&copy; SMART SYSTEM SOFTWARE 2020 WEB PROGRAMING TEAM 1</p>
                </div>
            </footer>
            <!-- /Footer -->
        </body>
    </html> `



app.use(bodyParser.urlencoded({extended:false}))
app.use(session({
    secret: 'a98yhfi&o2u3bn0(rfuw-gvjoiah3@0945u23r#',
    resave: false,
    saveUninitialized: true
}));

// app.get('/count', function(req, res){
//     if(req.session.count){
//         req.session.count++;   
//     }
//     else{
//         req.session.count = 1;
//     }
//     res.send('count : ' + req.session.count);
// });

// 로그인 폼 페이지
app.get('/main', function(req, res){
    if(session.login_check==0) res.send(main_a+login+main_b);
    else res.send(main_a+login_2_1+session.login_name+login_2_2+main_b);
});

// 로그아웃 처리 - 세션 삭제 후 리다이렉트

app.get('/introduction-facilities',function(req,res){
    fs.readFile('introduction-facilities.html',function(error,data){
        res.writeHead(200, {'Content-Type':'text/html'});
        res.end(data);
    })
});

app.get('/student-sleepout',function(req,res){
    fs.readFile('student-sleepout.html',function(error,data){
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

app.get('/login_index',function(req,res){
    fs.readFile('login_index.html',function(error,data){
        res.writeHead(200, {'Content-Type':'text/html'});
        res.end(data);
    })
});

app.get('/student-sleepout',function(req,res){
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

app.get('/', function(req, res){
    delete req.session.displayName;
    res.redirect('/main');
});

// 로그인 처리 - 아이디와 패스워드 비교해서 일치하면 세션에 값을 부여하고 리다이렉트
app.post('/index', function(req, res){
    var user = {
        realname:'강승수',
        username:'kangseungsu',
        password:'1234',
        displayName:'kss'
    };

    var uname = req.body.user_id;
    var pwd = req.body.user_pw;
    session.login_name=user.realname;

    if(uname === user.username && pwd === user.password){
        session.login_check=1;
        res.redirect('/main');
    } else { 
        res.redirect('/introduction-facilities');
    }
});

app.listen(3003, function(){
    console.log('Connected 3003 port!!!');
});
