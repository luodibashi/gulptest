// JavaScript Document
var app = angular.module('teacherApp', ['ngRoute', 'myServices', 'myFilter', 'ngCookies']);
//定义接口地址全局变量
var api_url = "http://115.29.177.200:8080";
var withoutToken = {
  // PUT: [api_url + '/teacher', api_url + '/login', api_url + '/user/activate/email'],
  // GET: [api_url + '/captcha'],
  // PATCH: [api_url + '/user/reset/password', api_url + '/user/activate']
  POST: [api_url + '/login'],
  GET: [api_url + '/image/code']
};

//配置初始化
app.config(['$filterProvider', '$routeProvider', '$httpProvider', '$sceDelegateProvider', function($filterProvider, $routeProvider, $httpProvider, $sceDelegateProvider) {
  //配置路由
  $routeProvider.when('/login', {
    templateUrl: './views/login/login.html'
  }); //指向登录
  $routeProvider.when('/register', {
    templateUrl: './views/register/register.html'
  }); //注册
  $routeProvider.when('/prompt', {
    templateUrl: './views/validate/prompt.html'
  });
  $routeProvider.when('/validation', {
    templateUrl: './views/validate/validation.html'
  });
  $routeProvider.when('/activate', {
    templateUrl: './views/validate/activate.html'
  }); //激活链接跳转
  $routeProvider.when('/sendmail', {
    templateUrl: './views/forgot/sendMail.html'
  }); //验证邮箱
  $routeProvider.when('/tips', {
    templateUrl: './views/forgot/tips.html'
  });
  $routeProvider.when('/repassword', {
    templateUrl: './views/forgot/repassword.html'
  }); //重置密码
  $routeProvider.when('/validate', {
    templateUrl: './views/forgot/validate.html'
  }); //验证邮箱
  $routeProvider.when('/index', {
    templateUrl: './views/index/index.html'
  }); //首页
  $routeProvider.when('/class/list', {
    templateUrl: './views/class/list.html'
  }); //班级列表
  $routeProvider.when('/class/public', {
    templateUrl: './views/class/public.html'
  }); //公共班级
  $routeProvider.when('/class/live', {
    templateUrl: './views/class/live.html'
  }); //班级直播
  $routeProvider.when('/class/create', {
    templateUrl: './views/class/create.html'
  }); //创建班级
  $routeProvider.when('/class/createSuccess/:cid', {
    templateUrl: './views/class/createSuccess.html'
  }); //创建班级
  $routeProvider.when('/class/members/:cid', {
    templateUrl: './views/class/members.html'
  }); //班级成员
  $routeProvider.when('/class/blacklist/:cid', {
    templateUrl: './views/class/blacklist.html'
  }); //班级黑名单
  $routeProvider.when('/class/represent/:cid', {
    templateUrl: './views/class/represent.html'
  }); //班级助教
  $routeProvider.when('/class/record/:cid', {
    templateUrl: './views/class/record.html'
  }); //班级作业记录
  $routeProvider.when('/class/result/:cid/:wid', {
    templateUrl: './views/class/result.html'
  }); //班级某次作业详情
  $routeProvider.when('/class/modify/:cid', {
    templateUrl: './views/class/modify.html'
  }); //修改班级信息
  $routeProvider.when('/class/permission/:cid', {
    templateUrl: './views/class/permission.html'
  }); //班级某权限配置
  $routeProvider.when('/class/questionbank/:cid', {
    templateUrl: './views/class/questionbank.html'
  }); //班级题库
  $routeProvider.when('/class/personinfo/:cid/:uid', {
    templateUrl: './views/class/personinfo.html'
  }); //班级学员个人信息
  $routeProvider.when('/paper/list/:type', {
    templateUrl: './views/paper/list.html'
  }); //习题列表
  $routeProvider.when('/paper/public', {
    templateUrl: './views/paper/public.html'
  }); //公共习题库 
  $routeProvider.when('/paper/publish/:pid/:gid', {
    templateUrl: './views/paper/publish.html'
  }); //习题发布编辑
  $routeProvider.when('/paper/name', {
    templateUrl: './views/paper/name.html'
  }); //录入习题
  $routeProvider.when('/paper/tag', {
    templateUrl: './views/paper/tag.html'
  }); //试卷标签
  $routeProvider.when('/paper/name/:pid', {
    templateUrl: './views/paper/name.html'
  }); //修改习题名
  $routeProvider.when('/paper/input/:pid', {
    templateUrl: './views/paper/input.html'
  }); //录入习题
  $routeProvider.when('/paper/edit/:pid', {
    templateUrl: './views/paper/edit.html'
  }); //编辑习题
  $routeProvider.when('/paper/editor/:pid', {
    templateUrl: './views/paper/editor.html'
  }); //编辑习题
  $routeProvider.when('/paper/preview/:pid', {
    templateUrl: './views/paper/preview.html'
  }); //试卷预览
  $routeProvider.when('/paper/wxpreview/:pid', {
    templateUrl: './views/paper/wxPreview.html'
  }); //微信预览
  $routeProvider.when('/paper/goodspreview/:pid/:gid', {
    templateUrl: './views/paper/goodsPreview.html'
  }); //商品预览
  $routeProvider.when('/paper/complete/:pid', {
    templateUrl: './views/paper/complete.html'
  }); //敲定试卷
  $routeProvider.when('/paper/export/:pid', {
    templateUrl: './views/paper/export.html'
  });
  $routeProvider.when('/work/list', {
    templateUrl: './views/work/list.html'
  }); //作业列表
  $routeProvider.when('/work/arrange', {
    templateUrl: './views/work/arrange.html'
  }); //作业安排
  $routeProvider.when('/work/arrange/:pid/:gid', {
    templateUrl: './views/work/arrange.html'
  }); //从试卷列表跳转至布置作业
  $routeProvider.when('/work/detail/:wid', {
    templateUrl: './views/work/detail.html'
  }); //作业详情
  $routeProvider.when('/work/correct/:workId', {
    templateUrl: './views/work/correct.html'
  }); //作业批改
  $routeProvider.when('/setting', {
    templateUrl: './views/setting/setting.html'
  }); //系统设置
  $routeProvider.when('/password', {
    templateUrl: './views/setting/password.html'
  }); //密码设置
  $routeProvider.when('/account', {
    templateUrl: './views/setting/account.html'
  }); //账户设置
  $routeProvider.otherwise({
    redirectTo: '/index'
      // templateUrl: './views/index/index.html'
  });

  //注入http服务的拦截器
  $httpProvider.interceptors.push('myInterceptor');
  //设置http headers的参数
  // $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  //设置跨资源白名单
  $sceDelegateProvider.resourceUrlWhitelist(['self', '**']);
}]);


// 拦截器 拦截错误请求，发送弹框消息
app.factory('myInterceptor', ['$rootScope', '$cookieStore', function($rootScope, $cookieStore) {
  var interceptor = {
    'request': function(req) {
      if ($cookieStore.get("user")) {
        var token = $cookieStore.get("user").token;
      };
      if (angular.isObject(req.url)) {
        req.url = req.url.url;
      }
      var url = req.url.split('?');
      if (req.url.indexOf(api_url) !== -1 && token) {
        if (withoutToken[req.method]) {
          var arr = withoutToken[req.method];
          for (var i = 0; i < arr.length; i++) {
            if (arr[i] != url[0]) {
              if (req.url.indexOf("?token=") == -1) {
                if (url.length == 2) {
                  req.url = req.url + '&token=' + token;
                } else {
                  req.url = req.url + '?token=' + token;
                }
              }
            }
          }
        } else {
          // 加 token
          if (url.length == 2) {
            req.url = req.url + '&token=' + token;
          } else if (url.length == 1) {
            req.url = req.url + '?token=' + token;
          }
        }

      }

      return req;
    },
    'requestError': function(reqErr) {
      // console.log(reqErr)
      return reqErr;
    },
    'response': function(response) {
      if (angular.isObject(response.data)) {
        var status = response.data.status;
        if (status === 0) {
          response.data = response.data.data;
          response.data.status = status;
        } else if(status === 2) {
          response.data = response.data.data;
          response.data.status = status;
        } else {
          alert(response.data.info);
        }
      }
      return response;
    },
  };
  return interceptor;
}]);

//构造方法
app.run(['$rootScope', '$location', '$window', "$cookieStore", function($rootScope, $location, $window, $cookieStore) {
  //监听DOM渲染完成
  $rootScope.$on('$viewContentLoaded', function() {
    $rootScope.location = $location.path();
  });
  /* 用户认证监听 stevensunqi */
  $rootScope.$on("$routeChangeStart", function() {
    var user = $cookieStore.get("user");
    if (user == undefined || typeof user != "object") {
      $location.path("/login");
    }
  });

}])

//登录页
app.controller('login', ['$scope', '$http', '$location', '$rootScope', '$cookies', 'mxxServices', function($scope, $http, $location, $rootScope, $cookies, mxxServices) {
  /*2016/03/07   sunqisteven */
  /*一年后被我改了!//zya!*/
  $cookies.remove("user");

  //检测是否存在cookie   user
  $scope.pass = $cookies.getObject("pass");

  $scope.refresh = function() {
    $http.get(api_url + "/image/code?w=100&h=40")
      .success(function(data) {
        $scope.image = data.image;
        $scope.key = data.codeKey;
      })
  };

  //刷新验证码
  $scope.refresh();

  //扫码登录
  var url = " https://open.weixin.qq.com/connect/qrconnect?appid=wxf305ea0876e9955e&redirect_uri=http%3A%2F%2Fwww.maixuexi.cn%2Fteacher%2F&response_type=code&scope=snsapi_login&state=WeChatScanCodeEntry#wechat_redirect";
  mxxServices.loginQrcode($("#wxQrcode"), url);

  //默认保存账号密码
  // $scope.isRemember = true;
  // $scope.remember = function() {
  //   $scope.isRemember = !$scope.isRemember;
  // };

  // if ($scope.isRemember && $scope.pass) {
  if ($scope.pass) {
    $scope.email = $scope.pass.email;
    $scope.password = $scope.pass.password;
  };

  //绑定键盘enter事件
  // document.onkeydown = function(ev) {
  //   var ev = ev || window.ev;
  //   if (ev.keyCode && ev.which == 13) {
  //     $scope.submit();
  //   }
  // };

  //匹配正则
  var accountExp = /^[a-zA-Z]\w+$/,
    phoneExp = /^1[34578]\d{9}$/,
    mailExp = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;

  $scope.submit = function() {
    if (!$scope.email || !$scope.password || !$scope.captcha) {
      alert("请填写完整后登录!");
      return;
    }

    //md5加密一击
    $scope.md5Pwd = hex_md5($scope.password);
    $scope.md5Pwd = $scope.md5Pwd.split('');
    $scope.md5Pwd[5] = $scope.password.charAt(0);
    $scope.md5Pwd[10] = $scope.password.charAt(1);
    $scope.md5Pwd[15] = $scope.password.charAt(2);

    var obj = {
      "clientType": 1,
      "userType": 1,
      "password": $scope.md5Pwd.join(''),
      "code": $scope.captcha,
      "codeKey": $scope.key
    };

    if (mailExp.test($scope.email)) {
      obj.email = $scope.email;
    } else if (phoneExp.test($scope.email)) {
      obj.phone = $scope.email;
    } else if (accountExp.test($scope.email)) {
      obj.account = $scope.email;
    } else {
      alert('登录信息不存在!');
      return;
    }
    $http.post(api_url + "/login", obj).success($scope.callback)
  }

  //接口调用成功 返回值执行逻辑
  $scope.callback = function(data) {
    if (data.status == 1) {
      $("#email").focus();
      $scope.refresh();
      return;
    } else if (data.status == 2) {
      $scope.captcha = '';
      $("#captcha").focus();
      $scope.refresh();
      return;
    } else if (data.status == 0) {
      $scope.tempToken = data.token;
      $scope.uid = data.uid;
      if (data.school && data.school.length == 1) {
        $http.post(api_url + '/login/in', {
          "sid": data.school[0].sid,
          "userType": 1,
          "token": data.token,
          "uid": data.uid
        }).success(function(res) {
          if (!res.status) {
            if (res.voucher) {
              window.location.href = "http://www.maixuexi.cn/completion.html?tid=" + res.tid + "&voucher=" + res.voucher;
            } else {
              // document.onkeydown = null;
              //记录登录时间
              $scope.loginTime = new Date().getTime();
              $cookies.put("loginTime", $scope.loginTime);
              var cookieDate = {};
              cookieDate.sid = res.schoolId;
              cookieDate.uid = res.uid;
              cookieDate.tid = res.tid;
              cookieDate.token = res.token;
              cookieDate.email = res.email;
              cookieDate.phone = res.phone;
              cookieDate.account = res.account;
              cookieDate.schoolName = res.schoolName;
              cookieDate.photo = res.photo;

              $cookies.putObject("user", cookieDate);
              if ($scope.isRemember) {
                var expireDate = new Date();
                expireDate.setDate(expireDate.getDate() + 30); //设置cookie保存30天
                $cookies.putObject("pass", { 'email': $scope.email, 'password': $scope.password }, { 'expires': expireDate });
              } else {
                $cookies.remove("pass");
              }

              //跳转首页
              $location.path("index");
            }
          }
        })
      } else if (data.school && data.school.length > 1) {
        $scope.schoolList = data.school;
      }
    }
  }

  //选择学校
  $scope.selected = function(id) {
    $scope.chooseSid = id;
  }
  $scope.confirm = function() {
    if (!$scope.chooseSid) {
      alert('请选择学校!');
      return;
    }
    $http.post(api_url + '/login/in', {
      "sid": $scope.chooseSid,
      "userType": 1,
      "token": $scope.tempToken,
      "uid": $scope.uid
    }).success(function(res) {
      if (!res.status) {
        if (res.voucher) {
          window.location.href = "http://www.maixuexi.cn/completion.html?tid=" + res.tid + "&voucher=" + res.voucher;
        } else {
          // document.onkeydown = null;
          //记录登录时间
          $scope.loginTime = new Date().getTime();
          $cookies.put("loginTime", $scope.loginTime);

          var cookieDate = {};
          cookieDate.sid = res.schoolId;
          cookieDate.uid = res.uid;
          cookieDate.tid = res.tid;
          cookieDate.token = res.token;
          cookieDate.email = res.email;
          cookieDate.phone = res.phone;
          cookieDate.account = res.account;
          cookieDate.schoolName = res.schoolName;
          cookieDate.teacherName = res.teacherName;
          $cookies.putObject("user", cookieDate);
          if ($scope.isRemember) {
            var expireDate = new Date();
            expireDate.setDate(expireDate.getDate() + 30); //设置cookie保存30天
            $cookies.putObject("pass", { 'email': $scope.email, 'password': $scope.password }, { 'expires': expireDate });
          } else {
            $cookies.remove("pass");
          }

          //跳转首页
          $location.path("index");
        }
      }
    })
  }


}]);

//首页
app.controller('index', ['$scope', '$http', '$location', '$rootScope', '$routeParams', '$filter', '$cookieStore', function($scope, $http, $location, $rootScope, $routeParams, $filter, $cookieStore) {
  $scope.userInfo = $cookieStore.get("user");
  $scope.loginTime = $cookieStore.get("loginTime");

  if ($scope.userInfo.tid == 0) {
    //跳转到教师补全信息页面
    $rootScope.activateUid = $scope.userInfo.uid;
    $rootScope.ishidden = 1;
    $location.path("register");
  };

  //获取url后面的查询字符串的值
  $scope.currentPage = $location.search().currentPage;

  if (!$scope.currentPage) {
    $scope.currentPage = 1;
  }

  //首页
  if ($scope.currentPage == 1) {
    $(".home").css("display", "none");
  }

  $http.get(api_url + "/teacher/report")
    .success(function(data) {
      if (!data.status) {
        $scope.classesInfo = data.class;
        $scope.worksInfo = data.work;
        $scope.papersInfo = data.testPaper;
      }
    });

  $scope.pageSize = 10; //每一页下的班级数
  $scope.pageLength = 7; //最多显示7页 设置为奇数
  $scope.offset = ($scope.pageLength + 1) / 2;
  $scope.getData = function() {
    $http.get(api_url + "/teacher/work/recently?page=" + $scope.currentPage + "&size=" + $scope.pageSize)
      .success(function(data) {
        if (!data.status) {
          $scope.worklist = data.workList;

          for (var i = 0; i < $scope.worklist.length; i++) {
            if ($scope.worklist[i].avgScore) {
              $scope.worklist[i].avgScore = $scope.worklist[i].avgScore.toString();
              var index = $scope.worklist[i].avgScore.indexOf('.');
              if (index != -1) {
                $scope.worklist[i].avgScore = $scope.worklist[i].avgScore.substring(0, index + 3);
              }
            }
          }

          $scope.currentPage = Number($scope.currentPage);

          $scope.count = data.count;
          //总分页数  向上取整
          $scope.num = Math.ceil($scope.count / $scope.pageSize);
          //最后一页时
          if ($scope.currentPage == $scope.num) {
            $(".final").css("display", "none");
          }

          $scope.pageNums = [];

          if ($scope.num > 1) { //分页
            if ($scope.currentPage >= $scope.offset) {
              if ($scope.currentPage + $scope.offset < $scope.num) {
                for (var i = $scope.currentPage - $scope.offset + 1; i < $scope.currentPage + $scope.offset; i++) {
                  $scope.pageNums.push(i);
                }
              } else if ($scope.num >= $scope.pageLength) {
                for (var i = $scope.num - $scope.pageLength; i < $scope.num; i++) {
                  $scope.pageNums.push(i);
                }
              } else {
                for (var i = 0; i < $scope.num; i++) {
                  $scope.pageNums.push(i);
                }
              }
            } else {
              if ($scope.num < $scope.pageLength) {
                for (var i = 0; i < $scope.num; i++) {
                  $scope.pageNums.push(i);
                }
              } else {
                for (var i = 0; i < $scope.pageLength; i++) {
                  $scope.pageNums.push(i);
                }
              }
            }
          } else {
            $(".final").css("display", "none");
            $(".home").css("display", "none");
          }
        }
      });
  };

  $scope.getData();

  //点击当前组织默认
  $scope.skip = function($event) {
    if ($event.target.className.indexOf("current") != -1) {
      return false;
    }
  }

}])

//班级管理
app.controller("classlist", ['$rootScope', '$scope', '$location', '$http', '$cookieStore', '$timeout', 'mxxServices', function($rootScope, $scope, $location, $http, $cookieStore, $timeout, mxxServices) {
  $scope.tid = $cookieStore.get("user").tid;
  $scope.currentPage = 1;
  $scope.pageSize = 9; //每一页下的班级数
  $scope.classTypeName = ['','公共班级','我的班级']

  // $scope.getData = function() {
  //   $http.get(api_url + "/teacher/class/owner?tid=" + $scope.tid + "&page=" + $scope.currentPage + "&size=" + $scope.pageSize)
  //     .success(function(data) {
  //       if (!data.status) {
  //         $scope.count = data.count;
  //         $scope.priviteClasses = data.classList;
  //         if ($scope.count == 0) {
  //           $scope.num = 1;
  //         } else {
  //           $scope.num = Math.ceil($scope.count / $scope.pageSize); //班级分页数向上取整
  //         }
  //       }

  //     })
  // };
  $scope.getData = function() {
    $http.get(api_url + "/teacher/class/list?tid=" + $scope.tid + "&page=" + $scope.currentPage + "&size=" + $scope.pageSize)
      .success(function(data) {
        if (!data.status) {
          $scope.count = data.count;
          $scope.priviteClasses = data.classList;
          // console.log($scope.priviteClasses);
          for (var i=0; i<$scope.priviteClasses.length; i++){
            if($scope.priviteClasses[i]['className'].length > 16){
              $scope.priviteClasses[i]['shortClassName'] = $scope.priviteClasses[i]['className'].substring(0,16)+'...';
            } else {
              $scope.priviteClasses[i]['shortClassName'] = $scope.priviteClasses[i]['className']
            }
          }
          // console.log($scope.priviteClasses);
          if ($scope.count == 0) {
            $scope.num = 1;
          } else {
            $scope.num = Math.ceil($scope.count / $scope.pageSize); //班级分页数向上取整
          }
        }

      })
  };
  //跳转
  $scope.linkToClass = function(cid) {
    //代表同意加入班级   此时才可以跳转到指定班级班级页面
    $location.path("class/members/" + cid)
  };

  //根据班级名称搜索指定班级
  $scope.search = function() {
    if (!$scope.className) {
      return;
    }
    $scope.currentPage = 1;
    $http.put(api_url + "/teacher/class/search?page=" + $scope.currentPage + "&size=" + $scope.pageSize, {
      "className": $scope.className,
      "type": 2,
      "tid": $scope.tid
    }).success(function(data) {
      $scope.className = '';
      $scope.count = data.count;
      if ($scope.count == 0) {
        alert("班级不存在")
      } else {
        $scope.priviteClasses = data.classList;
        $scope.num = Math.ceil($scope.count / $scope.pageSize); //班级分页数向上取整
      }
    })
  };

  document.onkeydown = function(ev) {
    var ev = ev || window.ev;
    if (ev.keyCode && ev.which == 13) {
      $scope.search();
    }
  };

  //鼠标经过操作按钮时触发
  $scope.mouse = {
    mouseover: function() {
      $(".handle-menu").css("display", "block")
    },
    mouseout: function() {
      $(".handle-menu").css("display", "none")
    }
  }

  //全选、反选
  $scope.isAllVisible = false; //默认不全选
  $scope.visible = {};
  $scope.allCheck = function() {
    if (!$scope.isAllVisible) {
      $scope.isAllVisible = true;
      // $scope.visible
      angular.forEach($scope.classlist, function(value, key, array) {
        $scope.visible[value.cid] = true;
      })
    } else {
      $scope.isAllVisible = false;
      $scope.visible = {};
    }
  };

  $scope.oneCheck = function(cid) {
    if ($scope.visible[cid]) {
      delete $scope.visible[cid];
      $scope.isAllVisible = false;
    } else {
      $scope.visible[cid] = true;
      var count = 0;
      for (key in $scope.visible) {
        count++;
      }
      if (count == $scope.classlist.length) {
        $scope.isAllVisible = true;
      }
    }
  };

  //删除指定班级
  $scope.delete = function() {
    var arr = [];
    for (key in $scope.visible) {
      arr.push(key)
    }
    if (arr.length == 0) {
      alert("请选择要删除的班级!");
      return;
    } else {
      var config = {
        method: "DELETE",
        url: api_url + '/class',
        data: { "cid": arr },
        headers: { "Content-Type": "application/json;charset=utf-8" }
      };
      $http(config).success(function(data) {
        if (!data.status) {
          $scope.getData();
          alert("删除班级成功!")
        }
      })
    }
  };

  //更改班级信息
  $scope.change = function() {
    var arr = [];
    for (key in $scope.visible) {
      arr.push(key)
    }
    if (arr.length != 1) {
      alert("请选择一个班级!");
      return;
    } else {
      $location.path("class/modify/" + arr[0])
    }
  }

}]);

//公共班级
app.controller('publicClass', ['$scope', '$http', 'mxxServices', '$cookieStore', '$location', function($scope, $http, mxxServices, $cookieStore, $location) {
  $scope.tid = $cookieStore.get("user").tid;
  //分页查询功能
  $scope.currentPage = 1;
  $scope.pageSize = 6; //每一页下的班级数

  // $scope.getData = function() {
  //   $http.get(api_url + "/teacher/class/public?tid=" + $scope.tid + "&page=" + $scope.currentPage + "&size=" + $scope.pageSize)
  //     .success(function(data) {
  //       if (!data.status) {
  //         $scope.count = data.count;
  //         $scope.publicClasses = data.classList;
  //         if ($scope.count == 0) {
  //           $scope.num = 1;
  //           $(".body").html('<p class="tips">您还未加入任何公共班级哦~~~</p>');
  //         } else {
  //           $scope.num = Math.ceil($scope.count / $scope.pageSize); //班级分页数向上取整
  //         }
  //       }

  //     })
  // };
  $scope.getData = function() {
    $http.get(api_url + "/teacher/class/pending?tid=" + $scope.tid + "&page=" + $scope.currentPage + "&size=" + $scope.pageSize)
      .success(function(data) {
        if (!data.status) {
          $scope.count = data.count;
          $scope.publicClasses = data.classList;
          if ($scope.count == 0) {
            $scope.num = 1;
            $(".body").html('<p class="tips">您还没有任何公共班级邀请哦~~~</p>');
          } else {
            $scope.num = Math.ceil($scope.count / $scope.pageSize); //班级分页数向上取整
          }
        }

      })
  };

  //同意和拒绝
  $scope.isAgree = function(cid, $event) {
    ($event.target.className) == "agree" ? ($scope.isagree = 1) : ($scope.isagree = 2);
    $http.put(api_url + "/class/teacher/reply", {
      "tid": parseInt($scope.tid),
      "cid": parseInt(cid),
      "isAgree": $scope.isagree
    }).success(function(data) {
      //同意后跳转至该班级
      if ($scope.isagree == 1) {
        $location.path("class/permission/" + cid)
      }
      if ($scope.isagree == 2) {
        //删除节点
        $($event.target).parents(".box").remove();
      }
    })
  }

  //跳转
  $scope.linkToClass = function(cid, isAgree) {
    if (isAgree === 1) {
      //代表同意加入班级   此时才可以跳转到指定班级班级页面
      $location.path("class/permission/" + cid)
    }
  };

  //改变鼠标手势
  $scope.changeCourse = function(isAgree, $event) {
    if (isAgree === 1) {
      $event.target.style.cursor = "pointer";
    }
  };

  //公共班级搜素
  $scope.search = function($event) {
    if (!$scope.className) {
      return;
    }
    if ($event.keyCode && $event.which == 13) {
      $scope.currentPage = 1;
      $http.put(api_url + "/teacher/class/search?page=" + $scope.currentPage + "&size=" + $scope.pageSize, {
        "className": $scope.className,
        "type": 1,
        "tid": $scope.tid
      }).success(function(data) {
        $scope.className = '';
        $scope.count = data.count;
        if ($scope.count == 0) {
          alert("班级不存在")
        } else {
          $scope.priviteClasses = data.classList;
          $scope.num = Math.ceil($scope.count / $scope.pageSize); //班级分页数向上取整
        }
      })
    }
  };

}]);


