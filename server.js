var express = require('express');
var fs = require('fs');
var session = require('express-session');
var bodyParser = require('body-parser');
var app = express();

var mysql = require('mysql');
session.login_check = 0;
session.login_name = "";
session.login_to = "";
session.login_password = "";

var student_id = "", student_password = "", student_email = "", student_name = "", studet_dongho = "", student_birthday = "", student_home = "";
var con = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '1234',
  database: 'web_programming', // database명
  port: '3306',
  socketPath: '/var/run/mysqld/mysqld.sock'
});
con.connect();

// index.html
var main_a=`
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Bootstrap Main</title>
        <!-- Latest compiled and minified CSS -->
        <!-- <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"> -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
        <!-- jQuery library -->
        <!-- <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script> -->
        
        <!-- Popper JS -->
        <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script> -->
        <script src="popperjs"></script>
        <!-- Latest compiled JavaScript -->
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
        
    </head>
    
    <body class="container p-0 my-0" style="background-color: rgb(250, 250, 240); ">   
        <!-- Header -->
        <div class="row text-center" style="margin:30px">
            <div class="col-sm-4">
                <a href="/index"><img src="/logo" class="main" href="/index" style="margin-top:20px;"></a>
            </div>
            <div class="col-sm-8" style="margin-top: auto;">
                <img src="/imgs/dorm_main" style="width: 100%; height:120px; border-radius:10px">
                <ul class="nav nav-tabs" style="justify-content: space-between; background-color:rgb(31, 34, 80)">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle text-warning" data-toggle="dropdown" href="#">기숙사 소개</a>
                        <div class="dropdown-menu">
                            <a class="dropdown-item" href="/introduction-facilities">시설소개</a>
                            <a class="dropdown-item" href="/introduction-map">약도</a>
                        </div>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle text-warning" data-toggle="dropdown" href="#">커뮤니티</a>
                        <div class="dropdown-menu">
                            <a class="dropdown-item" href="/community">공지사항</a>
                        </div>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle text-warning" data-toggle="dropdown" href="#">학생 생활</a>
                        <div class="dropdown-menu">
                            <a class="dropdown-item" href="/student-sleepout">외박신청</a>
                            <a class="dropdown-item" href="/student-breakdown">고장신고</a>
                            <a class="dropdown-item" href="/studnet-menu">식단표</a>
                        </div>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle text-warning" data-toggle="dropdown" href="#">마이페이지</a>
                        <div class="dropdown-menu">
                            <a class="dropdown-item" href="/mypage-myinformation">내 정보</a>
                        </div>
                    </li>
                  </ul>
            </div>
        
        </div>
        
        <!-- Body -->
        <div class="grid">
            <div class="row" style="justify-content: space-between;">
                <!-- Login Form -->
            `

var login=`
<!-- Login Form -->
<div class="col-sm-3" style="background-color:rgb(149, 211, 162); padding-top:20px; border-radius:10%">
    <h3>LOGIN</h3>
    <form action="/login_transfer" method="post">
        <div class="form-group">
          <label for="email" style="font-size: 18px;">ID:</label>
          <input type="id" class="form-control" id="id" placeholder="Enter ID" name="id">
        </div>
        <div class="form-group">
          <label for="pwd" style="font-size: 18px;">Password:</label>
          <input type="password" class="form-control" id="pwd" placeholder="Enter password" name="pswd">
        </div>
        <button type="submit" class="btn btn-primary" id="submit" style="width:80%; margin-left:30px"><b>로 그 인</b></button>
    </form>

    <script>
        $(document).ready(function(){
            $('#submit').click(function(){
                if($('#id').val().length == 0){
                    alert("ID를 입력하시오.");
                    $('#id').focus();
                    return false;
                }
                if($('#pwd').val().length == 0){
                    alert("비밀번호를 입력하시오.");
                    $('#pwd').focus();
                    return false;
                }
            })
        })
    </script>

    <hr>
    <div class="text-center">
        <a class="text-white" href="/findid" style="text-decoration:none; font-size:20px">아이디 / 비밀번호 찾기</a>
    </div>
</div>
<!-- /Login Form -->

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
                        <a href="/mypage-myinformation">마이페이지 / </a>
                        <a href="/logout">로그아웃</a>
                    </li>
                </ul>
            </form>
            </div>
            `

