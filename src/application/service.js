var myService = angular.module("myServices", ['myFilter']);

//注册服务
myService.factory('mxxServices', ['$rootScope', '$location', '$http', '$window', function($rootScope, $location, $http, $window) {
  var mxxServices = {
    //生成二维码
    qrCode: function(element, url) {
      //var url="http://institu.mstudy.me/wechat/index?iid="+sid+"#/classaction/"+cid;
      element.qrcode({
        render: "canvas", //设置渲染方式  
        width: 140,
        height: 140,
        correctLevel: 0,
        text: url
      });
    },

    loginQrcode: function(element, url) {
      element.qrcode({
        render: "canvas", //设置渲染方式  
        width: 200,
        height: 200,
        correctLevel: 0,
        text: url
      });
    },

    getClassInfo: function(sco) {
      //获取班级信息
      $http.get(api_url + "/class/info?cid=" + sco.cid)
        .success(function(data) {
          sco.password = data.password;
          sco.className = data.className;
          sco.limit = data.maxNumber;
          sco.classNum = data.userNumber;
          sco.createSid = data.sid;
          sco.isPumping = data.isPumping || 0;
          // console.log(sco.isPumping);
          // sco.url = data.qrCode;data.isPumping
        })
    },

    //显示班级二维码
    showClass2WM: function(sco) {
      sco.url = "http://www.maixuexi.cn/student/#/my/class/all/" + sco.cid;
    },

    getPaperData: function(sco) {
      //第一步：获取之前编辑过得试卷信息
      $http.get(api_url + "/test/paper/preview?pid=" + sco.pid)
        .success(function(data) {
          if (!data.status) {
            // $http.get(api_url + "/paper/preview/" + sco.pid).success(function(data) {
            //   if (!data.ret) {
            sco.paper = data.paper;
            sco.questions = data.questions;
            if (data.stem) {
              sco.stems = data.stem;
            }
            sco.isFinish = data.paper.isFinish;
            sco.tid = data.paper.ownerTid;
            sco.classes=[100674,100675,100676,100677,100678,100679];
            if(sco.classes.indexOf(sco.tid)!=-1){
              sco.showShareQuestionBox = true;
            }
            // console.log('1111',sco.isFinish,sco.showShareQuestionBox);
            //将paper中的相关数据整合进question中
            if (sco.paper.paperStructJson && sco.paper.paperStructJson.length != 0) {
              //存选项``
              sco.ans = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
              for (var i = 0; i < sco.paper.paperStructJson.length; i++) {
                if (sco.paper.paperStructJson[i].mid) {
                  //复合题
                  // var reg=/^\<img[*]\>$/;
                  var reg = /<img[^>]*>/gi;
                  var imgArr = sco.questions[i].mContent.match(reg);

                  if (imgArr) {
                    for (var k = 0; k < imgArr.length; k++) {
                      var startIndex = imgArr[k].indexOf('_src="');
                      var endIndex = imgArr[k].indexOf('"', startIndex + 6);
                      if (imgArr[k].indexOf("vedio") != -1) {
                        sco.questions[i]['vedio_url'] = imgArr[k].substring(startIndex + 6, endIndex)+'?v=1002';
                        sco.questions[i].mContent = sco.questions[i].mContent.replace(imgArr[k], '');
                      }
                      if (imgArr[k].indexOf("mp3") != -1) {
                        sco.questions[i]['audio_url'] = imgArr[k].substring(startIndex + 6, endIndex);
                        sco.questions[i].mContent = sco.questions[i].mContent.replace(imgArr[k], '');
                      }
                    }
                  };

                  var mid = sco.paper.paperStructJson[i][mid];
                  var resolves = sco.stems[mid];
                  if (!resolves) { resolves = [] };
                  for (var j = 0; j < resolves.length; j++) {
                    var resolveToArray = []
                    for (key in resolves[j].qResolve) {
                      resolveToArray.push(key);
                    }
                    if (resolveToArray.length == 0) {
                      resolves[j].qResolve = '';
                    }
                  }
                } else {
                  //非复合题
                  var resolveToArray = [];
                  // if (sco.questions[i] && sco.questions[i].qResolve) {
                  for (key in sco.questions[i].qResolve) {
                    resolveToArray.push(key);
                  }
                  // }

                  if (resolveToArray.length == 0) {
                    sco.questions[i].qResolve = '';
                  }
                }
              };
            };

          }
        });
    }

  };
  return mxxServices;

}]);

