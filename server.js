var express = require('express');
var fs = require('fs');
var session = require('express-session');
var bodyParser = require('body-parser');
var app = express();
var moment = require('moment');

var mysql = require('mysql');
session.login_check = 0;
session.login_name = "";
session.login_to = "";
session.login_password = "";
session.login_id=""
var sleepout_reason_to=0;
var student_id = "", student_password = "", student_email = "", student_name = "", student_dongho = "", student_birthday = "", student_home = "";
var sleepout_idx, sleepout_name="", sleepout_dong="", sleepout_ho, sleepout_homeout="", sleepout_homein="", sleepout_tel="", sleepout_reason="", sleepout_calendar="";
var breakdown_idx, breakdown_dong="", breakdown_ho, breakdown_name="", breakdown_title="", breakdown_content="", breakdown_calendar="";
var me;

var find_student_id;
var find_student_password;
var con = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '1234',
  database: 'web_programming', // database명
  port: '3306',
  socketPath: '/var/run/mysqld/mysqld.sock',
  dateStrings: 'date'
});
con.connect();

var show_id_1=`<!DOCTYPE html>
<html>
    <head>
        <title>아이디 비밀번호 찾기</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    </head>
    </head>

    <body class="container p-0 my-0 text-center" style = "background-color: rgb(250, 250, 240); font-family:  "Last Ninja", Impact, fantasy; ">
        <div class ="row">
            <div class ="col-sm-2"><a href="/main"><img src="/imgs/logo" class="main" href="/main" style="margin-top:70px;"></a></div>
            <div class = "col-sm-10"><img src="/imgs/dorm" class="main" style = "margin-top:70px; height:150px; float: right;"></div>
        </div>
        <nav class ="navbar navbar-expand-sm " style="margin-top:40px; background-color: rgb(31, 34, 80); ">
            
            <div class="collapse navbar-collapse" id="collapsibleNavbar" style ="background-color: rgb(31, 34, 80);">
           
               <ul class="navbar-nav " style="text-align: center; margin-left: 20px; margin-right: auto; font-size: x-large; ">
                   <li class="nav-item" style="margin-left: 40px;">
                       <a class="nav-link text-white " href="/main" >HOME</a>
                     </li>
                   <li class="nav-item" style ="margin-left: 100px;">
                     <a class="nav-link text-white " href="/introduction-facilities" >기숙사 소개</a>
                   </li>
                   <li class="nav-item" style ="margin-left: 100px;">
                     <a class="nav-link text-white" href="/community" >커뮤니티</a>
                   </li>
                   <li class="nav-item" style ="margin-left: 100px;">
                     <a class="nav-link text-white" href="/student-sleepout">학생생활</a>
                     </li>
                     <li class="nav-item" style ="margin-left: 100px;">
                       <a class="nav-link text-white" href="/mypage-myinformation">마이페이지</a>
                       </li>
           </div>
           </nav>
    <div class="grid">
        <div class ="row" style="margin-top: 30px;">
            <div class = "col-sm-2" >
                <nav class="navbar " style="border-collapse: collapse; background-color: rgb(31, 34, 80); text-align: center;">
                    <ul class="navbar-nav" style="text-align: center; margin-left: auto; margin-right: auto; height: 40em;" >
                      <li class="nav-item" >
                        <a class="nav-link text-white" href="/login" style="font-size: 23px;
                         border-bottom:solid 2px white; margin-bottom: 40px;">부가서비스</a>
                      </li>
                      <li class="nav-item">
                        <a class="list-clicked text-white" href="/login" style="font-size: large; ">로그인</a>
                      </li>
                      <br>
                      <li class="nav-item">
                        <a class="list-clicked text-white" href="/findid" style="font-size: large;">ID/PW 찾기</a>
                      </li>
                    </ul>
                  </nav>
            </div>
            <div class = "col-sm-10">
                 <!-- 페이지 제목 -->
                 <div style="font-size: xxx-large; margin-top: 20px; color: darkslategrey;" >ID/PW 찾기</div>
            
                 <!-- 페이지 경로 -->
                <div style = "font-size: medium; margin-top: 20px; text-align: right; color: darkslategrey;">home/부가서비스/ID/PW 찾기</div>
                <!-- 내용 -->
                <div class = "container">
                <table class="table"style=" height: 300px; border:double 10px rgb(31, 34, 80); margin-top: 30px; background-color:rgb(232, 236, 248); font-size:xx-large" >
                    <tbody >
                        <tr >
                            <td style ="vertical-align: middle; width: 50%;" >아이디는 </td>
                            <td style ="vertical-align: middle; width: 50%;">`

var show_id_2= `</td>
</tr> <tr>
    
    <td style ="vertical-align: middle; width: 50%;">비밀번호는 </td>
    <td style ="vertical-align: middle; width: 50%;">`
// index.html

var show_id_3=`</td>
</tr>                          
</tbody>
</table>
</div>

</div>
</div>

</div>
<footer class="footer text-center text-secondary" style="margin-top: 20px;">
<div class="land_copyright">
<p>Soongsil University<br>SMART SYSTEM SOFTWARE - 2020 WEB PROGRAMING TEAM 1</p>
</div>
</footer>
</body>
</html>`
var main_a_1=`
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        
        <title>Dormitory Main</title>
        `
var main_alert=`<script>alert("다시 로그인해주세요")</script>`

var main_a_2=`
        <!-- Latest compiled and minified CSS -->
        <!-- <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"> -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
        <!-- jQuery library -->
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        
        <!-- Popper JS -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
        
        <!-- Latest compiled JavaScript -->
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
        
    </head>
    
    <body class="container p-0 my-0" style="background-color: rgb(250, 250, 240); ">   
        <!-- Header -->
        <div class="row text-center" style="margin:30px">
            <div class="col-sm-4">
                <a href="/main"><img src="/imgs/logo" class="main" href="/main" style="margin-top:20px;"></a>
            </div>
            <div class="col-sm-8" style="margin-top: auto;">
                <img src="/imgs/dorm" style="width: 100%; height:120px; border-radius:10px">
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
                            <a class="dropdown-item" href="/student-menu">식단표</a>
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
    <h3 style="margin-top:30px"><b>LOGIN</b></h3>
    <form action="/login_transfer" method="post">
        <div class="form-group">
          <label for="email" style="font-size: 18px;">ID:</label>
          <input type="id" class="form-control" id="id" placeholder="Enter ID" name="id">
        </div>
        <div class="form-group">
          <label for="pwd" style="font-size: 18px;">Password:</label>
          <input type="password" class="form-control" id="pwd" placeholder="Enter password" name="pwd">
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
            <!-- Login Form -->
            <div class="col-sm-3" style="background-color:rgb(149, 211, 162); padding-top:20px; border-radius:10%">
                <div class="row" style="margin-top:30px; justify-content:center">
                    <h5 class="text-center" style="font-size:25px; color:blue"><b>`
                