// 班级直播
app.controller("classlive",['$scope', '$http', 'mxxServices', '$cookieStore', '$location', function($scope, $http, mxxServices, $cookieStore, $location) {
  $scope.tid = $cookieStore.get("user").tid;
  $scope.token = $cookieStore.get("user").token;
  $scope.teacherName = $cookieStore.get("user").teacherName;
  // console.log($scope.token,$scope.teacherName);
  // console.log($scope.token,$scope.teacherName);
  //分页查询功能
  $scope.currentPage = 1;
  $scope.pageSize = 10; //每一页下的班级数
  // 获取当前时间并转换为时间戳
  // 直播状态数组
  $scope.liveStatusName = ['未开始','进行中','已结束']
  $scope.nowTime = Date.parse(new Date()) / 1000;
  // console.log($scope.nowTime);
  // 暂时写死，之后有需要在做其他处理
  $scope.startTime = "2017-01-01 00:00:00";
  $scope.endTime = "2100-10-25 23:00:00";
  // 获取班级直播
  $scope.getData = function() {
    $http.get(api_url + "/teacher/class/live/time/list?startTime=" + $scope.startTime + "&endTime=" + $scope.endTime + "&page=" + $scope.currentPage + "&size=" + $scope.pageSize)
      .success(function(data) {
        if (!data.status) {
          $scope.count = data.count;
          $scope.liveTimeList = data.liveRoomList;
          // 判断直播状态：0-未开始；1-进行中；2-已结束；
          for(var i=0; i < $scope.liveTimeList.length; i++){
            $scope.startTimeOne = Date.parse($scope.liveTimeList[i]['startTime']) / 1000;
            $scope.endTimeOne = Date.parse($scope.liveTimeList[i]['endTime']) / 1000;
            if(($scope.nowTime>$scope.startTimeOne||$scope.nowTime==$scope.startTimeOne)&&($scope.nowTime < $scope.endTimeOne||$scope.nowTime == $scope.endTimeOne)){
              $scope.liveTimeList[i]['liveStatus'] = 1;
            } else if ($scope.nowTime<$scope.startTimeOne) {
              $scope.liveTimeList[i]['liveStatus'] = 0;
            } else if ($scope.nowTime > $scope.endTimeOne){
              $scope.liveTimeList[i]['liveStatus'] = 2;
            }
          }
          // console.log($scope.startTimeOne);
          // console.log($scope.liveTimeList);
          if ($scope.count == 0) {
            $scope.num = 1;
            $(".body").html('<p class="tips">您还没有直播哦~~~</p>');
          } else {
            $scope.num = Math.ceil($scope.count / $scope.pageSize); //班级分页数向上取整
          }
        }

      })
  };

  // 搜索直播
  $scope.search = function() {
    //起始时间
    $scope.startTime = $("#startTime").val();
    //结束时间
    $scope.endTime = $("#endTime").val();

    // console.log($scope.startTime);
    // console.log($scope.endTime);
    if ($scope.startTime&&$scope.endTime) {
      $scope.currentPage = 1;
      $scope.getData();
    } else {
      // $scope.getData();
      alert('请选择搜索条件');
      return;
    }
  };
  // 配置直播资源
  $scope.configResource = function(timeId) {
    alert('资源配置很快就会上线哦');
  }

  // 进入直播间
  $scope.goToLive = function(roomId,liveStatus) {
    // $scope.nickname = "麦学习";
    if (!$scope.teacherName){
      $scope.teacherName = "Mike";
    }
    if(liveStatus==1){
      var teacherUrl = encodeURI('http://live.buka.tv/v4/'+roomId+'?room_id='+roomId+'&role=1&nickname='+$scope.teacherName+'&login_id='+$scope.tid+'&token='+$scope.token+'&client=1');
      // console.log(teacherUrl);
      window.open(teacherUrl);
    } else {
      alert('当前不在直播时间哦！')
    }
  }

}])


//创建班级
app.controller("createClass", ['$scope', '$http', '$location', '$cookieStore', 'toolServices', function($scope, $http, $location, $cookieStore, toolServices) {
  $scope.tid = $cookieStore.get("user").tid;
  $scope.sid = $cookieStore.get("user").sid;

  //随机生成密码
  $(".create-password").click(function() {
    //生成一个随机六位数
    // $scope.password = Math.floor(Math.random() * 899999 + 100000).toString();
    $scope.password = toolServices.getRandomNum(100000, 99999999) + ''; //转成字符串
    $(".form-control.password").val($scope.password);
  });



  //提交表单
  $scope.validateOne = function() {
    //班级人数不能超过200人
    if ($scope.classNumber > 200) {
      alert("班级人数不能超过200人!");
      return;
    };
    if ($scope.classNumber < 1) {
      alert("班级人数不能少于1人!");
      return;
    };
    if (isNaN($scope.classNumber - 1)) {
      alert("请填写合法的班级人数!");
      return;
    };
  }
  $scope.validateTwo = function() {
    if ($scope.password) {
      var reg = /^\d{6,8}$/;
      if (!reg.test($scope.password)) {
        alert("密码必须是6-8位的数字!");
        return;
      }
    };
  }
  //班级名和班级人数是required
  $scope.submit = function() {
    //班级人数不能超过200人
    if ($scope.classNumber > 200) {
      alert("班级人数不能超过200人!");
      return;
    };
    if ($scope.classNumber < 1) {
      alert("班级人数不能少于1人!");
      return;
    };
    if (isNaN($scope.classNumber - 1)) {
      alert("请填写合法的班级人数!");
      return;
    };
    if ($scope.password) {
      var reg = /^\d{6,8}$/;
      if (!reg.test($scope.password)) {
        alert("密码必须是6-8位的数字!");
        return;
      }
    };
    //班级留言不得超过140字
    if ($scope.classAnnounce && $scope.classAnnounce.length > 140) {
      alert("班级留言不得超过140字!");
      return;
    }
    var data = {
      "createTid": parseInt($scope.tid),
      "className": $scope.className,
      "maxNumber": parseInt($scope.classNumber),
      "password": $scope.password,
      "remarkName": $scope.classAnnounce
    };
    data = JSON.stringify(data);
    $http.post(api_url + '/class', data)
      .success(function(data) {
        if (!data.status) {
          alert("创建班级成功")
          $scope.cid = data.cid;
          $location.path("/class/createSuccess/" + $scope.cid)
        }
      })
  }
}])

//所有班级成员
app.controller("members", ['$scope', '$rootScope', '$http', '$routeParams', '$cookieStore', "$location", 'mxxServices', function($scope, $rootScope, $http, $routeParams, $cookieStore, $location, mxxServices) {
  $scope.cid = $routeParams.cid;
  $scope.currentPage = 1;
  $scope.pageSize = 10; //每一页下的班级数
  $scope.sid = $cookieStore.get("user").sid;
  $scope.tid = $cookieStore.get("user").tid;
  //班级基本信息
  mxxServices.getClassInfo($scope);

  $scope.getData = function() {
    $http.get(api_url + "/class/student/list?cid=" + $scope.cid + "&page=" + $scope.currentPage + "&size=" + $scope.pageSize)
      .success(function(data) {
        if (!data.status) {
          $scope.count = data.count;
          $scope.userlist = data.studentList;
          if ($scope.count == 0) {
            $scope.num = 1;
            $(".student-list-body").html('<p clasas="tips" style="padding-top:40px;text-align:center;font-size:20px; color:#666;background-color:#ececec;">该班暂时没有学生加入!</p>')
          } else {
            $scope.num = Math.ceil($scope.count / $scope.pageSize); //班级分页数向上取整
          }
        }
      })
  };

  //班级二维码
  mxxServices.showClass2WM($scope);

  //查找指定学生
  $scope.search = function() {
    $scope.currentPage = 1;
    $http.put(api_url + "/class/student/search?page=" + $scope.currentPage + "&size=" + $scope.pageSize, {
      "studentName": $scope.username,
      "cid": parseInt($scope.cid)
    }).success(function(data) {
      if (!data.status) {
        $scope.count = data.count;
        if ($scope.count == 0) {
          alert("该班级下无此学生")
        } else {
          $scope.userlist = data.studentList;
          $scope.num = Math.ceil($scope.count / $scope.pageSize); //班级分页数向上取整
        }
      }
    })
  };
  //修改备注名
  $scope.alert = function(studentId) {
    $(".dialog_wrp").css("display", "block");
    $(".mask").css("display", "block")
    $scope.confirm = function() {
      if (!$scope.nickname) {
        alert("请填写备注!");
        return;
      } else if ($scope.nickname.trim().length > 12) {
        alert("备注名超过了12字限制")
        return;
      } else {
        $http.put(api_url + "/class/student", {
          "cid": parseInt($scope.cid),
          "studentId": studentId,
          "remarkName": $scope.nickname
        }).success(function(data) {
          $scope.nickname = ''; //内容置空
          $(".dialog_wrp").css("display", "none");
          $(".mask").css("display", "none")
          $scope.getData();
        })
      }
    }
  };

  $scope.cancel = function() {
    $(".dialog_wrp").css("display", "none");
    $(".mask").css("display", "none");

  };

  //踢出班级
  $scope.delete = function(studentId) {
    $http.put(api_url + "/class/student/blackList", {
      "cid": parseInt($scope.cid),
      "studentId": studentId,
      "dataStatus": -1 //-1:踢出；1:正常；2:黑名单；
    }).success(function(data) {
      alert("踢出班级成功!");
      $scope.getData();
    })

  }

  //加入黑名单
  $scope.remove = function(studentId) {
    $http.put(api_url + "/class/student/blackList", {
      "cid": parseInt($scope.cid),
      "studentId": studentId,
      "dataStatus": 2
    }).success(function(data) {
      alert("操作成功!");
      $scope.getData();
    })
  };

}])

//班级黑名单
app.controller('blacklist', ['$scope', '$http', '$location', '$routeParams', '$cookieStore', 'mxxServices', function($scope, $http, $location, $routeParams, $cookieStore, mxxServices) {
  $scope.cid = $routeParams.cid;
  $scope.sid = $cookieStore.get("user").sid;
  $scope.tid = $cookieStore.get("user").tid;
  $scope.currentPage = 1;
  $scope.pageSize = 10; //每一页下的班级数

  //获取班级信息
  mxxServices.getClassInfo($scope);

  $scope.getData = function() {
    //过滤黑名单
    $http.get(api_url + "/class/student/blackList?cid=" + $scope.cid + "&page=" + $scope.currentPage + "&size=" + $scope.pageSize)
      .success(function(data) {
        $scope.count = data.count;
        $scope.userlist = data.studentList;
        if ($scope.count == 0) {
          $scope.num = 1;
        } else {
          $scope.num = Math.ceil($scope.count / $scope.pageSize); //班级分页数向上取整
        }
      })
  };
  $scope.getData();

  //班级二维码
  mxxServices.showClass2WM($scope);

  //解除黑名单
  $scope.remove = function(studentId) {
    $http.put(api_url + "/class/student/blackList", {
      "cid": parseInt($scope.cid),
      "studentId": studentId,
      "dataStatus": -1 //踢出去!
    }).success(function(data) {
      alert("操作成功!");
      $scope.getData();
    })
  };

  $scope.alert = function(studentId) {
    $(".dialog_wrp").css("display", "block");
    $scope.confirm = function() {
      if (!$scope.nickname) {
        alert("请填写备注!");
        return;
      } else {
        $http.put(api_url + "/class/student", {
          "cid": parseInt($scope.cid),
          "studentId": studentId,
          "remarkName": $scope.nickname
        }).success(function(data) {
          $scope.nickname = ''; //内容置空
          alert("修改备注成功!");
          $(".dialog_wrp").css("display", "none");
          $scope.getData();
        })
      }
    }
  };
  $scope.cancel = function() {
    $(".dialog_wrp").css("display", "none");
  }
}])


//创建班级成功
app.controller("createSuccess", ['$scope', '$http', '$routeParams', '$cookieStore', 'mxxServices', function($scope, $http, $routeParams, $cookieStore, mxxServices) {
  //获取班级信息
  $scope.cid = $routeParams.cid;
  $scope.tid = $cookieStore.get("user").tid;
  $scope.sid = $cookieStore.get("user").sid;
  $http.get(api_url + "/class/info?cid=" + $scope.cid)
    .success(function(data) {
      $scope.className = data.className;
      $scope.description = data.remarkName;
      $scope.password = data.password;
      $scope.classNumber = data.maxNumber;

      mxxServices.showClass2WM($scope);
      //生成二维码
      var imgCode = $("#imgCode");
      mxxServices.qrCode(imgCode, $scope.url);
    })
}])

//班级助教
app.controller("represent", ['$scope', '$http', '$routeParams', '$cookieStore', '$timeout', 'mxxServices', function($scope, $http, $routeParams, $cookieStore, $timeout, mxxServices) {
  $scope.cid = $routeParams.cid;
  $scope.tid = $cookieStore.get("user").tid;

  //班级二维码
  mxxServices.showClass2WM($scope);

  mxxServices.getClassInfo($scope);

  //查询指定班级的课代表
  $scope.getList = function() {
    $http.get(api_url + "/class/teacher/tutor?cid=" + $scope.cid + "&tid=" + $scope.tid)
      .success(function(data) {
        if (!data.status) {
          $scope.monitorlist = data.tutorList;
          if (data.count) {
            $timeout(function() {
              for (var i = 0; i < $scope.monitorlist.length; i++) {
                var url = "http://www.maixuexi.cn/student/#/my/tutor/" + $scope.monitorlist[i].tutorId;
                imgCode = $($(".imgcode")[i]);
                if (imgCode.children()) {
                  imgCode.empty();
                }

                mxxServices.qrCode(imgCode, url);
              };
            }, 500)
          }
        }

      });
  }
  $scope.getList();

  //点击生成二维码
  $scope.monitorCode = function() {
    var rimgCode = $(".imgcode")
    var len = rimgCode.length;
    if (len >= 6) {
      alert("一个班级最多只能绑定六个助教!");
      return;
    }
    $http.post(api_url + "/class/tutor", {
      "cid": parseInt($scope.cid)
    }).success(function(res) {
      $scope.getList();
    })
  };

  //解绑指定班级助教
  $scope.unbindRepresent = function(tutorId, i) {
    $http.put(api_url + "/class/tutor/remove", {
      "tutorId": [tutorId]
    }).success(function(data) {
      if (!data.status) {
        alert("解除班级助教身份成功!");
        $scope.getList();
      }
    })
  }

  //删除二维码
  $scope.deleteQrCode = function(tutorId, i) {
    $http({
      method: "delete",
      url: api_url + '/class/tutor',
      data: { "tutorId": [tutorId] },
      headers: { "Content-Type": "application/json;charset=utf-8" }
    }).success(function(data) {
      if (!data.status) {
        alert("删除二维码成功!");
        $scope.getList();
      }
    })

  }

}])

//班级列表下的作业记录
//作业习题 习题列表
app.controller("record", ['$scope', '$http', '$routeParams', 'mxxServices', '$cookieStore', function($scope, $http, $routeParams, mxxServices, $cookieStore) {
  $scope.cid = $routeParams.cid;
  $scope.sid = $cookieStore.get("user").sid;
  $scope.tid = $cookieStore.get("user").tid;
  $scope.currentPage = 1;
  $scope.pageSize = 10; //每一页下的班级数
  mxxServices.getClassInfo($scope);
  $scope.getData = function() {
    if (!$scope.serachSuccess) {
      $http.get(api_url + "/work/class/list?cid=" + $scope.cid + "&page=" + $scope.currentPage + "&size=" + $scope.pageSize)
        .success(function(data) {
          if (!data.status) {
            $scope.count = data.count;
            $scope.num = Math.ceil($scope.count / $scope.pageSize);
            if ($scope.num == 0) {
              $scope.num = 1;
              $(".student-list-body").html('<p clasas="tips" style="padding-top:40px;text-align:center;font-size:18px; color:#666;background-color:#ececec;">当前班级下还没有作业记录，<a href="#/work/arrange" style="color:#000;font-size:20px;">赶快来布置一场吧！</a></p>')
            }
            $scope.worklist = data.workList;
          }
        })
    } else {
      $scope.searchData();
    }
  };

  //搜索试卷
  $scope.searchWork = function() {
    if ($scope.searchName) {
      $scope.currentPage = 1;
      $scope.searchData();
    }
  }
  $scope.searchData = function() {
    $http.put(api_url + '/work/teacher/name?page=' + $scope.currentPage + "&size=" + $scope.pageSize, {
      "cid": $scope.cid,
      "workName": $scope.searchName
    }).success(function(data) {
      if (!data.status) {
        $scope.serachSuccess = true;
        $scope.count = data.count;
        $scope.num = Math.ceil($scope.count / $scope.pageSize);
        if ($scope.num == 0) {
          $scope.num = 1;
          $(".student-list-body").html('<p clasas="tips" style="padding-top:40px;text-align:center;font-size:18px; color:#666;background-color:#ececec;">当前班级下还没有搜索的作业记录</p>')
        }
        $scope.worklist = data.workList;
      }
    })
  }

  //班级二维码
  mxxServices.showClass2WM($scope);

}])

//班级作业详情
app.controller("result", ['$scope', '$http', '$routeParams', 'mxxServices', '$cookieStore', function($scope, $http, $routeParams, mxxServices, $cookieStore) {
  $scope.cid = $routeParams.cid;
  $scope.wid = $routeParams.wid; //作业id
  $scope.sid = $cookieStore.get("user").sid;
  $scope.tid = $cookieStore.get("user").tid;

  $scope.currentPage = 1;
  $scope.pageSize = 1000; //每一页下的班级数
  mxxServices.getClassInfo($scope);
  //班级二维码
  mxxServices.showClass2WM($scope);

  $scope.showSingleTable = true;
  $scope.load = false;
  $scope.showStat = true;
  $scope.showQuestionBox = false;
  $scope.assignmentNow = false;

  // 查看单题统计图表
  $scope.showSingleCountTable = function(type){
    // console.log(type,$scope.showSingleTable);
    if(type===1){
      if(!$scope.showSingleTable){
        return;
      } else {
        $scope.showSingleTable = false;
        $scope.load = true;
      }
    } else if (type === 2){
      if($scope.showSingleTable){
        return;
      } else {
        $scope.showSingleTable = true;
        $scope.load = false;
      }
    }
  }


  //查询指定作业
  $http.get(api_url + "/work/statistics?workId=" + $scope.wid)
    .success(function(data) {
      $scope.wname = data.workName;
      $scope.submitNum = data.submitNumber;
      $scope.ansSeenTime = data.showAnswerType;
      $scope.endTime = data.endTime;
      $scope.maxScore = data.maxScore;
      $scope.avgScore = data.avgScore;
    });
  //指定作业的统计答题接口

  //排名
  //$scope.ranks=[{type:1,name:'分数'},{type:2,name:'答题时间'}];
  $scope.typeList = [{ type: 1, name: '分数' }, { type: 2, name: '答题时间' }]
  $scope.type = 1;
  $scope.selected = function(type) {
    $http.get(api_url + "/work/rank?workId=" + $scope.wid + "&type=" + $scope.type + "&page=" + $scope.currentPage + "&size=" + $scope.pageSize)
      .success(function(data) {
        if (!data.status) {
          $scope.userlist = data.rankList;
        }
      })
  };

  $scope.selected($scope.type);
  // 初始化题型
  $scope.questionTypeName = ['','客观题','主观题'];
  // 初始化选项
  $scope.questionAnswerName = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N'];
  $scope.changeShowStatus = function(){
    $scope.showStat = !$scope.showStat;
    if(!$scope.showStat){
      $http.get(api_url + "/work/question/answer?workId=" + $scope.wid)
        .success(function(data) {
          if (!data.status) {
            $scope.worklist = data.workList;
          } else{
            alert(data.info);
          }
      }) 
    }
  }

  // 初始化是否批改
  $scope.checkStatus = ['待批改','已批改'];
  // 显示试题答题情况
  $scope.showQuestion = function(qid,qType,qNumber){
    $scope.showQuestionBox = true;
    $scope.questionType = qType;
    $scope.questionNumber = qNumber;
    $scope.wrongStudentList = [];
    // 请求获取某次作业某道题的答题情况
    $http.get(api_url + "/work/question/student/situation?workId=" + $scope.wid + "&qid=" + qid)
      .success(function(data) {
        if (!data.status) {
          $scope.studentList = data.studentList;
          // console.log($scope.studentList);
          $scope.questionScore = data.qScore;
          if ($scope.questionType==1){
            $scope.questionAnswer = data.answer; 
          }
          // 设定正确答案
          // if ($scope.questionType == 1) {
          //   for(var m = 0; m < $scope.questionAnswer.length; m++){
          //     $scope.questionAnswer[m]
          //     $scope.questionAnswerName[$scope.questionAnswer[m]]
          //   }
          // }
          for(var i=0; i < $scope.studentList.length; i++ ){
            var userScore = $scope.studentList[i].score;
            var percentage = (userScore / $scope.questionScore)*100;
            $scope.studentList[i]['percentage'] = percentage;
            if($scope.studentList[i]['percentage'] < 80){
              $scope.wrongStudentList = $scope.wrongStudentList.concat($scope.studentList[i]);
            }
          }
          // console.log($scope.studentList);
          // console.log($scope.wrongStudentList);
          if($scope.wrongStudentList.length == 0){
            $scope.showNoneStudent = true;
          }
        } else{
          alert(data.info);
        }
      }
    )
  }

  // 关闭显示试题答题情况
  $scope.closeStudentBox = function(){
    $scope.showQuestionBox = false;
    $scope.assignmentNow = false;
  }
  // 布置作业窗口显示
  $scope.assignmentWork = function(){
    if($scope.showNoneStudent){
      alert('暂时没有人做错哦');
      return;
    }
    $scope.assignmentNow = true;
    //获取试卷列表
    $http.get(api_url + "/test/paper/teacher?page=1&size=99999")
      .success(function(data) {
        if(!data.status){
          $scope.paperlist = data.paperList;
          // console.log($scope.paperlist);
          for(var n = 0 ; n < $scope.paperlist.length; n++){
            if($scope.paperlist[n]['paperName'].length > 14){
              $scope.paperlist[n]['shortPaperName'] = $scope.paperlist[n]['paperName'].substring(0,14)+'...';
            }
          }
          // console.log($scope.paperlist);
        } else{
          alert(data.info)
        }
      });

    // 班级布置学生数组维护
    // $scope.classInfo = {};
    // $scope.classInfo['cid'] = $scope.cid;
    // $scope.classInfo['students'] = [];
    $scope.students = [];
    // 获取班级学生数据
    $http.get(api_url + "/class/student/list?cid=" + $scope.cid + "&page=1&size=1000")
      .success(function(data) {
        if(!data.status){
          $scope.classStudent = data.studentList;
          // console.log('2',$scope.classStudent);
          for (var i=0; i < $scope.classStudent.length; i++){
            var sourceStudent = $scope.classStudent[i]
            var sourceStudentId = sourceStudent.studentId;
            for(var y=0; y < $scope.wrongStudentList.length; y++){
              var wrongStudent = $scope.wrongStudentList[y];
              var wrongStudentId = wrongStudent.studentId;
              if (sourceStudentId == wrongStudentId){
                sourceStudent['isMake'] = 1;
              } else {
                sourceStudent['isMake'] = 0;
              }
              $scope.students.push(
                {
                  "studentId": sourceStudent.studentId,
                  "isMake": sourceStudent.isMake
                }
              )
            }
          }
        }else {
          alert(data.info);
        }
      })

    // console.log($scope.classStudent);
    // console.log($scope.students);
    // 赋值给班级学生布置作业参数
    $scope.cids = [
      {
        "cid": $scope.cid,
        "students": $scope.students
      }
    ]
    
  }
  // 布置作业窗口关闭
  $scope.returnQuestion = function() {
    $scope.assignmentNow = false;
    $scope.targetPid = "";
    $scope.targetPaperName = "";
    $scope.shortTargetPaperName = "";
    $scope.cids = [];
  }

  // 选择目标试卷
  $scope.choosePaper = function(pid,isFinish){
    if ($scope.targetPid==pid || isFinish!=1){
      return;
    } else {
      $scope.targetPid = pid;
      $scope.targetPaperName = "";
      $scope.shortTargetPaperName = "";
      $http.get(api_url + "/test/paper?pid=" + $scope.targetPid)
        .success(function(data) {
          if(!data.status){
            $scope.targetPaperName = data.paperName;
            if ($scope.targetPaperName.length >14){
              $scope.shortTargetPaperName = $scope.targetPaperName.substring(0,14)+'...';
            }
          } else{
            alert(data.info);
          }
        }
      );
    }
  }
  // 取消选择目标试卷
  $scope.cancelPaper = function(){
    $scope.targetPid = "";
    $scope.targetPaperName = "";
    $scope.shortTargetPaperName = "";
  }

  // 搜索试卷
  $scope.searchPaperFromName = function(){
    $scope.paperName = document.getElementById("newPaperName").value;
    if(!$scope.paperName){
      alert('请输入试卷名字')
    } else {
      $http.put(api_url + "/test/paper/search?page=1&size=1000", {
        "paperName": $scope.paperName
      }).success(function(data) {
        if (!data.status) { //表示当前作业列表为空
          $scope.paperlist = data.paperList;
          $scope.paperCount = data.count;
          for(var j = 0 ; j < $scope.paperlist.length; j++){
            if($scope.paperlist[j]['paperName'].length > 14){
              $scope.paperlist[j]['shortPaperName'] = $scope.paperlist[j]['paperName'].substring(0,14)+'...';
            }
          }
        } else {
          alert(data.info);
        }
      })
    }
    // console.log($scope.paperName);
  }

  // 当无法搜索出结果时使用
  $scope.getAllPaper = function(){
    $scope.newPaperName = "";
    //获取试卷列表
    $http.get(api_url + "/test/paper/teacher?page=1&size=99999")
      .success(function(data) {
        if(!data.status){
          $scope.paperlist = data.paperList;
          // console.log($scope.paperlist);
          for(var n = 0 ; n < $scope.paperlist.length; n++){
            if($scope.paperlist[n]['paperName'].length > 14){
              $scope.paperlist[n]['shortPaperName'] = $scope.paperlist[n]['paperName'].substring(0,14)+'...';
            }
          }
          // console.log($scope.paperlist);
        } else{
          alert(data.info)
        }
      });
  }

  // 是否选择了全班作业
  $scope.isWholeWork = 0;
  $scope.changeWholeWork = function(){
    if ($scope.isWholeWork==1){
      $scope.isWholeWork = 0;
    } else {
      $scope.isWholeWork = 1;
    }
  }

  // 是否选择了客观题乱序
  $scope.isOutOfOrder = 0;
  $scope.changeOutOfOrder = function(){
    if ($scope.isOutOfOrder==1){
      $scope.isOutOfOrder = 0;
    } else {
      $scope.isOutOfOrder = 1;
    }
  }

  // 是否选择了答案解析查看时间
  $scope.isViewResolution = 1;
  $scope.changeViewResolution = function(){
    if ($scope.isViewResolution==1){
      $scope.isViewResolution = 2;
    } else {
      $scope.isViewResolution = 1;
    }
  }

  // 是否选择了成绩报告选项
  $scope.isJoinReport = 1;
  $scope.changeJoinReport = function(){
    if ($scope.isJoinReport==1){
      $scope.isJoinReport = 0;
    } else {
      $scope.isJoinReport = 1;
    }
  }

  // 初始化作业类型
  $scope.workType = 1;
  
  
  // 布置作业按钮
  $scope.doneWorkAssignment = function () {
    // 试卷是否已经选择，选择后才允许布置
    if(!$scope.targetPid){
      alert('请选择试卷');
      return;
    }
    // 班级学生数据是否存在
    
    //作业时长的默认值全部设为0
    $scope.hours = 0;
    $scope.minute = 0;
    $scope.second = 0;

    //转成数字型
    $scope.durationTime = parseInt($scope.hours * 60 * 60) + parseInt($scope.minute * 60) + parseInt($scope.second);

    //作业时长
    if ($scope.durationTime != 0 && $scope.durationTime < 60) {
      alert("作业时长不得小于1分钟!");
      return;
    };

    //获取当前时间
    var currentTime = new Date();
    var year = currentTime.getFullYear();
    var month = currentTime.getMonth() + 1;
    var day = currentTime.getDate();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var seconds = currentTime.getSeconds();
    //如果小于10就在前面补上"0";
    if (month < 10) { month = "0" + month; }
    if (day < 10) { day = "0" + day }
    if (hours < 10) { hours = "0" + hours }
    if (minutes < 10) { minutes = "0" + minutes }
    if (seconds < 10) { seconds = "0" + seconds }
    $scope.currentTime = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;

    //作业起始时间
    if (!$(".beginTime").val()) {
      $scope.startTime = $scope.currentTime;
    } else {
      $scope.startTime = $(".beginTime").val();
    }

    //作业结束时间
    if (!$(".endTime").val()) {
      $scope.endTime = null;
      $scope.showAnswerType = 1;
    } else if (Date.parse(new Date($(".endTime").val())) < Date.parse(new Date($scope.startTime))) {
      alert('请正确填写开始结束时间!');
      return;
    } else {
      $scope.endTime = $(".endTime").val();
    }

    //作业通知时间
    if (!$(".noticeTime").val()) {
      $scope.displayTime = $scope.currentTime;
    } else if (Date.parse(new Date($(".noticeTime").val())) < Date.parse(new Date($scope.currentTime))) {
      alert('请正确填写作业通知时间!');
      return;
    } else if (Date.parse(new Date($(".noticeTime").val())) > Date.parse(new Date($scope.startTime))) {
      alert('请选择早于作业开始时间的通知时间!');
      return;
    } else {
      $scope.displayTime = $(".noticeTime").val();
    }

    //作业时长不可以超过结束时间和起始时间之差
    var startime = new Date($(".beginTime").val()).getTime();
    if ($(".endTime").val()) { //有结束时间
      var endtime = new Date($(".endTime").val()).getTime();
      if ((endtime - startime) / 1000 < $scope.durationTime) {
        alert("作业时长不合法!");
        return;
      }
    }
     
    $scope.workName = document.getElementById('workName').value;
    // console.log($scope.workName);
    // 如果没有作业名字
    if(!$scope.workName){
      $scope.workName = $scope.targetPaperName;
    }
    
    // 提交作业数据
    var workInfo = {
      "pid": parseInt($scope.targetPid),
      "workName": $scope.workName,
      "displayTime": $scope.displayTime,
      "startTime": $scope.startTime,
      "endTime": $scope.endTime,
      "showAnswerType": parseInt($scope.isViewResolution),
      "durationTime": parseInt($scope.durationTime),
      "isMixed": parseInt($scope.isOutOfOrder),
      "isWholeWork": parseInt($scope.isWholeWork),
      "isJoinStatistics": parseInt($scope.isJoinReport),
      "cids": $scope.cids,
      "workType": $scope.workType
    }

    // console.log(workInfo);

    // 转成json格式
    workInfo = JSON.stringify(workInfo);
    $http.post(api_url + "/work", workInfo)
      .success(function(data) {
        if (!data.status) {
          alert("作业布置成功!");
          // 关闭布置作业窗口
          $scope.assignmentNow = false;
          $scope.targetPid = "";
          $scope.targetPaperName = "";
          $scope.workName = "";
          $scope.shortTargetPaperName = "";
          $scope.cids = [];
          // 关闭试题详情窗口
          $scope.showQuestionBox = false;
          $scope.assignmentNow = false;
        } else {
          alert(data.info);
        }
      })
    
    
  }

}]);