//工具类
myService.factory('toolServices', [function() {
  var tools = {
    /**
     * 获取对象的所有key返回list数组
     * @obj Object 要获取key的对象
     */
    'getKeys': function(obj) {
      var list = new Array();
      angular.forEach(obj, function(value, index, data) {
        list.push(index);
      })
      return list;
    },
    //生成一个任意位的随机数
    getRandomNum: function(min, max) {
      var range = max - min;
      var random = Math.random();
      return (min + Math.round(random * range));
    }
  };

  return tools;
}])

//班级基本信息
myService.directive('classInfo', [function() {
  return {
    restict: 'AE',
    replace: true,
    templateUrl: './views/directive/classInfo.html'
  };
}]);

//试卷结构   预览   微信预览   导出word
myService.directive('paperStruct', [function() {
  return {
    restict: 'AE',
    replace: true,
    templateUrl: './views/directive/paperStruct.html'
  };
}]);


//班级课代表二维码
myService.directive('monitor', ['$http', 'mxxServices', '$timeout', function($http, mxxServices, $timeout) {
  return {
    restict: 'AE',
    replace: true,
    templateUrl: './views/directive/monitor.html',
    link: function(scope, ele, attrs) {
      //查询指定班级的课代表
      // $http.get(api_url + "/class/teacher/tutor?cid=" + scope.cid + "&tid=" + scope.tid)
      //   .success(function(data) {
      //     if (!data.status) {
      //       scope.monitorlist = data.tutorList; //班级课代表反序排列
      //       if (data.count) {
      //         $timeout(function() {
      //           for (var i = 0; i < scope.monitorlist.length; i++) {
      //             var url = "http://www.maixuexi.cn/student/#/tutor/" + scope.monitorlist[i].tutorId;
      //             imgCode = $($(".imgcode")[i]);

      //             mxxServices.qrCode(imgCode, url);

      //           };
      //         }, 500)
      //       }
      //     }

      //   });
    }
  }
}]);


//学生作业统计表
myService.directive('achive', ['$http', function($http) {
  return {
    restict: 'AE',
    templateUrl: './views/directive/stat.html',
    link: function(scope, ele, attrs) {
      //学生作业提交的记录
      scope.update = function(wid) {
        $http.get(api_url + "/student/class/work/report?studentId=" + scope.uid + "&workId=" + wid)
          .success(function(data) {
            if (!data.status) {
              scope.workInfo = data;
              scope.userQuesList = data.questionList;
            }
          })
      }

      //&number=5 暂时写死！获取最近五次作业分数
      $http.get(api_url + "/student/class/score?studentId=" + scope.uid + "&cid=" + scope.cid + "&number=5")
        .success(function(data) {
          scope.worklist = data.scoreList;

          if (scope.worklist.length != 0) { //为0取反
            var userScore = []; //用户得分
            var avgScore = []; //班级平均分
            var getTime = []; //取卷时间

            function mdFormat(date) {
              // var timeNum = parseInt(date);
              // var time = new Date(timeNum);
              var time = new Date(date);
              var month = time.getMonth() + 1;
              var day = time.getDate();
              var hours = time.getHours();
              var minutes = time.getMinutes();
              //如果小于10就在前面补上"0";
              if (month < 10) { month = "0" + month; }
              if (day < 10) { day = "0" + day }
              if (hours < 10) { hours = "0" + hours }
              if (minutes < 10) { minutes = "0" + minutes }
              var date = month + "/" + day + " " + hours + ":" + minutes;
              return date;
            }

            for (var i = 0; i < scope.worklist.length; i++) {
              userScore.push(scope.worklist[i].score);
              avgScore.push(scope.worklist[i].avgScore);
              //格式化日期
              // scope.worklist[i].getTime = mdFormat(scope.worklist[i].getTime);
              getTime.push(scope.worklist[i].submitTime);
            }
            $('#achive').highcharts({
              exporting: {
                enabled: false
              },

              chart: {
                type: 'spline'
              },
              title: {
                text: '<span style="color:#009234">成绩得分</span>/<span style="color:#bdbdbd">班级平均分</span>',

              },
              xAxis: {
                //时间轴
                categories: getTime
              },
              yAxis: {
                title: {
                  text: ''
                }
              },
              tooltip: {
                crosshairs: true,
                shared: true
              },
              plotOptions: {},
              series: [{
                name: '成绩得分',
                color: '#009234',
                data: userScore
              }, {
                name: '班级平均分',
                color: '#bdbdbd',
                data: avgScore
              }]
            });
          } else {
            $("#achive").html('<p class="norecord">该学生尚无作业提交记录</p>');
            $(".paper-info").css("display", "none")
          }

        })

      //获得学生所有作业
      $http.get(api_url + "/work/class/student/finish?cid=" + scope.cid + '&studentId=' + scope.uid + "&page=1&size=9999")
        .success(function(data) {
          if (!data.status) {
            scope.count = data.count;
            scope.allWorkList = data.workList;
            if(scope.count){
              scope.work = scope.allWorkList[0];
              scope.update(scope.allWorkList[0].workId);
            } else {
              // console.log('该学生并无作业')
              return;
            }
          }
        })
    }
  };
}]);