var login_2_2=`</b></h5><h5>&nbsp님 환영합니다.</h5></div>
                <img src="/imgs/person" style="width:80%; margin-left:25px">
                <p class="text-center" style="font-size:20px; margin-top:10px">`

var login_2_3=`</p>
                <div class="row" style="justify-content:space-around">
                    <button class="btn btn-primary" style="width:40%;" onclick="location.href='/mypage-myinformation';"><b>마이페이지</b></button>
                    <button class="btn btn-primary" style="width:40%;" onclick="location.href='/logout';"><b>로그아웃</b></button>
                </div>
            </div>
            <!-- /Login Form -->`

var main_b=`
<!-- Notice -->
<div class="col-sm-4" style="background-color: rgb(190, 235, 243); padding-top:20px; border-radius:10%">
    <div class="row" style="margin:10px; justify-content: space-between;">
        <h3><b>Notice</b></h3>
        <button class="btn btn-secondary" onclick="location.href='/community';">+ 더보기</button>
    </div>

    <div class="notice_contents">
        <ul>
            <li><a href="/community-content7" class="text-dark" style="font-size:18px">코로나19 확산에 따른 마스크 미착용자 벌점 운영</a><hr></li>
            <li><a href="/community-content6" class="text-dark" style="font-size:18px">코로나19 관련 특별 방역 안내</a><hr></li>
            <li><a href="/community-content5" class="text-dark" style="font-size:18px">2020 동계 방학 생활관 개관 안내</a><hr></li>
            <li><a href="/community-content4" class="text-dark" style="font-size:18px">2020년도 인구주택총조사 인터넷 조사 협조 요청</a><hr></li>
            <li><a href="/community-content3" class="text-dark" style="font-size:18px">2020년 2학기 중도퇴사시 환불금액</a><hr></li>
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

var mypage_1 = `
<!DOCTYPE html>
<html>
    <head>
        <title>마이페이지</title>
        <meta charset="utf-8">
        
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    </head>
    
    <body class="container p-0 my-0 text-center" style = "background-color: rgb(250, 250, 240); font-family:  "Last Ninja", Impact, fantasy; ">

        <div class ="row">
            <div class ="col-sm-2"><a href="/main"><img src="/imgs/logo" class="main" href="/main" style = "margin-top:70px;"></a></div>
            <div class = "col-sm-10"><img src="/imgs/dorm" class="main" style = "margin-top:70px; height:150px; float: right;"></div>
        </div>

        <nav class ="navbar navbar-expand-sm " style="margin-top:40px; background-color: rgb(31, 34, 80); ">
            
            <div class="collapse navbar-collapse" id="collapsibleNavbar" style ="background-color: rgb(31, 34, 80);">
           
               <ul class="navbar-nav " style="text-align: center; margin-left: 20px; margin-right: auto; font-size: x-large; ">
                   <li class="nav-item" style="margin-left: 40px;">
                       <a class="nav-link text-white " href="/main" >HOME</a>
                     </li>
                   <li class="nav-item" style ="margin-left: 100px;">
                     <a class="nav-link text-white " href="/introduction-facilities" >기숙사 소개</a>
                   </li>
                   <li class="nav-item" style ="margin-left: 100px;">
                     <a class="nav-link text-white" href="/community" >커뮤니티</a>
                   </li>
                   <li class="nav-item" style ="margin-left: 100px;">
                     <a class="nav-link text-white" href="/student-sleepout">학생생활</a>
                     </li>
                     <li class="nav-item" style ="margin-left: 100px;">
                       <a class="nav-link text-white" href="/mypage-myinformation">마이페이지</a>
                       </li>
           </div>
           </nav>
    
    <div class="grid">
        
        <div class ="row" style="margin-top: 30px;">
            <div class = "col-sm-2" >
                <nav class="navbar " style="border-collapse: collapse; background-color: rgb(31, 34, 80); text-align: center;">
                    <ul class="navbar-nav" style="text-align: center; margin-left: auto; margin-right: auto; height: 40em;" >
                      <li class="nav-item" >
                        <a class="nav-link text-white" href="/mypage-myinformation" style="font-size: 23px;
                         border-bottom:solid 2px white; margin-bottom: 40px;">마이페이지</a>
                      </li>
                      <li class="nav-item">
                        <a class="list-clicked text-white" href="/mypage-myinformation" style="font-size: large; ">내 정보</a>
                      </li>
                      
                  </nav>
            </div>
            <div class ="col-sm-10">
                 <!-- 페이지 제목 -->
                 <div style="font-size: xxx-large; margin-top: 20px; color: darkslategrey;" >내 정보</div>
            
                 <!-- 페이지 경로 -->
                <div style = "font-size: medium; margin-top: 20px; text-align: right; color: darkslategrey;">home/마이페이지/내 정보</div>
                
                <!-- 내용 -->
                <div class ="container">
                    <table class="table table-bordered " style="margin-top: 30px; border:solid 5px rgb(31, 34, 80); background-color:rgb(232, 236, 248); height: 400px;" >
                        <tbody>
                            `

var mypage_2 = `  <tr>
                    <td style = "font-size: large; vertical-align: middle; text-align: center; width: 250px; border-right:double 10px rgb(31, 34, 80); "> `
var mypage_3 = ` </td>
                    <td style = "font-size: large; vertical-align: middle; text-align: center;"> `
var mypage_4 = `    </td>
                </tr> `
var mypage_5 = `
</tbody>
                    </table>
                </div>

            </div>
        </div>
       
    </div>
    <footer class="footer text-center text-secondary" style="margin-top: 20px;">
        <div class="land_copyright">
            <p>Soongsil University<br>SMART SYSTEM SOFTWARE - 2020 WEB PROGRAMING TEAM 1</p>
        </div>
    </footer>
    </body>