//班级权限设置
app.controller('permission', ['$scope', '$http', '$routeParams', 'mxxServices', '$cookieStore', '$location', function($scope, $http, $routeParams, mxxServices, $cookieStore, $location) {
  $scope.cid = Number($routeParams.cid);
  $scope.tid = $cookieStore.get("user").tid;

  mxxServices.getClassInfo($scope);
  //班级二维码
  mxxServices.showClass2WM($scope);
// console.log($scope.cid,typeof($scope.cid));

  //匹配正则
  var accountExp = /^[a-zA-Z]\w+$/,
    phoneExp = /^1[34578]\d{9}$/,
    mailExp = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;

  //根据XX查找教师
  $scope.search = function() {
    if ($scope.account) {
      var obj = {};
      if (mailExp.test($scope.account)) {
        obj.email = $scope.account;
      } else if (phoneExp.test($scope.account)) {
        obj.phone = $scope.account;
      } else if (accountExp.test($scope.account)) {
        obj.account = $scope.account;
      } else {
        alert('请输入有效账号信息!');
        return;
      }
      $http.put(api_url + "/teacher/info", obj)
        .success(function(data) {
          if (!data.status) {
            //判断当前班级下是否已有此老师
            $scope.email = data.email;
            $scope.itid = data.tid; //被邀请者教师的tid、
            // $scope.isAgree = data.isAgree;
            $scope.tname = data.teacherName;
            // console.log('已成功获取教师信息');
            // console.log($scope.itid,$scope.tname);
            // if ($scope.isAgree == 3 || $scope.isAgree == 2) { //代表未加入或是拒绝
            //   //拒绝后可以再次邀请 $scope.isAgree==2
            //   $scope.result = 1;
            // } else {
            //   $scope.result = 2;
            // }
          } else {
            $scope.tname = "";
            // $scope.result = 0;
          }
        })
    }
  }

  $scope.invite = function() {
    //判断是否已在当前班级
    //只可以点击一次  这个功能还没做
    // console.log($scope.cid,$scope.itid)
    // alert('开始邀请');
    // console.log($scope.cid,$scope.itid)
    // if ($scope.email) {
      // if ($scope.result == 1) {
      $http.put(api_url + "/class/teacher/invite", {
          "cid": parseInt($scope.cid),
          "tid": parseInt($scope.itid)
        }).success(function(data) {
          if (!data.status) {
            // $scope.invite = null;
            alert("邀请通知已发送!");
            $scope.tname = "";
            $scope.account = "";
            $scope.getTeacherListByCid();
          }
        })
        // } else if ($scope.result == 2) {
        // alert($scope.tname + "老师已加入班级，无需再次邀请")
        // }
    // }
  };

  //作业可见?
  $scope.isChecked = function() {
    $http.put(api_url + "/class/teacher/set", {
      "cid": parseInt($scope.cid),
      "isShow": Number($scope.check)
    }).success(function(data) {
      // console.log(data)
    })
  }

  //查询班级下的教师列表
  $scope.getTeacherListByCid = function() {
    $http.get(api_url + "/class/teacher/list?cid=" + $scope.cid)
      .success(function(data) {
        $scope.classTeacher = data.teacherList;
        $scope.b = data.teacherList[0];
        //过滤创建者
        /*for (var i = 0; i < $scope.classTeacher.length; i++) {
          if ($scope.classTeacher[i].isOwner === 1) {
            $scope.creator = $scope.classTeacher.splice(i, 1)[0];
            break; //中止循环
          }
        }*/
        if ($scope.classTeacher.length) {
          angular.forEach($scope.classTeacher, function(ele, index) {
            if (ele.tid == $scope.tid) {
              if (ele.isShow == 1) {
                $scope.check = true;
              } else {
                $scope.check = false;
              }
            }
            if (ele.isOwner == 1) {
              $scope.create = ele;
              $scope.classTeacher.splice(index, 1);
            }
          })
        }
        //排序  未加入的排在末尾根据isagree字段
        $scope.classTeacher.sort(function(a, b) {
          return b.isAgree - a.isAgree;
        })

      })
  };

  $scope.getTeacherListByCid();

// 鼠标滑过时执行
  $scope.changeCourse = function($event) {
    // console.log('123')
    $scope.teacherInfo = this.$parent.teacher;
    if ($scope.teacherInfo.isAgree == 1) {
      $event.target.style.cursor = "pointer";
    }
  };

  //将创建者身份转给其他老师
  $scope.transfer = function($event, tid) {
    //删除前需判断是否有权删除该教师
    //只有创建者可以删除
    //tid是指这个班下的每个老师的tid
    //首先判断这个老师是否已加入此班级，只有加入的才可以删除
    $scope.teacherInfo = this.$parent.teacher;
    if ($scope.teacherInfo.classTeacher.isagree === 1) {
      //首先提示是否确认转出创建者身份
      var bool = window.confirm("确定要将创建者身份转给该教师吗?");
      if (bool) {
        $http.put(api_url + "/class/teacher/owner", {
          "tid": tid,
          "cid": parseInt($scope.cid)
        }).success(function(data) {
          // console.log('操作成功...')
          $scope.getTeacherListByCid();
        })
      } else {
        // console.log('取消了该操作...')
      }
    }
  }

  //剔出教师班级
  $scope.delete = function($event, tid) {
    //删除班级无需考虑该教师是否已同意加入班级
    // $http.patch(api_url + "/class2teacher", {
    var bool = window.confirm("确定删除该教师?");
    if (bool) {
      $http({
        method: "delete",
        url: api_url + '/class/teacher/delete',
        data: { "cid": $scope.cid, "tid": tid },
        headers: { "Content-Type": "application/json;charset=utf-8" }
      }).success(function(data) {
        $($event.target).parents("tr").remove()
      })
    }

  }

  //非创建者身份自己主动退出
  $scope.leave = function(tid) {
    if (tid == $scope.tid) {
      $http.put(api_url + "/class/teacher/reply", {
        "cid": parseInt($scope.cid),
        "isAgree": 2
      }).success(function(data) {
        $location.path("class/list")
      })
    }
  }

}]);

//班级题库设置
app.controller('questionbank', ['$scope', '$http', '$routeParams', 'mxxServices', '$cookieStore', '$location', function($scope, $http, $routeParams, mxxServices, $cookieStore, $location) {
  $scope.cid = Number($routeParams.cid);
  $scope.tid = $cookieStore.get("user").tid;
  $scope.currentPage = 1;
  $scope.pageSize = 10;
  $scope.showAddPaper = false;
  // console.log($scope.cid);
  // 获取班级信息
  // mxxServices.getClassInfo($scope);
  //班级二维码
  mxxServices.showClass2WM($scope);
  // 获取班级信息
  $http.get(api_url + "/class/info?cid=" + $scope.cid)
  .success(function(data){
    $scope.className = data.className;
    $scope.password = data.password;
    $scope.limit = data.maxNumber;
    $scope.classNum = data.userNumber;
    $scope.createSid = data.sid;
    $scope.isPumping = data.isPumping;
    if(!$scope.isPumping){
      $scope.check = false;
    } else {
      $scope.check = true;
      // 获取题库配置信息
      $scope.getClassQuestionBankConfig();
    }
    // console.log($scope.check);
  });

  // 获取班级试卷列表
  $scope.getData = function(){
    $http.get(api_url + '/class/paper/list?cid=' + $scope.cid + '&page='+ $scope.currentPage + '&size=' + $scope.pageSize)
    .success(function(data){
      $scope.count = data.count;
      if ($scope.count == 0) { //表示当前作业列表为空
        $scope.num = 1;
      } else {
        $scope.num = Math.ceil($scope.count / $scope.pageSize); //班级分页数向上取整
        $scope.paperList = data.paperList;
      }
    })
  }
  // $scope.getData();

  // 上一页
  $scope.prev = function(){               
    if ($scope.currentPage > 1) {
      $scope.currentPage--;
      $scope.getData();
    }
  }

  // 下一页
  $scope.next = function(){
    if ($scope.currentPage < $scope.num) {
      $scope.currentPage++;
      $scope.getData();
    }
  }

  // 开通关闭班级题库
  $scope.isChecked = function(){
    var isPumping;
    if(!$scope.isPumping){
      isPumping = 1;
    } else {
      isPumping = 0;
    }
    // console.log(isPumping);    
    $http.post(api_url + '/class/question/bank/config',{
      "cid":$scope.cid,
      "isPumping":isPumping
    })
    .success(function(data){
      if(isPumping===1){
        $scope.check = true;
        $scope.isPumping = 1;
        // 获取题库配置信息
        $scope.getClassQuestionBankConfig();
      } else {
        $scope.check = false;
        $scope.isPumping = 0;
      }
    })
  }

  // 获取班级题库配置详情
  $scope.getClassQuestionBankConfig = function(){
    $http.get(api_url + '/class/question/bank/config?cid=' + $scope.cid)
    .success(function(data){
      $scope.dataId = data.dataId;
      $scope.paperNamePrefix = data.paperNamePrefix;
      $scope.totalAmount = data.totalAmount;
      $scope.amountConf = data.amountConf;
      $scope.amountInfo = data.amountInfo;
      $scope.totalScore = data.totalScore;
      $scope.totalDuration = Number(data.totalDuration)
      if($scope.totalDuration){
        if($scope.totalDuration<60){
          $scope.durationTime = $scope.totalDuration + '分钟';
          $scope.timeHour = 0;
          $scope.timeMinute = $scope.totalDuration;
        } else {
          var hours = parseInt($scope.totalDuration/60); //求整数
          var minute = $scope.totalDuration%60; //求余数
          // console.log(hours,minute)
          $scope.timeHour = hours;
          if(minute===0){
            $scope.durationTime = hours + '小时';
            $scope.timeMinute = 0;
          } else {
            $scope.durationTime = hours + '小时' + minute + '分钟';
            $scope.timeMinute = minute;
          }
        }
        $scope.backupsTime = {
          "timeHour": $scope.timeHour,
          "timeMinute":$scope.timeMinute
        }
      } else {
        $scope.durationTime = 0;
      }
      $scope.backupsConfig = {
        "dataId":$scope.dataId,
        "paperNamePrefix":$scope.paperNamePrefix,
        "totalAmount":$scope.totalAmount,
        "amountInfo":$scope.amountInfo,
        "totalDuration":$scope.totalDuration,
        "totalScore":$scope.totalScore
      }
      if(!$scope.amountConf){
        $scope.backupsConfig['amountConf'] = [[1,2,3,4],[0,0,0,0]];
        $scope.amountConf = $scope.backupsConfig['amountConf'];
        $scope.numberTotal = 0;
      } else {
        $scope.singleselect = $scope.amountConf[1][0];
        $scope.multiselect = $scope.amountConf[1][1];
        $scope.judge = $scope.amountConf[1][2];
        $scope.subjective = $scope.amountConf[1][3];
        $scope.numberTotal = $scope.singleselect + $scope.multiselect +$scope.judge +$scope.subjective;
      }
      if(!$scope.amountInfo){
        $scope.backupsConfig['amountInfo'] = [[1,2,3,4],[0,0,0,0]];
        $scope.amountInfo = $scope.backupsConfig['amountInfo'];
        $scope.allNumber = 0;
      } else {
        $scope.allNumber = $scope.amountInfo[1][0] + $scope.amountInfo[1][1] +$scope.amountInfo[1][2] +$scope.amountInfo[1][3];
      }
      $scope.isShowEdit = false;
      // console.log($scope.backupsConfig)
    })
  }

  // 显示编辑状态updateQuestionbankConfig()
  $scope.updateQuestionbankConfig = function(){
    if(!$scope.allNumber){
      alert('请先添加班级试卷哦');
      return;
    }
    $scope.isShowEdit = true;
    console.log($scope.timeMinute)
  }

  // 验证前缀名字信息
  $scope.validatePrefix = function(){
    if($scope.paperNamePrefix){
      if($scope.paperNamePrefix.length>10){
        alert('前缀名字不能大于10个字符');
        $scope.paperNamePrefix = $scope.backupsConfig['paperNamePrefix'];
        return;
      }
    } else {
      alert('请输入试卷前缀');
      return;
    }
  }

  // 验证单选题配置信息
  $scope.validateSingle = function(){
    if($scope.singleselect){
      $scope.singleselect = Number($scope.singleselect);
      var numStatus = isNaN($scope.singleselect);
      if(!numStatus){
        // 数字
        if($scope.amountInfo[1][0]==0){
          alert('当前总题量单选题数量不足，请添加试卷或者设定合适的题量');
          return;
        } else if($scope.singleselect<0){
          alert('题量不能为负数');
          $scope.singleselect = $scope.backupsConfig['amountConf'][1][0];
          return;
        } else if($scope.amountInfo[1][0]<$scope.singleselect){
          alert('请添加合适的题量')
          $scope.singleselect = $scope.backupsConfig['amountConf'][1][0];
          return;
        } else {
          $scope.numberTotal = $scope.singleselect+$scope.multiselect+$scope.judge+$scope.subjective;
        }
      } else {
        // 非数字
        alert('单选题数量，请输入数字');
        $scope.singleselect = $scope.backupsConfig['amountConf'][1][0];
        return;
      }
    }
  }
  // 验证多选题配置信息
  $scope.validateMultiselect = function(){
    if($scope.multiselect){
      $scope.multiselect = Number($scope.multiselect);
      var numStatus = isNaN($scope.multiselect);
      if(!numStatus){
        // 数字
        if($scope.amountInfo[1][1]==0){
          alert('当前总题量中多选题数量不足，请添加试卷或者设定合适的题量');
          return;
        } else if($scope.multiselect<0){
          alert('题量不能为负数');
          $scope.multiselect = $scope.backupsConfig['amountConf'][1][1];
          return;
        } else if($scope.amountInfo[1][1]<$scope.multiselect){
          alert('请添加合适的题量')
          $scope.multiselect = $scope.backupsConfig['amountConf'][1][1];
          return;
        } else {
          $scope.numberTotal = $scope.singleselect+$scope.multiselect+$scope.judge+$scope.subjective;
        }
      } else {
        // 非数字
        alert('多选题数量，请输入数字');
        $scope.multiselect = $scope.backupsConfig['amountConf'][1][1];
        return;
      }
    }
  }
  // 验证判断题配置信息
  $scope.validateJudge = function(){
    if($scope.judge){
      $scope.judge = Number($scope.judge);
      var numStatus = isNaN($scope.judge);
      if(!numStatus){
        if($scope.amountInfo[1][2]==0){
          alert('当前总题量中判断题数量不足，请添加试卷试题');
          return;
        } else if($scope.judge<0){
          alert('题量不能为负数');
          $scope.judge = $scope.backupsConfig['amountConf'][1][2];
          return;
        } else if($scope.amountInfo[1][2]<$scope.judge) {
          alert('请添加合适的题量')
          $scope.judge = $scope.backupsConfig['amountConf'][1][2];
          return;
        } else {
          $scope.numberTotal = $scope.singleselect+$scope.multiselect+$scope.judge+$scope.subjective;
        }
      } else {
        // 非数字
        alert('判断题数量，请输入数字');
        $scope.judge = $scope.backupsConfig['amountConf'][1][2];
        return;
      }
    }
  }
  // 验证主观题配置信息
  $scope.validateSubjective = function(){
    if($scope.subjective){
      $scope.subjective = Number($scope.subjective);
      var numStatus = isNaN($scope.subjective);
      if(!numStatus){
        // 数字
        if($scope.amountInfo[1][3]==0){
          alert('当前总题量中主观题数量不足，请添加试卷或者设定合适的题量');
          return;
        } else if($scope.subjective<0){
          alert('题量不能为负数');
          $scope.subjective = $scope.backupsConfig['amountConf'][1][3];
          return;
        } else if($scope.amountInfo[1][3]<$scope.subjective){
          alert('请添加合适的题量');
          $scope.subjective = $scope.backupsConfig['amountConf'][1][3];
          return;
        } else {
          $scope.numberTotal = $scope.singleselect+$scope.multiselect+$scope.judge+$scope.subjective;
        }
      } else {
        // 非数字
        alert('主观题数量，请输入数字');
        $scope.subjective = $scope.backupsConfig['amountConf'][1][3];
        return;
      }
    }
  }

  // 验证小时
  $scope.validateHour = function(){
    if($scope.timeHour){
      var numStatus = isNaN($scope.timeHour);
      if(!numStatus){
        // 数字
        if($scope.timeHour<0){
          alert('小时不能为负数');
          $scope.timeHour = $scope.backupsTime['timeHour'];
          return;
        }
      } else {
        // 非数字
        alert('请输入数字');
        $scope.timeHour = $scope.backupsTime['timeHour'];
        return;
      }
    }
  }

  // 验证分钟
  $scope.validateMinute = function(){
    if($scope.timeMinute){
      var numStatus = isNaN($scope.timeMinute);
      if(!numStatus){
        // 数字
        if($scope.timeMinute<60){
          if($scope.timeMinute < 0){
            alert('分钟不能为负数');
            $scope.timeMinute = $scope.backupsTime['timeMinute'];
            return;
          }
        } else {
          alert('分钟必须小于60')
          $scope.timeMinute = $scope.backupsTime['timeMinute'];
          return;
        }
      } else {
        // 非数字
        alert('请输入数字');
        $scope.timeMinute = $scope.backupsTime['timeMinute'];
        return;
      }
    }
  }

  // 验证总分
  $scope.validateScore = function(){
    if($scope.totalScore){
      var numStatus = isNaN($scope.totalScore);
      if(!numStatus){
        // 数字
        if($scope.totalScore<0){
          alert('总分不能为负数');
          $scope.totalScore = $scope.backupsConfig['totalScore'];
          return;
        }
      } else {
        // 非数字
        alert('请输入数字');
        $scope.totalScore = $scope.backupsConfig['totalScore'];
        return;
      }
    }
  }

  // 更新班级题库配置
  $scope.preservationConfig = function(){
    // 验证必填项
    if(!$scope.paperNamePrefix||!$scope.totalAmount){
      alert('请输入组卷前缀和每次组卷题量')
      return;
    }
    // 验证格式
    $scope.numberTotal = $scope.singleselect+$scope.multiselect+$scope.judge+$scope.subjective;
    if($scope.numberTotal < 1){
      alert('请填写题型数量');
      return;
    } else {
      $scope.amountConf = [[1,2,3,4],[$scope.singleselect,$scope.multiselect,$scope.judge,$scope.subjective]] 
    }
    // 拼装修改数据
    var obj = {
      "dataId": $scope.dataId,
      "paperNamePrefix": $scope.paperNamePrefix,
      "totalAmount": $scope.numberTotal,
      "amountConf": $scope.amountConf
    }
    if($scope.timeHour||$scope.timeMinute){
      if($scope.timeHour&&!$scope.timeMinute){
        $scope.totalDuration = $scope.timeHour*60;
      } else if(!$scope.timeHour&&$scope.timeMinute){
        $scope.totalDuration = $scope.timeMinute;
      } else if($scope.timeHour&&$scope.timeMinute){
        $scope.totalDuration = $scope.timeHour*60+$scope.timeMinute;
      }
      obj['totalDuration'] = $scope.totalDuration;
    }
    if($scope.totalScore){
      obj['totalScore'] = $scope.totalScore;
    }
    // 调用更新接口
    $http.put(api_url + '/class/question/bank/config',obj).success(function(data){
      $scope.isShowEdit = false;
      // 获取题库配置信息
      $scope.getClassQuestionBankConfig();
    });
  }

  // 取消
  $scope.cancelConfig = function(){
    $scope.isShowEdit = false;
    $scope.paperNamePrefix = $scope.backupsConfig['paperNamePrefix'];
    $scope.totalAmount = $scope.backupsConfig['totalAmount'];
    // $scope.amountConf = $scope.backupsConfig['amountConf'];
    $scope.totalDuration = $scope.backupsConfig['totalDuration'];
    $scope.totalScore = $scope.backupsConfig['totalScore'];
  }

  // 显示添加试卷
  $scope.showBoxOfAddPaper = function(){
    $scope.showAddPaper = true;
    // console.log($scope.showAddPaper);
    $scope.getMyPaperList();
  }
  // 取消
  $scope.cancelPaperBox = function(){
    $scope.showAddPaper = false;
  }

  // 获取我的试卷列表
  $scope.getMyPaperList = function(){
    $http.get(api_url + '/test/paper/teacher?page=1&size=1000').success(function(data){
      $scope.myPaperCount = data.count;
      $scope.myPaperList = data.paperList;
      $scope.newPaperList = new Array();
      // 拼装已敲定试卷
      for(var i=0; i<$scope.myPaperList.length; i++){
        if($scope.myPaperList[i]['isFinish'] === 1){
          $scope.newPaperList.push($scope.myPaperList[i]);
        }
      }
      // console.log($scope.newPaperList);
      // 将试卷名称限制固定的字符长度
      for(var n=0; n<$scope.newPaperList.length;n++){
        if($scope.newPaperList[n]['paperName'].length>15){
          $scope.newPaperList[n]['paperNameShort'] = $scope.newPaperList[n]['paperName'].substr(0,15)+'...';
        } else {
          $scope.newPaperList[n]['paperNameShort'] = $scope.newPaperList[n]['paperName'];
        }
      }
      // console.log($scope.newPaperList);
    })
    // 初始化本地已选待添加试卷为空
    $scope.localPaperList = [];
  }

  var localPid = [] 
  // 组装本地待选试卷列表
  $scope.addToTheLocal = function(paperNameShort,paperName,pid,index){
    var paperData = {
      "pid":pid,
      "paperName":paperName,
      "paperNameShort":paperNameShort
    }
    localPid.push(pid);
    $scope.localPaperList.push(paperData);
    $scope.newPaperList[index]['showStatus'] = true;
  }
  // 从本地移除
  $scope.removeFromLocal = function(index){
    var pid = $scope.localPaperList[index]['pid'];
    for(var e=0;e<$scope.newPaperList.length;e++){
      if(pid == $scope.newPaperList[e]['pid']){
        $scope.newPaperList[e]['showStatus'] = false;
        $scope.localPaperList.splice(index,1);
        localPid.splice(index,1);
        return;
      }
    }
  }

  // 添加班级试卷
  $scope.sureAddPaper = function(){
    if($scope.localPaperList.length>0){
      console.log(localPid);
      $http.post(api_url + '/class/paper',{
        "cid":$scope.cid,
        "pid":localPid
      }).success(function(data){
        $scope.showAddPaper = false;
        localPid = [];
        // 获取班级试卷列表
        $scope.getData();
        // 获取配置信息
        $scope.getClassQuestionBankConfig();
      })
    } else {
      alert('请选择待添加的试卷');
      return;
    }
  }
  // 移除班级试卷
  $scope.removeFromClassPaper = function(classPaperId){
    // console.log(classPaperId)
    $http({
      method: "DELETE",
      url: api_url + '/class/paper',
      data: { "classPaperId": [classPaperId] },
      headers: { "Content-Type": "application/json;charset=utf-8" }
    }).success(function(data) {
      if (!data.status) {
      // console.log('成功')
      // 获取班级试卷列表
      $scope.getData();
      // 获取配置信息
      $scope.getClassQuestionBankConfig();
      }
    })
  }
  // console.log($scope.isPumping)
  // $scope.getClassInfo();
}]);
//修改班级信息
app.controller("modify", ['$scope', '$http', '$routeParams', '$location', '$cookieStore', 'mxxServices', function($scope, $http, $routeParams, $location, $cookieStore, mxxServices) {
  $scope.cid = $routeParams.cid;

  $scope.sid = $cookieStore.get("user").sid;
  $scope.tid = $cookieStore.get("user").tid;

  mxxServices.getClassInfo($scope);

  //班级二维码
  mxxServices.showClass2WM($scope);

  //查询班级所有成员
  $http.get(api_url + "/class/info?cid=" + $scope.cid)
    .success(function(data) {
      $scope.className = data.className;
      $scope.limit = data.maxNumber;
      $scope.password = data.password;
      //修改班级信息
      $scope.reName = data.className;
      $scope.reNumber = data.maxNumber;
      $scope.rePassword = data.password;
      $scope.classAnnounce = data.remarkName || '';
      $scope.createSid = data.createTid;
      //判断是不是班级创建者
      if ($scope.tid !== $scope.createSid) {
        $(".class-modify").addClass("return");
      }
    });

  //140的班级留言
  $scope.tips = 140;

  $scope.counter = function() {
    if ($scope.classAnnounce.trim().length == 0) {
      $(".tips").css("display", "none");
      $(".error").css("display", "none");
    }
    if (0 < $scope.classAnnounce.trim().length <= 140) {
      $(".tips").css("display", "block");
      $(".error").css("display", "none");
      $scope.tips = 140 - $scope.classAnnounce.trim().length;
    }
    if ($scope.classAnnounce.trim().length > 140) {
      $(".tips").css("display", "none");
      $(".error").css("display", "block");
      $scope.tips = $scope.classAnnounce.trim().length - 140;
    }
  }

  //提交班级修改信息
  $scope.modify = function() {
    if ($(".class-modify").hasClass("return")) {
      alert("非班级创建者身份不可以修改班级信息")
      return;
    }
    //判断班级留言是否超出140字
    //班级留言不得超过140字
    if ($scope.classAnnounce && $scope.classAnnounce.trim().length > 140) {
      return;
    };
    //班级人数不能超过200人
    if (isNaN($scope.reNumber - 1)) {
      alert("请填写合法的班级人数!");
      return;
    };
    if ($scope.reNumber > 200) {
      alert("班级人数不能超过200人!");
      return;
    };

    if ($scope.reNumber < $scope.classNum) {
      alert("班级最大人数不能小于当前班级人数");
      return;
    }

    if ($scope.rePass) {
      var reg = /^\d{6,8}$/;
      if (!reg.test($scope.rePass)) {
        alert("密码必须是6-8位的数字!");
        return;
      }
    };

    var data = {
      "cid": parseInt($scope.cid), //转成数字
      "className": $scope.reName,
      "maxNumber": parseInt($scope.reNumber),
      "password": $scope.rePassword,
      "remarkName": $scope.classAnnounce
    };
    //转成JSON字符串
    data = JSON.stringify(data);
    $http.put(api_url + "/class", data).success(function(data) {
      alert("修改班级信息成功!");
      $location.path("/class/list");
    })
  };

}])