//班级wid作业统计表
myService.directive('stat', ['$http', function($http) {
  return {
    restict: 'AE',
    template: '<div class="stat" id="stat"></div>',
    link: function(scope, ele, attrs) {
      $http.get(api_url + "/work/question/answer?workId=" + scope.wid)
        .success(function(data) {
          var ans = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]; //答案选项
          if (!data.status) {
            scope.load = false;
            var $stat = $("#stat");
            //循环data
            var i = 0;
            $.each(data.workList, function(key, obj) {
              if (obj.keyList.length != 0) {
                var str = '<div class="stat-img" id="stat-' + i + '"></div>';
                $stat.append(str);
                var isObjQues = obj.qType == 1 ? "客观题" : "主观题";

                //选项
                var options = [];
                for (var j = 0; j < obj.keyList.length; j++) {
                  if (obj.qType == 1) {
                    //客观题  转成ABCD...选项
                    var index = obj.keyList[j].key;
                    options.push(ans[index]);
                  } else {
                    var index = obj.keyList[j].key;
                    options.push(index);
                  };

                };
                var selectNum = [];
                for (var j = 0; j < obj.keyList.length; j++) {
                  selectNum.push(obj.keyList[j].value);

                };
                if (obj.qType == 1) {
                  var answer = '';
                  // obj.qAnswer = JSON.parse(obj.qAnswer);
                  for (var k = 0; k < obj.qAnswer.length; k++) {
                    var index = obj.qAnswer[k];
                    answer += ans[index]
                  }
                  //客观题才有正确答案
                  var subtitle = "正确答案: " + answer;
                } else {
                  var subtitle = '主观题无标准答案';
                }
                //x轴是选项
                //y轴是选某一项的人数
                $('#stat-' + i).highcharts({ //图表展示容器，与div的id保持一致
                  chart: {
                    type: 'column' //指定图表的类型，默认是折线图（line）
                  },
                  title: {
                    text: obj.qNumber + '(' + isObjQues + obj.score + '分)' //指定图表标题
                  },
                  subtitle: {
                    text: subtitle
                  },
                  xAxis: {
                    categories: options, //指定x轴分组
                    crosshair: true
                  },
                  yAxis: {
                    title: {
                      text: '人数' //指定y轴的标题
                    }
                  },
                  series: [{ //指定数据列
                    name: '统计', //数据列名
                    data: selectNum //数据
                  }]
                });

                i++;
              } else {
                $("#stat").html('<p class="norecord">此次作业目前尚无人提交!</p>');
              }

            })
          }
        })
    }
  };
}]);

myService.directive('userTop', ['$http', '$cookieStore', function($http, $cookieStore) {
  return {
    restict: 'AE',
    replace: true,
    templateUrl: './views/directive/userTop.html',
    link: function(scope, ele, attrs) {
      scope.userInfo = $cookieStore.get('user');

      //退出时清除cookie
      $(".logout").click(function() {
        $cookieStore.remove("loginTime");
      })
    }
  };
}]);

//二维码
myService.directive('qrcode', ['mxxServices', function(mxxServices) {
  return {
    restict: 'AE',
    transclude: true,
    template: '<div class="qrCode"><div id="imgCode"></div><p>班级二维码</p></div>',
    link: function(scope, ele, attrs) {
      $("#imgCode").qrcode({
        render: "canvas", //设置渲染方式  
        width: 140,
        height: 140,
        correctLevel: 0,
        text: scope.url
      });
    }
  };
}]);