</html> `

var SO_content1 = `<!DOCTYPE html>
<html>
    <head>
        <title>외박 신청</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    </head>

    <body class="container p-0 my-0 text-center" style = "background-color: rgb(250, 250, 240); font-family: "Last Ninja", Impact, fantasy; ">
        <div class ="row">
            <div class ="col-sm-2"><a href="/main"><img src="/imgs/logo" class="main" href="/main" style = "margin-top:70px;"></a></div>
                <div class = "col-sm-10"><img src="/imgs/dorm" class="main" style = "margin-top:70px; height:150px; float: right;"></div>
            </div>

            <nav class ="navbar navbar-expand-sm " style="margin-top:40px; background-color: rgb(31, 34, 80); ">
                <div class="collapse navbar-collapse" id="collapsibleNavbar" style ="background-color: rgb(31, 34, 80);">
                    <ul class="navbar-nav " style="text-align: center; margin-left: 20px; margin-right: auto; font-size: x-large; ">
                        <li class="nav-item" style="margin-left: 40px;">
                            <a class="nav-link text-white " href="/main" >HOME</a>
                        </li>
                        <li class="nav-item" style ="margin-left: 100px;">
                            <a class="nav-link text-white " href="/introduction-facilities" >기숙사 소개</a>
                        </li>
                        <li class="nav-item" style ="margin-left: 100px;">
                            <a class="nav-link text-white" href="/community" >커뮤니티</a>
                        </li>
                        <li class="nav-item" style ="margin-left: 100px;">
                            <a class="nav-link text-white" href="/student-sleepout">학생생활</a>
                        </li>
                        <li class="nav-item" style ="margin-left: 100px;">
                            <a class="nav-link text-white" href="/mypage-myinformation">마이페이지</a>
                        </li>
                    </ul>
                </div>
            </nav>
            <div class="grid">
                <div class = "row" style =" margin-top: 30px;">
                    <div class = "col-sm-2" >
                        <nav class="navbar " style="border-collapse: collapse; background-color: rgb(31, 34, 80); text-align: center;">
                            <ul class="navbar-nav" style="text-align: center; margin-left: auto; margin-right: auto; height: 40em;" >
                                <li class="nav-item" >
                                    <a class="nav-link text-white" href="/student-sleepout" style="font-size: 23px;
                                    border-bottom:solid 2px white; margin-bottom: 40px;">학생생활</a>
                                </li>
                                <li class="nav-item">
                                    <a class="list-clicked text-white" href="/student-sleepout" style="font-size: large; ">외박 신청</a>
                                </li>
                                <br>
                                <li class="nav-item">
                                    <a class="list-clicked text-white" href="/student-breakdown" style="font-size: large;">고장 신고</a>
                                </li>
                                <br>
                                <li class="nav-item">
                                    <a class="list-clicked text-white" href="/student-menu" style="font-size: large;">식단표</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
    
                    <!-- Content -->
                    <div class ="col-sm-10">
                        <!-- 페이지 제목 -->
                        <div style="font-size: xxx-large; margin-top: 20px; color: darkslategrey;" >외박 신청 정보</div>
                   
                        <!-- 페이지 경로 -->
                       <div style = "font-size: medium; margin-top: 20px; text-align: right; color: darkslategrey;">home/학생생활/외박 신청/외박 신청 정보</div>
                       
                       <!-- 내용 -->
                       <div class ="container">
                           <table class="table table-bordered " style="margin-top: 30px; border:solid 5px rgb(31, 34, 80); background-color:rgb(232, 236, 248); height: 400px;" >
                               <tbody>
                                   <tr>
                                       <td style = "font-size: large; vertical-align: middle; text-align: center; width: 250px; border-right:double 10px rgb(31, 34, 80); ">
                                           작성자
                                       </td>
                                       <td style = "font-size: large; vertical-align: middle; text-align: center;">`

var SO_content2 =                     `</td>
                                   </tr>
                                   <tr>
                                       <td style = "font-size: large; vertical-align: middle; text-align: center; width: 250px; border-right:double 10px rgb(31, 34, 80);">
                                           동 / 호수
                                       </td>
                                       <td style = "font-size: large; vertical-align: middle; text-align: center;">`

var SO_content3 =                     `</td>
                                   </tr>
                                   <tr>
                                       <td style = "font-size: large; vertical-align: middle; text-align: center; width: 250px; border-right:double 10px rgb(31, 34, 80);">
                                           외박일
                                       </td>
                                       <td style = "font-size: large; vertical-align: middle; text-align: center;">` 

var SO_content4 =                     `</td>
                                   </tr>
                                   <tr>
                                       <td style = "font-size: large; vertical-align: middle; text-align: center; width: 250px; border-right:double 10px rgb(31, 34, 80);">
                                           복귀일
                                       </td>
                                       <td style = "font-size: large; vertical-align: middle; text-align: center;"> `

var SO_content5 =                     `</td>
                                   </tr>
                                   <tr>
                                       <td style = "font-size: large; vertical-align: middle; text-align: center; width: 250px; border-right:double 10px rgb(31, 34, 80);">
                                           연락처
                                       </td>
                                       <td style = "font-size: large; vertical-align: middle; text-align: center;"> `

var SO_content6 =                     `</td>
                                   </tr>
                                   <tr>
                                       <td style = "font-size: large; vertical-align: middle; text-align: center; width: 250px; border-right:double 10px rgb(31, 34, 80);">
                                           사유
                                       </td>
                                       <td style = "font-size: large; vertical-align: middle; text-align: center;"> `

var SO_content7 =                     `</td>
                                   </tr>
                                   <tr>
                                    <td style = "font-size: large; vertical-align: middle; text-align: center; width: 250px; border-right:double 10px rgb(31, 34, 80);">
                                        작성일
                                    </td>
                                    <td style = "font-size: large; vertical-align: middle; text-align: center;"> `
 
var SO_content8 =                     `</td>
                                </tr>
                               </tbody>
                           </table>
                       </div>
       
                   </div>
                </div>
            </div>
        </div>

        <footer class="footer text-center text-secondary" style="margin-top: 20px;">
            <div class="land_copyright">
                <p>Soongsil University<br>SMART SYSTEM SOFTWARE - 2020 WEB PROGRAMING TEAM 1</p>
            </div>
        </footer>
    </body>