//班级学生统计信息
app.controller("personInfo", ['$scope', '$http', '$cookieStore', '$routeParams', 'mxxServices', function($scope, $http, $cookieStore, $routeParams, mxxServices) {
  $scope.cid = $routeParams.cid;
  $scope.uid = $routeParams.uid;
  $scope.sid = $cookieStore.get("user").sid;
  $scope.tid = $cookieStore.get("user").tid;

  mxxServices.getClassInfo($scope);
  mxxServices.showClass2WM($scope);

  //获取学生基本信息
  $http.get(api_url + "/student/class/report?studentId=" + $scope.uid + "&cid=" + $scope.cid)
    .success(function(data) {
      if (!data.status) {
        $scope.user = data;
      }
    })
}])

//作业习题列表
app.controller("paperlist", ['$scope', '$http', '$cookieStore', '$location', '$window', '$routeParams', function($scope, $http, $cookieStore, $location, $window, $routeParams) {
  $scope.type = Number($routeParams.type); //0--本地试题;1--外部获取;2--协助录题
  $scope.tid = $cookieStore.get("user").tid;
  $scope.currentPage = 1;
  $scope.pageSize = 10;

  //全选、反选
  $scope.isAllVisible = false; //默认不全选
  $scope.visible = {};
  $scope.allCheck = function() {
    if (!$scope.isAllVisible) {
      $scope.isAllVisible = true;
      angular.forEach($scope.paperlist, function(value, key, array) {
        $scope.visible[value.pid] = true;
      })
    } else {
      $scope.isAllVisible = false;
      $scope.visible = {};
    }
  };

  $scope.oneCheck = function(pid, idx) {
    if ($scope.visible[pid]) {
      delete $scope.visible[pid];
      $scope.isAllVisible = false;
      //如果为空对象
    } else {
      $scope.visible[pid] = true;
      var count = 0;
      for (key in $scope.visible) {
        count++;
      }
      if (count == $scope.paperlist.length) {
        $scope.isAllVisible = true;
      }

    }

    //判断选中的个数
    var pArray = [];
    for (key in $scope.visible) {
      pArray.push(key);
    }

    if (pArray.length != 1) {
      $(".handle-menu").find("a").removeAttr("href");
      if (!$(".export-paper").hasClass("disabled")) {
        $(".export-paper").addClass("disabled")
      }
    } else {
      //判断试卷是否已敲定isedit:  编辑状态 ( 1 -> 编辑中 ; 2 -> 已敲定 ; )'isfinish':   编辑状态：0-编辑中；1-已敲定；
      if ($scope.paperlist[idx].isFinish == 1) {
        $(".handle-menu").find("a").attr("href", "#/paper/export/" + pArray[0]);
        $(".export-paper").removeClass("disabled")
      } else {
        $(".handle-menu").find("a").removeAttr("href");
        if (!$(".export-paper").hasClass("disabled")) {
          $(".export-paper").addClass("disabled")
        }
      }
      /*$http.get(api_url + "/test/paper?pid=" + pArray[0])
        .success(function(data) {
          if (data.isFinish == 0) {
            $(".handle-menu").find("a").removeAttr("href");
            if (!$(".export-paper").hasClass("disabled")) {
              $(".export-paper").addClass("disabled")
            }
          } else if (data.isFinish == 1) {
            $(".handle-menu").find("a").attr("href", "#/paper/export/" + pArray[0]);
            $(".export-paper").removeClass("disabled")
          }
        })*/
    }
  };

  //鼠标经过操作按钮时触发
  $scope.mouse = {
    mouseover: function() {
      $(".handle-menu").css("display", "block")
    },
    mouseout: function() {
      $(".handle-menu").css("display", "none")
    }
  };

  //切换
  $scope.checkType = function(type) {
    $scope.type = type;
    $scope.currentPage = 1;
    $scope.isAllVisible = false; //默认不全选
    $scope.visible = {};
    if ($scope.type == 0) {
      $scope.getData();
    } else if ($scope.type == 1) {
      $scope.getGoodsData();
    } else if ($scope.type == 2) {
      $scope.getAssistData();
    }
  }

  //分页功能
  $scope.next = function() { //下一页
    if ($scope.currentPage < $scope.num) {
      $scope.currentPage++;
      if ($scope.type == 0 && !$scope.paperName) {
        $scope.getData();
      } else if ($scope.type == 1) {
        $scope.getGoodsData();
      } else if ($scope.type == 2) {
        $scope.getAssistData();
      } else if ($scope.paperName) {
        $scope.searchData();
      }
    }
  };
  $scope.prev = function() { //上一页                 
    if ($scope.currentPage > 1) {
      $scope.currentPage--;
      if ($scope.type == 0 && !$scope.paperName) {
        $scope.getData();
      } else if ($scope.type == 1) {
        $scope.getGoodsData();
      } else if ($scope.type == 2) {
        $scope.getAssistData();
      } else if ($scope.paperName) {
        $scope.searchData();
      }
    }
  };

  //获取试卷信息
  $scope.getData = function() {
    $http.get(api_url + "/test/paper/teacher?page=" + $scope.currentPage + "&size=" + $scope.pageSize)
      .success(function(data) {
        $scope.count = data.count;
        if ($scope.count == 0) { //表示当前作业列表为空
          $scope.num = 1;
        } else {
          $scope.num = Math.ceil($scope.count / $scope.pageSize); //班级分页数向上取整
          $scope.paperlist = data.paperList;
        }
      })
  };

  //获取商品信息
  $scope.getGoodsData = function() {
    $http.get(api_url + "/goods/paper/teacher/relation?page=" + $scope.currentPage + "&size=" + $scope.pageSize)
      .success(function(data) {
        $scope.count = data.count;
        if ($scope.count == 0) { //表示当前作业列表为空
          $scope.num = 1;
        } else {
          $scope.num = Math.ceil($scope.count / $scope.pageSize); //班级分页数向上取整
          $scope.goodslist = data.goodsList;
        }
      })
  };

  //协助录题列表
  $scope.getAssistData = function() {
    $http.get(api_url + "/assist/test/paper/input/teacher/list?page=" + $scope.currentPage + "&size=" + $scope.pageSize)
      .success(function(data) {
        $scope.count = data.count;
        if ($scope.count == 0) { //表示当前作业列表为空
          $scope.num = 1;
        } else {
          $scope.num = Math.ceil($scope.count / $scope.pageSize); //班级分页数向上取整
          $scope.assistList = data.assistList;
        }
      })
  }

  //显示的列表
  if ($scope.type == 0) {
    $scope.getData();
  } else if ($scope.type == 1) {
    $scope.getGoodsData();
  } else if ($scope.type == 2) {
    $scope.getAssistData();
  }

  //取消申请协助
  $scope.cancelAssist = function(id) {
    $http({
      method: "DELETE",
      url: api_url + '/assist/test/paper/input',
      data: { "ids": [id] },
      headers: { "Content-Type": "application/json;charset=utf-8" }
    }).success(function(data) {
      if (!data.status) {
        $scope.getAssistData();
      }
    })
  }

  //删除试卷
  $scope.delete = function() {
    var arr = [];
    for (key in $scope.visible) {
      arr.push(Number(key))
    }
    if (arr.length == 0) {
      alert("请选择要删除的试卷!");
      return;
    } else {
      var bool = window.confirm("确定要删除试卷吗?");
      /*var querry = "pid=";
      querry = querry + arr.join(",");*/
      //console.log(querry);
      if (bool) {
        // var querry = arr.join(",");
        $http({
          method: "DELETE",
          url: api_url + '/test/paper',
          data: { "pid": arr },
          headers: { "Content-Type": "application/json;charset=utf-8" }
        }).success(function(data) {
          //return;
          if (!data.status) {
            $scope.getData();
            //全选、反选 重置
            $scope.isAllVisible = false; //默认不全选
            $scope.visible = {};
          }
        })
      } else {
        $scope.visible = {};
      }
    }
  };

  //最后敲定试卷
  $scope.confirmPaper = function() {
    var arr = [];
    for (key in $scope.visible) {
      arr.push(Number(key));
    };
    if (arr.length == 0) {
      alert("请选择要敲定的习题!");
      return;
    } else {
      // console.log(arr)
      $http.post(api_url + "/test/paper/confirm", {
        "pid": arr
      }).success(function(data) {
        if (!data.status) {
          $scope.getData();
          $scope.visible = {};
        }
      })
    }
  };

  //发布试卷
  $scope.publish = function() {
    var arr = [];
    var flag = true;
    for (key in $scope.visible) {
      arr.push(Number(key));
    };
    if (arr.length == 0) {
      alert("请选择要发布的习题!");
      return;
    } else {
      angular.forEach($scope.paperlist, function(ele) {
        angular.forEach(arr, function(element) {
          if (element == ele.pid && ele.isFinish != 1) {
            alert("请选择已敲定的习题!");
            flag = false;
          }
        })
      })
      if (flag) {
        $location.path('paper/publish/' + arr.join(',') + '/0');
      }
    }
  }

  //转为编辑
  $scope.edit = function() {
    var arr = [];
    for (key in $scope.visible) {
      arr.push(Number(key))
    };
    if (arr.length == 0) {
      alert("请选择要编辑的习题!");
      return;
    } else {
      $http.post(api_url + "/test/paper/edit", {
        "pid": arr
      }).success(function(data) {
        if (!data.ret) {
          $scope.getData();
          $scope.visible = {};
        }
      })
    }
  };

  //搜索习题列表
  $scope.searchData = function() {
    $http.put(api_url + "/test/paper/search?page=" + $scope.currentPage + "&size=" + $scope.pageSize, {
      "paperName": $scope.paperName
    }).success(function(data) {
      $scope.count = data.count;
      if ($scope.count == 0) { //表示当前作业列表为空
        $scope.num = 1;
        $scope.paperName = "";
        $scope.getData();
        alert("没有找到您要搜索的试卷!");
      } else {
        $scope.num = Math.ceil($scope.count / $scope.pageSize); //班级分页数向上取整
        $scope.paperlist = data.paperList;
      }
    })
  }

  $scope.search = function() {
    if (!$scope.paperName) {
      $scope.getData();
      return;
    }
    $scope.currentPage = 1;
    $scope.searchData();
  };

  document.onkeydown = function(ev) {
    var ev = ev || window.ev;
    if (ev.keyCode && ev.which == 13) {
      $scope.search();
    }
  };

  //拷贝习题
  $scope.load = function() {
    $(".dialog_wrp").css("display", "block");
    $(".mask").css("display", "block");
    $scope.copycode = '';
    $scope.captcha = '';

    //刷新二维码
    $scope.refresh();
  };

  $scope.refresh = function() {
    $http.get(api_url + "/image/code?w=100&h=40")
      .success(function(data) {
        $scope.image = data.image;
        $scope.key = data.codeKey;
      })
  };


  $scope.cancel = function() {
    $(".dialog_wrp").css("display", "none");
    $(".mask").css("display", "none")
  };

  //确认
  $scope.confirm = function() {
    $scope.copyStatus = true;
    $scope.copyFalie = "";
    if (!$scope.copycode) {
      alert("请输入授权码!")
      return;
    };

    if (!$scope.captcha) {
      alert("请输入验证码!")
      return;
    };
    // alert('开始调用');
    $http.post(api_url + "/test/paper/copy", {
      "codeKey": $scope.key,
      "code": $scope.captcha,
      "copyCode": $scope.copycode
    }).success(function(data) {
      // alert('看看结果');
      // console.log(data.status);
      if (!data.status) {
        $scope.copyStatus = false;
        $scope.copyFalie = "";
        alert("习题导入成功!");
        $(".dialog_wrp").css("display", "none");
        $(".mask").css("display", "none")
        $scope.getData();
      } else {
        $scope.copyStatus = false;
        $scope.copyFalie = "拷贝失败";
        $scope.refresh();
        $scope.captcha = '';
      }
    })
  };

  //导出word
  $scope.export = function($event) {
    if ($(".export-paper").hasClass("disabled")) {
      $(".handle-menu").find("a").removeAttr("href");
      return;
    }
    var arr = [];
    for (key in $scope.visible) {
      arr.push(key)
    };
    //key为选中试卷的pid
    if (arr.length !== 1) {
      alert("请选择要导出的某一套试卷!");
      return false;
    }
    //判断试卷是否是已敲定
    $(".export-paper").addClass("disabled");
    $scope.visible = {};
  }

}]);

//新增修改发布
app.controller("paperPublish", ['$scope', '$http', '$cookieStore', '$location', '$routeParams', function($scope, $http, $cookieStore, $location, $routeParams) {
  $scope.pid = $routeParams.pid.split(',').map(function(a) {
    return +a
  });
  $scope.gid = Number($routeParams.gid);

  $scope.back = function() {
    if ($scope.gid == 0) {
      $location.path('paper/list');
    } else {
      $location.path('paper/public');
    }
  }

  $scope.selectedClass = [];
  $scope.selectedCourse = [];
  if ($scope.gid == 0) {
    //新增
    //获取试卷列表
    $http.put(api_url + '/paper/info/get', { "pid": $scope.pid })
      .success(function(data) {
        $scope.paperList = data.paperList;
        //价格字段加入
        angular.forEach($scope.paperList, function(ele) {
          ele['paperPrice'] = '';
        })
      })

    //获取阶段年级科目
    //获取所有标签
    $http.get(api_url + '/tag/public/stage/grade')
      .success(function(data) {
        $scope.tags = data.stageList;
      })

    //获取所有课程
    $http.get(api_url + '/tag?isPublic=1&tagType=3&isUse=1&page=1&size=1000')
      .success(function(data) {
        $scope.courses = data.tagList;
      })

  } else {
    //修改
    $http.get(api_url + '/goods/paper?goodsId=' + $scope.gid)
      .success(function(data) {
        $scope.goodName = data.goodsName;
        $scope.totalPrice = data.price;
        $scope.paperList = data.paperList;
        $scope.endTime = data.validityEndTime;
        $scope.someTagIds = [];
        angular.forEach(data.tagList, function(ele) {
            $scope.someTagIds.push(ele.tagId)
          })
          //获取所有标签
        $http.get(api_url + '/tag/public/stage/grade')
          .success(function(data) {
            $scope.tags = data.stageList;
            angular.forEach($scope.tags, function(ele) {
              if ($scope.someTagIds.indexOf(ele.tagId) != -1) {
                //阶段
                $scope.stageId = ele.tagId;
                //班级列表
                $scope.tagList = ele.gradeList;
                $("#stage").attr("disabled", true)
              }
            })
            angular.forEach($scope.tagList, function(ele) {
              if ($scope.someTagIds.indexOf(ele.tagId) != -1) {
                $scope.selectedClass.push(ele.tagId);
              }
            })
          })

        //获取所有课程
        $http.get(api_url + '/tag?isPublic=1&tagType=3&isUse=1&page=1&size=1000')
          .success(function(data) {
            $scope.courses = data.tagList;
            angular.forEach($scope.courses, function(ele) {
              if ($scope.someTagIds.indexOf(ele.tagId) != -1) {
                $scope.selectedCourse.push(ele.tagId);
              }
            })
          })

      })
  }

  //失去焦点获取价格
  $scope.getPrice = function(index, evt) {
    if (isNaN(Number(evt.target.value))) {
      evt.target.value = '0.00'
      $scope.paperList[index].paperPrice = "0.00";
    } else {
      /*if (Number(evt.target.value) > 5) {
        alert("单个试卷价格不得超过五元!")
        evt.target.value = '0.00'
        $scope.paperList[index].paperPrice = "0.00";
      }*/
      $scope.paperList[index].paperPrice = Number(Number(evt.target.value).toFixed(2));
    }
    $scope.totalPrice = 0.00;
    $scope.paperList.map(function(i) {
      $scope.totalPrice += Number(i.paperPrice)
    })
  }

  //删除pid
  $scope.deletePaper = function(idx) {
    $scope.paperList.splice(idx, 1)
      //计算总分
    $scope.totalPrice = 0.00;
    $scope.paperList.map(function(i) {
      $scope.totalPrice += Number(i.paperPrice)
    })
  }

  //选择阶段出班级列表
  $scope.chooseStage = function() {
    angular.forEach($scope.tags, function(ele) {
      if (ele.tagId == $scope.stageId) {
        $scope.tagList = ele.gradeList;
      }
    })
  }

  //选择班级,阶段不可选
  $scope.chooseClass = function(id) {
    var idx = $scope.selectedClass.indexOf(id);
    if (idx == -1) {
      $scope.selectedClass.push(id)
    } else {
      $scope.selectedClass.splice(idx, 1)
    }
    if ($scope.selectedClass.length) {
      $("#stage").attr("disabled", true)
    } else {
      $("#stage").removeAttr(("disabled"))
    }
  }

  //清空选择
  $scope.clearChoosen = function() {
    $scope.selectedClass = [];
    $("#stage").removeAttr(("disabled"))
  }

  //选择科目
  $scope.chooseCourse = function(id) {
    var idx = $scope.selectedCourse.indexOf(id);
    if (idx == -1) {
      $scope.selectedCourse.push(id)
    } else {
      $scope.selectedCourse.splice(idx, 1)
    }
  }

  $scope.confirm = function() {
    if (!$scope.goodName || !$('.end-date').val()) {
      alert("请填写完整信息!")
      return
    }
    $scope.tagIds = [];
    $scope.tagIds = $scope.tagIds.concat($scope.stageId).concat($scope.selectedClass).concat($scope.selectedCourse);
    if ($scope.gid == 0) { //新增
      var obj = {
        "goodsName": $scope.goodName,
        "price": $scope.totalPrice,
        "classificationId": 100000, //写死!
        "validityEndTime": $('.end-date').val(),
        "tagId": $scope.tagIds,
        "paperList": $scope.paperList
      }
      $http.post(api_url + '/goods', obj)
        .success(function(data) {
          if (!data.status) {
            alert("发布商品成功!");
            $location.path('paper/public');
          }
        })
    } else { //修改
      //新增标签
      $scope.postTags = [];
      angular.forEach($scope.tagIds, function(ele) {
        if ($scope.someTagIds.indexOf(ele) == -1) {
          $scope.postTags.push(ele);
        }
      })

      //删除标签
      $scope.deleteTags = [];
      angular.forEach($scope.someTagIds, function(ele) {
        if ($scope.tagIds.indexOf(ele) == -1) {
          $scope.deleteTags.push(ele);
        }
      })

      var obj = {
        "goodsId": $scope.gid,
        "goodsName": $scope.goodName,
        "price": $scope.totalPrice,
        "validityEndTime": $('.end-date').val(),
        "tagAdd": $scope.postTags,
        "tagDelete": $scope.deleteTags,
        "paperList": $scope.paperList
      }
      $http.put(api_url + '/goods', obj)
        .success(function(data) {
          if (!data.status) {
            alert("发布商品成功!");
            $location.path('paper/public');
          }
        })

    }
  }

}])


//公共习题库
app.controller("paperPublic", ['$scope', '$http', '$cookieStore', '$location', function($scope, $http, $cookieStore, $location) {
  // $scope.type = Number($routeParams.type); //0--免费题库;1--有偿题库;2--我的分享
  $scope.tid = $cookieStore.get("user").tid;
  $scope.currentPage = 1;
  $scope.pageSize = 10;

  //获取阶段年级科目
  //获取所有标签
  $http.get(api_url + '/tag/public/stage/grade')
    .success(function(data) {
      $scope.tags = data.stageList;
      //初始化年级标签列表，需要循环
      angular.forEach($scope.tags, function(ele) {
        if (ele.tagId == 100002) {
          $scope.gradeList = ele.gradeList;
        }
      })
    })

  //获取所有科目
  $http.get(api_url + '/tag?isPublic=1&tagType=3&isUse=1&page=1&size=1000')
    .success(function(data) {
      $scope.courses = data.tagList;
    })

  //获取所有版本
  $http.get(api_url + '/tag?isPublic=1&tagType=7&isUse=1&page=1&size=1000')
    .success(function(data) {
      $scope.versionList = data.tagList;
    })

  //获取所有试卷类型
  $http.get(api_url + '/tag?isPublic=1&tagType=8&isUse=1&page=1&size=1000')
    .success(function(data) {
      $scope.typeList = data.tagList;
    })  

  //初始化
  $scope.selectedGrade = [];
  $scope.selectedCourse = []; //放在外面,与其他无关
  $scope.selectedVersion = [];
  $scope.selectedPaperType = []
  $scope.stageId = 100002;

  //点击根据阶段获取年级
  $scope.getStage = function(id,type) {
    $scope.payQuestion = type;
    // alert('1'+ $scope.payQuestion);
    if ($scope.stageId == id) return;
    $scope.stageId = id;
    $scope.gradeList = [];
    $scope.selectedGrade = []
    $scope.shareType = false;
    $scope.tagIds = [];
    $scope.tagIds = $scope.tagIds.concat($scope.selectedCourse).concat($scope.stageId);
    $scope.currentPage = 1;
    //判断加载有偿题库还是免费题库
    if ($scope.payQuestion){
      $scope.getGoodsData();
    } else {
      $scope.getFreeDate();
    }
    angular.forEach($scope.tags, function(ele) {
      if (ele.tagId == id) {
        $scope.gradeList = ele.gradeList;
      }
    })
  }


  //默认先显示我的分享
  // $scope.shareType = true;
  $scope.myShare = false;
  $scope.freeQuestion = true;
  $scope.payQuestion = false;

  $scope.getMain = function() {
    $scope.gradeList = [];
    $scope.selectedCourse = [];
    $scope.selectedGrade = [];
    $scope.stageId = '';
    $scope.currentPage = 1;
    $scope.getData();
    $scope.myShare = true;
    $scope.freeQuestion = false;
    $scope.payQuestion = false;
  }

  //切换为免费题库
  $scope.changeFreeType = function() {
    $scope.myShare = false;
    $scope.freeQuestion = true;
    $scope.payQuestion = false;
    
    //默认获取免费题库数据
    $scope.stageId = 100002;
    $scope.gradeList = [];
    $scope.selectedGrade = [];
    $scope.shareType = false;
    $scope.tagIds = [];
    $scope.tagIds = $scope.tagIds.concat($scope.selectedCourse).concat($scope.stageId);
    $scope.currentPage = 1;
    $scope.getFreeDate();
    angular.forEach($scope.tags, function(ele) {
      if (ele.tagId == 100002) {
        $scope.gradeList = ele.gradeList;
      }
    })
  }
  //切换为有偿题库
  $scope.changePayType = function() {
    $scope.myShare = false;
    $scope.freeQuestion = false;
    $scope.payQuestion = true;

    //默认获取有偿题库数据
    $scope.stageId = 100002;
    $scope.gradeList = [];
    $scope.selectedGrade = [];
    $scope.shareType = false;
    $scope.tagIds = [];
    $scope.tagIds = $scope.tagIds.concat($scope.selectedCourse).concat($scope.stageId);
    $scope.currentPage = 1;
    $scope.getGoodsData();
    angular.forEach($scope.tags, function(ele) {
      if (ele.tagId == 100002) {
        $scope.gradeList = ele.gradeList;
      }
    })
  }

  //选择年级
  $scope.chooseGrade = function(id,type) {
    $scope.payQuestion = type;
    var idx = $scope.selectedGrade.indexOf(id);
    // alert(idx);
    if (idx == -1) {
      $scope.selectedGrade.push(id)
    } else {
      $scope.selectedGrade.splice(idx, 1)
    }
    $scope.tagIds = [];
    $scope.tagIds = $scope.tagIds.concat($scope.selectedPaperType).concat($scope.selectedVersion).concat($scope.selectedCourse).concat($scope.selectedGrade).concat($scope.stageId);
    $scope.currentPage = 1;
    //判断加载有偿题库还是免费题库
    if ($scope.payQuestion){
      $scope.getGoodsData();
    } else {
      $scope.getFreeDate();
    }
  }

  //选择科目
  $scope.chooseCourse = function(id,type) {
    $scope.payQuestion = type;
    var idx = $scope.selectedCourse.indexOf(id);
    if (idx == -1) {
      $scope.selectedCourse.push(id)
    } else {
      $scope.selectedCourse.splice(idx, 1)
    }
    $scope.tagIds = [];
    $scope.tagIds = $scope.tagIds.concat($scope.selectedPaperType).concat($scope.selectedVersion).concat($scope.selectedCourse).concat($scope.selectedGrade).concat($scope.stageId);
    $scope.currentPage = 1;
    //判断加载有偿题库还是免费题库
    if ($scope.payQuestion){
      $scope.getGoodsData();
    } else {
      $scope.getFreeDate();
    }
  }

  //选择版本
  $scope.chooseVersion = function(id,type){
    $scope.payQuestion = type;
    var idx = $scope.selectedVersion.indexOf(id);
    // alert(idx);
    if (idx == -1) {
      $scope.selectedVersion.push(id)
    } else {
      $scope.selectedVersion.splice(idx, 1)
    }
    $scope.tagIds = [];
    $scope.tagIds = $scope.tagIds.concat($scope.selectedPaperType).concat($scope.selectedVersion).concat($scope.selectedCourse).concat($scope.selectedGrade).concat($scope.stageId);
    $scope.currentPage = 1;
    //判断加载有偿题库还是免费题库
    if ($scope.payQuestion){
      $scope.getGoodsData();
    } else {
      $scope.getFreeDate();
    }
  }

  //选择试卷类型
  $scope.choosePaperType = function(id,type){
    $scope.payQuestion = type;
    var idx = $scope.selectedPaperType.indexOf(id);
    if (idx == -1) {
      $scope.selectedPaperType.push(id)
    } else {
      $scope.selectedPaperType.splice(idx, 1)
    }
    $scope.tagIds = [];
    $scope.tagIds = $scope.tagIds.concat($scope.selectedPaperType).concat($scope.selectedVersion).concat($scope.selectedCourse).concat($scope.selectedGrade).concat($scope.stageId);
    $scope.currentPage = 1;
    //判断加载有偿题库还是免费题库
    if ($scope.payQuestion){
      $scope.getGoodsData();
    } else {
      $scope.getFreeDate();
    }
  }


  //分页功能
  $scope.next = function(type) { //下一页
    $scope.payQuestion = type;
    if ($scope.currentPage < $scope.num) {
      $scope.currentPage++;
      if ($scope.shareType) {
        $scope.getData();
      } else if ($scope.payQuestion){
        $scope.getGoodsData();
      } else if (!$scope.payQuestion){
        $scope.getFreeDate();
      }
    }
  };
  $scope.prev = function(type) { //上一页  
    $scope.payQuestion = type;             
    if ($scope.currentPage > 1) {
      $scope.currentPage--;
      if ($scope.shareType) {
        $scope.getData();
      } else if ($scope.payQuestion){
        $scope.getGoodsData();
      } else if (!$scope.payQuestion){
        $scope.getFreeDate();
      }
    }
  };

  //获取我的分享
  $scope.getData = function() {
    $http.get(api_url + "/goods/paper/teacher?type=0&page=" + $scope.currentPage + "&size=" + $scope.pageSize)
      .success(function(data) {
        $scope.count = data.count;
        if ($scope.count == 0) { //表示当前作业列表为空
          $scope.num = 1;
          $scope.goodslist = [];
        } else {
          $scope.num = Math.ceil($scope.count / $scope.pageSize); //班级分页数向上取整
          $scope.goodslist = data.goodsList;
          angular.forEach($scope.goodslist, function(ele) {
            ele["show"] = false;
            // ele["showDesc"] = false;
          })
        }
      })
  }

  //获取商品信息
  $scope.getGoodsData = function() {
    $http.get(api_url + "/goods/paper/shop?tagId=[" + $scope.tagIds + "]&page=" + $scope.currentPage + "&size=" + $scope.pageSize)
      .success(function(data) {
        if (!data.status) {
          $scope.count = data.count;
          if ($scope.count == 0) { //表示当前作业列表为空
            $scope.num = 1;
            $scope.goodslist = [];
            $scope.paperDate = true;
          } else {
            $scope.paperDate = false;
            $scope.num = Math.ceil($scope.count / $scope.pageSize); //班级分页数向上取整
            $scope.goodslist = data.goodsList;
            angular.forEach($scope.goodslist, function(ele) {
              ele["show"] = false;
              // ele["showDesc"] = false;
            })
          }
        } else {
          $scope.num = 1;
          $scope.goodslist = [];
          $scope.paperDate = true;
        }
      })
  }

  //默认不显示无数据提示
  $scope.paperDate = false;
  //获取免费题库信息
  $scope.tagIds = [100002];
  $scope.getFreeDate = function(){
    $http.get(api_url + "/question/bank/paper/list?tagId=[" + $scope.tagIds + "]&page=" + $scope.currentPage + "&size=" + $scope.pageSize)
      .success(function(data) {
        $scope.dataStatus = data.status;
        if ($scope.dataStatus == 0) {
          $scope.paperDate = false;
          $scope.count = data.count;
          if ($scope.count == 0) { //表示当前作业列表为空
            $scope.num = 1;
            $scope.freeList = [];
          } else {
            $scope.num = Math.ceil($scope.count / $scope.pageSize); //班级分页数向上取整
            $scope.freeList = data.paperList;
            angular.forEach($scope.freeList, function(ele) {
              ele["show"] = false;
              // ele["showDesc"] = false;
            })
          }
        } else {
          $scope.num = 1;
          $scope.freeList = [];
          $scope.paperDate = true;
        }
      })
  }
  //进入页面获取默认设置小学阶段试卷
  $scope.getFreeDate();

  //点击商品获取试卷列表
  $scope.toggle = function(id, index) {
    if ($scope.goodslist[index].show) {
      $scope.goodslist[index].show = false
    } else {
      angular.forEach($scope.goodslist, function(ele) {
        ele["show"] = false;
      })
      $scope.goodslist[index].show = true;
    }
    $http.get(api_url + "/goods/paper/list?goodsId=" + id)
      .success(function(data) {
        $scope.paperlist = data.paperList;
      })
  }

  //切换显示更多和收起更多(有偿)
  $scope.changePayShowType = function(){
    $scope.payShowType = !$scope.payShowType;
  }
  //切换显示更多和收起更多（免费）
  $scope.changeFreeShowType = function(){
    $scope.freeShowType = !$scope.freeShowType;
  }

}]);