myService.directive('dialog', ['$http', '$location', 'mxxServices', function($http, $location, mxxServices) {
  return {
    restict: 'AE',
    templateUrl: './views/directive/dialog.html',
    link: function(scope, ele, attrs) {

      //鼠标经过操作按钮时触发
      scope.mouse = {
        mouseover: function() {
          $(".handle-menu").css("display", "block")
        },
        mouseout: function() {
          $(".handle-menu").css("display", "none")
        }
      };

      scope.localWork = function() {
        scope.paperName = "";
        scope.selectedTagIds = [];
        scope.paperlist = [];
        //标签列表
        $http.get(api_url + "/tag/test/paper/list?page=1&size=99999")
          .success(function(data) {
            scope.tagList = data.tagList;
          });

        //一开始获取全部敲定试卷
        $http.get(api_url + "/test/paper/teacher?page=1&size=99999")
          .success(function(data) {
            scope.paperlist = [];
            // scope.paperlist = data.paperList;
            if (!data.paperList || data.paperList.length == 0) {
              scope.tip = true;
            } else {
              scope.tip = false;
              for (var i = 0; i < data.paperList.length; i++) {
                if (data.paperList[i].isFinish == 1) {
                  scope.paperlist.push(data.paperList[i])
                }
              }
            }
          });

        $(".paper-modal").css("display", "block");
        $(".mask").css("display", "block")
      };

      //关闭遮罩层
      scope.cancel = function() {
        $(".paper-modal").css("display", "none");
        $(".mask").css("display", "none")
      };

      //选择标签 显示试卷列表
      scope.selectTag = function(id) {
        scope.checked = {};
        var index = scope.selectedTagIds.indexOf(id);
        if (index == -1) {
          scope.selectedTagIds.push(id)
        } else {
          scope.selectedTagIds.splice(index, 1);
        }

        if (scope.selectedTagIds.length == 0) {
          // 获取全部敲定试卷
          $http.get(api_url + "/test/paper/teacher?page=1&size=99999")
            .success(function(data) {
              scope.paperlist = [];
              // scope.paperlist = data.paperList;
              if (!data.paperList || data.paperList.length == 0) {
                scope.tip = true;
              } else {
                scope.tip = false;
                for (var i = 0; i < data.paperList.length; i++) {
                  if (data.paperList[i].isFinish == 1) {
                    scope.paperlist.push(data.paperList[i])
                  }
                }
              }
            });
          return
        }

        $http.get(api_url + "/tag/test/paper?tagId=[" + scope.selectedTagIds + "]&page=1&size=99999")
          .success(function(data) {
            scope.paperlist = [];
            // scope.paperlist = data.paperList;
            if (!data.paperList || data.paperList.length == 0) {
              scope.tip = true;
            } else {
              scope.tip = false;
              for (var i = 0; i < data.paperList.length; i++) {
                if (data.paperList[i].isFinish == 1) {
                  scope.paperlist.push(data.paperList[i])
                }
              }
            }
          });
      }

      //搜索已敲定试卷列表
      /*scope.search = function() {
        if (!scope.paperName) {
          alert("请输入试卷名!");
          return;
        }
        $http.put(api_url + "/test/paper/search?page=1&size=99999", {
          "paperName": scope.paperName
        }).success(function(data) {
          scope.paperlist = []; //提取已敲定试卷列表
          for (var i = 0; i < data.paperList.length; i++) {
            if (data.paperList[i].isFinish == 1) {
              scope.paperlist.push(data.paperList[i])
            }
          }
        })
      };*/
      scope.checked = {};
      scope.oneCheck = function(pid) {
        if (scope.checked[pid]) {
          scope.checked = {};
        } else {
          scope.checked = {};
          scope.checked[pid] = true;
        }
      };
      scope.confirm = function() {
        var arr = [];
        for (key in scope.checked) {
          arr.push(key);
        };

        if (arr.length == 0) {
          alert("请选择习题!");
        } else {
          $(".mtk-import-info").css("display", "none");
          $(".paper-modal").css("display", "none");
          $(".edui-container").css("display", "none");
          $(".mask").css("display", "none")
          $(".mtk-contenter").css("display", "block");
          $(".test-tag-list").css("display", "none");
          $(".mtk-info").css("display", "block");

          $http.get(api_url + "/test/paper/preview?pid=" + arr[0])
            .success(function(data) {
              if (!data.status) {
                $(".left-input p").css("display", "block");
                scope.paperInfo = data.paper;
                scope.paperInfo.score = parseInt(scope.paperInfo.objScore) + parseInt(scope.paperInfo.subScore);
                scope.localPaperName = data.paper.paperName;
                scope.localPaper = data.questions;
                if (data.stem) {
                  scope.localStems = data.stem;
                };

                //每道试题标签列表
                $http.get(api_url + "/tag/test/question/achieve/paper?pid=" + arr[0])
                  .success(function(res) {
                    if (!res.status) {
                      angular.forEach(res.questions, function(ele) {
                        angular.forEach(scope.localPaper, function(element) {
                          if (ele.qid && element.qid && ele.qid === element.qid) {
                            element['tagList'] = ele.tagList;
                          }
                        })
                      })
                      if (res.stem) {
                        for (var k in res.stem) {
                          angular.forEach(scope.localStems[k], function(ele) {
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

                if ($(".qrcode").children()) {
                  $(".qrcode").empty();
                }

                //生成手机端试卷地址的二维码
                var url = "http://www.maixuexi.cn/phone/#/preview/" + arr[0];
                //目标元素
                mxxServices.qrCode($(".qrcode"), url);

                if (scope.paperInfo.paperStructJson && scope.paperInfo.paperStructJson.length != 0) {
                  //存选项
                  scope.ans = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
                  /*for (var i = 0; i < scope.paperInfo.paperStruct.length; i++) {
                    if (scope.localPaper[i]) { //可能返回为空
                      scope.localPaper[i].isComposite = scope.paperInfo.paperStruct[i].isComposite;
                    }
                  };*/
                };
              }
            });
        }
      };

      //选择试题
      scope.localTest = function() {
        scope.localPaper = [];
        scope.localStems = {};
        //标签列表
        $http.get(api_url + "/tag/test/question/list?page=1&size=99999")
          .success(function(data) {
            scope.testTagList = data.tagList;
            scope.selectedTestTagIds = [];

            $(".mtk-import-info").css("display", "none");
            $(".mtk-info").css("display", "none");
            $(".left-input p").css("display", "none");
            $(".test-tag-list").css("display", "block");
            $(".edui-container").css("display", "none");
            $(".mtk-contenter").css("display", "block");
          });
      }

      //选择标签 显示试卷列表
      scope.selectTestTag = function(id) {
        var index = scope.selectedTestTagIds.indexOf(id);
        if (index == -1) {
          scope.selectedTestTagIds.push(id)
        } else {
          scope.selectedTestTagIds.splice(index, 1);
        }

        if (scope.selectedTestTagIds.length == 0) {
          scope.localPaper = [];
          scope.localStems = {};
          scope.testTip = false;
          return
        }

        $http.get(api_url + "/tag/test/question?tagId=[" + scope.selectedTestTagIds + "]")
          .success(function(data) {
            if (data.count == 0) {
              scope.testTip = true;
              scope.localPaper = [];
              scope.localStems = {};
            } else {
              scope.testTip = false;
              scope.localPaper = data.questions;
              if (data.stem) {
                scope.localStems = data.stem;
              };

              // if (scope.paperInfo.paperStructJson && scope.paperInfo.paperStructJson.length != 0) {
              //存选项
              scope.ans = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
              /*for (var i = 0; i < scope.paperInfo.paperStruct.length; i++) {
                if (scope.localPaper[i]) { //可能返回为空
                  scope.localPaper[i].isComposite = scope.paperInfo.paperStruct[i].isComposite;
                }
              };*/
              // };
            }

          });
      }

    }
  };
}]);

//班级基本信息
myService.directive('uploader', ['$location', '$rootScope', '$http', function($location, $rootScope, $http) {
  return {
    restict: 'AE',
    scope: true,
    templateUrl: './views/directive/uploader.html',
    link: function(scope, ele, attrs) {
      //返回上一步
      scope.forward = function() {
        // window.history.go(-1);
        //返回到录入试卷名的页面
        $location.path("/paper/name/" + scope.pid)
      };
      scope.ans = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
      //预览试卷
      scope.preview = function() {
        $dt = $("#test dt");
        var len = $("#test dt").length;
        if (len == 0) {
          alert("请先录题...");
          return;
        };
        //判断$("#test dt")的长度
        for (var i = 0; i < len; i++) {
          var $this = $($dt[i]); //转成jquery对象
          var type = $this.attr('data-type');
          if (type != 3) { //非复合题
            if ($this.find("input[attr='score']").val() == '') {
              alert("第" + (i + 1) + "题的分数不能为空!");
              $.pinput.handle.jumpOrder(i + 1);
              return;
            };
            if ($this.find("div[attr='title']").html() == '') {
              alert("请填写第" + (i + 1) + "的内容");
              $.pinput.handle.jumpOrder(i + 1);
              return;
            };
            if (type == 1) { //只有主观题存在正确选项
              //console.log($this.find(".correct").length);
              if ($this.find(".correct").length == 0) {
                alert("请勾选第" + (i + 1) + "的正确选项");
                $.pinput.handle.jumpOrder(i + 1);
                return;
              }
              for (var j = 0; j < $this.find(".answer").length; j++) {
                if ($this.find(".answer")[j].innerHTML == "") {
                  alert("请填写第" + (i + 1) + "的" + scope.ans[j] + "选项");
                  $.pinput.handle.jumpOrder(i + 1);
                  return;
                }
              }
            }
          };
          if (type == 3) {
            //console.log($this.find("div[attr='material']").html());
            if ($this.find("div[attr='material']").html() == '') {
              alert("请填写第" + (i + 1) + "的复合题材料");
              $.pinput.handle.jumpOrder(i + 1);
              return;
            };
            //console.log($this.find(".pinput-item-question .pinput-question").attr("data-type"));                       

            var $items = $this.find(".pinput-item-boder");
            //console.log($items);
            if ($items.length == 0) {
              alert("第" + (i + 1) + "题还未录完");
              $.pinput.handle.jumpOrder(i + 1);
              return;
            }
            for (var j = 0; j < $items.length; j++) {
              var _this = $($items[j]);
              var qtype = _this.find(".pinput-item-main .pinput-question").attr("data-type");
              //循环内层
              //console.log(qtype);
              //console.log(_this.find("input[attr='score']").val());
              if (_this.find("input[attr='score']").val() == '') {
                alert("第" + (i + 1) + '-' + (j + 1) + "题的分数不能为空!");
                $.pinput.handle.jumpOrder(i + 1);
                return;
              };
              if (_this.find("div[attr='title']").html() == '') {
                alert("请填写第" + (i + 1) + '-' + (j + 1) + "的内容");
                $.pinput.handle.jumpOrder(i + 1);
                return;
              };
              if (qtype == 1) {
                if (_this.find(".correct").length == 0) {
                  alert("请勾选第" + (i + 1) + '-' + (j + 1) + "的正确选项")
                  $.pinput.handle.jumpOrder(i + 1);
                  return;
                }
                console.log(_this.find(".answer"))
                for (var k = 0; k < _this.find(".answer").length; k++) {
                  if (_this.find(".answer")[k].innerHTML == "") {
                    alert("请填写第" + (i + 1) + '-' + (j + 1) + "的" + scope.ans[k] + "选项");
                    $.pinput.handle.jumpOrder(i + 1);
                    return;
                  }
                }
              }
            }

          };

        };

        $location.path("/paper/preview/" + scope.pid);

      };

      if ($location.path().indexOf("paper/edit/") == -1) {
        //判断用户之前是否上传过word
        $http.get(api_url + "/test/paper/preview?pid=" + scope.pid)
          .success(function(data) {
            if (data.paper.word) {
              $("#redactor_modal_overlay").css("display", "block");
              $.ajax({
                type: "GET",
                url: "http://218.244.140.132/" + data.paper.word,
                success: function(msg) {
                  $(".mtk-import-info").css("display", "none");
                  $(".mtk-contenter").css("display", "none");

                  var um = UM.getEditor('self-editor');
                  um.ready(function() {
                    //隐藏上传进度条
                    $("#redactor_modal_overlay").css("display", "none");
                    um.setContent(msg);
                  });
                }
              })
            }
          });

        //实例化上传插件
        window.uploader = new plupload.Uploader({
          browse_button: 'pickfiles', //指定上传按钮id
          file_data_name: 'file',
          url: 'http://218.244.140.132:9000/doc2Html', //上传url
          filters: {
            mime_types: [
              { title: 'word file', extensions: "doc,docx" } //定义文件后缀名
            ],
            prevent_duplicates: true, //不能上传重复文件
          },
          multipart: true //为true时候以multipart/form-data  否则以二进制上传
        });
        uploader.init(); //初始化

        //选择完文件触发
        uploader.bind('FilesAdded', function(uploader, files) {

          uploader.start(); //开始上传

          $("#redactor_modal_overlay").css("display", "block");
          //添加遮罩层
          // $("#box").css("opacity", 0.3);
          // $("#box").bind("click", function() {
          //     return false;
          // });
        });

        uploader.bind('UploadProgress', function(uploader, file) {
          //我们可以利用这些参数提供的信息来做比如更新UI，提示上传进度等操作
          //console.log(file.percent);
          $(".loading-info").html(file.percent + '%');
        });

        //上传完成
        uploader.bind('FileUploaded', function(uploader, file, res) {
          //上传完成后隐藏遮罩层
          $(".loading-info").html("waiting");

          var resp = JSON.parse(res.response);

          if (file.name.indexOf(".docx") != -1) {
            var doctype = "docx";
          } else {
            var doctype = "doc";
          }

          if (resp.is_exist == -1) {
            $.ajax({
              type: "POST",
              url: "http://218.244.140.132:9000/doc2Html/conver/" + resp.md5 + "/" + doctype,
              success: function(msg) {
                $(".mtk-import-info").css("display", "none");
                $(".mtk-contenter").css("display", "none");
                $.ajax({
                  type: "GET",
                  url: "http://218.244.140.132/" + resp.path,
                  success: function(msg) {
                    $(".mtk-import-info").css("display", "none");
                    $(".mtk-contenter").css("display", "none");

                    var um = UM.getEditor('self-editor');

                    um.ready(function() {
                      //隐藏上传进度条
                      $("#redactor_modal_overlay").css("display", "none");
                      um.setContent(msg);
                      //上传成功后修改试卷结构
                      $http.put(api_url + "/test/paper", {
                        "pid": parseInt(scope.pid),
                        "word": resp.path
                      }).success(function(data) {
                        //console.log(data);
                      })
                    });
                  }
                })
              }
            });
          } else {
            $.ajax({
              type: "GET",
              url: "http://218.244.140.132/" + resp.path,
              success: function(msg) {
                $(".mtk-import-info").css("display", "none");
                $(".mtk-contenter").css("display", "none");

                var um = UM.getEditor('self-editor');

                um.ready(function() {

                  //隐藏上传进度条
                  $("#redactor_modal_overlay").css("display", "none");
                  um.setContent(msg);
                  //上传成功后修改试卷结构
                  $http.put(api_url + "/test/paper", {
                    "pid": parseInt(scope.pid),
                    "word": resp.path
                  }).success(function(data) {
                    //console.log(data);
                  })
                });
              }
            })
          }
        })


      }

    }
  };
}]);

/*批改页面插件加载和回调操作*/
myService.directive('correctFooter', [function() {
  return {
    restict: 'AE',
    replace: true,
    templateUrl: './views/work/correctFooter.html',
    controller: 'workcorrect',
    link: function() {

    }
  };
}]);

//指令里面可以注入服务
//tab切换指令
myService.directive('myTab', ["$rootScope", "mxxServices", "$location", function($rootScope, mxxServices, $location) {
  return {
    restrict: 'AE',
    replace: true,
    templateUrl: './views/directive/aside.html',
    link: function(scope, ele, attrs) {
      if ($rootScope.location.indexOf("/index") != -1) {
        $(".sidebar li .index").addClass("selected");
      }
      if ($rootScope.location.indexOf("/class/") != -1) {
        $(".sidebar li .manger-class").addClass("selected");
      }
      if ($rootScope.location.indexOf("/paper/") != -1) {
        $(".sidebar li .manger-paper").addClass("selected");
      }
      if ($rootScope.location.indexOf("/work/") != -1) {
        $(".sidebar li .set-test").addClass("selected");
      }
      if ($rootScope.location.indexOf("/setting") != -1) {
        $(".sidebar li .set-system").addClass("selected");
      }
    }
  }
}]);


//分页指令
myService.directive('pagination', ['mxxServices', '$http', function(mxxServices, $http) {
  return {
    restrict: 'AE',
    replace: true,
    templateUrl: './views/directive/pagination.html',
    link: function(scope, ele, attrs) {
      //分页功能
      scope.next = function() { //下一页
        if (scope.currentPage < scope.num) {
          scope.currentPage++;
          scope.getData();
        }
      };
      scope.prev = function() { //上一页                 
        if (scope.currentPage > 1) {
          scope.currentPage--;
          scope.getData();
        }
      };
      scope.getData();
    }
  }
}]);


/*sunqisteven 批改服务*/
myService.factory("correctService", ["$http", function($http) {
  var correctService = {
    getWorkBaseInfo: function(workId) {
      // var api = api_url + "/check/base/" + workId;
      var api = api_url + "/correct/base?workId=" + workId;
      // if(window.location.hostname=="127.0.0.1"){ api = "/data/work.json";}

      var correctPromise = $http.get(api).then(function(res) {
        return res.data;
      })
      return correctPromise;
    },
    /*此服务停用*/
    /*getPaperInfo: function(pid) {
      var api = api_url + "/paper/" + pid;
      // var api = "/data/paper.json";
      console.info("start to request paper info by paperid")
      var paperPromise = $http.get(api).then(function(res) {
        return res.data;
      })
      return paperPromise;
    },*/
    /*此服务停用*/
    /*getQuestions: function(qids) {
      var api = api_url + "/question/list?qid=" + qids;
      var api = "/data/question.json";
      console.info('start to batch request questions info');
      var questionsPromise = $http.get(api).then(function(res) {
        return res.data;
      });
      return questionsPromise;
    },*/
    getCorrectInfoByqid: function(wid, qid) {
      // var api = api_url + "/ischeck/" + wid + "/" + qid;
      var api = api_url + "/correct/base/student?workId=" + wid + "&qid=" + qid;

      var q = $http.get(api).then(function(res) {
        res.data.studentList = res.data.studentList.concat(res.data.studentList2)
        return res.data;
      })
      return q;
    },
    getStudentQidInfo: function(wid, qid, studentId) {
      var api = api_url + "/answer?studentId=" + studentId + "&workId=" + wid + "&qid=" + qid;

      var q = $http.get(api).then(function(res) {
        return res.data;
      })
      return q;
    },
    submit: function(data) {
      // var api = api_url + "/answer/check";
      var api = api_url + "/answer/correct/crosshead";

      var q = $http.put(api, data).then(function(res) {
        return res.data;
      })
      return q;
    },
    /* 大保存 改变作业状态 */
    changeWorkStatus: function(wid,sendAll) {
      // var api = api_url + "/work/save/" + wid;
      var api = api_url + "/work/correct/finish";

      var q = $http.put(api, { 'workId': wid, 'sendAll': sendAll }).then(function(res) {
        return res.data;
      })
      return q;
    },
    preview: function(pid) {
      // var api = api_url + "/paper/preview/" + pid;
      var api = api_url + "/test/paper/preview?pid=" + pid;

      // if(window.location.hostname== "127.0.0.1") { api = "/data/preview.json";}

      var q = $http.get(api).then(function(res) {
        return res.data;
      });
      return q;
    },
    // showTip: function(message) {
    //   var bodyHeight = $("body").height();
    //   var tipBoxTop = bodyHeight / 2;
    //   var overLay = "<div id=\"zoomImageOverlay\" style=\"position:fixed;top:0;left:0;width:100%;" + "height:100%;background:black;opacity:0.75;text-align:center;z-index:9999;text-align:center;\"></div>" + "<div id=\"zoomImageBox\" style=\"width:100%;position:absolute;z-index:99999;top:0;left:0;\">" + "<div style=\"width:250px;height:60px;background:#fff;text-align:center;line-height:60px;position:relative;" + "margin:0 auto;border-radius:5px;font-size:18px;opacity:1;margin-top:" + tipBoxTop + "px\">" + "<span>" + message + "</span>" + "<span id=\"zoomImageBoxCloseBtn\" style=\"width:30px;height:30px;border-radius:15px;cursor:pointer;text-align:center;" + "line-height:30px;color:#FE8000;position:absolute;background:#fff;top:-25px;right:-25px;border:1px solid #fff;\">X</span>" + "</div>" + "</div>";　
    //   $("body").append(overLay).scrollTop(0);　　
    //   $("#zoomImageBoxCloseBtn").click(function() {
    //     $("#zoomImageBox").remove();
    //     $("#zoomImageOverlay").remove();　　
    //   })
    // },
    // 没别的原因,就是丑!
    /* util for finding a object by its unique identifier property among a array */
    findObjInArray: function(a, property, value) {
      for (var i = 0; i < a.length; i++) {
        if (a[i][property] == parseInt(value)) {
          return a[i];
        }
      }
    }

  }

  return correctService;

}]);