</html> `

var sleep_out1 = `<!DOCTYPE html>
<html>
    <head>
        <title>외박 신청</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
        
    </head>
    
    <body class="container p-0 my-0 text-center" style = "background-color: rgb(250, 250, 240); font-family: "Last Ninja", Impact, fantasy; ">
        <div class ="row">
            <div class ="col-sm-2"><a href="/main"><img src="/imgs/logo" class="main" href="/main" style = "margin-top:70px;"></a></div>
            <div class = "col-sm-10"><img src="/imgs/dorm" class="main" style = "margin-top:70px; height:150px; float: right;"></div>
        </div>

        <nav class ="navbar navbar-expand-sm " style="margin-top:40px; background-color: rgb(31, 34, 80); ">
            <div class="collapse navbar-collapse" id="collapsibleNavbar" style ="background-color: rgb(31, 34, 80);">
                <ul class="navbar-nav " style="text-align: center; margin-left: 20px; margin-right: auto; font-size: x-large; ">
                    <li class="nav-item" style="margin-left: 40px;">
                        <a class="nav-link text-white " href="/main" >HOME</a>
                    </li>
                    <li class="nav-item" style ="margin-left: 100px;">
                        <a class="nav-link text-white " href="/introduction-facilities" >기숙사 소개</a>
                    </li>
                    <li class="nav-item" style ="margin-left: 100px;">
                        <a class="nav-link text-white" href="/community" >커뮤니티</a>
                    </li>
                    <li class="nav-item" style ="margin-left: 100px;">
                        <a class="nav-link text-white" href="/student-sleepout">학생생활</a>
                    </li>
                    <li class="nav-item" style ="margin-left: 100px;">
                        <a class="nav-link text-white" href="/mypage-myinformation">마이페이지</a>
                    </li>
                </ul>
            </div>
        </nav>
        <div class="grid">
            <div class = "row" style =" margin-top: 30px;">
                <div class = "col-sm-2" >
                    <nav class="navbar " style="border-collapse: collapse; background-color: rgb(31, 34, 80); text-align: center;">
                        <ul class="navbar-nav" style="text-align: center; margin-left: auto; margin-right: auto; height: 40em;" >
                            <li class="nav-item" >
                                <a class="nav-link text-white" href="/student-sleepout" style="font-size: 23px;
                                border-bottom:solid 2px white; margin-bottom: 40px;">학생생활</a>
                            </li>
                            <li class="nav-item">
                                <a class="list-clicked text-white" href="/student-sleepout" style="font-size: large; ">외박 신청</a>
                            </li>
                            <br>
                            <li class="nav-item">
                                <a class="list-clicked text-white" href="/student-breakdown" style="font-size: large;">고장 신고</a>
                            </li>
                            <br>
                            <li class="nav-item">
                                <a class="list-clicked text-white" href="/student-menu" style="font-size: large;">식단표</a>
                            </li>
                        </ul>
                    </nav>
                </div>

                <div class ="col-sm-10">
                    <!-- 페이지 제목 -->
                    <div style="font-size: xxx-large; margin-top: 20px; color: darkslategrey;" >외박 신청</div>
                    <!-- 페이지 경로 -->
                    <div style = "font-size: medium; margin-top: 20px; text-align: right; color: darkslategrey;">home/학생생활/외박 신청</div>
                    <!-- 검색창 -->
                    <div style="display:inline-block; margin-left: 36em; margin-top: 30px;">
                        <select name="subjects" style="height:2em; font-size: medium; font-family: "Last Ninja", Impact, fantasy; ">
                            <option value="1" selected>동호수</option>
                            <option value="2">작성자</option>
                            <option value="2">작성일</option>
                        </select>
                        <input type="search" style="height:2em;" name="search">
                        <input type="submit" class="btn btn" value="검색" style="background-color: rgb(31, 34, 80);color:white; ">
                    </div>

                    <div style=" margin-top:10px; font-size:20px; height: 30px;">
                        <table style="background-color: rgb(207, 237, 247); color:black; font-size: large;">
                            <tr>
                                <td width="100">번호</td>
                                <td width="100">작성자</td>
                                <td width="100">동호수</td>
                                <td width="200">외박일</td>
                                <td width="200">복귀일</td>
                                <td width="200">연락처</td>
                                <td width="200">사유</td>
                                <td width="200">작성일</td>
                            </tr>
                        </table>
                    </div>

                    <div style=" margin-top:5px; font-size:20px; height: 30px;">
                        <table class = "table table-hover" style="background-color: rgb(238, 248, 252); color:black; font-size: medium;">
                            <tbody>`
var sleep_out2_1 =                    `<tr>
                                    <td width="100" name="idx"><form name="sleep`

var sleep_out2_2 =`" action="/sleep_to" method="post"><textarea style="border:none; resize:none; background-color: rgb(238, 248, 252);" cols=1 rows=1 onclick="document.sleep`
var sleep_out2_3=`.submit();"
name="message" value="value">`
var sleep_out3 =                    `</textarea></form></td>
                                    <td width="100">`
var sleep_out4 =                    `</td>
                                    <td width="100">`
var sleep_out5 =                    `</td>
                                    <td width="200">`
var sleep_out6 =                    `</td>
                                    <td width="200">`
var sleep_out7 =                    `</td>
                                    <td width="200">`

var sleep_out8=`</td>
                                     <td width="200">`
// var sleep_out8 =                    `</td>
//                                     <td width="200">`
// var sleep_out8_2=`" action="/sleep_to" method="post"><textarea onclick="document.sleep`
// var sleep_out8_3=`.submit();"
//                                      name="message" value="value" style="height: 25px">`

var sleep_out9 =                    `</td>
                                    <td width="200">`
//<form name="test" action="/test" method="post"><textarea onclick="document.test.submit();" name="message" value="value" style="height: 25px">no value</textarea></form>
var sleep_out10 =                    `</td>
                                </tr>
                            </tbody>
                        </table>
                        <button type="button" class="btn btn" onclick="location.href='/student-sleepout-write'"
                        style="background-color: rgb(31, 34, 80);color:white; margin-top: 20px; ">글 작성</button>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>`


var break_down1 = `<!DOCTYPE html>
<html>
    <head>
        <title>고장 신고</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    </head>
    <!-- 11/25 sleepout 게시판 -->
    <body class="container p-0 my-0 text-center" style = "background-color: rgb(250, 250, 240); font-family: "Last Ninja", Impact, fantasy; ">
        <div class ="row">
            <div class ="col-sm-2"><a href="/main"><img src="/imgs/logo" class="main" href="/main" style = "margin-top:70px;"></a></div>
            <div class = "col-sm-10"><img src="/imgs/dorm" class="main" style = "margin-top:70px; height:150px; float: right;"></div>
        </div>

        <nav class ="navbar navbar-expand-sm " style="margin-top:40px; background-color: rgb(31, 34, 80); ">
            <div class="collapse navbar-collapse" id="collapsibleNavbar" style ="background-color: rgb(31, 34, 80);">
                <ul class="navbar-nav " style="text-align: center; margin-left: 20px; margin-right: auto; font-size: x-large; ">
                    <li class="nav-item" style="margin-left: 40px;">
                        <a class="nav-link text-white " href="/main">HOME</a>
                    </li>
                    <li class="nav-item" style ="margin-left: 100px;">
                        <a class="nav-link text-white " href="/introduction-facilities">기숙사 소개</a>
                    </li>
                    <li class="nav-item" style ="margin-left: 100px;">
                        <a class="nav-link text-white" href="/community" >커뮤니티</a>
                    </li>
                    <li class="nav-item" style ="margin-left: 100px;">
                        <a class="nav-link text-white" href="/student-sleepout">학생생활</a>
                    </li>
                    <li class="nav-item" style ="margin-left: 100px;">
                        <a class="nav-link text-white" href="/mypage-myinformation">마이페이지</a>
                    </li>
                </ul>
            </div>
        </nav>
        <div class="grid">
            <div class = "row" style =" margin-top: 30px;">
                <div class = "col-sm-2" >
                    <nav class="navbar " style="border-collapse: collapse; background-color: rgb(31, 34, 80); text-align: center;">
                        <ul class="navbar-nav" style="text-align: center; margin-left: auto; margin-right: auto; height: 40em;" >
                            <li class="nav-item" >
                                <a class="nav-link text-white" href="/student-sleepout" style="font-size: 23px;
                                border-bottom:solid 2px white; margin-bottom: 40px;">학생생활</a>
                            </li>
                            <li class="nav-item">
                                <a class="list-clicked text-white" href="/student-sleepout" style="font-size: large;">외박 신청</a>
                            </li>
                            <br>
                            <li class="nav-item">
                                <a class="list-clicked text-white" href="/student-breakdown" style="font-size: large;">고장 신고</a>
                            </li>
                            <br>
                            <li class="nav-item">
                                <a class="list-clicked text-white" href="/student-menu" style="font-size: large;">식단표</a>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div class ="col-sm-10">
                    <!-- 페이지 제목 -->
                    <div style="font-size: xxx-large; margin-top: 20px; color: darkslategrey;" >고장 신고</div>
                    <!-- 페이지 경로 -->
                    <div style = "font-size: medium; margin-top: 20px; text-align: right; color: darkslategrey;">home/학생생활/고장 신고</div>
                    <!-- 검색창 -->
                    <div style="display:inline-block; margin-left: 36em; margin-top: 30px;">
                        <select name="subjects" style="height:2em; font-size: medium; font-family: "Last Ninja", Impact, fantasy; ">
                            <option value="1" selected>제목</option>
                            <option value="2">작성자</option>
                            <option value="2">작성일</option>
                        </select>
                        <input type="search" style="height:2em;" name="search">
                        <input type="submit" class="btn btn" value="검색" style="background-color: rgb(31, 34, 80);color:white;">
                    </div>

                    <div style=" margin-top:10px; font-size:20px; height: 30px;">
                        <table style="background-color: rgb(207, 237, 247); color:black; font-size: large;">
                            <tr>
                                <td width="100">번호</td>
                                <td width="100">동호실</td>
                                <td width="600">제목</td>
                                <td width="100">작성자</td>
                                <td width="200">작성일</td>
                            </tr>
                        </table>
                    </div>

                    <div style=" margin-top:5px; font-size:20px; height: 30px;">
                        <table class = "table table-hover" style="background-color: rgb(238, 248, 252); color:black; font-size: medium;">
                            <tbody>`