//录入习题名
app.controller("paperName", ['$scope', '$http', '$cookieStore', '$location', '$routeParams', function($scope, $http, $cookieStore, $location, $routeParams) {
  $scope.tid = $cookieStore.get("user").tid;
  $scope.size = 12;
  $scope.tagList = []; //tag对象集合

  //获取标签列表(不分页)
  $scope.getTagList = function() {
    $http.get(api_url + "/tag/test/paper/achieve?pid=" + $routeParams.pid + "&page=1&size=9999")
      .success(function(data) {
        $scope.oldList = data.tagList;
        $scope.tagList = $scope.tagList.concat($scope.oldList)

        $scope.oldTagIds = []; //tagId集合
        $scope.oldIds = []; //id集合(删除用)
        angular.forEach($scope.oldList, function(ele) {
          $scope.oldTagIds.push(ele.tagId);
          $scope.oldIds.push(ele.id);
        })

        $scope.uploadArr();
      })
  }

  if ($routeParams.pid) {
    //获取作业名
    $http.get(api_url + "/test/paper?pid=" + $routeParams.pid)
      .success(function(data) {
        $scope.pname = data.paperName;
      })

    $scope.getTagList();
  };


  //试卷公有标签
  $scope.getPublic = function() {
    $http.get(api_url + "/tag?isPublic=1&tagType=5&page=" + $scope.publicPage + "&size=" + $scope.size)
      .success(function(data) {
        $scope.publicTagList = $scope.publicTagList.concat(data.tagList);
        if ($scope.publicPage * $scope.size < data.count) {
          $scope.publicMore = true;
        } else {
          $scope.publicMore = false;
        }
      })
  }

  $scope.morePublic = function() {
    $scope.publicPage++;
    $scope.getPublic();
  }

  //试卷私有标签
  $scope.getPrivate = function() {
    $http.get(api_url + "/tag?isPublic=0&tagType=5&page=" + $scope.privatePage + "&size=" + $scope.size)
      .success(function(data) {
        $scope.privateTagList = $scope.privateTagList.concat(data.tagList);
        if ($scope.privatePage * $scope.size < data.count) {
          $scope.privateMore = true;
        } else {
          $scope.privateMore = false;
        }
      })
  }

  $scope.morePrivate = function() {
    $scope.privatePage++;
    $scope.getPrivate();
  }

  $scope.newTag = function() {
    if ($scope.addTagName) {
      if ($scope.addTagName.length > 8) {
        alert("标签不能超过八个字!")
        return;
      }
      $http.post(api_url + '/tag', {
        "isPublic": 0,
        "tagType": 5,
        "tagName": $scope.addTagName,
      }).success(function(data) {
        if (!data.status) {
          $scope.privatePage = 1;
          $scope.privateTagList = [];
          $scope.getPrivate();
        }
      })
    }
    $scope.addTag = false;
    $scope.addTagName = "";
  }

  //删除标签列表
  $scope.deleteTag = function(index) {
    $scope.tagList.splice(index, 1);
    $scope.uploadArr();
  }

  $scope.openModal = function() {
    $scope.tagModal = true;

    $scope.publicPage = 1;
    $scope.privatePage = 1;

    $scope.publicTagList = [];
    $scope.privateTagList = [];

    $scope.getPublic();
    $scope.getPrivate();

    $scope.tempTagArr = [];
    $scope.tempTagArr = $scope.tempTagArr.concat($scope.tagList)

    $scope.uploadArr();
  }

  $scope.chooseTag = function(obj) {
    var index = $scope.selectedTagIds.indexOf(obj.tagId)
    if (index == -1) {
      $scope.tempTagArr.push(obj);
      $scope.selectedTagIds.push(obj.tagId);
    } else {
      $scope.tempTagArr.splice(index, 1)
      $scope.selectedTagIds.splice(index, 1)
    }
  }

  //遍历数组更新
  $scope.uploadArr = function() {
    $scope.selectedTagIds = []; //tagId集合
    $scope.selectedIds = []; //id集合(删除用)
    angular.forEach($scope.tagList, function(ele) {
      $scope.selectedTagIds.push(ele.tagId);
      $scope.selectedIds.push(ele.id);
    })
  }

  $scope.hideModal = function() {
    $scope.tagModal = false;
    $scope.uploadArr();
  }

  $scope.confirm = function() {
    $scope.tagModal = false;
    $scope.tagList = $scope.tempTagArr;
    $scope.uploadArr();
  }

  //下一步
  $scope.nextstep = function() {
    if (!$scope.pname) {
      alert("请填写习题名!");
      return;
    } else if ($scope.pname.length > 50) {
      alert("试卷名不能超过50个字");
      return;
    } else {
      $scope.pname = $scope.pname.trim();
    }

    if (!$routeParams.pid) {
      //在这里初始化一份试卷
      $http.post(api_url + "/test/paper", {
        "paperName": $scope.pname,
        "tagId": $scope.selectedTagIds
      }).success(function(data) {
        if (!data.status) {
          $location.path("/paper/input/" + data.pid);
        }
      })

    } else {
      //新增标签
      $scope.postTags = [];
      angular.forEach($scope.selectedTagIds, function(ele) {
        if ($scope.oldTagIds.indexOf(ele) == -1) {
          $scope.postTags.push(ele);
        }
      })

      //删除标签
      $scope.deleteTags = [];
      angular.forEach($scope.oldIds, function(ele) {
        if ($scope.selectedIds.indexOf(ele) == -1) {
          $scope.deleteTags.push(ele);
        }
      })

      //修改试卷名
      $http.put(api_url + "/test/paper", {
        "pid": parseInt($routeParams.pid),
        "paperName": $scope.pname
      }).success(function(data) {
        if (!data.status) {
          //新增和删除标签
          if ($scope.postTags.length && $scope.deleteTags.length) {
            $http.post(api_url + "/tag/test/paper", {
              "pid": parseInt($routeParams.pid),
              "tagId": $scope.postTags
            }).success(function(data) {
              if (!data.status) {
                $http({
                  method: "DELETE",
                  url: api_url + '/tag/test/paper',
                  data: { "id": $scope.deleteTags },
                  headers: { "Content-Type": "application/json;charset=utf-8" }
                }).success(function(data) {
                  if (!data.status) {
                    $location.path("/paper/input/" + $routeParams.pid);
                  }
                })
              }
            })
          } else if ($scope.postTags.length && !$scope.deleteTags.length) {
            $http.post(api_url + "/tag/test/paper", {
              "pid": parseInt($routeParams.pid),
              "tagId": $scope.postTags
            }).success(function(data) {
              if (!data.status) {
                $location.path("/paper/input/" + $routeParams.pid);
              }
            })
          } else if (!$scope.postTags.length && $scope.deleteTags.length) {
            $http({
              method: "DELETE",
              url: api_url + '/tag/test/paper',
              data: { "id": $scope.deleteTags },
              headers: { "Content-Type": "application/json;charset=utf-8" }
            }).success(function(data) {
              if (!data.status) {
                $location.path("/paper/input/" + $routeParams.pid);
              }
            })
          } else {
            $location.path("/paper/input/" + $routeParams.pid);
          }

        }
      })

    }
  };

}])


//标签管理
app.controller("paperTag", ['$scope', '$http', function($scope, $http) {
  $scope.publicPaperPage = 1;
  $scope.privatePaperPage = 1;
  $scope.publicQuestionPage = 1;
  $scope.privateQuestionPage = 1;
  $scope.size = 12;

  $scope.publicPaperTagList = [];
  $scope.privatePaperTagList = [];
  $scope.publicQuestionTagList = [];
  $scope.privateQuestionTagList = [];

  $scope.tagType = 1;

  //试卷公有标签
  $scope.getPaperPublic = function() {
    $http.get(api_url + "/tag?isPublic=1&tagType=5&page=" + $scope.publicPaperPage + "&size=" + $scope.size)
      .success(function(data) {
        $scope.publicPaperTagList = $scope.publicPaperTagList.concat(data.tagList);
        if ($scope.publicPaperPage * $scope.size < data.count) {
          $scope.publicPaperMore = true;
        } else {
          $scope.publicPaperMore = false;
        }
      })
  }
  $scope.getPaperPublic();

  $scope.morePaperPublic = function() {
    $scope.publicPaperPage++;
    $scope.getPaperPublic();
  }

  //试卷私有标签
  $scope.getPaperPrivate = function() {
    $http.get(api_url + "/tag?isPublic=0&tagType=5&page=" + $scope.privatePaperPage + "&size=" + $scope.size)
      .success(function(data) {
        $scope.privatePaperTagList = $scope.privatePaperTagList.concat(data.tagList);
        if ($scope.privatePaperPage * $scope.size < data.count) {
          $scope.privatePaperMore = true;
        } else {
          $scope.privatePaperMore = false;
        }
      })
  }
  $scope.getPaperPrivate();

  $scope.morePaperPrivate = function() {
    $scope.privatePaperPage++;
    $scope.getPaperPrivate();
  }

  $scope.newPaperTag = function() {
    // alert('12');
    if ($scope.addPaperTagName) {
      if ($scope.addPaperTagName.length > 8) {
        alert("标签不能超过八个字!")
        return;
      }
      $http.post(api_url + '/tag', {
        "isPublic": 0,
        "tagType": 5,
        "tagName": $scope.addPaperTagName,
      }).success(function(data) {
        if (!data.status) {
          $scope.privatePaperPage = 1;
          $scope.privatePaperTagList = [];
          $scope.getPaperPrivate();
        }
      })
    }
    $scope.addPaperTag = false;
    $scope.addPaperTagName = "";
  }

  $scope.deletePaperTag = function(id) {
    $http({
      method: "DELETE",
      url: api_url + '/tag',
      data: { "tagId": [id] },
      headers: { "Content-Type": "application/json;charset=utf-8" }
    }).success(function(data) {
      if (!data.status) {
        $scope.privatePaperPage = 1;
        $scope.privatePaperTagList = [];
        $scope.getPaperPrivate();
      }
    })
  }

//试题标签
  //试题公有标签
  $scope.getQuestionPublic = function() {
    $http.get(api_url + "/tag?isPublic=1&tagType=6&page=" + $scope.publicQuestionPage + "&size=" + $scope.size)
      .success(function(data) {
        $scope.publicQuestionTagList = $scope.publicQuestionTagList.concat(data.tagList);
        if ($scope.publicQuestionPage * $scope.size < data.count) {
          $scope.publicQuestionMore = true;
        } else {
          $scope.publicQuestionMore = false;
        }
      })
  }
  $scope.getQuestionPublic();

  $scope.moreQuestionPublic = function() {
    $scope.publicQuestionPage++;
    $scope.getQuestionPublic();
  }

  //试题私有标签
  $scope.getQuestionPrivate = function() {
    $http.get(api_url + "/tag?isPublic=0&tagType=6&page=" + $scope.privateQuestionPage + "&size=" + $scope.size)
      .success(function(data) {
        $scope.privateQuestionTagList = $scope.privateQuestionTagList.concat(data.tagList);
        if ($scope.privateQuestionPage * $scope.size < data.count) {
          $scope.privateQuestionMore = true;
        } else {
          $scope.privateQuestionMore = false;
        }
      })
  }
  $scope.getQuestionPrivate();

  $scope.moreQuestionPrivate = function() {
    $scope.privateQuestionPage++;
    $scope.getQuestionPrivate();
  }

  $scope.newQuestionTag = function() {
    // console.log($scope.addQuestionTagName);
    if ($scope.addQuestionTagName) {
      if ($scope.addQuestionTagName.length > 8) {
        alert("标签不能超过八个字!")
        return;
      }
      var obj = {
        "isPublic": 0,
        "tagType": 6,
        "tagName": $scope.addQuestionTagName
      }
      // console.log(obj);
      $http.post(api_url + '/tag', obj).success(function(data) {
        if (!data.status) {
          $scope.privateQuestionPage = 1;
          $scope.privateQuestionTagList = [];
          $scope.getQuestionPrivate();
        }
      })
    }
    $scope.addQuestionTag = false;
    $scope.addQuestionTagName = "";
  }

  $scope.deleteQuestionTag = function(id) {
    $http({
      method: "DELETE",
      url: api_url + '/tag',
      data: { "tagId": [id] },
      headers: { "Content-Type": "application/json;charset=utf-8" }
    }).success(function(data) {
      if (!data.status) {
        $scope.privateQuestionPage = 1;
        $scope.privateQuestionTagList = [];
        $scope.getQuestionPrivate();
      }
    })
  }
//切换试卷和试题标签
  $scope.checkTagType = function(type){
    // alert('看一下传过来的值'+ type);
    $scope.tagType = type;
  }

}])


//录入习题第二步
app.controller("paperInput", ['$scope', '$http', '$cookieStore', '$location', '$routeParams', '$compile', function($scope, $http, $cookieStore, $location, $routeParams, $compile) {
  $scope.tid = $cookieStore.get("user").tid;
  $scope.token = $cookieStore.get("user").token;
  $scope.pid = $routeParams.pid;
  //如果用户刷新，需将之前录好的试题还原回来
  $http.get(api_url + "/test/paper/preview?pid=" + $scope.pid)
    .success(function(data) {
      if (!data.status) {
        $scope.paper = data.paper;
        $scope.pname = data.paper.paperName;
        $scope.questions = data.questions;
        // 需要将单题中的mid去掉
        // console.log($scope.questions);
        if($scope.questions){
          for(var b=0; b < $scope.questions.length; b++){
            var questionObj = $scope.questions[b];
            if(questionObj.qDigest){
              delete questionObj.mid;
            }
          }
        }
        // console.log($scope.questions);
        if (data.stem) {
          $scope.stems = data.stem;
        };

        //每道试题标签列表
        $http.get(api_url + "/tag/test/question/achieve/paper?pid=" + $scope.pid)
          .success(function(res) {
            if (!res.status) {
              angular.forEach(res.questions, function(ele) {
                angular.forEach($scope.questions, function(element) {
                  if (ele.qid && element.qid && ele.qid === element.qid) {
                    element['tagList'] = ele.tagList;
                  }
                })
              })
              if (res.stem) {
                for (var k in res.stem) {
                  angular.forEach($scope.stems[k], function(ele) {
                    angular.forEach(res.stem[k], function(element) {
                      if (ele.qid == element.qid) {
                        ele['tagList'] = element.tagList;
                      }
                    })
                  })
                }
              };

            }
          })

        $scope.titList = [];
        $scope.totalScore = 0;
        var len = 0; //标识题目长度
        //将paper中的相关数据整合进question中
        if ($scope.paper.paperStructJson && $scope.paper.paperStructJson.length != 0) {
          //存选项
          $scope.ans = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
          for (var i = 0; i < $scope.paper.paperStructJson.length; i++) {
            /*if ($scope.questions[i]) { //可能返回为空
              $scope.questions[i].isComposite = $scope.paper.paperStructJson[i].isComposite;
            }*/

            //渲染右边那个很丑很丑的导航条
            // if ($scope.paper.paperStructJson[i].isComposite == 1) { //复合题
            if ($scope.paper.paperStructJson[i].mid) { //复合题
              for (var j = 0; j < $scope.paper.paperStructJson[i].stem.length; j++) {
                //$scope.titList.push(i+)
                $scope.titList[len] = {};
                var mid = $scope.paper.paperStructJson[i].mid;
                $scope.titList[len]['list'] = (i + 1) + '-' + (j + 1);
                if (!$scope.stems[mid][j].qScore) {
                  $scope.titList[len]['qScore'] = 0;
                } else {
                  $scope.titList[len]['qScore'] = Number($scope.stems[mid][j].qScore);
                }
                $scope.totalScore += $scope.titList[len]['qScore'];
                len++;
              }
            } else {
              $scope.titList[len] = {};
              $scope.titList[len]['list'] = i + 1;
              // if (!$scope.questions[i].score) {

              if ($scope.questions[i]['qScore'] && $scope.questions[i]['qScore'] != 0) {
                $scope.titList[len]['qScore'] = Number($scope.questions[i].qScore);
              } else {
                $scope.titList[len]['qScore'] = 0;
              }
              $scope.totalScore += $scope.titList[len]['qScore'];
              len++;
            }

          };
        } else {
          // 没有录题
          $(".add-new-common").click();
        }
      }

    });
  //返回顶部
  $scope.toTop = function() {
    $("body,html").animate({ scrollTop: 0 });
  };

  //试题公有标签
  $http.get(api_url + "/tag?isPublic=1&tagType=6&page=1&size=9999999")
    .success(function(data) {
      $scope.publicTagList = data.tagList;
    })

  //试题私有标签
  $http.get(api_url + "/tag?isPublic=0&tagType=6&page=1&size=9999999")
    .success(function(data) {
      $scope.privateTagList = data.tagList;
    })

  $scope.assist = function() {
    $scope.assistModal = true;
    $scope.tip = "请上传文档";
    $scope.require = '';
    $scope.wordUrl = '';
    angular.element("#file").val('');
  }

  $scope.wordUpload = function() {
    angular.element("#file").click();
  }

  function handleFileSelect(evt) {
    var files = evt.target.files,
      f = files[0];

    if (f.name.indexOf('.doc') == -1) {
      alert("请上传word文件!");
      return;
    }

    $("#redactor_modal_overlay").css("display", "block");

    var formData = new FormData($("#uploadPicForm")[0]);
    if (!files.length) {
      toastr.info("请选择要上传的文件！");
      return;
    }

    //各种事件
    var xhr = new XMLHttpRequest();
    xhr.upload.addEventListener("progress", uploadProgress, false);
    xhr.upload.addEventListener("load", loadedProgress, false);
    xhr.open("POST", api_url + "/upload?type=3&token=" + $scope.token);
    //监听上传进度
    function uploadProgress(evt) {
      if (evt.lengthComputable) {
        var percentComplete = Math.round(evt.loaded * 100 / evt.total);

        $scope.$apply(function() {
          $scope.progress = percentComplete.toString() + '%';
        })

      }
    }
    //上传完成
    function loadedProgress(evt) {
      $("#redactor_modal_overlay").css("display", "none");
      $scope.$apply(function() {
        $scope.tip = f.name;
      })
    }

    xhr.send(formData);

    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
          $scope.wordUrl = JSON.parse(xhr.responseText).data.url;
        }
      }
    }
  }
  document.getElementById('file').addEventListener('change', handleFileSelect, false);

  $scope.confirmAssist = function() {
    if ($scope.wordUrl && $scope.require) {
      $http.post(api_url + '/assist/test/paper/input', {
        "applyExplain": $scope.require,
        "resourcesName": $scope.tip,
        "resourcesUrl": $scope.wordUrl
      }).success(function(data) {
        if (!data.status) {
          $scope.assistModal = false;
        }
      })
    } else {
      alert("请填写完善信息!")
    }
  }

}])


//预览习题
app.controller("paperPreview", ['$scope', '$http', '$cookieStore', '$routeParams', '$location', 'mxxServices', function($scope, $http, $cookieStore, $routeParams, $location, mxxServices) {
  $scope.pid = $routeParams.pid;
  $scope.back = function() {
    $location.path("/paper/input/" + $scope.pid);
  };

  //第一步：获取之前编辑过得试卷信息
  mxxServices.getPaperData($scope);

  //跳转到指定的某一题
  $scope.goto = function(index) {
    var $detail = $('.paper-preview-detail');
    var $dt = $detail.find("dt:lt(" + index + ")");

    //获取高度
    var dt_top = 0;
    if ($dt.size()) {
      $.each($dt, function(k) {
        var _top = ($(this).height()) + 20;
        dt_top = dt_top + _top;
      });
    };
    $detail.animate({ scrollTop: dt_top });
  }

  //提交预览,敲定
  $scope.confirm = function() {
    $("#redactor_modal_overlay").css("display", "block");
    $http.post(api_url + "/test/paper/confirm", {
      "pid": [Number($scope.pid)]
    }).success(function(data) {
      $("#redactor_modal_overlay").css("display", "none");
      if (!data.status) {
        $location.path("/paper/complete/" + $scope.pid)
      }
    })
  }
}])

//微信预览
app.controller("wxPreview", ['$scope', '$http', '$cookieStore', '$routeParams', '$location', 'mxxServices', function($scope, $http, $cookieStore, $routeParams, $location, mxxServices) {
  $scope.pid = Number($routeParams.pid);
  $scope.back = function() {
    $location.path("/paper/list/0");
  };

  mxxServices.getPaperData($scope);

  //跳转到指定的某一题
  $scope.goto = function(index) {
    var $detail = $('.paper-preview-detail');
    var $dt = $detail.find("dt:lt(" + index + ")");

    //获取高度
    var dt_top = 0;
    if ($dt.size()) {
      $.each($dt, function(k) {
        var _top = ($(this).height()) + 20;
        dt_top = dt_top + _top;
      });
    };
    $detail.animate({ scrollTop: dt_top });
  };

  //获取试卷相关信息
  /*$http.get(api_url + "/test/paper?pid=" + $scope.pid)
    .success(function(data) {
      $scope.paperInfo = data;
    });*/

  //生成手机端试卷预览地址的二维码
  var url = "http://www.maixuexi.cn/phone/#/preview/" + $scope.pid;

  //目标元素
  mxxServices.qrCode($(".wxQrcode"), url);




  //显示二维码及试卷拷贝码
  $scope.showQrcode = function() {
    $(".view-code").css("display", "block")
  };
  $scope.hiddenQrcode = function() {
    $(".view-code").css("display", "none")
  };

  //分享试卷显示摸态框
  $scope.shareModal = function() {
    $scope.myModal = true;
    $scope.teacherName = "";
    $scope.searchName = "";
  }

  //获取试卷显示摸态框
  $scope.obtainPaper = function(id) {
    $scope.pid = id;
    // alert('pid'+ $scope.pid);
    $http.post(api_url + "/question/bank/paper/get", {
        "pid": [$scope.pid]
      }).success(function(data) {
        if (!data.status) {
          $scope.myModal = false;
          $location.path("/paper/list/0");
        }
      })
  }

  //匹配正则
  var accountExp = /^[a-zA-Z]\w+$/,
    phoneExp = /^1[34578]\d{9}$/,
    mailExp = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;

  //根据XX查找教师
  $scope.search = function() {
    if ($scope.searchName) {
      var obj = {};
      if (mailExp.test($scope.searchName)) {
        obj.email = $scope.searchName;
      } else if (phoneExp.test($scope.searchName)) {
        obj.phone = $scope.searchName;
      } else if (accountExp.test($scope.searchName)) {
        obj.account = $scope.searchName;
      } else {
        alert('请输入有效账号信息!');
        return;
      }
      $http.put(api_url + "/teacher/info", obj)
        .success(function(data) {
          if (!data.status) {
            $scope.tid = data.tid;
            $scope.teacherName = data.teacherName;
          } else {
            $scope.teacherName = "";
          }
        })
    }
  }

  $scope.confirm = function() {
    if ($scope.teacherName) {
      $http.post(api_url + "/test/paper/share", {
        "pid": $scope.pid,
        "tid": $scope.tid
      }).success(function(data) {
        if (!data.status) {
          $scope.myModal = false;
        }
      })
    }
  }

  // 获取分享按钮显示状态
  $scope.showShareBtn = false;
  // console.log($scope.showShareBtn);
  $scope.qid;
  $scope.mid;
  $scope.index;
  $scope.childIndex;
//   {
//     "pid":1,
//     "qid":1,
//     "mid":1,
//     "endTime":"2018-01-04 12:00:00",
//     "answerShowTime":"2018-01-04 12:00:00"
// }
  // 发布按钮和取消按钮
  $scope.shareModalBox = false;
  $scope.goToShareList = false;
  // 分享试题按钮
  $scope.shareQuestion = function(qid,mid,index,childIndex) {
    // alert('开始分享')
    // 显示模态窗
    $scope.showShareBtnQid = qid;
    $scope.showShareBtn = true;

    $scope.goToShareList = false;
    // console.log(qid,mid,index,childIndex);
    $scope.qid = qid;
    if(mid){
      $scope.mid = mid;
    }
    $scope.index = index;
    if(childIndex){
      // 复合题
      $scope.childIndex = childIndex;
    }
    $scope.index = index;
    $scope.shareModalBox = true;
  }

  // console.log($scope.noticeTime)

  $scope.cancelShare = function(){
    $scope.showShareBtn = false;
  }

  $scope.confirmShare = function(){
    // $scope.showShareBtn = false;
    //结束时间
    if (!$(".noticeTime").val()) {
      $scope.noticeTime = "";
    } else {
      $scope.noticeTime = $(".noticeTime").val();
    }
    // console.log($scope.noticeTime)
    var obj = {};
    obj['qid'] = $scope.qid;
    obj['pid'] = $scope.pid;
    if($scope.mid){
      obj['mid'] = $scope.mid;
    }
    if($scope.noticeTime){
      obj['answerShowTime'] = $scope.noticeTime;
    }
    // console.log(obj);
    // 数据准备好了，需要提交接口

    // ceshi 
      // $scope.shareModalBox = false;
      // $scope.goToShareList = true;
      // // 显示二维码
      // //生成手机端试卷预览地址的二维码
      // var shareUrl = "http://www.maixuexi.cn/student/#/extend/question/share/" + 100000+ "?state=QuestionCenter";
      // //目标元素
      // console.log(shareUrl)
      // mxxServices.qrCode($(".shareQrcode"), shareUrl);
      // 显示查看分享列表按钮

    $http.post(api_url + "/publish/share/question",obj).success(function(data) {
      $scope.sharingId = data.sharingId;
      // console.log($scope.sharingId);
      // 隐藏发布按钮
      $scope.shareModalBox = false;
      $scope.goToShareList = true;
      // 显示二维码
      // 显示查看分享列表按钮
      //生成手机端试卷预览地址的二维码
      var url = "http://www.maixuexi.cn/student/#/extend/question/share/" + $scope.sharingId+ "?state=QuestionCenter";
      //目标元素
      mxxServices.qrCode($(".shareQrcode"), url);

    })

  }

  $scope.yesSure = function(){
    $scope.goToShareList = false;
    $scope.showShareBtn = false;
  }

}])