var main_b=`
<!-- Notice -->
<div class="col-sm-4" style="background-color: rgb(190, 235, 243); padding-top:20px; border-radius:10%">
    <div class="row" style="margin:10px; justify-content: space-between;">
        <h3>Notice</h3>
        <button class="btn btn-secondary" onclick="location.href='/community';">+ 더보기</button>
    </div>

    <div class="notice_contents">
        <ul>
            <li><a href="" class="text-dark" style="font-size:18px">공지사항 5</a><hr></li>
            <li><a href="" class="text-dark" style="font-size:18px">공지사항 4</a><hr></li>
            <li><a href="" class="text-dark" style="font-size:18px">공지사항 3</a><hr></li>
            <li><a href="" class="text-dark" style="font-size:18px">공지사항 2</a><hr></li>
            <li><a href="" class="text-dark" style="font-size:18px">공지사항 1</a><hr></li>
        </ul>
    </div>
</div>
<!-- /Notice -->

<!-- Content Menu -->
<div class="col-sm-4" style="background-color: rgb(248, 216, 145); padding-top:20px; border-radius:10%">
    <div class="row" style="justify-content: space-between; margin:20px">
        <a href="/introduction-map" class="text-dark" style="width: 40%; text-align:center">
            <img src="/imgs/icon_map" href="/introduction-map" style="width: 100%;"><b>약도</b></a>
        <a href="/student-sleepout" class="text-dark" style="width: 40%; text-align:center">
            <img src="/imgs/icon_sleepout" href="/student-sleepout" style="width: 100%;"><b>외박신청</b></a>
    </div>
    <div class="row" style="justify-content: space-between; margin:20px">
        <a href="/student-breakdown" class="text-dark" style="width: 40%; text-align:center">
            <img src="/imgs/icon_breakdown" href="/student-breakdown" style="width: 100%;"><b>고장신고</b></a>
        <a href="/student-menu" class="text-dark" style="width: 40%; text-align:center">
            <img src="/imgs/icon_menu" href="/student-menu" style="width: 100%;"><b>주간메뉴</b></a>
    </div>
</div>
<!-- /Content Menu -->
</div>
</div>

<footer class="footer text-center text-secondary" style="margin-top: 20px;">
<div class="land_copyright">
<p>Soongsil University<br>SMART SYSTEM SOFTWARE - 2020 WEB PROGRAMING TEAM 1</p>
</div>
</footer>
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

app.get('/main', function(req, res){
    if(session.login_check==0) res.send(main_a+login+main_b);
    else res.send(main_a+login_2_1+session.login_name+login_2_2+main_b);
});

app.post('/main', function(req, res){
    var uname = req.body.user_id;
    var pwd = req.body.user_pw;
    var sql = 'SELECT * FROM student WHERE id=?'
    con.query(sql, [uname], function (err, result) {
    // con.query("insert into breakdown values ('2','A','1','asdfsadf','T','sadfklsdf','2020-11-24',1)", function (err, result, fields) {
        if (err) throw err;
    
        // 로그인 목록에 있는지 확인
        if(!result[0]) {
            res.redirect('/login-fail');
        }
        else {
            // 로그인 목록에 있으면 비밀번호 일치하는지 확인
            if(pwd === result[0].password) {
                // 로그인 성공하면 변수에 사용자 정보 채워주기
                student_id = result[0].id;
                student_password = result[0].password;
                student_email = result[0].email;
                student_name = result[0].name;
                studet_dongho = result[0].dongho;
                student_birthday = result[0].birthday;
                student_home = result[0].home;

                session.login_password = result[0].password;
                session.login_name = result[0].name;

                session.login_check=1;
                res.redirect('/main');
            }
            else {
                res.redirect('/login-fail');
            }
        }
    });
});

app.get('/logout', function(req, res){
    session.login_check=0;
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
    if(session.login_check==0){
        session.login_to="sleepout"
        fs.readFile('login.html',function(error,data){
            res.writeHead(200, {'Content-Type':'text/html'});
            res.end(data);
            })    
    }
    else{
        fs.readFile('student-sleepout.html',function(error,data){
            res.writeHead(200, {'Content-Type':'text/html'});
            res.end(data);
            })
    }
    });
    
app.get('/mypage-myinformation',function(req,res){
    if(session.login_check==0){
        session.login_to="mypage"
        fs.readFile('login.html',function(error,data){
            res.writeHead(200, {'Content-Type':'text/html'});
            res.end(data);
            })    
    }
    else{
        fs.readFile('mypage-myinformation.html',function(error,data){
            res.writeHead(200, {'Content-Type':'text/html'});
            res.end(data);
            })
    }
    });
    
app.get('/mypage-changemyinfo',function(req,res){
    if(session.login_check==0){
        fs.readFile('login.html',function(error,data){
            res.writeHead(200, {'Content-Type':'text/html'});
            res.end(data);
            })    
    }
    else{
        fs.readFile('mypage-changemyinfo.html',function(error,data){
            res.writeHead(200, {'Content-Type':'text/html'});
            res.end(data);
            })
    }
    });
    
app.get('/community',function(req,res){
    if(session.login_check==0){
        session.login_to="community"
        fs.readFile('login.html',function(error,data){
            res.writeHead(200, {'Content-Type':'text/html'});
            res.end(data);
        })    
    }
    else{
        fs.readFile('community.html',function(error,data){
            res.writeHead(200, {'Content-Type':'text/html'});
            res.end(data);
        })
    }
});
    
app.get('/login_index',function(req,res){
    fs.readFile('login_index.html',function(error,data){
    res.writeHead(200, {'Content-Type':'text/html'});
    res.end(data);
    })
});
    
app.get('/student-sleepout',function(req,res){
    if(session.login_check==0){
        fs.readFile('login.html',function(error,data){
            res.writeHead(200, {'Content-Type':'text/html'});
            res.end(data);
            })    
    }
    else{
        fs.readFile('student-sleepout.html',function(error,data){
            res.writeHead(200, {'Content-Type':'text/html'});
            res.end(data);
            })
    }
    });
    
app.get('/login',function(req,res){
    fs.readFile('login.html',function(error,data){
        res.writeHead(200, {'Content-Type':'text/html'});
        res.end(data);
    })
});

app.get('/login-fail',function(req,res){
    fs.readFile('index.html',function(error,data){
        res.writeHead(200, {'Content-Type':'text/html'});
        res.end(data);
    })
});
    
app.get('/findid',function(req,res){
    fs.readFile('findid.html',function(error,data){
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
    
app.get('/imgs/dorm_main',function(req,res){
    fs.readFile('dorm_main.png',function(error,data){
        res.writeHead(200, {'Content-Type':'text/html'});
        res.end(data);
    })
});

app.get('/imgs/icon_map',function(req,res){
    fs.readFile('icon_map.png',function(error,data){
        res.writeHead(200, {'Content-Type':'text/html'});
        res.end(data);
    })
});

app.get('/imgs/icon_sleepout',function(req,res){
    fs.readFile('icon_sleepout.png',function(error,data){
        res.writeHead(200, {'Content-Type':'text/html'});
        res.end(data);
    })
});

app.get('/imgs/icon_breakdown',function(req,res){
    fs.readFile('icon_breakdown.png',function(error,data){
        res.writeHead(200, {'Content-Type':'text/html'});
        res.end(data);
    })
});

app.get('/imgs/icon_menu',function(req,res){
    fs.readFile('icon_menu.png',function(error,data){
        res.writeHead(200, {'Content-Type':'text/html'});
        res.end(data);
    })
});

app.get('/imgs/person',function(req,res){
    fs.readFile('person.png',function(error,data){
        res.writeHead(200, {'Content-Type':'text/html'});
        res.end(data);
    })
});

app.get('/logo',function(req,res){
    fs.readFile('./image/logo.png',function(error,data){
        res.writeHead(200, {'Content-Type':'text/html'});
        res.end(data);
    })
});
    
app.get('/livingroom',function(req,res){
    fs.readFile('./livingroom.jpg',function(error,data){
        res.writeHead(200, {'Content-Type':'text/html'});
        res.end(data);
    })
});
    
app.get('/laundryroom',function(req,res){
    fs.readFile('./laundryroom.jpg',function(error,data){
        res.writeHead(200, {'Content-Type':'text/html'});
        res.end(data);
    })
});
    
app.get('/gym',function(req,res){
    fs.readFile('./gym.jpg',function(error,data){
        res.writeHead(200, {'Content-Type':'text/html'});
        res.end(data);
    })
});
    
app.get('/restaurant',function(req,res){
    fs.readFile('./restaurant.jpg',function(error,data){
        res.writeHead(200, {'Content-Type':'text/html'});
        res.end(data);
    })
});
    
app.get('/map',function(req,res){
    fs.readFile('./map.jpg',function(error,data){
        res.writeHead(200, {'Content-Type':'text/html'});
        res.end(data);
    })
});
    
app.get('/introduction-map',function(req,res){
    fs.readFile('./introduction-map.html',function(error,data){
        res.writeHead(200, {'Content-Type':'text/html'});
        res.end(data);
    })
});

app.get('/login-alert',function(req,res){
    fs.readFile('./login-alert.html',function(error,data){
        res.writeHead(200, {'Content-Type':'text/html'});
        res.end(data);
    })
});

app.get('/student_sleepout',function(req,res){
    if(session.login_check==0){
        fs.readFile('login.html',function(error,data){
            res.writeHead(200, {'Content-Type':'text/html'});
            res.end(data);
        })    
    }
    else{
        fs.readFile('student_sleepout.html',function(error,data){
            res.writeHead(200, {'Content-Type':'text/html'});
            res.end(data);
        })
    }
});
    
app.get('/student_breakdown_write',function(req,res){
    if(session.login_check==0){
        fs.readFile('login.html',function(error,data){
            res.writeHead(200, {'Content-Type':'text/html'});
            res.end(data);
        })    
    }
    else{
        fs.readFile('student_breakdown_write.html',function(error,data){
            res.writeHead(200, {'Content-Type':'text/html'});
            res.end(data);
        })
    }
    });

app.get('/student-breakdown',function(req,res){
    if(session.login_check==0){
        fs.readFile('login.html',function(error,data){
            res.writeHead(200, {'Content-Type':'text/html'});
            res.end(data);
        })    
    }
    else{
        fs.readFile('student-breakdown.html',function(error,data){
            res.writeHead(200, {'Content-Type':'text/html'});
            res.end(data);
        })
    }
});

app.get('/student-menu',function(req,res){
    if(session.login_check==0){
        fs.readFile('login.html',function(error,data){
            res.writeHead(200, {'Content-Type':'text/html'});
            res.end(data);
        })    
    }
    else{
        fs.readFile('student-menu.html',function(error,data){
            res.writeHead(200, {'Content-Type':'text/html'});
            res.end(data);
        })
    }
});

app.get('/student_sleepout_write',function(req,res){
    if(session.login_check==0){
        fs.readFile('login.html',function(error,data){
            res.writeHead(200, {'Content-Type':'text/html'});
            res.end(data);
        })    
    }
    else{
        fs.readFile('student_write.html',function(error,data){
            res.writeHead(200, {'Content-Type':'text/html'});
            res.end(data);
        })
    }
});

app.get('/', function(req, res){
    delete req.session.displayName;
    res.redirect('/main');
});

app.get('/csslib',function(req,res){
    fs.readFile('https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css',function(error,data){
        res.writeHead(200, {'Content-Type':'text/css'});
        res.end(data);
    })
});

app.get('/jquerylib',function(req,res){
    fs.readFile('https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js',function(error,data){
        res.writeHead(200, {'Content-Type':'text/js'});
        res.end(data);
    })
});

app.get('/popperjs',function(req,res){
    fs.readFile('https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js',function(error,data){
        res.writeHead(200, {'Content-Type':'text/js'});
        res.end(data);
    })
});

app.get('/compiledjs',function(req,res){
    fs.readFile('https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js',function(error,data){
        res.writeHead(200, {'Content-Type':'text/js'});
        res.end(data);
    })
});

// 로그인 처리 - 아이디와 패스워드 비교해서 일치하면 세션에 값을 부여하고 리다이렉트
app.post('/login_transfer', function(req, res){
    var uname = req.body.id;
    var pwd = req.body.pwd;
    var sql = 'SELECT * FROM student WHERE id=?'
    con.query(sql, [uname], function (err, result) {
    // con.query("insert into breakdown values ('2','A','1','asdfsadf','T','sadfklsdf','2020-11-24',1)", function (err, result, fields) {
        if (err) throw err;
        
        // 로그인 목록에 있는지 확인
        if(!result[0]) {
            res.redirect('/login-fail');
        }
        else {
            // 로그인 목록에 있으면 비밀번호 일치하는지 확인
            if(pwd === result[0].password) {
                // 로그인 성공하면 변수에 사용자 정보 채워주기
                student_id = result[0].id;
                student_password = result[0].password;
                student_email = result[0].email;
                student_name = result[0].name;
                studet_dongho = result[0].dongho;
                student_birthday = result[0].birthday;
                student_home = result[0].home;
                
                session.login_password = result[0].password;
                session.login_name = result[0].name;

                session.login_check=1;
                res.redirect('/main');
            }
            else {
                res.redirect('/login-fail');
            }
        }
    });
});

app.post('/loginto', function(req, res){
    var uname = req.body.user_id;
    var pwd = req.body.user_pw;
    var sql = 'SELECT * FROM student WHERE id=?'
    con.query(sql, [uname], function (err, result) {
    // con.query("insert into breakdown values ('2','A','1','asdfsadf','T','sadfklsdf','2020-11-24',1)", function (err, result, fields) {
        if (err) throw err;
        
        // 로그인 목록에 있는지 확인
        if(!result[0]) {
            res.redirect('/login-alert');
        }
        else{
            // 로그인 목록에 있으면 비밀번호 일치하는지 확인
            if(pwd === result[0].password) {
                // 로그인 성공하면 변수에 사용자 정보 채워주기
                student_id = result[0].id;
                student_password = result[0].password;
                student_email = result[0].email;
                student_name = result[0].name;
                studet_dongho = result[0].dongho;
                student_birthday = result[0].birthday;
                student_home = result[0].home;

                session.login_password = result[0].password;
                session.login_name = result[0].name;

                session.login_check=1;
                if(session.login_to=="mypage"){
                    res.redirect('/mypage-myinformation');
                }
                else if(session.login_to=="community"){
                    res.redirect('/community');
                }
                else if(session.login_to=="sleepout"){
                    res.redirect('/student-sleepout');
                }
            }
            else {
                res.redirect('/login-alert');
            }
        }
    });
});

app.listen(3003, function(){
    console.log('Connected 3003 port!!!');
});