var break_down2_1 =               `<tr>
                                    <td width="100"><form name="sleep`
var break_down2_2 =`" action="/break_to" method="post"><textarea style="background-color: rgb(238, 248, 252); border:none; resize:none;" cols=1 rows=1 onclick="document.sleep`
var break_down2_3 =`.submit();"
name="message" value="value">`
var break_down3 =               `</textarea></form></td>
                                    <td width="100">`
var break_down4 =               `</td>
                                    <td width="600">`
var break_down5 =               `</td>
                                    <td width="100">`
var break_down6 =               `</td>
                                    <td width="200">`
var break_down7 =               `</td>
                                </tr>
                            </tbody>
                        </table>
                        <button type="button" class="btn btn" onclick="location.href='/student-breakdown-write'"
                        style="background-color: rgb(31, 34, 80);color:white; margin-top: 20px; ">글 작성</button>
                    </div>
                </div>
            </div>
        </div>
        <footer class="footer text-center text-secondary" style="margin-top: 20px;">
            <div class="land_copyright">
                <p>Soongsil University<br>SMART SYSTEM SOFTWARE - 2020 WEB PROGRAMING TEAM 1</p>
            </div>
        </footer>
    </body>
</html>`

var BD_content1 = `<!DOCTYPE html>
<html>
    <head>
        <title>고장 신고</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    </head>

    <body class="container p-0 my-0 text-center" style = "background-color: rgb(250, 250, 240); font-family: "Last Ninja", Impact, fantasy; ">
        <div class ="row">
            <div class ="col-sm-2"><a href="/main"><img src="/imgs/logo" class="main" href="/main" style = "margin-top:70px;"></a></div>
                <div class = "col-sm-10"><img src="/imgs/dorm" class="main" style = "margin-top:70px; height:150px; float: right;"></div>
            </div>

            <nav class ="navbar navbar-expand-sm " style="margin-top:40px; background-color: rgb(31, 34, 80); ">
                <div class="collapse navbar-collapse" id="collapsibleNavbar" style ="background-color: rgb(31, 34, 80);">
                    <ul class="navbar-nav " style="text-align: center; margin-left: 20px; margin-right: auto; font-size: x-large; ">
                        <li class="nav-item" style="margin-left: 40px;">
                            <a class="nav-link text-white " href="/main" >HOME</a>
                        </li>
                        <li class="nav-item" style ="margin-left: 100px;">
                            <a class="nav-link text-white " href="/introduction-facilities" >기숙사 소개</a>
                        </li>
                        <li class="nav-item" style ="margin-left: 100px;">
                            <a class="nav-link text-white" href="/community" >커뮤니티</a>
                        </li>
                        <li class="nav-item" style ="margin-left: 100px;">
                            <a class="nav-link text-white" href="/student-sleepout">학생생활</a>
                        </li>
                        <li class="nav-item" style ="margin-left: 100px;">
                            <a class="nav-link text-white" href="/mypage-myinformation">마이페이지</a>
                        </li>
                    </ul>
                </div>
            </nav>
            <div class="grid">
                <div class = "row" style =" margin-top: 30px;">
                    <div class = "col-sm-2" >
                        <nav class="navbar " style="border-collapse: collapse; background-color: rgb(31, 34, 80); text-align: center;">
                            <ul class="navbar-nav" style="text-align: center; margin-left: auto; margin-right: auto; height: 40em;" >
                                <li class="nav-item" >
                                    <a class="nav-link text-white" href="/student-sleepout" style="font-size: 23px;
                                    border-bottom:solid 2px white; margin-bottom: 40px;">학생생활</a>
                                </li>
                                <li class="nav-item">
                                    <a class="list-clicked text-white" href="/student-sleepout" style="font-size: large; ">외박 신청</a>
                                </li>
                                <br>
                                <li class="nav-item">
                                    <a class="list-clicked text-white" href="/student-breakdown" style="font-size: large;">고장 신고</a>
                                </li>
                                <br>
                                <li class="nav-item">
                                    <a class="list-clicked text-white" href="/student-menu" style="font-size: large;">식단표</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
    
                    <!-- Content -->
                    <div class ="col-sm-10">
                        <!-- 페이지 제목 -->
                        <div style="font-size: xxx-large; margin-top: 20px; color: darkslategrey;" >고장 신고 정보</div>
                   
                        <!-- 페이지 경로 -->
                       <div style = "font-size: medium; margin-top: 20px; text-align: right; color: darkslategrey;">home/학생생활/고장 신고/고장 신고 정보</div>
                       
                       <!-- 내용 -->
                       <div class ="container">
                           <table class="table table-bordered " style="margin-top: 30px; border:solid 5px rgb(31, 34, 80); background-color:rgb(232, 236, 248); height: 400px;" >
                               <tbody>
                                   <tr>
                                       <td style = "font-size: large; vertical-align: middle; text-align: center; width: 250px; border-right:double 10px rgb(31, 34, 80); ">
                                           제목
                                       </td>
                                       <td style = "font-size: large; vertical-align: middle; text-align: center;">`

var BD_content2 =                     `</td>
                                   </tr>
                                   <tr>
                                       <td style = "font-size: large; vertical-align: middle; text-align: center; width: 250px; border-right:double 10px rgb(31, 34, 80);">
                                           작성자
                                       </td>
                                       <td style = "font-size: large; vertical-align: middle; text-align: center;">`