//商品试卷预览
app.controller("goodsPreview", ['$scope', '$http', '$cookieStore', '$routeParams', '$location', 'mxxServices', function($scope, $http, $cookieStore, $routeParams, $location, mxxServices) {
  $scope.pid = $routeParams.pid;
  $scope.gid = $routeParams.gid;

  mxxServices.getPaperData($scope);

  //跳转到指定的某一题
  $scope.goto = function(index) {
    var $detail = $('.paper-preview-detail');
    var $dt = $detail.find("dt:lt(" + index + ")");

    //获取高度
    var dt_top = 0;
    if ($dt.size()) {
      $.each($dt, function(k) {
        var _top = ($(this).height()) + 20;
        dt_top = dt_top + _top;
      });
    };
    $detail.animate({ scrollTop: dt_top });
  };

  //生成手机端试卷预览地址的二维码
  var url = "http://www.maixuexi.cn/phone/#/preview/" + $scope.pid;

  //目标元素
  mxxServices.qrCode($(".wxQrcode"), url);

  //显示二维码及试卷拷贝码
  $scope.showQrcode = function() {
    $(".view-code").css("display", "block")
  };
  $scope.hiddenQrcode = function() {
    $(".view-code").css("display", "none")
  };

  //获取商品信息
  $http.get(api_url + "/goods/paper/preview?goodsId=" + $scope.gid + "&pid=" + $scope.pid)
    .success(function(data) {
      if (!data.status) {
        $scope.goods = data;
        $scope.tagList = data.tagList;
        $scope.status = data.goodsStatus;
        $scope.shareType = data.sharingStatus;
        if ($scope.shareType == 3) { //自己的
          if ($scope.status == 1 || $scope.status == 4 || $scope.status == 5) {
            $scope.handle = "重新发布"
          } else if ($scope.status == 3) {
            $scope.handle = "安排作业"
          } else if ($scope.status == 2) {
            $scope.handle = "安排作业" //disable
            $scope.disable = true;
          }
          $scope.backUrl = "#/paper/public" //公共习题
        } else { //公共的
          if ($scope.shareType == 1 && $scope.status == 3) {
            $scope.handle = "安排作业" //安排作业
            $scope.backUrl = "#/paper/list/1" //我的习题,外部获取
          } else if ($scope.shareType == 2 && $scope.status == 3) {
            $scope.handle = "获取" //"安排作业"
            $scope.backUrl = "#/paper/public" //公共习题
          }
        }
      }
    })

  $scope.doSomething = function() {
    if ($scope.disable) return;
    if ($scope.shareType == 3) {
      if ($scope.status == 3) {
        $location.path("/work/arrange/" + $scope.pid + "/" + $scope.gid);
      } else {
        $location.path("/paper/publish/0/" + $scope.gid)
      }
    } else {
      if ($scope.shareType == 1 && $scope.status == 3) {
        $location.path("/work/arrange/" + $scope.pid + "/" + $scope.gid);
      } else if ($scope.shareType == 2 && $scope.status == 3) {
        $http.post(api_url + "/goods/paper/obtain", { "goodsId": $scope.gid, "pid": $scope.pid })
          .success(function(data) {
            if (!data.status) {
              $scope.handle = "安排作业";
              $scope.shareType = 1;
            }
          })
      }
    }
  }

}]);


//敲定试卷
app.controller("paperComplete", ['$scope', '$http', '$cookieStore', '$routeParams', function($scope, $http, $cookieStore, $routeParams) {
  $scope.pid = $routeParams.pid;
  //获取试卷的题目数,总分
  $http.get(api_url + "/test/paper/preview?pid=" + $scope.pid)
    .success(function(data) {
      if (!data.status) {
        $scope.pname = data.paper.paperName;
        $scope.questionsNum = data.paper.objNumber + data.paper.subNumber;
        $scope.questionsScore = data.paper.objScore + data.paper.subScore;
        $scope.isQuestionBank = data.paper.isQuestionBank;
      }
    })
}]);

//导出word
app.controller('paperExport', ['$scope', '$http', '$routeParams', 'mxxServices', function($scope, $http, $routeParams, mxxServices) {
  $scope.pid = $routeParams.pid;

  //生成试卷预览二维码
  var url = "http://www.maixuexi.cn/teacher/#/paper/" + $scope.pid;

  //目标元素
  mxxServices.qrCode($(".qrcode"), url);

  mxxServices.getPaperData($scope);

  $scope.download = function() {
    $http.get(api_url + "/test/paper/teacher/word?pid=" + $scope.pid)
      .success(function(data) {
        window.location.href = data.url;
      })
  }

}]);


//作业列表
app.controller("worklist", ['$scope', '$http', '$cookieStore', function($scope, $http, $cookieStore) {
  // $scope.tid = 1;
  $scope.tid = $cookieStore.get("user").tid;
  $scope.currentPage = 1;
  $scope.pageSize = 10; //每一页下的班级数


  //获取当前时间，判断作业是否已经结束
  // $scope.currentTime = new Date();

  //全选、反选
  $scope.isAllVisible = false; //默认不全选
  $scope.visible = {};
  $scope.allCheck = function() {
    if (!$scope.isAllVisible) {
      $scope.isAllVisible = true;
      // $scope.visible
      angular.forEach($scope.worklist, function(value, key, array) {
        $scope.visible[value.workId] = true;
      })
    } else {
      $scope.isAllVisible = false;
      $scope.visible = {};
    }
  };

  $scope.oneCheck = function(wid) {
    if ($scope.visible[wid]) {
      delete $scope.visible[wid];
      $scope.isAllVisible = false;
    } else {
      //this.work包含了当前作业的所有信息  object
      $scope.visible[wid] = this.work.workStatus;
      var count = 0;
      for (key in $scope.visible) {
        count++;
      }
      if (count == $scope.worklist.length) {
        $scope.isAllVisible = true;
      }

    }
    var workstatus = [];
    for (key in $scope.visible) {
      workstatus.push($scope.visible[key])
    }
    //含有数字6,7  表示作业已撤销或结束了
    if (workstatus.indexOf(6) != -1 || workstatus.indexOf(7) != -1) {
      $(".revoke-exam").addClass("disabled")
    } else {
      $(".revoke-exam").removeClass("disabled")
    }
    if (workstatus.indexOf(6) != -1) {
      $(".no-revoke-exam").removeClass("disabled")
    } else {
      $(".no-revoke-exam").addClass("disabled")
    }
  };

  //分页查询作业列表
  $scope.getData = function() {
    $scope.searchObj = {};
      // if($scope.paperName){
      //   $scope.searchObj['workName'] = $scope.paperName;
      // }
      // if($scope.cid&&$scope.cid!=0){
      //   $scope.searchObj['cid'] = $scope.cid;
      // }
      // if($scope.startTime){
      //   $scope.searchObj['startTime'] = $scope.startTime;
      // }
      // if($scope.endTime){
      //   $scope.searchObj['endTime'] = $scope.endTime;
      // }
      // console.log($scope.startTime1);
      $http.put(api_url + "/work/teacher/name?page=" + $scope.currentPage + "&size=" + $scope.pageSize, $scope.searchObj
      ).success(function(data) {
        $scope.count = data.count;
        if ($scope.count == 0) { //表示当前作业列表为空
          $scope.num = 1;
        } else {
          $scope.num = Math.ceil($scope.count / $scope.pageSize); //班级分页数向上取整
          $scope.worklist = data.workList;
          angular.forEach($scope.worklist, function(ele, index) {
            /*if (ele.endTime && new Date(ele.endTime) < $scope.currentTime) {
              ele.finishWork = true;
            } else {
              ele.finishWork = false;
            }*/
            if (ele.workStatus == 3 || ele.workStatus == 5 || ele.workStatus == 6 || ele.workStatus == 7) {
              ele.finishWork = true;
            } else {
              ele.finishWork = false;
            }
          })
        }
      }) 
  };
  $scope.getData();

  //作业状态
  $scope.workerStatus = ['未开始', '准备中', '进行中', '批改中', '长期作业中', '客观题自动批改', '已结束', '已撤销'];

  // 给教师tid赋值
  $scope.tid = $cookieStore.get("user").tid;
  // 缺省设置不显示选择时间段查询
  $scope.showChooseTimeBox = false;
  // 显示时间选择框
  $scope.chooseTimeShow = function(){
    $scope.showChooseTimeBox = true;
  }
  //查询班级列表
  $http.get(api_url + "/teacher/class/owner?tid=" + $scope.tid + "&page=1&size=9999")
    .success(function(data) {
      $scope.classlistOwn = data.classList;
    });
  $http.get(api_url + "/teacher/class/public?tid=" + $scope.tid + "&page=1&size=9999")
    .success(function(res) {
      $scope.classlistPublic = res.classList;
  });
  // 缺省设置cid=0
  // $scope.cid = 0;
  $scope.cid = document.getElementById("selectCid").value;
  // 选择查询班级
  $scope.chooseClassId = function(){
    // console.log($scope.classlistOwn);
    // console.log($scope.classlistPublic);
    $scope.cid = document.getElementById("selectCid").value;
    // console.log('2',$scope.cid);
    // 如果班级发生变化，分页需要从0开始
    $scope.currentPage = 1;
  }
  //根据作业名查询老师作业列表
  $scope.search = function() {
    //起始时间
    $scope.startTime = $(".startTime").val();
    //结束时间
    $scope.endTime = $(".endTime").val();

    // console.log($scope.startTime);
    // console.log($scope.endTime);
    if ($scope.paperName||$scope.cid||($scope.startTime&&$scope.endTime)) {

      // 设定搜索参数
      $scope.searchObj = {};
      if($scope.paperName){
        $scope.searchObj['workName'] = $scope.paperName;
      }
      if($scope.cid&&$scope.cid!=0){
        $scope.searchObj['cid'] = $scope.cid;
      }
      if($scope.startTime){
        $scope.searchObj['startTime'] = $scope.startTime;
      }
      if($scope.endTime){
        $scope.searchObj['endTime'] = $scope.endTime;
      }
      $http.put(api_url + "/work/teacher/name?page=" + $scope.currentPage + "&size=" + $scope.pageSize, $scope.searchObj
      ).success(function(data) {
        // if (!data.workList.length) {
        //   alert("没有搜索到指定作业")
        // } else {
        //   $scope.worklist = data.workList;
        //   $scope.count = data.count;
        //   $scope.num = Math.ceil($scope.count / $scope.pageSize); //班级分页数向上取整
        // }
        if (!data.status) {
          $scope.worklist = data.workList;
          $scope.count = data.count;
          $scope.num = Math.ceil($scope.count / $scope.pageSize); //班级分页数向上取整
        } else {
          alert(data.info);
        }
      }) 
    } else {
      // $scope.getData();
      alert('请选择搜索条件');
      return;
    }
  };

  //分页功能
  $scope.next = function() { //下一页
    if ($scope.currentPage < $scope.num) {
      $scope.currentPage++;
      // console.log($scope.currentPage);
      // 设定搜索参数
      $scope.searchObj = {};
      if($scope.paperName){
        $scope.searchObj['workName'] = $scope.paperName;
      }
      if($scope.cid&&$scope.cid!=0){
        $scope.searchObj['cid'] = $scope.cid;
      }
      if($scope.startTime){
        $scope.searchObj['startTime'] = $scope.startTime;
      }
      if($scope.endTime){
        $scope.searchObj['endTime'] = $scope.endTime;
      }
      $scope.search();
    }
  };
  $scope.prev = function() { //上一页                 
    if ($scope.currentPage > 1) {
      $scope.currentPage--;
      // 设定搜索参数
      $scope.searchObj = {};
      if($scope.paperName){
        $scope.searchObj['workName'] = $scope.paperName;
      }
      if($scope.cid&&$scope.cid!=0){
        $scope.searchObj['cid'] = $scope.cid;
      }
      if($scope.startTime){
        $scope.searchObj['startTime'] = $scope.startTime;
      }
      if($scope.endTime){
        $scope.searchObj['endTime'] = $scope.endTime;
      }
      $scope.search();
    }
  };


  document.onkeydown = function(ev) {
    var ev = ev || window.ev;
    if (ev.keyCode && ev.which == 13) {
      $scope.search();
    }
  };

  //鼠标经过操作按钮时触发
  $scope.mouse = {
    mouseover: function() {
      $(".handle-menu").css("display", "block")
    },
    mouseout: function() {
      $(".handle-menu").css("display", "none")
    }
  };

  //删除作业
  $scope.delete = function() {
    var arr = [];
    for (key in $scope.visible) {
      arr.push(Number(key));
    }
    if (arr.length == 0) {
      alert("请选择要删除的作业!");
      return;
    } else {
      // var querry = "wid=";
      // querry = querry + arr.join(",");
      $http({
        method: "DELETE",
        url: api_url + '/work',
        data: { "workId": arr },
        headers: { "Content-Type": "application/json;charset=utf-8" }
      }).success(function(data) {
        if (!data.status) {
          $scope.getData();
          alert("删除作业成功!");
          //全选、反选
          $scope.isAllVisible = false; //默认不全选
          $scope.visible = {};
        }
      })
    }
  };

  //撤销作业
  $scope.revoke = function() {
    if ($(".revoke-exam").hasClass("disabled")) {
      return;
    }
    var arr = [];
    for (key in $scope.visible) {
      arr.push(Number(key));
    }

    if (arr.length == 0) {
      alert("请选择要撤销的作业!");
      return;
    } else {
      //可以批量撤销
      //已结束的作业不可以撤销
      // var querry = arr.join(",");
      $http.put(api_url + "/work/is/revoke", {
        "workId": arr,
        "isRevoke": 1
      }).success(function(data) {
        $scope.visible = {};
        $scope.getData();
        alert("作业撤销成功!")
      })
    }
  }

  //取消撤销作业
  $scope.noRevoke = function() {
    if ($(".no-revoke-exam").hasClass("disabled")) {
      return;
    }
    var arr = [];
    for (key in $scope.visible) {
      arr.push(Number(key));
    }

    if (arr.length == 0) {
      alert("请选择要取消撤销的作业!");
      return;
    } else {
      //可以批量撤销
      //已结束的作业不可以撤销
      // var querry = arr.join(",");
      $http.put(api_url + "/work/is/revoke", {
        "workId": arr,
        "isRevoke": 0
      }).success(function(data) {
        $scope.visible = {};
        $scope.getData();
        alert("作业取消撤销成功!")
      })
    }
  }

  // 更多分页
  // $scope.next = function(){
  //   alert('下一页')
  // }

}])

//作业详情
app.controller("workdetail", ['$scope', '$http', '$routeParams', '$location', function($scope, $http, $routeParams, $location) {
  $scope.wid = $routeParams.wid;
  $http.get(api_url + "/work/class?workId=" + $scope.wid)
    .success(function(data) {
      $scope.classInfo = data.class;
      $scope.workInfo = data;
      //高级设置里的修改
      //关于作业时长
      //时间全部要转成整数
      $scope.hours = Math.floor($scope.workInfo.durationTime / 3600);

      $scope.minute = Math.floor(($scope.workInfo.durationTime - parseInt($scope.hours) * 3600) / 60);

      $scope.second = $scope.workInfo.durationTime - parseInt($scope.hours) * 3600 - parseInt($scope.minute) * 60;

      //下面代码用到的
      $scope.workInfo.deleteStudents = [];
      $scope.workInfo.addStudents = [];
    });
  //高级设置的显示与隐藏
  $scope.setting = function() {
    $("div.switch").toggle(400);
  };

  //修改班级下的学生,班级本身不可以修改
  // 已选班级修改：
  // 已经有人获取到试卷的时候， 可以被取消选择， 状态显示为已撤销；
  // 未获取试卷的学生， 可以被取消选择；
  // 未被选中的学生可以被手工选中；
  // //.当前时间
  // var currentTime = Math.round(new Date().getTime() / 1000);

  //获取当前时间
  $scope.getCurrentTime = function() {
    var currentTime = new Date();
    var year = currentTime.getFullYear();
    var month = currentTime.getMonth() + 1;
    var day = currentTime.getDate();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var seconds = currentTime.getSeconds();
    //如果小于10就在前面补上"0";
    if (month < 10) { month = "0" + month; }
    if (day < 10) { day = "0" + day }
    if (hours < 10) { hours = "0" + hours }
    if (minutes < 10) { minutes = "0" + minutes }
    if (seconds < 10) { seconds = "0" + seconds }
    $scope.currentTime = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
  }

  $scope.userCheck = function(studentId) {
    $scope.getCurrentTime();
    //如果作业已结束，则不可以修改(班级学生列表)
    if ($scope.workInfo.endTime && Date.parse(new Date($scope.workInfo.endTime)) < Date.parse(currentTime)) {
      alert("作业已经结束,不可以修改了!");
      return;
    }

    var len = $scope.classInfo.students.length;
    for (var i = 0; i < len; i++) {
      if ($scope.classInfo.students[i]["studentId"] == studentId) {
        if ($scope.classInfo.students[i]["isMake"] == 1) {
          $scope.classInfo.students[i]["isMake"] = 0;
          $scope.workInfo.deleteStudents.push(studentId);
          if ($scope.workInfo.addStudents.indexOf(studentId) != -1) {
            $scope.workInfo.addStudents.splice($scope.workInfo.addStudents.indexOf(studentId), 1)
          }
        } else {
          $scope.classInfo.students[i]["isMake"] = 1;
          $scope.workInfo.addStudents.push(studentId);
          if ($scope.workInfo.deleteStudents.indexOf(studentId) != -1) {
            $scope.workInfo.deleteStudents.splice($scope.workInfo.deleteStudents.indexOf(studentId), 1)
          }
        }
      }
    }
  };

  //全班作业
  $scope.isAll = function() {
    $scope.getCurrentTime();
    //存在结束时间并且结束时间小于当前时间则不可以修改
    if ($scope.workInfo.endTime && Date.parse(new Date($scope.workInfo.endTime)) < Date.parse(currentTime)) {
      alert("作业已经结束,不可以修改了!");
      return;
    }
    if ($scope.workInfo.isWholeWork == 1) {
      $scope.workInfo.isWholeWork = 2;
    } else {
      $scope.workInfo.isWholeWork = 1;
    }
  };

  $scope.submit = function() {
    $scope.getCurrentTime();
    //不能修改的情形
    //1、作业通知时间已过，就不可以修改作业通知时间
    //getTime()得到的是毫秒值，转成Unix时间戳
    // var currentTime=Math.round(new Date().getTime()/1000);
    /*if ($scope.workInfo.endTime && Date.parse(new Date($scope.workInfo.endTime)) < Date.parse(currentTime)) {
      alert("作业已经结束,不可以修改了");
      return;
    }*/
    //作业时长重新统计一次

    //很奇怪的一个bug
    //????
    if ($(".second").val()) {
      $scope.second = parseInt($scope.second)
    } else {
      $scope.second = 0;
    }

    $scope.durationTime = $scope.hours * 3600 + $scope.minute * 60 + $scope.second;

    //作业起始时间
    if (!$(".startime").val()) {
      $scope.workInfo.startTime = $scope.currentTime;
    } else {
      $scope.workInfo.startTime = $(".startime").val();
    }

    //作业通知时间
    if (!$(".noticeTime").val()) {
      $scope.workInfo.displayTime = $scope.currentTime;
    } else {
      $scope.workInfo.displayTime = $(".noticeTime").val();
    }

    //作业结束时间
    if (!$(".endtime").val()) {
      $scope.workInfo.endTime = null;
    } else if (Date.parse(new Date($(".endtime").val())) < Date.parse(new Date($scope.workInfo.startTime))) {
      alert('请正确填写开始结束时间!');
      return;
    } else {
      $scope.workInfo.endTime = $(".endtime").val();
    }

    //作业时长不可以超过结束时间和起始时间之差
    var startime = new Date($(".startime").val()).getTime();
    if ($(".endtime").val()) { //有结束时间
      var endtime = new Date($(".endtime").val()).getTime();
      if ((endtime - startime) / 1000 < $scope.durationTime) {
        alert("作业时长不合法!");
        return;
      } else {
        $scope.workInfo.durationTime = $scope.durationTime;
      }
    } else {
      $scope.workInfo.durationTime = $scope.durationTime;
    }
    /*var data = {
      "work": $scope.workInfo,
      "class": $scope.classInfo
    };*/
    // data = JSON.stringify(data);
    /*$scope.studentList = [];
    angular.forEach($scope.classInfo.students, function(ele) {
      $scope.studentList.push({ 'studentId': ele.studentId, 'isMake': ele.isMake })
    })*/
    $scope.workInfo.cids = [];
    $scope.workInfo.cids.push($scope.classInfo);
    $http.put(api_url + "/work", $scope.workInfo)
      .success(function(data) {
        if (!data.status) {
          alert("作业修改成功!");
          $location.path("/work/list");
        }
      })
  }

}])

//安排作业
app.controller("arrange", ['$scope', '$http', '$location', '$cookieStore', '$routeParams', '$window', function($scope, $http, $location, $cookieStore, $routeParams, $window) {
  $scope.sid = $cookieStore.get("user").sid;
  $scope.tid = $cookieStore.get("user").tid;
  $scope.userlist = {};
  $scope.currentPage = 1;
  $scope.pageSize = 12; //每一页下的班级数
  $scope.classTypeName = ['','公共','我的']

  $scope.pid = Number($routeParams.pid);
  $scope.gid = Number($routeParams.gid);

  //获取试卷列表
  $scope.getPaperList = function(){
    $http.get(api_url + "/test/paper/teacher?page=1&size=99999")
      .success(function(data) {
        $scope.paperlist = data.paperList;
      });
  }
  // 页面默认加载试卷列表
  $scope.getPaperList();

  //获取商品试卷列表
  $scope.getGoodPaperList = function(){
    $http.get(api_url + "/goods/paper/teacher/relation?page=1&size=99999")
    .success(function(data) {
      $scope.goodsPaperlist = data.goodsList;
      angular.forEach($scope.goodsPaperlist, function(ele) {
        ele["goodsPaperName"] = ele.paperName + "(" + ele.goodsName + ")";
      })
    });
  }

  //搜素试卷
  $scope.searchPaper = function() {
    if (!$scope.type) {
      if (!$scope.paperName) {
        $http.get(api_url + "/test/paper/teacher?page=1&size=1000")
          .success(function(data) {
            $scope.paperlist = data.paperList;
          });
        return;
      }
      $http.put(api_url + "/test/paper/search?page=1&size=1000", {
        "paperName": $scope.paperName
      }).success(function(data) {
        if (data.count == 0) { //表示当前作业列表为空
          $scope.getData();
          alert("没有找到您要搜索的试卷!");
        } else {
          $scope.paperlist = data.paperList;
        }
      })
    }

  };

  $scope.pKeyup = function(e) {
    var keycode = window.event ? e.keyCode : e.which;
    if (keycode == 13) {
      $scope.searchPaper();
    }
  };

  $scope.visible = {};
  //如果是从试卷列表跳转到布置作业的话
  if ($scope.pid && !$scope.gid) {
    $scope.type = 0; //本地试卷
    $scope.workType = 1; //普通作业
    //判断当前试卷是否已敲定
    $http.get(api_url + "/test/paper?pid=" + $scope.pid)
      .success(function(data) {
        $scope.visible[$scope.pid] = true;
        if (data.isFinish == 1) {
          $scope.pname = data.paperName;
          $scope.pid = data.pid;
          $(".checkedPaper").css("display", "block");
        } else {
          $window.history.go(-1);
        }
      })
  } else if ($scope.gid) {
    $scope.type = 1; //外部试卷
    $scope.workType = 3; //默认普通商品作业
    $http.get(api_url + "/goods/paper/preview?goodsId=" + $scope.gid + "&pid=" + $scope.pid)
      .success(function(data) {
        $scope.visible[$scope.gid] = {};
        $scope.visible[$scope.gid][$scope.pid] = true;
        $scope.pname = data.paperName + "(" + data.goodsName + ")";
        $scope.pid = data.pid;
        $scope.gid = data.goodsId;
        $scope.price = data.paperPrice;
        $(".checkedPaper").css("display", "block");
      })
  } else if (!$scope.pid && !$scope.gid) {
    $scope.type = 0; //默认显示本地
  }

  //查询班级列表
  // $http.get(api_url + "/teacher/class/owner?tid=" + $scope.tid + "&page=1&size=9999")
  //   .success(function(data) {
  //     $scope.classlistOwn = data.classList;
  //     /*angular.forEach($scope.classlistOwn, function(ele) {
  //       ele.className += '（我的班级）'
  //     })*/
  //     $http.get(api_url + "/teacher/class/public?tid=" + $scope.tid + "&page=1&size=9999")
  //       .success(function(res) {
  //         $scope.classlistPublic = res.classList;
  //         /*angular.forEach($scope.classlistPublic, function(ele) {
  //           ele.className += '（公共班级）'
  //         })*/
  //         $scope.classlist = $scope.classlistOwn.concat($scope.classlistPublic);
  //       });
  //   });

  // //搜索班级
  // $scope.searchClass = function() {
  //   if (!$scope.className) {
  //     $http.get(api_url + "/test/paper/teacher?page=1&size=1000")
  //       .success(function(data) {
  //         $scope.paperlist = data.paperList;
  //       });
  //     return;
  //   }

  //   $http.put(api_url + "/teacher/class/search?page=1&size=1000", {
  //     "className": $scope.className,
  //     "tid": $scope.tid,
  //     "type": 2
  //   }).success(function(data) {
  //     if (data.count == 0) {
  //       alert("没有搜索到指定班级!");
  //       return;
  //     }
  //     $scope.classlist = data.classList;
  //   })
  // };
  $scope.getClassData = function() {
    if(!$scope.getClassApi){
      $scope.currentPage = 1;
    }
    // 该参数来判断是搜索还是直接获取班级列表
    $scope.getClassApi = true;
    $http.get(api_url + "/teacher/class/list?tid=" + $scope.tid + "&page=" + $scope.currentPage + "&size=" + $scope.pageSize)
      .success(function(data) {
        if (!data.status) {
          $scope.count = data.count;
          $scope.classlist = data.classList;
          // console.log($scope.priviteClasses);
          for (var i=0; i<$scope.classlist.length; i++){
            if($scope.classlist[i]['className'].length > 25){
              $scope.classlist[i]['shortClassName'] = $scope.classlist[i]['className'].substring(0,25)+'...';
            } else {
              $scope.classlist[i]['shortClassName'] = $scope.classlist[i]['className']
            }
          }
          // console.log($scope.priviteClasses);
          if ($scope.count == 0) {
            $scope.loadMore = false;
          } else if($scope.count>$scope.currentPage*$scope.pageSize) {
            $scope.loadMore = true;
          } else {
            $scope.loadMore = false;
          }
        }

      })
  };

  $scope.getClassData();

  $scope.searchClass = function() {
    if (!$scope.className) {
      // return;
      // 不存在返回所有的
      $scope.getClassData();
      return;
    }
    if($scope.getClassApi){
      $scope.currentPage = 1;
    }
    $scope.getClassApi = false;
    $http.put(api_url + "/teacher/class/search?", {
      "className": $scope.className,
      "type": 2,
      "tid": $scope.tid,
      "page": $scope.currentPage,
      "size": $scope.pageSize
    }).success(function(data) {
      // $scope.className = '';
      $scope.count = data.count;
      $scope.classlist = data.classList;
      if ($scope.count == 0) {
        $scope.loadMore = false;
      } else if($scope.count>$scope.currentPage*$scope.pageSize) {
        $scope.loadMore = true;
      } else {
        $scope.loadMore = false;
      }
    })
  };

  // 获取更多班级
  $scope.getMoreClass = function(){
    $scope.currentPage ++;
    if($scope.getClassApi){
      // 获取班级数据
      // $scope.getClassData();
      $http.get(api_url + "/teacher/class/list?tid=" + $scope.tid + "&page=" + $scope.currentPage + "&size=" + $scope.pageSize)
        .success(function(data) {
          if (!data.status) {
            $scope.count = data.count;
            $scope.classlist = $scope.classlist.concat(data.classList);
            // console.log($scope.priviteClasses);
            for (var i=0; i<$scope.classlist.length; i++){
              if($scope.classlist[i]['className'].length > 25){
                $scope.classlist[i]['shortClassName'] = $scope.classlist[i]['className'].substring(0,25)+'...';
              } else {
                $scope.classlist[i]['shortClassName'] = $scope.classlist[i]['className']
              }
            }
            // console.log($scope.priviteClasses);
            if ($scope.count == 0) {
              $scope.loadMore = false;
            } else if($scope.count>$scope.currentPage*$scope.pageSize) {
              $scope.loadMore = true;
            } else {
              $scope.loadMore = false;
            }
          }

      })
    } else {
      // 搜索班级数据
      // $scope.searchClass();
      $scope.getClassApi = false;
      $http.put(api_url + "/teacher/class/search?", {
        "className": $scope.className,
        "type": 2,
        "tid": $scope.tid,
        "page": $scope.currentPage,
        "size": $scope.pageSize
      }).success(function(data) {
        // $scope.className = '';
        $scope.count = data.count;
        $scope.classlist = $scope.classlist.concat(data.classList);
        if ($scope.count == 0) {
          $scope.loadMore = false;
        } else if($scope.count>$scope.currentPage*$scope.pageSize) {
          $scope.loadMore = true;
        } else {
          $scope.loadMore = false;
        }
      })
    }
  }

  $scope.cKeyup = function(e) {
    var keycode = window.event ? e.keyCode : e.which;
    if (keycode == 13) {
      $scope.searchClass();
    }
  };

  $scope.check = function(pid, gid) {
    if (!$scope.type) {
      if ($scope.visible[pid]) {
        delete $scope.visible[pid];
        $(".checkedPaper").css("display", "none");
      } else {
        $scope.visible = {};
        $scope.visible[pid] = true;
        $(".checkedPaper").css("display", "block");
        $scope.pname = this.paper.paperName;
        $scope.pid = this.paper.pid;
      }
    } else {
      if ($scope.visible[gid] && $scope.visible[gid][pid]) {
        delete $scope.visible[gid][pid];
        $(".checkedPaper").css("display", "none");
      } else {
        $scope.visible = {};
        $scope.visible[gid] = {};
        $scope.visible[gid][pid] = true;
        $(".checkedPaper").css("display", "block");
        $scope.pname = this.paper.paperName + "(" + this.paper.goodsName + ")";
        $scope.pid = this.paper.pid;
        $scope.gid = this.paper.goodsId;
        $scope.price = this.paper.paperPrice;
      }
    }

  };

  $scope.checkedPaper = function() {
    $(".checkedPaper").css("display", "none");
    $scope.visible = {};
  };

  $scope.checkType = function(type) {
    if ($scope.type == type) return;
    if (type == 1) {
      $scope.workType = 3;
      $scope.getGoodPaperList();
    } else if (type == 0) {
      $scope.workType = 1;
      $scope.getPaperList();
    }
    $scope.type = type;
    $scope.checkedPaper();
  }


  //选择班级及班级下的学生
  $scope.checked = {}; //记录选中班级的cid及班级下的需要布置作业的学生的uid
  //最终$scope.checked的保存格式应该是{1:{cid:1,uids:[1,2,4,5]},3:{cid:3,uids:[1,3,5,7]}}

  $scope.unchecked = {}; //未选
  $scope.userUnchecked = {}; //剔除的学生

  //解析$scope.checked对象变成需要需要传递给后台的格式
  $scope.classCheck = function(cid, index) {
    if (!$scope.unchecked[cid]) { //表示当前未选中
      //为当前选中班级创建一个新的空对象
      //用于存放班级cid及班级下的学生uid
      $scope.checked[cid] = {};

      //显示学生列表  仅显示当前班级下的学生，其他的依然隐藏
      $("#index" + index).css("display", "block");
      $scope.unchecked[cid] = true; //隐藏uncheck.png图片
      //班级当前选中班级的cid
      //if(!$scope.checked[cid]["cid"]==cid)
      $scope.checked[cid]["cid"] = cid;
      // $scope.checked[cid]["sid"] = sid;
      //保存当前班级下的学生列表的uid
      $scope.checked[cid]["students"] = []; //用来保存当前班级下的学生uid
      $scope.userUnchecked[cid] = {};
      //当选择班级时获取当前班级下的学生列表并默认全部选中
      $http.get(api_url + "/class/student/list?cid=" + cid + "&page=1&size=1000")
        .success(function(data) {
          $scope.userlist[cid] = data.studentList;
          if ($scope.userlist[cid].length == 0) {
            //班级下没有学生
            $scope.checked[cid]["students"] = [];
          } else {
            //将uid报存在$scope.checked[cid]["uids"]
            for (var i = 0; i < $scope.userlist[cid].length; i++) {
              $scope.checked[cid]["students"].push({
                "studentId": $scope.userlist[cid][i].studentId,
                "isMake": 1
              })
            }
          }
        })
    } else if ($scope.checked[cid]) {
      //当转为选中时
      delete $scope.checked[cid]; //删除$scope.checked[cid]属性 班级及班级下的学生都不选中
      $scope.unchecked[cid] = false; //让图片remove.png显示

      //当班级为红叉叉时，学生列表也要全部变成红叉叉状态
      $http.get(api_url + "/class/student/list?cid=" + cid + "&page=1&size=200")
        .success(function(data) {
          $scope.userlist[cid] = data.studentList;
          $scope.userUnchecked[cid] = {};
          for (var i = 0; i < $scope.userlist[cid].length; i++) {
            //此时班级下的所有学生都不选中
            if ($scope.userlist[cid].length == 0) {
              // $scope.userUnchecked[cid] = [];
              $scope.userUnchecked[cid] = {};
              return;
            }
            $scope.userUnchecked[cid][$scope.userlist[cid][i].studentId] = true;
          }

        })

    };

    //选择班级下的学生
    $scope.userCheck = function(cid, studentId) {
      //$scope.userUnchecked[cid]对象保存指定班级下的uid
      //如果$scope.userUnchecked[cid]不存在就创建
      if (!$scope.userUnchecked[cid]) {
        $scope.userUnchecked[cid] = {};
      }
      if ($scope.userUnchecked[cid][studentId]) { //此时是未选中状态，要变成选中
        //处于未选中状态，点击后变为选中
        delete $scope.userUnchecked[cid][studentId];
        //如果此时班级未选中，班级下的学生也全部未选中
        if (!$scope.checked[cid]) {
          $scope.checked[cid] = {}; //创建一个班级对象  保存班级cid及班级下的学生uid
          $scope.checked[cid]["cid"] = cid;
          $scope.checked[cid]["students"] = [];

          $http.get(api_url + "/class/student/list?cid=" + cid + "&page=1&size=200")
            .success(function(data) {
              $scope.userlist[cid] = data.studentList;
              if ($scope.userlist[cid].length == 0) {
                //班级下没有学生
                $scope.checked[cid]["students"] = [];
              } else {
                //将uid保存在$scope.checked[cid]["uids"]
                for (var i = 0; i < $scope.userlist[cid].length; i++) {
                  $scope.checked[cid]["students"].push({
                    "studentId": $scope.userlist[cid][i].studentId,
                    "isMake": 0
                  })
                }
              }

              angular.forEach($scope.checked[cid]["students"], function(ele) {
                if (ele.studentId == studentId) {
                  ele.isMake = 1;
                }
              })

            })

          // $scope.checked[cid]["students"].push(studentId);
          $scope.unchecked[cid] = true;
        }
        /*var index = $scope.checked[cid]["students"].indexOf(studentId);
        if (index == -1) {
          $scope.checked[cid]["students"].push(studentId);
        }*/
        angular.forEach($scope.checked[cid]["students"], function(ele) {
          if (ele.studentId == studentId) {
            ele.isMake = 1;
          }
        })
      } else if (!$scope.userUnchecked[cid][studentId]) {
        //此时处于选中状态，需要删除选中状态的学生
        $scope.userUnchecked[cid][studentId] = true;
        if ($scope.checked[cid]) {
          var makeList = [];
          angular.forEach($scope.checked[cid]["students"], function(ele) {
            if (ele.studentId == studentId) {
              ele.isMake = 0;
            }
            makeList.push(ele.isMake);
          })
          if (makeList.indexOf(1) == -1) {
            $scope.unchecked[cid] = false;
            delete $scope.checked[cid];
          }
          /*var index = $scope.checked[cid]["students"].indexOf(studentId);
          if (index != -1) {
            $scope.checked[cid]["students"].splice(index, 1); //删除当前选中的学生
            if ($scope.checked[cid]["students"].length == 0) {
              $scope.unchecked[cid] = false;
              delete $scope.checked[cid];
            }
          }*/
        }

      }
    }
  }

  //点击班级名收起班级下的学生列表
  $scope.switch = function(index) {
    $("#index" + index).toggle();
  }

  //高级设置的显示与隐藏
  $scope.setting = function() {
    $("div.switch").toggle(400);
  }

  //是否是全班作业
  $scope.isall = true;
  $scope.isWholeWork = 1;
  $scope.isAll = function() {
    $scope.isall = !$scope.isall;
    if (!$scope.isall) {
      $scope.isWholeWork = 1;
    } else {
      $scope.isWholeWork = 0;
    }
  }

  //是否打乱顺序
  $scope.isorder = false;
  $scope.isMixed = 0;
  $scope.isOrder = function() {
    $scope.isorder = !$scope.isorder;
    if (!$scope.isorder) {
      $scope.isMixed = 0;
    } else {
      $scope.isMixed = 1;
    }
  }

  //是否立即公布答案
  $scope.issee = true;
  $scope.showAnswerType = 1;
  $scope.isSee = function() {
    if(!$(".endtime").val()) {
      alert('长期作业默认交卷查看解析,请设置为有限期作业后继续设置');
      return;
    }
    $scope.issee = !$scope.issee;
    if (!$scope.issee) {
      $scope.showAnswerType = 2;
    } else {
      $scope.showAnswerType = 1;
    }
    // console.log($scope.showAnswerType);
  };

  //作业是否加入班级统计报告
  $scope.isjoin = true;
  $scope.isJoinStatistics = 1;
  $scope.isJoin = function() {
    $scope.isjoin = !$scope.isjoin;
    if (!$scope.isjoin) {
      $scope.isJoinStatistics = 0;
    } else {
      $scope.isJoinStatistics = 1;
    }
  };
  // console.log($scope.isJoinStatistics);

  //作业时长的默认值全部设为0
  $scope.hours = 0;
  $scope.minute = 0;
  $scope.second = 0;

  $scope.submit = function() {
    if (!$scope.pname) {
      alert("请选择试卷!");
      return;
    }

    //提取出需要传递给后台的数据
    $scope.cids = []; //每次都先制空
    for (key in $scope.checked) {
      $scope.cids.push($scope.checked[key]);
    }
    if ($scope.cids.length == 0) {
      alert("请选择要布置作业的班级!");
      return;
    }

    //转成数字型
    $scope.durationTime = parseInt($scope.hours * 60 * 60) + parseInt($scope.minute * 60) + parseInt($scope.second);

    //作业时长
    if ($scope.durationTime != 0 && $scope.durationTime < 60) {
      alert("作业时长不得小于1分钟!");
      return;
    };

    //获取当前时间
    var currentTime = new Date();
    var year = currentTime.getFullYear();
    var month = currentTime.getMonth() + 1;
    var day = currentTime.getDate();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var seconds = currentTime.getSeconds();
    //如果小于10就在前面补上"0";
    if (month < 10) { month = "0" + month; }
    if (day < 10) { day = "0" + day }
    if (hours < 10) { hours = "0" + hours }
    if (minutes < 10) { minutes = "0" + minutes }
    if (seconds < 10) { seconds = "0" + seconds }
    $scope.currentTime = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;

    //作业起始时间
    if (!$(".startime").val()) {
      $scope.startTime = $scope.currentTime;
    } else {
      $scope.startTime = $(".startime").val();
    }

    //作业结束时间
    if (!$(".endtime").val()) {
      $scope.endTime = null;
      // 当为长期作业时查看解析状态为立马出解析；
      $scope.showAnswerType = 1;
    } else if (Date.parse(new Date($(".endtime").val())) < Date.parse(new Date($scope.startTime))) {
      alert('请正确填写开始结束时间!');
      return;
    } else {
      $scope.endTime = $(".endtime").val();
    }

    //作业通知时间
    if (!$(".noticeTime").val()) {
      $scope.displayTime = $scope.currentTime;
    } else if (Date.parse(new Date($(".noticeTime").val())) < Date.parse(new Date($scope.currentTime))) {
      alert('请正确填写作业通知时间!');
      return;
    } else if (Date.parse(new Date($(".noticeTime").val())) > Date.parse(new Date($scope.startTime))) {
      alert('请选择早于作业开始时间的通知时间!');
      return;
    } else {
      $scope.displayTime = $(".noticeTime").val();
    }

    //作业时长不可以超过结束时间和起始时间之差
    var startime = new Date($(".startime").val()).getTime();
    if ($(".endtime").val()) { //有结束时间
      var endtime = new Date($(".endtime").val()).getTime();
      if ((endtime - startime) / 1000 < $scope.durationTime) {
        alert("作业时长不合法!");
        return;
      }
    }

    var workInfo = {
      "pid": parseInt($scope.pid),
      "workName": $scope.pname,
      "displayTime": $scope.displayTime,
      "startTime": $scope.startTime,
      "endTime": $scope.endTime,
      "showAnswerType": parseInt($scope.showAnswerType),
      "durationTime": parseInt($scope.durationTime),
      "isMixed": parseInt($scope.isMixed),
      "isWholeWork": parseInt($scope.isWholeWork),
      "isJoinStatistics": parseInt($scope.isJoinStatistics),
      "cids": $scope.cids,
      "workType": $scope.workType
    }
    if ($scope.type) {
      workInfo["goodsId"] = $scope.gid;
    }
    // console.log(workInfo);

    //转成json格式
    workInfo = JSON.stringify(workInfo);

    $http.post(api_url + "/work", workInfo)
      .success(function(data) {
        if (!data.status) {
          alert("作业布置成功!");
          $location.path("/work/list");
        }
      })

  }
}])