var BD_content3 =                     `</td>
                                   </tr>
                                   <tr>
                                       <td style = "font-size: large; vertical-align: middle; text-align: center; width: 250px; border-right:double 10px rgb(31, 34, 80);">
                                           동 / 호수
                                       </td>
                                       <td style = "font-size: large; vertical-align: middle; text-align: center;">` 

var BD_content4 =                     `</td>
                                   </tr>
                                   <tr>
                                       <td style = "font-size: large; vertical-align: middle; text-align: center; width: 250px; border-right:double 10px rgb(31, 34, 80);">
                                           내용
                                       </td>
                                       <td style = "font-size: large; vertical-align: middle; text-align: center;"> `

var BD_content5 =                     `</td>
                                   </tr>
                                   <tr>
                                       <td style = "font-size: large; vertical-align: middle; text-align: center; width: 250px; border-right:double 10px rgb(31, 34, 80);">
                                           작성일
                                       </td>
                                       <td style = "font-size: large; vertical-align: middle; text-align: center;"> `
 
var BD_content6 =                   `</td>
                                </tr>
                               </tbody>
                           </table>
                       </div>
       
                   </div>
                </div>
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
    if(session.login_check==0) res.send(main_a_1+main_a_2+login+main_b);
    else res.send(main_a_1+main_a_2+login_2_1+session.login_name+login_2_2+session.login_id+login_2_3+main_b);
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
                student_dongho = result[0].dongho;
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
})

app.get('/breakdown-content', function(req, res){
    //res.send(sleepout_reason_to);
    //if(sleepout_reason_to=="2")res.send(1);
    //var int_sleepout_reason_to=parseInt(sleepout_reason_to);
    var name, dong, ho, title, content, calendar;
    var sql='SELECT * FROM breakdown WHERE idx=?'
    con.query(sql, [sleepout_reason_to], function (err, result) {
        if (err) throw err;
        
        name = result[0].name;
        dong = result[0].dong;
        ho = result[0].ho;
        title = result[0].title;
        content = result[0].content;
        calendar = result[0].calender;

        res.send(BD_content1+title+BD_content2+name+BD_content3+calendar+BD_content4+content+BD_content5+calendar+BD_content6);
    });

});

app.get('/test4', function(req, res){
    res.send(BD_content1+'title'+BD_content2+'writer'+BD_content3+'addr'+BD_content4+'bd_content'+BD_content5+'date1'+BD_content6);
});
app.get('/sleepout-content', function(req, res){
    //res.send(sleepout_reason_to);
    //if(sleepout_reason_to=="2")res.send(1);
    //var int_sleepout_reason_to=parseInt(sleepout_reason_to);
    var name, dong, ho, homein, homeout, tel, reason, calendar;
    var sql='SELECT * FROM sleepout WHERE idx=?'
    con.query(sql, [sleepout_reason_to], function (err, result) {
        if (err) throw err;
        
        name = result[0].name;
        dong = result[0].dong;
        ho = result[0].ho;
        homein = result[0].homein;
        homeout = result[0].homeout;
        tel = result[0].telephone;
        reason = result[0].reason;
        calendar = result[0].calendar;

        res.send(SO_content1+name+SO_content2+dong+"동 "+ho+"호"+SO_content3+homeout
        +SO_content4+homein+SO_content5+tel+SO_content6+reason+SO_content7+calendar+SO_content8);
    });

});

app.get('/logout', function(req, res){
    session.login_check=0;
    if(session.login_check==0) res.send(main_a_1+main_a_2+login+main_b);
    else res.send(main_a_1+main_a_2+login_2_1+session.login_name+login_2_2+login_2_3+main_b);
});
// 로그아웃 처리 - 세션 삭제 후 리다이렉트
//정적파일_login안해도 들어갈 수 있음
app.get('/introduction-facilities',function(req,res){
    fs.readFile('introduction-facilities.html',function(error,data){
        res.writeHead(200, {'Content-Type':'text/html'});
        res.end(data);
    })
});

app.post('/break_to', function(req, res){
    sleepout_reason_to=req.body.message;
    res.redirect("/breakdown-content");
});

app.post('/sleep_to', function(req, res){
    sleepout_reason_to=req.body.message;
    res.redirect("/sleepout-content");
});


app.get('/login',function(req,res){
    fs.readFile('login.html',function(error,data){
        res.writeHead(200, {'Content-Type':'text/html'});
        res.end(data);
    })
});

app.get('/student-breakdown',function(req,res){
    session.login_to="breakdown";
    if(session.login_check==0){
        fs.readFile('login.html',function(error,data){
            res.writeHead(200, {'Content-Type':'text/html'});
            res.end(data);
        })    
    }
    else{
        var full;
        var sql = 'SELECT * FROM breakdown'
        con.query(sql, function (err, rows, feilds) {
            if (err) throw err;
            full = break_down1;
            i=0;
            for(var i = rows.length-1; i >-1; i--) {
                breakdown_idx = rows[i].idx;
                breakdown_name = rows[i].name;
                breakdown_dong = rows[i].dong;
                breakdown_ho = rows[i].ho;
                breakdown_title = rows[i].title;
                
                breakdown_content = rows[i].content;
                breakdown_calendar = rows[i].calender;
                
                

                // student-sleepout.html에 줄 추가하기
                full += break_down2_1+breakdown_idx+break_down2_2+breakdown_idx+break_down2_3+breakdown_idx+break_down3+breakdown_dong+"동 "+breakdown_ho+"호"+
                break_down4+breakdown_title+break_down5+breakdown_name+break_down6+breakdown_calendar;
            }
            full += break_down7; 
            res.send(full);
        });
    }
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
        var full;
        var sql = 'SELECT * FROM sleepout'
        con.query(sql, function (err, rows, feilds) {
            if (err) throw err;
            full = sleep_out1;
            i=0;
            for(var i = rows.length-1; i >-1; i--) {
                sleepout_idx = rows[i].idx;
                sleepout_name = rows[i].name;
                sleepout_dong = rows[i].dong;
                sleepout_ho = rows[i].ho;
                sleepout_homeout = rows[i].homeout;
                sleepout_homein = rows[i].homein;
                sleepout_reason = rows[i].reason;
                sleepout_calendar = rows[i].calendar;
                sleepout_tel = rows[i].telephone;
                

                // student-sleepout.html에 줄 추가하기
                full += sleep_out2_1+sleepout_idx+sleep_out2_2+sleepout_idx+sleep_out2_3+sleepout_idx+sleep_out3+sleepout_name+sleep_out4+sleepout_dong+"동 "+sleepout_ho+"호"
                +sleep_out5+sleepout_homeout+sleep_out6+sleepout_homein+sleep_out7+sleepout_tel+sleep_out8+sleepout_reason+sleep_out9+sleepout_calendar;
            }
            full += sleep_out10; 
            res.send(full);
        });
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
        res.send(mypage_1 + mypage_2 + "아이디" + mypage_3 + student_id + mypage_4 + mypage_2 + "이메일" + mypage_3 + student_email +
            mypage_4 + mypage_2 + "이름" + mypage_3 + student_name + mypage_4 + mypage_2 + "동 / 호" + mypage_3 + student_dongho +
            mypage_4 + mypage_2 + "생일" + mypage_3 + student_birthday + mypage_4 + mypage_2 + "주소" + mypage_3 + student_home + mypage_4 + mypage_5);
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

app.get('/community-content1',function(req,res){
    if(session.login_check==0){
        session.login_to="community"
        fs.readFile('login.html',function(error,data){
            res.writeHead(200, {'Content-Type':'text/html'});
            res.end(data);
        })    
    }
    else{
        fs.readFile('community-content1.html',function(error,data){
            res.writeHead(200, {'Content-Type':'text/html'});
            res.end(data);
        })
    }
});

app.get('/community-content2',function(req,res){
    if(session.login_check==0){
        session.login_to="community"
        fs.readFile('login.html',function(error,data){
            res.writeHead(200, {'Content-Type':'text/html'});
            res.end(data);
        })    
    }
    else{
        fs.readFile('community-content2.html',function(error,data){
            res.writeHead(200, {'Content-Type':'text/html'});
            res.end(data);
        })
    }
});

app.get('/community-content3',function(req,res){
    if(session.login_check==0){
        session.login_to="community"
        fs.readFile('login.html',function(error,data){
            res.writeHead(200, {'Content-Type':'text/html'});
            res.end(data);
        })    
    }
    else{
        fs.readFile('community-content3.html',function(error,data){
            res.writeHead(200, {'Content-Type':'text/html'});
            res.end(data);
        })
    }
});

app.get('/community-content4',function(req,res){
    if(session.login_check==0){
        session.login_to="community"
        fs.readFile('login.html',function(error,data){
            res.writeHead(200, {'Content-Type':'text/html'});
            res.end(data);
        })    
    }
    else{
        fs.readFile('community-content4.html',function(error,data){
            res.writeHead(200, {'Content-Type':'text/html'});
            res.end(data);
        })
    }
});

app.get('/community-content5',function(req,res){
    if(session.login_check==0){
        session.login_to="community"
        fs.readFile('login.html',function(error,data){
            res.writeHead(200, {'Content-Type':'text/html'});
            res.end(data);
        })    
    }
    else{
        fs.readFile('community-content5.html',function(error,data){
            res.writeHead(200, {'Content-Type':'text/html'});
            res.end(data);
        })
    }
});

app.get('/community-content6',function(req,res){
    if(session.login_check==0){
        session.login_to="community"
        fs.readFile('login.html',function(error,data){
            res.writeHead(200, {'Content-Type':'text/html'});
            res.end(data);
        })    
    }
    else{
        fs.readFile('community-content6.html',function(error,data){
            res.writeHead(200, {'Content-Type':'text/html'});
            res.end(data);
        })
    }
});

app.get('/community-content7',function(req,res){
    if(session.login_check==0){
        session.login_to="community"
        fs.readFile('login.html',function(error,data){
            res.writeHead(200, {'Content-Type':'text/html'});
            res.end(data);
        })    
    }
    else{
        fs.readFile('community-content7.html',function(error,data){
            res.writeHead(200, {'Content-Type':'text/html'});
            res.end(data);
        })
    }
});

app.get('/login-fail',function(req,res){
    res.send(main_a_1+main_alert+main_a_2+login+main_b);
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
    
app.get('/imgs/dorm',function(req,res){
    fs.readFile('./image/dorm.png',function(error,data){
        res.writeHead(200, {'Content-Type':'text/html'});
        res.end(data);
    })
});

app.get('/imgs/dorm',function(req,res){
    fs.readFile('./image/dorm.png',function(error,data){
        res.writeHead(200, {'Content-Type':'text/html'});
        res.end(data);
    })
});

app.get('/imgs/icon_map',function(req,res){
    fs.readFile('./image/icon_map.png',function(error,data){
        res.writeHead(200, {'Content-Type':'text/html'});
        res.end(data);
    })
});

app.get('/imgs/login',function(req,res){
    fs.readFile('./image/login.png',function(error,data){
        res.writeHead(200, {'Content-Type':'text/html'});
        res.end(data);
    })
});

app.get('/imgs/login2',function(req,res){
    fs.readFile('./image/login2.png',function(error,data){
        res.writeHead(200, {'Content-Type':'text/html'});
        res.end(data);
    })
});

app.get('/imgs/icon_sleepout',function(req,res){
    fs.readFile('./image/icon_sleepout.png',function(error,data){
        res.writeHead(200, {'Content-Type':'text/html'});
        res.end(data);
    })
});

app.get('/imgs/icon_breakdown',function(req,res){
    fs.readFile('./image/icon_breakdown.png',function(error,data){
        res.writeHead(200, {'Content-Type':'text/html'});
        res.end(data);
    })
});

app.get('/imgs/icon_menu',function(req,res){
    fs.readFile('./image/icon_menu.png',function(error,data){
        res.writeHead(200, {'Content-Type':'text/html'});
        res.end(data);
    })
});

app.get('/imgs/person',function(req,res){
    fs.readFile('./image/person.png',function(error,data){
        res.writeHead(200, {'Content-Type':'text/html'});
        res.end(data);
    })
});

app.get('/imgs/logo',function(req,res){
    fs.readFile('./image/logo.png',function(error,data){
        res.writeHead(200, {'Content-Type':'text/html'});
        res.end(data);
    })
});
    
app.get('/imgs/livingroom',function(req,res){
    fs.readFile('./image/livingroom.jpg',function(error,data){
        res.writeHead(200, {'Content-Type':'text/html'});
        res.end(data);
    })
});
    
app.get('/imgs/laundryroom',function(req,res){
    fs.readFile('./image/laundryroom.jpg',function(error,data){
        res.writeHead(200, {'Content-Type':'text/html'});
        res.end(data);
    })
});


app.get('/imgs/gym',function(req,res){
    fs.readFile('./image/gym.jpg',function(error,data){
        res.writeHead(200, {'Content-Type':'text/html'});
        res.end(data);
    })
});
    
app.get('/imgs/restaurant',function(req,res){
    fs.readFile('./image/restaurant.jpg',function(error,data){
        res.writeHead(200, {'Content-Type':'text/html'});
        res.end(data);
    })
});
    
app.get('/imgs/map',function(req,res){
    fs.readFile('./image/map.jpg',function(error,data){
        res.writeHead(200, {'Content-Type':'text/html'});
        res.end(data);
    })
});
    
app.get('/introduction-map',function(req,res){
    fs.readFile('introduction-map.html',function(error,data){
        res.writeHead(200, {'Content-Type':'text/html'});
        res.end(data);
    })
});
app.get('/findid_alert',function(req,res){
    fs.readFile('findid_alert.html',function(error,data){
        res.writeHead(200, {'Content-Type':'text/html'});
        res.end(data);
    })
});

app.get('/login-alert',function(req,res){
    fs.readFile('login-alert.html',function(error,data){
        res.writeHead(200, {'Content-Type':'text/html'});
        res.end(data);
    })
});

app.get('/student-sleepout-write',function(req,res){
    if(session.login_check==0){
        fs.readFile('login.html',function(error,data){
            res.writeHead(200, {'Content-Type':'text/html'});
            res.end(data);
        })    
    }
    else{
        // 해당 idx와 일치하는 data 가져오기 (버튼누르면 글 새로 작성, 글을 누르면 그 글이 써진 table출력)

        fs.readFile('student-sleepout-write.html',function(error,data){
            res.writeHead(200, {'Content-Type':'text/html'});
            res.end(data);
        })
    }
});


// app.post('/student_sleepout',function(req,res){
//     if(session.login_check==0){
//         fs.readFile('login.html',function(error,data){
//             res.writeHead(200, {'Content-Type':'text/html'});
//             res.end(data);
//         })    
//     }
//     else{
//         var sql = 'select * from sleepout'
//         con.query(sql, function (err, result) {
//             if (err) throw err;
    
            
//         });
//         fs.readFile('student_sleepout.html',function(error,data){
//             res.writeHead(200, {'Content-Type':'text/html'});
//             res.end(data);
//         })
//     }
// });

app.get('/student-breakdown-write',function(req,res){
    if(session.login_check==0){
        fs.readFile('login.html',function(error,data){
            res.writeHead(200, {'Content-Type':'text/html'});
            res.end(data);
        })    
    }
    else{
        // 해당 idx와 일치하는 data 가져오기 (버튼누르면 글 새로 작성, 글을 누르면 그 글이 써진 table출력)

        fs.readFile('student-breakdown-write.html',function(error,data){
            res.writeHead(200, {'Content-Type':'text/html'});
            res.end(data);
        })
    }
    });




app.get('/student-menu',function(req,res){
    session.login_to="menu";
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

app.get('/', function(req, res){
    delete req.session.displayName;
    res.redirect('/main');
});



// 로그인 처리 - 아이디와 패스워드 비교해서 일치하면 세션에 값을 부여하고 리다이렉트
app.post('/login_transfer', function(req, res){
    var uname = req.body.id;
    var pwd = req.body.pwd;
    var sql = 'SELECT * FROM student WHERE id=?'
    con.query(sql, [uname], function (err, result) {
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
                student_dongho = result[0].dongho;
                student_birthday = result[0].birthday;
                student_home = result[0].home;
                session.login_id=student_id;
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
    var uname = req.body.id;
    var pwd = req.body.pwd;
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
                student_dongho = result[0].dongho;
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
                else if(session.login_to=="breakdown"){
                    res.redirect('/student-breakdown');
                }
                else if(session.login_to=="menu"){
                    res.redirect('/student-menu');
                }
            }
            else {
                res.redirect('/login-alert');
            }
        }
    });
});

// app.post('/findid', function(req, res){
//     var uname = req.body.id;
//     var pwd = req.body.pwd;
//     var sql = 'SELECT * FROM student WHERE id=?'
//     con.query(sql, [uname], function (err, result) {
//     // con.query("insert into breakdown values ('2','A','1','asdfsadf','T','sadfklsdf','2020-11-24',1)", function (err, result, fields) {
//         if (err) throw err;
        
//         // 로그인 목록에 있는지 확인
//         if(!result[0]) {
//             res.redirect('/findid_alert');
//         }
//         else{
//             // 로그인 목록에 있으면 비밀번호 일치하는지 확인
//             if(pwd === result[0].password) {
//                 // 로그인 성공하면 변수에 사용자 정보 채워주기
//                 student_id = result[0].id;
//                 student_password = result[0].password;
//                 student_email = result[0].email;
//                 student_name = result[0].name;
//                 student_dongho = result[0].dongho;
//                 student_birthday = result[0].birthday;
//                 student_home = result[0].home;

//                 session.login_password = result[0].password;
//                 session.login_name = result[0].name;

//                 session.login_check=1;
//                 if(session.login_to=="mypage"){
//                     res.redirect('/mypage-myinformation');
//                 }
//                 else if(session.login_to=="community"){
//                     res.redirect('/community');
//                 }
//                 else if(session.login_to=="sleepout"){
//                     res.redirect('/student-sleepout');
//                 }
//                 else if(session.login_to=="breakdown"){
//                     res.redirect('/student-breakdown');
//                 }
//                 else if(session.login_to=="menu"){
//                     res.redirect('/student-menu');
//                 }
//                 res.redirect('/findid_content');
//             }
//             else {
//                 res.redirect('/findid_alert');
//             }
//         }
//     });
// });

app.post('/through_sleepout', function(req, res){
    var name=student_name;
    var tel=req.body.telephone;
    var from=req.body.from;
    var to=req.body.to;
    var reason = req.body.reason;
    
    var dong=student_dongho[0];
    var ho=student_dongho[3];
    var cal = moment().format("YYYY-MM-DD");

    var sql = 'insert into sleepout(name, dong, ho, homeout, homein, reason, calendar, telephone) values (?, ?, ?, ?, ?, ?, ?, ?)'
    con.query(sql, [name, dong, ho, from, to, reason, cal, tel], function (err, result) {
        if (err) throw err;
    });

    res.redirect('/student-sleepout');
});

app.post('/through_breakdown', function(req, res){
    var dong=student_dongho[0];
    var ho=student_dongho[3];
    var name=student_name;
    var title = req.body.title;
    var content = req.body.content;
    console.log(content);
    var cal = moment().format("YYYY-MM-DD");

    var sql = 'insert into breakdown(dong, ho, name, title, content, calender) values (?, ?, ?, ?, ?, ?)'
    con.query(sql, [dong, ho, name, title, content, cal], function (err, result) {
        if (err) throw err;
    });

    res.redirect('/student-breakdown');
});

app.post('/findid', function(req, res){
    var name=req.body.user_name;
    var num=req.body.user_phonenum;
    var sql = 'SELECT * FROM student WHERE name=?'
    con.query(sql, [name], function (err, result) {
        if (err) throw err;
        
        // 회원가입이 안된 경우
        if(!result[0]) {
            res.redirect('/findid_alert');
        }

        else{
            // 회원이고 전화번호도 맞았을 경우
            if(num === result[0].dongho) {
                find_student_id = result[0].id;
                find_student_password = result[0].password;
                res.redirect('/find');
                // 
            }
            // 회원인데 전화번호가 틀렸을 경우 -> 다시 입력
            else {
                res.redirect('/findid_alert');
            }
        }
    });
});

app.get('/find', function(req, res){
    delete req.session.displayName;
    
    res.send(show_id_1+find_student_id+show_id_2+find_student_password+show_id_3);
});

app.listen(3003, function(){
    console.log('Connected 3003 port!!!');
});