app.controller('workcorrect', ['$scope', '$routeParams', '$http', '$filter', 'toolServices', "$cookieStore", "$timeout", "correctService", function($scope, $routeParams, $http, $filter, toolServices, $cookieStore, $timeout, correctService) {
  $scope.workId = parseInt($routeParams['workId']); //获取url的作业id
  $scope.baseInfo = {};
  $scope.paperQuestions = [];
  $scope.subjectiveQuestions = [];
  $scope.objectiveQuestions = [];
  $scope.currentQuestion = {};
  // $scope.currentSubjectiveIndex = 0;
  $scope.currentStudent = {};
  $scope.currentStudentIndex = 0;
  $scope.corrected = [];
  $scope.uncorrected = [];
  $scope.questions = [];
  $scope.composites = [];
  $scope.tixus = [];
  $scope.startCorrect = 1; //开关　　控制　0/1 页面首次加载不显示学生答题的信息　
  $scope.isShowQuestionInfo = 1; //开关　控制题目信息的收起／展开
  $scope.finalScore = 0;
  var userinfo = $cookieStore.get('user');
  $scope.token = userinfo['token'];
  $scope.messageType = 1  //是否给全体人员发送通知：1-是；2-否
  /*    区分未批改和已批改
        学生的批改字段correct对所有空都有score字段 已批改
        type属性 type = 1 已批改  type = 0 未批改
        @param data 学生数据 [];
        @param index 要显示的学生index;

  */

  $scope.studentSort = function(data, index) {
    // if (index == 0) {//优化
    angular.forEach(data, function(student) {
      correctService.getStudentQidInfo($scope.workId, $scope.currentQuestion.qid, student.studentId)
        .then(function(res) {
          student.workId = res.workId;
          student.qid = res.qid;
          student.qType = res.qType;
          student.answer = res.answer;
          student.submitTime = res.submitTime;
          student.answerDuration = res.answerDuration;
          student.tid = res.tid;
          student.tutorId = res.tutorId;
          student.correct = res.correct;
          student.correctTime = res.correctTime;
          student.score = res.score;
          student.isRight = res.isRight;
          student.correctType = res.correctType;
          student.createTime = res.createTime;
          student.updateTime = res.updateTime;
          /*if ($scope.currentQuestion.qType == 1) {
            student.type = 1;
            return;
          }
          if (!student.correct) {
            student.type = 0;
            return;
          }
          student.type = 1;
          for (var i = 0, ii = student.correct.length; i < ii; i++) {
            if (student.correct[i]["score"] == undefined) {
              student.type = 0;
              break;
            }
          }*/
        })
    })

    $scope.students = data;
    // }
    $scope.currentStudentIndex = index;
    $scope.currentStudent = $scope.students[$scope.currentStudentIndex];
    // console.log($scope.currentStudent)
  }

  /*control whether textarea is show now */
  $scope.isDisplayText = function() {
    $scope.textArr = [];
    /*if ($scope.currentStudent.correct == undefined) {
      $(".t_textarea").hide();
    } else {
      for (var i = 0, ii = $scope.currentStudent.correct.length; i < ii; i++) {
        var $textArea = $("[data-textIndex=" + i + "]");
        if ($scope.currentStudent.correct[i].correct['textarea'] != undefined && $scope.currentStudent.correct[i].correct['textarea'] != "") {
          $textArea.show();
          $textArea.children("textarea").val($scope.currentStudent.correct[i].correct['textarea'])
        } else {
          $textArea.hide();
        }
      }
    }*/
  }

  /*initialization */
  correctService.getWorkBaseInfo($scope.workId)
    .then(function(data) {
      $scope.baseInfo = data;
      if (!$scope.baseInfo.endTime) {
        $scope.baseInfo.unlimited = 1;
      } else {
        $scope.baseInfo.unlimited = 0;
      }

      correctService.preview($scope.baseInfo.pid)
        .then(function(data) {
          $scope.questions = data.questions;
          $scope.stems = data.stem;
          $scope.subNumber = data.paper.subNumber; //主观题数量,确定显示大保存按钮
          //判断第一题是否为主观题
          if ($scope.questions[0].qType && $scope.questions[0].qType == 2) {
            $scope.currentSubjectiveIndex = 0;
          } else if (!$scope.questions[0].qType && $scope.stems[$scope.questions[0].mid][0].qType == 2) {
            $scope.currentSubjectiveIndex = 0;
          } else {
            $scope.currentSubjectiveIndex = -1;
          }
          for (var i = 0; i < data.paper.paperStructJson.length; i++) {
            if (data.paper.paperStructJson[i]['qid']) {
              var tixu = {
                "tixu": (i + 1).toString(),
                "qid": data.paper.paperStructJson[i]['qid'],
                "parentId": 0,
                "parentTixu": 0
              }
              $scope.tixus.push(tixu);
              var qid = data.paper.paperStructJson[i]["qid"];
              var ques = correctService.findObjInArray(data.questions, "qid", qid);
              if (ques.qType == 2) {
                ques.tixu = tixu.tixu;
                $scope.subjectiveQuestions.push(ques);
              }

            } else if (data.paper.paperStructJson[i]['mid']) {
              var mid = data.paper.paperStructJson[i]['mid'].toString();
              var stem = data.stem[mid];
              for (var j = 0; j < data.paper.paperStructJson[i]['stem'].length; j++) {
                var qid = data.paper.paperStructJson[i]['stem'][j].toString();
                var tixu = {
                  "tixu": (i + 1).toString() + "-" + (j + 1),
                  "qid": data.paper.paperStructJson[i]["stem"][j],
                  "parentId": data.paper.paperStructJson[i]['mid'],
                  "parentTixu": (i + 1)
                }
                $scope.tixus.push(tixu);
                var child = correctService.findObjInArray(stem, "qid", qid);
                if (child.qType == 2) {
                  child.parent = stem;
                  child.parentId = tixu.parentId;
                  child.tixu = tixu.tixu;
                  child.parentTixu = tixu.parentTixu;
                  $scope.subjectiveQuestions.push(child);
                }
              }
            }
          }

          if ($scope.tixus[0]['parentId'] == 0) {
            $scope.currentQuestion = correctService.findObjInArray($scope.questions, "qid", $scope.tixus[0]['qid']);
            $scope.currentQuestion.parentId = 0;
            $scope.currentQuestion.tixu = $scope.tixus[0]["tixu"];
          } else if ($scope.tixus[0]['parentId'] != 0) {
            var qid = $scope.tixus[0]['qid'];
            var parentId = $scope.tixus[0]['parentId'];
            var parentTixu = $scope.tixus[0]['parentTixu'];
            $scope.currentQuestion = correctService.findObjInArray($scope.stems[parentId.toString()], "qid", qid);
            $scope.currentQuestion.parent = correctService.findObjInArray($scope.questions, "mid", parentId);
            $scope.currentQuestion.parentTixu = parentTixu;
            $scope.currentQuestion.parentId = parentId;
            $scope.currentQuestion.tixu = $scope.tixus[0]['tixu'];
          }
          correctService.getCorrectInfoByqid($scope.workId, $scope.currentQuestion.qid)
            .then(function(data) {
              $scope.studentSort(data.studentList, 0);

              if ($scope.currentQuestion.qType == 2 && angular.isDefined($scope.currentStudent)) {
                $scope.isDisplayText();
              }
            })

        });
    });

  $scope.textArr = []; //每道题留评显示用
  $scope.showTextarea = function(event, index) {
    // $scope.showArea = 1;
    // $(".t_textarea").children("textarea").eq(index).text("");
    // $(".t_textarea").children("textarea").eq(index).val("");
    // var $textarea = $(event.target).parent().parent().siblings('.teacherAnswer').children(".t_textarea");
    // $textarea.show().children("textarea").text("");
    $scope.textArr[index] = true;
  }　　

  /*remove text/images/audio */
  $scope.removeTextarea = function(event, type, index) {
    // console.log(index)
    $scope.tindex = $(event.target).parents('.teacherAnswer').attr('data-tindex');
    /* type区分图片/文本框/音频*/
    if (type == 1) {
      // $(event.target).siblings("textarea").val("");
      // $(event.target).parent().hide();
      $scope.currentStudent.correct[index].correct['textarea'] = "";
      $scope.textArr[index] = false;

      $scope.submitAnswer($scope.tindex, "textarea", null);
    } else if (type == 2) {
      // if ($scope.currentStudent.correct[$scope.tindex].correct['picture'].length == 1) {
      $(event.target).siblings(".uploadImage").attr("src", "").end().parent().hide();
      $scope.submitAnswer($scope.tindex, "picture", null);
      // } else {
      //   $(event.target).siblings(".uploadImage").attr("src", "");
      //   $scope.currentStudent.correct[$scope.tindex].correct['picture'].splice(index, 1)
      //   $scope.submitAnswer($scope.tindex, "picture", $scope.currentStudent.correct[$scope.tindex].correct['picture'], "delete");
      // }
    } else if (type == 3) {
      $(event.target).hide();
      $(event.target).siblings(".decorator").hide();
      $scope.submitAnswer($scope.tindex, "audio", null);
    }
  }

  $scope.playAudio = function(event) {
    var $target = $(event.target);
    var audioPlayer = $target.siblings().get(1);
    var timeMonitor = $target.siblings(".currentTime");
    audioPlayer.play();
    audioPlayer.addEventListener("ended", function() {
      $target.attr("src", "./static/images/mp3.png");
    }, false);
    var duration = parseInt(audioPlayer.duration);
    timeMonitor.text(duration);
    audioPlayer.addEventListener("timeupdate", function() {
      var currentTime = parseInt(audioPlayer.currentTime);
      var remain = duration - currentTime;
      timeMonitor.text(remain + " / " + duration);
    }, false);
    $target.attr("src", './static/images/pi_mp3.gif');
  }

  $scope.uploadPic = function(event, index) {
    var target = event.target;
    var form = document.createElement("form");
    form.setAttribute("enctype", "multipart/form-data");
    var uploadFileInput = document.createElement("input");
    uploadFileInput.setAttribute("type", "file");
    // uploadFileInput.setAttribute("name", "fileDataFileName");
    uploadFileInput.setAttribute("name", "resource");
    uploadFileInput.click();　
    $(form).append(uploadFileInput);
    $(uploadFileInput).on("change", function() {
      var file = uploadFileInput.files[0];
      if (!/image\/\w+/.test(file.type)) {
        // correctService.showTip("请上传合法的图片");
        alert("请上传合法的图片");
        return;
      }
      var fd = new FormData(form);
      /*　用Angular的$http服务无法上传文件,猜测是http头的问题．现在用底层的XMLHttpRequst */
      if (window.XMLHttpRequest) {
        var ajax = new XMLHttpRequest();
      } else if (window.AcitveXObject) {
        var ajax = new AcitveXObject("Microsoft.XMLHTTP");
      } else {
        throw Error("XMLHttpRequest not found");
      }
      var teacherInfo = $cookieStore.get("user");
      var token = teacherInfo['token'];
      ajax.onreadystatechange = function() {
        if (ajax.readyState == 4) {
          if (ajax.status == 200) {
            var response = JSON.parse(ajax.response);
            // var teacherCorrectImg = api_url + '/resource/' + response.con.mini + '?inline=true&token=' + token;
            var teacherCorrectImg = response.data.url;
            $scope.$apply(function() {
              $scope.submitAnswer(index, "picture", teacherCorrectImg);
            })
          }
        }
      }
      ajax.open("POST", api_url + "/upload?type=" + 1 + "&token=" + token, true);
      ajax.send(fd);
    })
  }

  /* 
    批改记录提交
    @param index 这个空的index
    @param type  批改类型 
    $param value 
  */

  $scope.submitAnswer = function(index, type, value) {
    index = Number(index);
    /*firstly check whether this is first to correct */
    if ($scope.currentStudent.correct === undefined || $scope.currentStudent.correct === null || $scope.currentStudent.correct.length === 0) {
      var correct = [],
        correctType = [];
      for (var i = 0, ii = $scope.currentQuestion.choices[0].length; i < ii; i++) {
        correct.push({ "correct": {} });
        correctType.push(0);
      }
      $scope.currentStudent.correct = correct;
      $scope.currentStudent.correctType = correctType;
    }

    if (type == "textarea") {
      if (value == null) {
        delete $scope.currentStudent.correct[index].correct['textarea'];
      } else {
        $scope.currentStudent.correct[index].correct['textarea'] = value;
      }
      // console.log($scope.currentStudent.correct[index].correct['textarea']);
    }
    if (type == "picture") {
      if (value == null) {
        delete $scope.currentStudent.correct[index].correct['picture'];
        // } else if ($scope.currentStudent.correct[index].correct['picture'] && $scope.currentStudent.correct[index].correct['picture'].constructor == Array) {
        // } else if ($scope.currentStudent.correct[index].correct['picture'] && img == 'delete') {
        // $scope.currentStudent.correct[index].correct['picture'] = [];
        // $scope.currentStudent.correct[index].correct['picture'] = value;
        // } else if ($scope.currentStudent.correct[index].correct['picture'] && img == 'upload') {
        // $scope.currentStudent.correct[index].correct['picture'] = value;
        // $scope.currentStudent.correct[index].correct['picture'].push(value);
      } else {
        $scope.currentStudent.correct[index].correct['picture'] = value;
        // $scope.currentStudent.correct[index].correct['picture'] = [];
        // $scope.currentStudent.correct[index].correct['picture'].push(value);
      }
    }

    if (type == "score") {
      $scope.currentStudent.correct[index]['score'] = parseInt(value);
      // $scope.currentStudent.correctType[index] = 0;
    }
    if (type == "audio") {
      if (value == null) {
        delete $scope.currentStudent.correct[index].correct['audio'];
      }
    }
    var totalScore = 0;
    for (var i = 0; i < $scope.currentStudent.correct.length; i++) {
      var score = $scope.currentStudent.correct[i].score;
      if (score != undefined) {
        totalScore += parseInt(score);
      }
    }
    $scope.currentStudent.score = totalScore;
    /*计算机辅助批改
      0  人工批改
      １　计算自动批改
    　*/

    var teacherInfo = $cookieStore.get("user");
    var teacherCorrectInfo = {
      "studentId": $scope.currentStudent.studentId,
      "workId": $scope.workId,
      "qid": $scope.currentQuestion.qid,
      "qOrder": index + 1,
      "tid": teacherInfo.tid,
      "correct": $scope.currentStudent.correct[index].correct,
      "score": $scope.currentStudent.correct[index].score
    };

    // console.log(teacherCorrectInfo)

    correctService.submit(JSON.stringify(teacherCorrectInfo)).then(function(data) {
      // if( typeof data != "object" || data.con == null) {
      //       alert('服务器错误');
      //       return;
      // }
      // correctService.showTip("提交成功，一鼓作气，继续批改");
      // console.log($scope.currentStudent.correct)
      var correctedFlag = true;
      for (var i = 0, ii = $scope.currentQuestion.choices[0].length; i < ii; i++) {
        if ($scope.currentStudent.correct[i]['score'] == undefined) {
          correctedFlag = false;
          break;
        }
      }
      if (correctedFlag == true) {
        $scope.currentStudent.type = 1;
        $scope.currentStudent.score = totalScore;
        $scope.students[$scope.currentStudentIndex] = $scope.currentStudent;
      }
    })
  }

  $scope.submitText = function(event, index) {
    var text = $(event.target).val();
    $scope.submitAnswer(index, "textarea", text);

  }
  $scope.submitScore = function(event, index) {
    // console.log(index)
    var score = $(event.target).val();
    var maxscore = $scope.currentQuestion.choices[1][index];
    if ($.trim(score) == "") {
      return;
    }
    if (!/^\d+$/.test(score)) {
      // correctService.showTip("请填写合法的分数哟＾＾"); 
      $(event.target).parent().parent().siblings(".highScoreTip").text("*提示:请输入合法值").show();
      return;
    } else {
      $(event.target).parent().parent().siblings(".highScoreTip").hide();
    }
    if (parseInt(score) > maxscore) {
      $(event.target).parent().parent().siblings(".highScoreTip").text("*提示:分数不可高于本空最高分").show();
      return;
    } else {
      $(event.target).parent().parent().siblings(".highScoreTip").hide();
    }

    $(event.target).val("").parent().siblings(".score").removeClass("computerCorrect").show().children("span").show();
    $scope.submitAnswer(index, "score", score);
  }


  $scope.confirmScore = function(event, index) {
    var $confirmBtn = $(event.target);
    var score = $confirmBtn.siblings(".score_input").val();
    if (!/^\d+$/.test(parseInt(score))) {
      return;
    }　　　　
    $confirmBtn.siblings(".score").removeClass("computerCorrect").children("span").show();
    $scope.submitAnswer(index, "score", score);
  }　　　　　


  $scope.selectQuestion = function(tixu, event) {
    var qid = tixu.qid;
    var parentId = tixu.parentId;
    var parentTixu = tixu.parentTixu;

    if (parentId != 0) {
      $scope.currentQuestion = correctService.findObjInArray($scope.stems[parentId.toString()], "qid", qid);
      $scope.currentQuestion.parent = correctService.findObjInArray($scope.questions, "mid", parentId);
      $scope.currentQuestion.parentTixu = parentTixu;
      $scope.currentQuestion.parentId = parentId
      $scope.currentQuestion.tixu = tixu.tixu;
    } else {
      $scope.currentQuestion = correctService.findObjInArray($scope.questions, "qid", qid);
      $scope.currentQuestion.tixu = tixu.tixu;
    }
    $(event.target).addClass("selected").siblings().removeClass("selected");
    correctService.getCorrectInfoByqid($scope.workId, $scope.currentQuestion.qid)
      .then(function(data) {
        $scope.studentSort(data.studentList, 0);
        if ($scope.currentQuestion.qType == 2 && angular.isDefined($scope.currentStudent)) {
          $scope.isDisplayText();
          //判断是否主观题,拿到下标
          for (var i = 0; i < $scope.subjectiveQuestions.length; i++) {
            if ($scope.currentQuestion.qid == $scope.subjectiveQuestions[i].qid) {
              $scope.currentSubjectiveIndex = i;
            }
          }
        }
      })
  }
  $scope.showMiddle = function(event) {
    var $target = $(event.target);
    var $middle = $target.siblings(".middle");
    $target.hide();
    $middle.show();
    $middle.on("mouseover", function() {
      $(this).show();
      $target.hide();
    });
    $middle.on("mouseout", function() {
      $(this).hide();
      $target.show();
    });
    $target.on("mouseout", function() {
      $middle.hide();
      $target.show();
    });
  }

  // 通知消息发送对象
  // console.log($scope.messageType);
  $scope.changeMessageType = function(){
    if ($scope.messageType == 1){
      $scope.messageType = 2;
    } else {
      $scope.messageType = 1;
    }
    // console.log($scope.messageType);
  }

  /* 批改完成（大保存） */
  $scope.finishCorrect = function() {
    (function() {
      var bodyWidth = $(window).width();　
      var bodyHeight = $(window).height();
      var left = (bodyWidth - 340) / 2;
      var top　 = (bodyHeight - 200) / 2;
      var popupBox;
      // console.log($scope.baseInfo.unlimited, $scope.baseInfo.endTime)
      if (!$scope.baseInfo.unlimited && Date.parse(new Date()) < Date.parse($scope.baseInfo.endTime)) {
        popupBox = '<div id="popupBox" style="width:340px;height:200px;border:1px solid #d3d3d3;' + 'position:fixed;top:' + top + 'px' + ';left:' + left + 'px;background:#fff;' + ';z-index:99999;border-radius:4px;">' + '<p style="font-size:14px;color:#797979;margin:25px;margin-top:40px;">' + '考试未结束，还未到出答案时间!' + '！</p>' + '<div style="margin-left:25px;margin-right:25px;">' + '<a style="width:120px;height:33px;background:#e4e4e4;display:block;text-align:center;line-height:33px;float:left;cursor:pointer;" id="thanks">取消</a>' + '<a style="width:120px;height:33px;background:#009e4d;display:block;text-align:center;line-height:33px;float:right;color:#fff;cursor:pointer;" id="thanks-again" >确定</a>' + '</div>' + '</div>';
      } else {
        popupBox = '<div id="popupBox" style="width:340px;height:200px;border:1px solid #d3d3d3;' + 'position:fixed;top:' + top + 'px' + ';left:' + left + 'px;background:#fff;' + ';z-index:99999;border-radius:4px;">' + '<p style="font-size:14px;color:#797979;margin:25px;margin-top:40px;">' + '此操作完成后,每位学生将收到本次作业的成绩报告,确定要执行吗?' + '！</p>' + '<div style="margin-left:25px;margin-right:25px;">' + '<a style="width:120px;height:33px;background:#e4e4e4;display:block;text-align:center;line-height:33px;float:left;cursor:pointer;" id="thanks">取消</a>' + '<a style="width:120px;height:33px;background:#009e4d;display:block;text-align:center;line-height:33px;float:right;color:#fff;cursor:pointer;" id="doBigSave" >确定</a>' + '</div>' + '</div>';
      }
      $("body").append(popupBox);
      $("#thanks").click(function() {
        $("#popupBox").remove();
      });
      $("#thanks-again").click(function() {
        $("#popupBox").remove();
      });
      $("#doBigSave").click(function() {
        $("#popupBox").remove();
        correctService.changeWorkStatus($scope.workId,$scope.messageType)
          .then(function(data) {
            // if (!data.status) {
            //   correctService.showTip("考试未结束，还未到出答案时间");
            // } else {
            //   correctService.showTip("作业批改完成");
            // }
          })
      });
    })();
  }

  /*　
    @param qid 
    @param currentStudentIndex
  */
  $scope.getOneQuestionCorrectInfo = function(qid, index) {
    correctService.getCorrectInfoByqid($scope.workId, qid)
      .then(function(data) {
        $scope.studentSort(data.studentList, index);
        $scope.isDisplayText();
      });
  };

  $scope.prevSub = function() {
    $scope.currentSubjectiveIndex -= 1;
    if ($scope.currentSubjectiveIndex < 0) {
      $scope.currentSubjectiveIndex = 0;
      // $scope.getOneQuestionCorrectInfo($scope.currentQuestion.qid, 0);
      return;
    }
    $scope.currentQuestion = $scope.subjectiveQuestions[$scope.currentSubjectiveIndex];
    $scope.currentQuestion.parent = correctService.findObjInArray($scope.questions, "mid", $scope.currentQuestion.parentId);
    var tixu = $scope.currentQuestion.tixu;
    var sort_list = $(".sort_list li");
    for (var i = 0; i < sort_list.length; i++) {
      if ($.trim(sort_list.eq(i).text()) == tixu) {
        sort_list.eq(i).addClass("selected").siblings().removeClass("selected");
      }
    }
    $(".highScoreTip").hide();
    $scope.getOneQuestionCorrectInfo($scope.currentQuestion.qid, 0);
  }


  $scope.nextSub = function() {
    $scope.currentSubjectiveIndex += 1;
    if ($scope.currentSubjectiveIndex >= $scope.subjectiveQuestions.length) {
      $scope.currentSubjectiveIndex = $scope.subjectiveQuestions.length - 1;
      // $scope.getOneQuestionCorrectInfo($scope.currentQuestion.qid, 0);
      return;
    }
    $scope.currentQuestion = $scope.subjectiveQuestions[$scope.currentSubjectiveIndex];
    $scope.currentQuestion.parent = correctService.findObjInArray($scope.questions, "mid", $scope.currentQuestion.parentId);
    var tixu = $scope.currentQuestion.tixu;
    var sort_list = $(".sort_list li");
    for (var i = 0; i < sort_list.length; i++) {
      if ($.trim(sort_list.eq(i).text()) == tixu) {
        sort_list.eq(i).addClass("selected").siblings().removeClass("selected");
      }
    }
    $(".highScoreTip").hide();
    $scope.getOneQuestionCorrectInfo($scope.currentQuestion.qid, 0);
  };


  $scope.prevUser = function() {
    $scope.currentStudentIndex -= 1;
    if ($scope.currentStudentIndex < 0) {
      $scope.currentStudentIndex = 0;
      return;
    }
    $(".highScoreTip").hide();
    correctService.getCorrectInfoByqid($scope.workId, $scope.currentQuestion.qid)
      .then(function(data) {
        // $scope.studentSort(data.studentList, index);
        $scope.currentStudent = $scope.students[$scope.currentStudentIndex];
        // $scope.isDisplayText();
      })
      // $scope.getOneQuestionCorrectInfo($scope.currentQuestion.qid, $scope.currentStudentIndex);
  }


  $scope.nextUser = function() {
    $scope.currentStudentIndex += 1;
    if ($scope.currentStudentIndex >= $scope.students.length) {
      $scope.currentStudentIndex = $scope.students.length - 1;
      return;
    }
    $(".highScoreTip").hide();
    correctService.getCorrectInfoByqid($scope.workId, $scope.currentQuestion.qid)
      .then(function(data) {
        // $scope.studentSort(data.studentList, index);
        $scope.currentStudent = $scope.students[$scope.currentStudentIndex];
        // $scope.isDisplayText();
      })
      // $scope.getOneQuestionCorrectInfo($scope.currentQuestion.qid, $scope.currentStudentIndex);

  }

  /*控制题目的收起/展开*/
  $scope.toggleQuestionInfo = function() {
    $scope.isShowQuestionInfo = $scope.isShowQuestionInfo == 1 ? 0 : 1;
  }

  /*click to choose one student */
  $scope.selectUser = function(studentId, index) {
    $scope.startCorrect = 1;
    // $scope.currentStudent = correctService.findObjInArray($scope.students, 'studentId', studentId);
    // $scope.currentStudentIndex = $scope.students.indexOf($scope.currentStudent);
    $scope.currentStudentIndex = index;
    // correctService.getCorrectInfoByqid($scope.workId, $scope.currentQuestion.qid)
    // .then(function(data) {
    // $scope.studentSort(data.studentList, index);
    $scope.currentStudent = $scope.students[index];
    $scope.isDisplayText();
    // })
    $(".highScoreTip").hide();
    $(".student_list").children("[data-studentId=" + studentId + "]").addClass("active").siblings().removeClass("active");
  }

  $scope.zoomImg = function(event) {
    var bodyWidth = $("body").width();
    var zoomBoxWidth = (bodyWidth - 80);
    var $target = $(event.target);
    var src = $target.attr("src");
    src = src.replace("mini_", "");
    // console.log(src);

    var overLay = "<div id=\"zoomImageOverlay\" style=\"position:fixed;top:0;left:0;width:100%;" + "height:100%;background:black;opacity:0.75;text-align:center;z-index:9999;\"></div>" + "<div id=\"zoomImageBox\"style=\"position:absolute;top:0;left:0;z-index:99999;" + "text-align:center;width:100%;\"><img title=\"点击旋转图片\" src=\"" + src + "\" style=\"max-width:1200px;" + "cursor:pointer;margin-top:40px;background:#fff;\"/>" + "<span id=\"zoomImageBoxCloseBtn\" style=\"width:36px;height:36px;border-radius:18px;" + "cursor:pointer;text-align:center;line-height:36px;color:#fff;position:fixed;top:10px;" + "right:50px;font-size:26px;border:1px solid #fff; \">X</span></div>";
    $("body").append(overLay).scrollTop(0);
    $("#zoomImageBoxCloseBtn").click(function() {
      $("#zoomImageBox").remove();
      $("#zoomImageOverlay").remove();
    })
    var degree = 0;
    $("#zoomImageBox").children("img").click(function() {
      degree += 90;
      $("#zoomImageBox").children("img").css({ "transform": "rotate(+" + degree + "deg)", "-webkit-transform": "rotate(+" + degree + "deg)", "-moz-transform": "rotate(+" + degree + "deg)" })

    })

  }

  /*=================================
  keyboard control 
  　 　左右控制 上一题主观题／下一个主观题　
  　　　上下控制上一人／下一人
  ===================================*/
  　　　
  $(document).on("keydown", function(event) {
    var keycode = event.which;
    if (keycode == 40) {
      $scope.nextUser();
    }
    if (keycode == 38) {
      $scope.prevUser();
    }
    if (keycode == 37) {
      $scope.prevSub();
    }
    if (keycode == 39) {
      $scope.nextSub();
    }
  })　

}]);


//系统设置
app.controller("setting", ['$scope', '$http', '$cookieStore', '$interval', function($scope, $http, $cookieStore, $interval) {
  //获取cookie中tid
  $scope.tid = $cookieStore.get("user").tid;
  $scope.token = $cookieStore.get("user").token;

  //根据tid 来获取用户信息
  $scope.getInfo = function() {
    $http.get(api_url + "/teacher?tid=" + $scope.tid)
      .success(function(data) {
        $scope.teacher = data;
        $scope.uid = data.uid;
      })
  }
  $scope.getInfo();

  //修改名字
  $scope.editName = function() {
    if ($scope.teacher.teacherName) {
      $http.put(api_url + '/teacher', {
        "teacherName": $scope.teacher.teacherName,
        "tid": $scope.tid
      }).success(function(data) {
        if (!data.status) {
          // alert('修改成功!');
        }
      })
    }
  }

  //修改各种乱七八糟的东西
  $scope.editNumber = function(type) {
    $scope.myModal = true;
    $scope.numberModal = true;
    $scope.validate = true;
    $scope.editType = type;
  }

  //验证码图片
  $scope.getPicCaptcha = function() {
    $http.get(api_url + "/image/code?w=100&h=40")
      .success(function(data) {
        $scope.image = data.image;
        $scope.key = data.codeKey;
      })
  };

  //验证密码
  $scope.validatePwd = function() {
    if ($scope.password) {
      //md5加密一击
      $scope.md5Pwd = hex_md5($scope.password);
      $scope.md5Pwd = $scope.md5Pwd.split('');
      $scope.md5Pwd[5] = $scope.password.charAt(0);
      $scope.md5Pwd[10] = $scope.password.charAt(1);
      $scope.md5Pwd[15] = $scope.password.charAt(2);

      $http.post(api_url + '/user/confirmation', {
        'uid': $scope.uid,
        'password': $scope.md5Pwd.join('')
      }).success(function(data) {
        if (!data.status) {
          $scope.validate = false;
          if ($scope.editType == 1) {
            $scope.getPicCaptcha();
          }
        }
      })
    }
  }

  //匹配正则
  var accountExp = /^[a-zA-Z]\w+$/,
    phoneExp = /^1[34578]\d{9}$/,
    mailExp = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;

  //定时器
  $scope.setTimer = function() {
    $scope.second = 60;
    $scope.timer = null;
    $scope.timer = $interval(function() {
      $scope.second--;
      if ($scope.second == 0) {
        $interval.cancel($scope.timer);
      }
    }, 1000);
  }

  //获取手机邮箱验证码
  $scope.getCaptcha = function() {
    if ($scope.editType == 1) {
      if (!$scope.phoneCaptcha) {
        alert("请输入图片验证码!");
        return;
      }
      //验证手机号唯一
      if ($scope.newPhone && phoneExp.test($scope.newPhone)) {
        $http.put(api_url + '/user/only', {
          'phone': $scope.newPhone
        }).success(function(data) {
          if (!data.status) {
            //发送短信验证码
            $http.post(api_url + '/captcha/create', {
              "isRegister": 1,
              'phone': $scope.newPhone,
              "code": $scope.phoneCaptcha,
              "codeKey": $scope.key
            }).success(function(data) {
              if (!data.status) {
                $scope.setTimer();
              }
            })
          }
        })
      } else {
        alert("请填写正确的手机号!")
      }
    } else if ($scope.editType == 2) {
      //验证邮箱唯一
      if ($scope.newMail && mailExp.test($scope.newMail)) {
        $http.put(api_url + '/user/only', {
          'email': $scope.newMail
        }).success(function(data) {
          if (!data.status) {
            //发送邮箱验证码
            $http.post(api_url + '/email/captcha/create', {
              'email': $scope.newMail
            }).success(function(data) {
              if (!data.status) {
                $scope.setTimer();
              }
            })
          }
        })
      } else {
        alert("请填写正确的邮箱账号!")
      }
    }
  }

  //提交修改内容
  $scope.confirmEdit = function() {
    if ($scope.editType == 1) {
      $http.put(api_url + '/modify/phone', {
        'uid': $scope.uid,
        'phone': $scope.newPhone,
        'captcha': $scope.phonePwd
      }).success(function(data) {
        if (!data.status) {
          $scope.teacher.phone = $scope.newPhone;
          $scope.hideModal();
        }
      })
    } else if ($scope.editType == 2) {
      $http.put(api_url + '/modify/email', {
        'uid': $scope.uid,
        'email': $scope.newMail,
        'captcha': $scope.mailPwd
      }).success(function(data) {
        if (!data.status) {
          $scope.teacher.email = $scope.newMail;
          $scope.hideModal();
        }
      })
    } else if ($scope.editType == 3) {
      if ($scope.newAccount && accountExp.test($scope.newAccount)) {
        $http.put(api_url + '/modify/account', {
          'uid': $scope.uid,
          'account': $scope.newAccount
        }).success(function(data) {
          if (!data.status) {
            $scope.teacher.account = $scope.newAccount;
            $scope.hideModal();
          }
        })
      }
    }
  }

  //关闭摸态框
  $scope.hideModal = function() {
    $scope.myModal = false;
    $scope.numberModal = false;
    $scope.tagModal = false;
    $interval.cancel($scope.timer);
    $scope.second = 0;
    $scope.password = '';
    $scope.phonePwd = '';
    $scope.mailPwd = '';
    $scope.newMail = '';
    $scope.newPhone = '';
    $scope.newAccount = '';
  }

  //获取教师标签
  $scope.getTeacherTag = function() {
    $http.get(api_url + '/tag/teacher?tid=' + $scope.tid)
      .success(function(data) {
        $scope.teacherTags = [];
        $scope.courseTags = [];
        angular.forEach(data.tagList, function(ele) {
          if (ele.tagType == 1) {
            angular.forEach(ele.childList, function(element) {
              element.tagName = ele.tagName + element.tagName;
              $scope.teacherTags.push(element);
            })
          } else if (ele.tagType == 3) {
            $scope.courseTags.push(ele);
          }
        })
      })
  }
  $scope.getTeacherTag();

  //获取所有标签
  $http.get(api_url + '/tag/public/stage/grade')
    .success(function(data) {
      $scope.tags = data.stageList;
    })

  //获取所有课程
  $http.get(api_url + '/tag?isPublic=1&tagType=3&isUse=1&page=1&size=1000')
    .success(function(data) {
      $scope.courses = data.tagList;
    })

  //图片上传
  $scope.editPhoto = function() {
    $("#file").click();
  }

  $scope.flag = true; //标识图片不不传或上传完成

  function handleFileSelect(evt) {
    var files = evt.target.files,
      f = files[0];
    var limit = 1024 * 1024;

    if (f.size / limit > 10) { //照片大小十M
      toastr.info("图片大小超出了限制!")
      return;
    }

    var formData = new FormData($("#uploadPicForm")[0]);
    if (!files.length) {
      alert("请选择要上传的图片！");
      return;
    }

    $scope.flag = false;

    //各种事件
    var xhr = new XMLHttpRequest();
    xhr.upload.addEventListener("load", loadedProgress, false);
    xhr.open("POST", api_url + "/upload?w=120&h=120&type=1&token=" + $scope.token);
    //上传完成
    function loadedProgress(evt) {
      $scope.flag = true;
    }

    xhr.send(formData);

    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
          $scope.$apply(function() {
            $scope.teacher.photo = JSON.parse(xhr.responseText).data.url;
          })
          $http.put(api_url + '/teacher', {
            "photo": $scope.teacher.photo,
            "tid": $scope.tid
          }).success(function(data) {
            if (!data.status) {
              // alert('修改成功!');
            }
          })
        }
      }
    }
  }
  document.getElementById('file').addEventListener('change', handleFileSelect, false);

  //标签删除
  $scope.deleteTag = function(id) {
    $http({
      method: "delete",
      url: api_url + '/tag/teacher',
      data: { "id": [id] },
      headers: { "Content-Type": "application/json;charset=utf-8" }
    }).success(function(data) {
      if (!data.status) {
        $scope.getTeacherTag();
      }
    })
  }

  //年级标签摸态框
  $scope.modalGrade = function() {
    $scope.myModal = true;
    $scope.tagModal = true;
    $scope.gradeModal = true;

    $scope.choosenTagIds = [];
    $scope.chooseTagIds = [];

    angular.forEach($scope.teacherTags, function(ele) {
      $scope.choosenTagIds.push(ele.tagId);
      if ($scope.choosenTagIds.indexOf(ele.parentTagId) == -1) {
        $scope.choosenTagIds.push(ele.parentTagId);
      }
    })

    $scope.chooseTagIds = $scope.chooseTagIds.concat($scope.choosenTagIds);
  }

  $scope.chooseTag = function(id, parentId) {
    if ($scope.choosenTagIds.indexOf(id) != -1) return;
    $scope.tagIdx = $scope.chooseTagIds.indexOf(id);
    if ($scope.tagIdx == -1) {
      $scope.chooseTagIds.push(id);
      $scope.chooseTagIds.push(parentId);
    } else {
      $scope.chooseTagIds.splice($scope.tagIdx, 1);
      $scope.parentIdx = $scope.chooseTagIds.indexOf(parentId);
      $scope.chooseTagIds.splice($scope.parentIdx, 1);
    }
  }

  //课程标签摸态框
  $scope.modalCourse = function() {
    $scope.myModal = true;
    $scope.tagModal = true;
    $scope.gradeModal = false;

    $scope.choosenCourseIds = [];
    $scope.chooseCourseIds = [];

    angular.forEach($scope.courseTags, function(ele) {
      $scope.choosenCourseIds.push(ele.tagId);
    })

    $scope.chooseCourseIds = $scope.chooseCourseIds.concat($scope.choosenCourseIds);
  }

  $scope.chooseCourse = function(id) {
    if ($scope.choosenCourseIds.indexOf(id) != -1) return;
    $scope.CourseIdx = $scope.chooseCourseIds.indexOf(id);
    if ($scope.CourseIdx == -1) {
      $scope.chooseCourseIds.push(id);
    } else {
      $scope.chooseCourseIds.splice($scope.CourseIdx, 1);
    }
  }

  //数组去重
  $scope.unique = function(arr) {
    $scope.n = {};
    $scope.tempArr = []; //n为hash表，r为临时数组
    for (var i = 0; i < arr.length; i++) //遍历当前数组
    {
      if (!$scope.n[arr[i]]) //如果hash表中没有当前项
      {
        $scope.n[arr[i]] = true; //存入hash表
        $scope.tempArr.push(arr[i]); //把当前数组的当前项push到临时数组里面
      }
    }
    return $scope.tempArr;
  }

  $scope.confirm = function() {
    if ($scope.gradeModal) {
      $scope.unique($scope.chooseTagIds);
      angular.forEach($scope.choosenTagIds, function(element) {
        $scope.tempArrIdx = $scope.tempArr.indexOf(element);
        if ($scope.tempArrIdx != -1) {
          $scope.tempArr.splice($scope.tempArrIdx, 1);
        }
      })
      $http.post(api_url + '/tag/teacher', {
        "tagId": $scope.tempArr,
        "tid": [$scope.tid]
      }).success(function(data) {
        if (!data.status) {
          $scope.hideModal();
          $scope.getTeacherTag();
        }
      })
    } else {
      $http.post(api_url + '/tag/teacher', {
        "tagId": $scope.chooseCourseIds.splice($scope.choosenCourseIds.length),
        "tid": [$scope.tid]
      }).success(function(data) {
        if (!data.status) {
          $scope.hideModal();
          $scope.getTeacherTag();
        }
      })
    }
  }

}]);


//密码设置
app.controller("password", ['$scope', '$http', function($scope, $http) {
  $scope.submit = function() {
    if ($scope.newPassword && !/^\w{6,20}$/.test($scope.newPassword)) {
      alert('密码长度应在6-20位之间');
    }
    if (!$scope.oldPassword || !$scope.newPassword || $scope.newPassword != $scope.rePassword) {
      alert('请填写完整信息');
      return;
    }
    //md5加密一击
    $scope.md5oldPwd = hex_md5($scope.oldPassword);
    $scope.md5oldPwd = $scope.md5oldPwd.split('');
    $scope.md5oldPwd[5] = $scope.oldPassword.charAt(0);
    $scope.md5oldPwd[10] = $scope.oldPassword.charAt(1);
    $scope.md5oldPwd[15] = $scope.oldPassword.charAt(2);

    $scope.md5newPwd = hex_md5($scope.newPassword);
    $scope.md5newPwd = $scope.md5newPwd.split('');
    $scope.md5newPwd[5] = $scope.newPassword.charAt(0);
    $scope.md5newPwd[10] = $scope.newPassword.charAt(1);
    $scope.md5newPwd[15] = $scope.newPassword.charAt(2);

    $http.put(api_url + '/changePassword', {
      "oldpassword": $scope.md5oldPwd.join(''),
      "newpassword": $scope.md5newPwd.join('')
    }).success(function(data) {
      if (!data.status) {
        alert('修改成功!');
        $scope.oldPassword = '';
        $scope.newPassword = '';
        $scope.rePassword = '';
      }
    })

  }


}]);


//账户管理
app.controller("account", ['$scope', '$http', function($scope, $http) {
  $http.get(api_url + '/account/statistics')
    .success(function(data) {
      $scope.account = data;
    })

}]);
