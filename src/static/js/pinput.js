/* Version: 0.0.1
 * Requires: jQuery,jQuery ui
 */
(function(factory) {
  if (typeof define == 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['jquery'], factory);
  } else if (typeof exports == 'object') {
    // Node/CommonJS style for Browserify
    module.exports = factory;
  } else {
    // Browser globals
    factory(jQuery);
  }
}(function($) {

  //默认配置
  $.pinput = $.pinput || {
    // version: "0.0.1",
    version: "0.0.2", //大禹改的！

    ip_config: "http://115.29.177.200:8080",

    //接口api配置
    /*api_url: {
      'common': '/question',
      'composite': '/stem',
      'sub': '/question/item',
      'sort': '/paper',
      'save': '/question',
      'delCommon': '/question/',
      'delComposite': '/stem/',
      'delSub': '/question/item/',
      'version': '/teacher2question/version/'
    },*/

    ui: {
      //选择题
      'common': '<dt data-type="1"><div class="pinput-item-slide"><div class="pinput-item pinput-item-tit"><span class="tit">1.</span><span class="info">选择题</span></div>\
<div class="pinput-item pinput-item-opt"><a class="del" href="javascript:;"></a><a class="show" href="javascript:;"></a></div></div><div class="pinput-item-main"><div class="pinput-item-content">\
<ul class="pinput-item-ver"></ul>\
<div class="pinput-item-boder"><div class="pinput-problem"><div class="pinput-problem-info clearfix"><div class="pinput-problem-ico fl"></div><div class="score fr"><input maxlength="4" attr="score" value="0"></div></div><div class="title" contenteditable="true" attr="title"></div></div>\
<div class="pinput-answer"><ul class="common-ul"><li class="answer-li clearfix"><div class="choice fl"></div><div class="letter fl">A</div><div class="answer fl" contenteditable="true" attr="answer"></div><a class="del" href="javascript:;"></a></li><li class="answer-li clearfix"><div class="choice fl"></div><div class="letter fl">B</div><div class="answer fl" contenteditable="true" attr="answer"></div><a class="del" href="javascript:;"></a></li><li class="answer-li clearfix"><div class="choice fl"></div><div class="letter fl">C</div><div class="answer fl" contenteditable="true" attr="answer"></div><a class="del" href="javascript:;"></a></li><li class="answer-li clearfix"><div class="choice fl"></div><div class="letter fl">D</div><div class="answer fl" contenteditable="true" attr="answer"></div><a class="del" href="javascript:;"></a></li></ul>\
<div class="add-answer"><span class="txt1">+</span><span class="txt2">新增一条选项</span></div></div></div>\
<div class="pinput-item-analysis"><div class="tit">本题解析</div><div class="analysis">\
<ul class="analysis-ul"><li class="analysis-li qid-tag"><div class="tag-title">试题标签&nbsp;/&nbsp;</div><p class="fl add">+</p></li><li class="analysis-li clearfix"><div class="analysis-li1"><input type="text" maxlength="10" attr="analysis" value="本题解析"></div><div class="analysis-li2">/</div><div class="analysis-li3" contenteditable="true" attr="analysis"></div><a href="javascript:;" class="del"></a></li></ul>\
<div class="add-analysis"><span class="txt1">+</span><span class="txt2">新增一条解析</span></div></div></div></div></div></dt>',

      //主观题
      'short': '<dt data-type="2"><div class="pinput-item-slide"><div class="pinput-item pinput-item-tit"><span class="tit">2.</span><span class="info">主观题</span></div><div class="pinput-item pinput-item-opt"><a class="del" href="javascript:;"></a><a class="show" href="javascript:;"></a></div></div>\
<div class="pinput-item-main"><div class="pinput-item-content"><ul class="pinput-item-ver"></ul>\
<div class="pinput-item-boder"><div class="pinput-problem"><div class="pinput-problem-info clearfix"><div class="pinput-problem-ico fl"></div><div class="score fr"><input readonly></div></div><div class="title" contenteditable="true" attr="title"></div></div>\
<div class="pinput-answer"><ul class="short-ul"></ul>\
<div class="add-options"><li class="add-img bd" title="新增图片框"><div class="add-text1"><span class="add-text1-sign">+</span>图片框</div><div class="add-text2">(拍照答题)</div></li><li class="add-vedio bd" title="新增录音框"><div class="add-text1"><span class="add-text1-sign">+</span>录音框</div><div class="add-text2">(录音答题)</div></li>\
<li class="add-text bd" title="新增文本框"><div class="add-text1"><span class="add-text1-sign">+</span>文本框</div><div class="add-text2">(输入答题)</div></li><li class="add-position" title="新增填空项"><div class="add-text1"><span class="add-text1-sign">+</span>填空项</div><div class="add-text2">(填空答题)</div></li></div></div></div>\
<div class="pinput-item-analysis"><div class="tit">本题解析</div><div class="analysis"><ul class="analysis-ul"><li class="analysis-li qid-tag"><div class="tag-title">试题标签&nbsp;/&nbsp;</div><p class="fl add">+</p></li><li class="analysis-li clearfix"><div class="analysis-li1"><input type="text" maxlength="10" attr="analysis" value="本题解析"></div><div class="analysis-li2">/</div><div class="analysis-li3" contenteditable="true" attr="analysis"></div>\
<a href="javascript:;" class="del"></a></li></ul><div class="add-analysis"><span class="txt1">+</span><span class="txt2">新增一条解析</span></div></div></div></div></div></dt>',

      //复合题
      'composite': '<dt data-type="3"><div class="pinput-item-slide"><div class="pinput-item pinput-item-tit"><span class="tit">3.</span><span class="info">复合题</span></div><div class="pinput-item pinput-item-opt"><a class="del" href="javascript:;"></a><a class="show" href="javascript:;"></a></div></div>\
<div class="pinput-item-main"><div class="pinput-item-content"><ul class="pinput-item-ver"></ul>\
<div class="pinput-item-subject clearfix"><div class="fl add-media"><a class="vedio" href="javascript:;">视频</a><a class="mp3" href="javascript:;">音频</a></div><div class="fl edit-div subject" attr="material" contenteditable="true"></div></div>\
<div class="pinput-item-question"></div><div class="add-question"><div class="add-simple choice">选择题</div><div class="add-simple nochoice">非选择题</div></div></div></div></dt>',

      //复合自子题-选择
      'subCommon': '<div class="pinput-question"><div class="pinput-item-boder"><div class="pinput-problem"><div class="pinput-problem-info clearfix"><div class="pinput-problem-ico fl"></div>\
<div class="fl tit">3-1.</div> <a href="javascript:;" class="del"></a><div class="score fr"><input maxlength="4" attr="score" value="0"></div></div><div class="title" contenteditable="true" attr="title"></div></div>\
<div class="pinput-answer"><ul class="common-ul"><li class="answer-li clearfix"><div class="choice fl"></div><div class="letter fl">A</div><div class="answer fl" contenteditable="true" attr="answer"></div><a class="del" href="javascript:;"></a></li><li class="answer-li clearfix"><div class="choice fl"></div><div class="letter fl">B</div><div class="answer fl" contenteditable="true" attr="answer"></div><a class="del" href="javascript:;"></a></li><li class="answer-li clearfix"><div class="choice fl"></div><div class="letter fl">C</div><div class="answer fl" contenteditable="true" attr="answer"></div><a class="del" href="javascript:;"></a></li><li class="answer-li clearfix"><div class="choice fl"></div><div class="letter fl">D</div><div class="answer fl" contenteditable="true" attr="answer"></div><a class="del" href="javascript:;"></a></li></ul>\
<div class="add-answer"><span class="txt1">+</span> <span class="txt2">新增一条选项</span></div></div></div><div class="pinput-item-analysis"><div class="tit">本题解析</div><div class="analysis">\
<ul class="analysis-ul"><li class="analysis-li qid-tag"><div class="tag-title">试题标签&nbsp;/&nbsp;</div><p class="fl add">+</p></li><li class="analysis-li clearfix"><div class="analysis-li1"><input type="text" maxlength="10" attr="analysis" value="本题解析"></div><div class="analysis-li2">/</div><div class="analysis-li3" contenteditable="true" attr="analysis"></div><a href="javascript:;" class="del"></a></li></ul>\
<div class="add-analysis"><span class="txt1">+</span><span class="txt2">新增一条解析</span></div></div></div></div>',

      //复合自子题-主观
      'subShort': '<div class="pinput-question"><div class="pinput-item-boder"><div class="pinput-problem"><div class="pinput-problem-info clearfix"><div class="pinput-problem-ico fl"></div><div class="fl tit">3-2.</div>\
<a href="javascript:;" class="del"></a><div class="score fr"><input maxlength="4" readonly></div></div><div class="title" contenteditable="true" attr="title"></div></div><div class="pinput-answer"><ul class="short-ul"></ul><div class="add-options">\
<li class="add-img bd" title="新增图片框"><div class="add-text1"><span class="add-text1-sign">+</span>图片框</div><div class="add-text2">(拍照答题)</div></li>\
<li class="add-vedio bd" title="新增录音框"><div class="add-text1"><span class="add-text1-sign">+</span>录音框</div><div class="add-text2">(录音答题)</div></li><li class="add-text bd" title="新增文本框">\
<div class="add-text1"><span class="add-text1-sign">+</span>文本框</div><div class="add-text2">(输入答题)</div></li><li class="add-position" title="新增填空项"><div class="add-text1"><span class="add-text1-sign">+</span>填空项</div><div class="add-text2">(填空答题)</div></li></div></div></div>\
<div class="pinput-item-analysis"><div class="tit">本题解析</div><div class="analysis"><ul class="analysis-ul"><li class="analysis-li qid-tag"><div class="tag-title">试题标签&nbsp;/&nbsp;</div><p class="fl add">+</p></li><li class="analysis-li clearfix"><div class="analysis-li1"><input type="text" maxlength="10" attr="analysis" value="本题解析"></div>\
<div class="analysis-li2">/</div><div class="analysis-li3" contenteditable="true" attr="analysis"></div><a href="javascript:;" class="del"></a></li></ul><div class="add-analysis"><span class="txt1">+</span><span class="txt2">新增一条解析</span></div></div></div></div>',

      //主结构
      'main': '<div class="add-btn clearfix"><div class="add-new-common">新增选择题</div><div class="add-new-short">新增主观题</div><div class="add-new-composite">新增复合题</div></div>',

      //主观答题方式
      'reply': '<li class="answer-li answer-subject"><div class="letter">1.</div><div class="reply">[图片答题框]</div><div class="score"><input maxlength="4" attr="sscore"></div><a href="javascript:;" class="del"></a></li>',

      //主观题填空
      'position': '<li class="answer-li answer-subject"><div class="letter">1.</div><div class="reply reply-position"><input type="text" attr="position" placeholder="[请录入答案]" /></div><div class="score"><input maxlength="4" attr="sscore"></div><a href="javascript:;" class="del"></a></li>',

      //客观答题方式
      'choice': '<li class="answer-li clearfix"><div class="choice fl"></div><div class="letter fl">A.</div><div class="answer fl" contenteditable="true" attr="answer"></div><a class="del" href="javascript:;"></a></li>',

      //解析
      'analysis': '<li class="analysis-li clearfix"><div class="analysis-li1"><input type="text" maxlength="10" attr="analysis"></div><div class="analysis-li2">/</div><div class="analysis-li3" contenteditable="true" attr="analysis"></div><a href="javascript:;" class="del"></a></li>',

      //弹窗
      'vedio': '<div class="confirm-media add-vedio-input"><a href="javascript:;" class="close-media">X</a><p class="media-check-box"><span class="currency">通用代码</span><span class="qiniu">七牛云视频</span></p><p class="currency-address"><input value="" placeholder="请输入视频网站通用代码视频播放地址"><button type="button" class="currency-btn" media="vedio">确定</button></p><p class="qiniu-address"><input value="" placeholder="请输入七牛云视频地址,必须以http://或者https://开头"><button type="button" class="qiniu-btn" media="vedio">确定</button></p>\
</div>',
      // 'vedio': '<div class="confirm-media add-vedio-input"><a href="javascript:;" class="close-media">X</a><p><input value="" placeholder="请输入视频播放地址"><button type="button" media="vedio">确定</button></p><p class="remind">目前已支持<i>优酷网</i>&nbsp;<i>土豆网</i>&nbsp;<i>腾讯网</i>等视频网站的视频播放页通用代码</p>\
// <p class="warn" style="display: none;">提示:暂不支持该链接,请使用通用代码(复制第三方视频网页分享的通用代码)。</p></div>',
      'mp3': '<div class="confirm-media add-mp3-input"><a href="javascript:;" class="close-media">X</a><input value="" placeholder="请输入音频播放地址"><button type="button" class="mp3-btn" media="mp3">确定</button>\
<p class="warn" style="color: rgb(152, 152, 152);">提示:&nbsp;目前只支持mp3格式&nbsp;（例：http://······/name.mp3）。</p></div>'

    }
  };

  //$.pinput
  $.fn.pinput = function(object) {
    $.extend(true, $.pinput, object);
    $.pinput.handle.init(this);
  }

  var cookiesArr = document.cookie.split(";");
  for (var i = 0; i < cookiesArr.length; i++) {
    if (cookiesArr[i].indexOf("user") != -1) {
      var user = cookiesArr[i].split("=");
      var userInfo = JSON.parse(decodeURIComponent(user[1]));
      var tid = userInfo.tid;
      var token = userInfo.token;
    }
  };
  //获取教师权限信息
  var complexPermission;
  $.get($.pinput.ip_config + "/teacher/permission?token=" + token).success(function(data) {
    //console.log(data)
    var permission = data.data.subPermission;
    if (permission == 0) {
      $(".pinput").off("click", ".add-new-short");
      $('.pinput').on("mouseover", ".add-new-short", function() {
        $(".add-new-short").text("没有权限")
      })
      $('.pinput').on("mouseout", ".add-new-short", function() {
          $(".add-new-short").text("新增主观题")
        })
        //add-simple nochoice
      $('.pinput').on("mouseover", ".nochoice", function() {
        $(".pinput").off("click", ".add-simple.nochoice");
        $(this).text("没有权限")
      })
      $('.pinput').on("mouseout", ".nochoice", function() {
        $(this).text("非选择题")
      })
    }
    // 获取教师复合题权限
    var complexPermission = data.data.complexPermission;

    // if(!complexPermission||complexPermission == 0){
    //   // add-new-composite
    //   $(".pinput").off("click", ".add-new-composite");
    //   $('.pinput').on("mouseover", ".add-new-composite", function() {
    //     $(".add-new-composite").text("没有权限")
    //   })
    //   $('.pinput').on("mouseout", ".add-new-composite", function() {
    //       $(".add-new-composite").text("新增复合题")
    //   })
    // }
  })

  //获取token
  //通过url获取pid
  var hash = window.location.hash.split("/");
  var pid = hash[hash.length - 1];
  var $element = {
    tid: tid,
    pid: parseInt(pid),
    drop: false,
    btn: true,
    vData: {},
    subject: {}
  };
  //用户操作
  $.pinput.handle = {
    settings: {
      type: 'get',
      dataType: 'json',
      error: function() {}
    },

    init: function(_this) {
      $.pinput.plugin.init(_this);
      $element.dl = $('.pinput-dl');
      this.addCommon();
      this.addShort();
      this.addComposite();
      this.addSubCommon();
      this.addSubShort();
      this.addShortReply();
      this.addAnalysis();
      this.addAanswer();
      this.addMedia();
      this.delQuestion();
      this.dropSave();
      this.showHide();
      this.jump();
      this.sortQuestion();
      this.sortAnswer();
      this.saveData();
      this.saveCorrect();
      this.version();
      this.toogleModal();
    },

    /********版本*******/
    version: function() {
      //加载版本
      $('.pinput').on('click', '.ver-li .ver-control,.ver-li .ver-date', function() {
        var _this = $(this).parent(),
          type = _this.attr('type'),
          $dt = _this.parents('dt'),
          $ele = _this.parent().parent();

        if (_this.hasClass('current'))
          return;

        if (type == 1 || type == 2) {
          var qid = _this.attr('qid');
          if ($ele.hasClass('pinput-question')) {
            var current_id = $ele.attr('qid');
            $ele.attr('qid', qid);
          } else {
            var current_id = _this.parents('dt').attr('qid');
            _this.parents('dt').attr('qid', qid);
          }
        } else if (type == 3) {
          var mid = _this.attr('mid');
          var current_id = _this.parents('dt').attr('mid');
        }

        var obj = {}
        if (type == 1 || type == 2) {
          obj = { "pid": parseInt($element.pid), "qid": parseInt(_this.attr('qid')), "pastQid": parseInt(current_id) }
        } else if (type == 3) {
          obj = { "pid": parseInt($element.pid), "mid": parseInt(_this.attr('mid')), "pastMid": parseInt(current_id) }
        }

        var settings = $.pinput.plugin.extend({
          type: 'post',
          contentType: "application/json",
          url: $.pinput.ip_config + "/teacher/test/qm/version/use?token=" + token,
          data: JSON.stringify(obj),
          success: function(res) {
            if (!res.status) {
              _this.addClass('current').siblings().removeClass('current');
              if (type == 1 || type == 2) {
                if ($ele.hasClass('pinput-question')) {
                  _this.attr('qid', res.data.qid);
                } else {
                  _this.parents('dt').attr('qid', res.data.qid);
                }
              } else if (type == 3) {
                _this.parents('dt').attr('mid', res.data.mid);
              }

              //渲染页面
              var data = res.data;

              //答题
              switch (parseInt(type)) {
                case 1:
                  $ele.find('.title').html(data.qContent);
                  $ele.find('.score input').val(data.qScore);
                  var $common = $ele.find('.common-ul');
                  var letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
                  if (data.choices instanceof Array) {
                    $common.empty();
                    for (var i = 0; i < data.choices.length; i++) {
                      var str = $($.pinput.ui.choice).find('.letter').text(letters[i]).end().find('.answer').html(data.choices[i]).end();
                      if (data.qAnswer instanceof Array && $.pinput.plugin.in_array(i, data.qAnswer)) {
                        str.find('.choice').addClass('correct').end();
                      }
                      $common.append(str);
                    }
                  }
                  //分数
                  if (data.mid) {
                    var mid = $dt.attr('mid'),
                      qid = _this.parents('.pinput-question').attr('qid'),
                      tit = _this.parents('.pinput-question').find('.pinput-problem .tit').text(),
                      tit = tit.substring(0, tit.length - 1);
                  } else {
                    var qid = $dt.attr('qid'),
                      tit = parseInt($dt.find('.pinput-item-slide .tit').text());
                  }
                  $.pinput.plugin.setScore(tit, data.qScore);
                  break;
                case 2:
                  $ele.find('.title').html(data.qContent);
                  $ele.find('.score input').val(data.qScore);
                  var $short = $ele.find('.short-ul');
                  if (data.choices[0] && data.choices[0] instanceof Array) {
                    $short.empty();
                    for (var i = 0; i < data.choices[0].length; i++) {
                      var text = '',
                        score = '',
                        str = '';
                      switch (data.choices[0][i]) {
                        case 1:
                          text = '[请录入答案]';
                          break;
                        case 2:
                          text = '[文本答题框]';
                          break;
                        case 3:
                          text = '[图片答题框]';
                          break;
                        case 4:
                          text = '[音频答题框]';
                          break;
                      }
                      if (data.choices[1] && data.choices[1][i])
                        score = data.choices[1][i];
                      str = $($.pinput.ui.reply).attr('type', data.choices[0][i]).find('.letter').text((i + 1) + '.').end().find('.reply').text(text).end().find('.score input').val(score).end();
                      $short.append(str);
                    }
                  }
                  //分数
                  if (data.mid) {
                    var tit = _this.parents('.pinput-question').find('.pinput-problem .tit').text(),
                      tit = tit.substring(0, tit.length - 1);
                  } else {
                    var tit = parseInt($dt.find('.pinput-item-slide .tit').text());
                  }
                  $.pinput.plugin.setScore(tit, data.qScore);
                  break;
                case 3:
                  $ele.find('.subject').html(data.mContent);
                  break;
              }

              //解析
              if (data.qResolve) {
                var $analysis = $ele.find('.analysis-ul');
                $analysis.empty();
                $.each(data.qResolve, function(key, val) {
                  var str = $($.pinput.ui.analysis).find('.analysis-li1 input').val(key).end().find('.analysis-li3').html(val).end();
                  $analysis.append(str);
                });
              }
            } else {
              if (type == 1 || type == 2) {
                if ($ele.hasClass('pinput-question')) {
                  $ele.attr('qid', current_id);
                } else {
                  _this.parents('dt').attr('qid', current_id);
                }
              } else if (type == 3) {
                _this.parents('dt').attr('mid', current_id);
              }
            }
          },
          error: function() {
            if (type == 1 || type == 2) {
              if ($ele.hasClass('pinput-question')) {
                $ele.attr('qid', current_id);
              } else {
                _this.parents('dt').attr('qid', current_id);
              }
            } else if (type == 3) {
              _this.parents('dt').attr('mid', current_id);
            }
          }
        });
        $.ajax(settings);
      });

      //版本列表
      $('.pinput').on('click', '.pinput-problem-ico', version);

      function version() {
        var _this = $(this),
          $dt = _this.parents('dt'),
          type = $dt.attr('data-type'),
          btn = true;
        //_this.off('click'); 
        switch (parseInt(type)) {
          case 1:
          case 2:
            var $ul = $dt.find('.pinput-item-ver'),
              qid = $dt.attr('qid');
            break;
          case 3:
            var $div = _this.parents('.pinput-question'),
              type = $div.attr('data-type'),
              $ul = $div.find('.pinput-item-ver'),
              $ver = $dt.find('.pinput-item-subject').prev(), //材料版本
              mid = $dt.attr('mid'),
              qid = $div.attr('qid');
            console.log($ver)
            break;
        }

        if ($ul.find('.ver-li').size()) {
          btn = false;
          $ul.toggle();
        }

        //请求服务器
        if (btn) {
          // var url = $.pinput.ip_config + $.pinput.api_url.version + $element.tid + '/' + parseInt(qid) + "?token=" + token,
          var url = $.pinput.ip_config + "/teacher/test/question/version?qid=" + parseInt(qid) + "&pid=" + $element.pid + "&token=" + token,
            settings = $.pinput.plugin.extend({
              type: 'get',
              url: url,
              success: function(res) {
                if (!res.status) {
                  var res = res.data,
                    ques = '';
                  console.log(res)
                  if (res.count > 0) {
                    for (var i = 0; i < res.versions.length; i++) {
                      console.log(res['versions'][i])
                      var current = '';
                      // if (res['versions'][i]['qid'] == qid)
                      if (res['versions'][i].isActive == 1)
                        current = 'current';

                      // var ns = $.pinput.plugin.getLocalTime(res['versions'][i] * 1000),
                      var ns = res['versions'][i]['createTime'],
                        _qid = res['versions'][i]['qid'],
                        rid = res['versions'][i]['id'];
                      ques += '<li class="ver-li clearfix ' + current + ' " qid="' + _qid + '" type="' + type + '" vid="' + rid + '"><div class="ver-control fl"></div><div class="ver-date fl">' + ns + '</div> <a class="del" href="javascript:;"></a></li>';
                      $element['vData'][_qid] = res['versions'][i];
                    }
                    $ul.append(ques).show();
                  }
                }

                //材料
                if (typeof mid != 'undefined') {
                  if ($ver.find('.ver-li').length == 0) {
                    // var url = $.pinput.ip_config + $.pinput.api_url.version + $element.tid + '/' + parseInt(mid) + '?action=2' + "&token=" + token,
                    var url = $.pinput.ip_config + "/teacher/test/material/version?mid=" + parseInt(mid) + "&pid=" + $element.pid + "&token=" + token,
                      settings = $.pinput.plugin.extend({
                        type: 'get',
                        url: url,
                        success: function(res) {
                          //console.log(res);
                          if (!res.status) {
                            var res = res.data,
                              ques = '';
                            if (res.count > 0) {
                              for (var i = 0; i < res.versions.length; i++) {
                                var current = '';
                                if (res['versions'][i].isActive == 1)
                                  current = 'current';

                                // var ns = $.pinput.plugin.getLocalTime(res['versions'][i] * 1000),
                                var ns = res['versions'][i]['createTime'],
                                  _mid = res['versions'][i]['mid'],
                                  rid = res['versions'][i]['id'];
                                ques += '<li class="ver-li clearfix ' + current + ' " mid="' + _mid + '" type="3" vid="' + rid + '"><div class="ver-control fl"></div><div class="ver-date fl">' + ns + '</div> <a class="del" href="javascript:;"></a></li>';
                                $element['subject'][_mid] = res['versions'][i];
                              }
                              $ver.append(ques).show();
                            }
                          }
                        }
                      });
                    $.ajax(settings);
                  }
                }

              }
            });
          $.ajax(settings);
        }
      }

      //删除版本
      $('.pinput').on('click', '.ver-li .del', removeVersion);

      function removeVersion() {
        var _this = $(this).parent(),
          vid = _this.attr('vid');

        if (_this.hasClass('current'))
          return;

        var settings = $.pinput.plugin.extend({
          /*type: 'put',
          contentType: "application/json",
          url: url,
          data: JSON.stringify({ "pid": parseInt($element.pid), "paperStructJson": structs }),*/
          type: 'delete',
          contentType: "application/json",
          url: $.pinput.ip_config + "/teacher/test/qm/version?token=" + token,
          data: JSON.stringify({ "id": [vid] }),
          success: function(res) {
            if (!res.status) {
              _this.remove();
            }
          }
        });
        $.ajax(settings);
      }

    },

    /********新增********/
    addMedia: function() {
      $('.pinput').on('click', '.add-media .vedio,.add-media .mp3', function(e) {
        $('.confirm-media').remove();
        var _this = $(this),
          postion = _this.offset(),
          css = _this.attr('class');
          // 请求获取教师视频添加权限
          $.get($.pinput.ip_config + "/teacher/permission?token=" + token).success(function(data) {
            // 获取教师复合题权限
            var complexPermission = data.data.complexPermission;
            if(!complexPermission||complexPermission===0){
              alert('您无权限录入视频或音频题');
              return;
            } else {
              $($.pinput['ui'][css]).data('subject', _this.parents('.pinput-item-subject').find('.subject')).css({ top: postion.top + 50, left: postion.left + 50 }).appendTo('.pinput');
            }
          })
          // 获取资源格式
          // 显示添加弹窗
          // alert($.pinput['ui'][css])
        // $($.pinput['ui'][css]).data('subject', _this.parents('.pinput-item-subject').find('.subject')).css({ top: postion.top + 50, left: postion.left + 50 }).appendTo('.pinput');
        e.stopPropagation();
      });
      // 切换七牛和通用地址
      $('.pinput').on('click','.currency,.qiniu',function(){
        var _this = $(this);
        var _css = _this.attr('class');
        // console.log('12',_this,_css);
        if (_css == 'qiniu') {
          // 显示七牛
          $('.currency').css('background','#b3b3b3');
          $('.qiniu').css('background','#009245');
          $('.currency-address').css('display','none');
          $('.qiniu-address').css('display','block');
        } else if (_css == 'currency') {
          // 显示通用代码
          $('.currency').css('background','#009245');
          $('.qiniu').css('background','#b3b3b3');
          $('.qiniu-address').css('display','none');
          $('.currency-address').css('display','block');
        }
      })
      // 关闭资源添加弹窗
      $('.pinput').on('click', '.close-media', function() {
        $('.confirm-media').remove();
      });

      $(document).click(function(e) {
        var _this = $(this),
          $target = $(e.target),
          l = $target.parents('.confirm-media').size();

        if ($target.hasClass('confirm-media'))
          return;

        if (!l) {
          $(".confirm-media").remove();
        }
      });

      $('.pinput').on('click', '.confirm-media button,.qiniu-btn,.currency-btn,mp3-btn', function() {
        var _this = $(this),
        $subject = _this.parents('.confirm-media').data('subject'),
        type = _this.attr('media'),
        val = _this.prev().val();
        // 获取当前点击的按钮class
        if(!val){
          alert('请填写视频地址');
          return;
        }
        var _newcss = _this.attr('class');
        // console.log(_newcss,type);
        if (type == 'vedio'){
          if (_newcss == 'currency-btn'){
            // 通用代码模式
            val = $(_this.prev().val()).attr('src');
          } else if (_newcss == 'qiniu-btn'){
            // 七牛云视频模式
            val = _this.prev().val();
          }
        }
        // console.log(type,val);
        var $img = $('<img class="media-img" src="./static/images/' + type + '.png" _src="' + val + '" type="' + type + '" />');
        $subject.append($img);
        $(".confirm-media").remove();
        $.pinput.handle.save_material.call($subject);
      });
    },

    //增加选择题
    addCommon: function() {
      $('.pinput').on('click', '.add-new-common', function() {
        var url = $.pinput.ip_config + "/test/question?token=" + token,
          score = $.pinput.plugin.extendScore($element.dl, 1),
          settings = $.pinput.plugin.extend({
            type: 'post',
            contentType: "application/json",
            url: url,
            data: JSON.stringify({ "qType": 1, "pid": $element.pid, "qScore": score }),
            success: function(res) {
              if (!res.status) {
                var res = res.data,
                  no = $.pinput.plugin.getnum(),
                  str = $($.pinput.ui.common).attr('qid', res.qid).find('.pinput-item-tit .tit').text(no + '.').end().find('.score input').val(score).end();
                $element.dl.append(str);
                $.pinput.plugin.addAnimate();
                $.pinput.plugin.addOrder(no, score);
                $.pinput.plugin.sumScore();
              }
            }
          });
        $.ajax(settings);
      });
    },

    //增加主观题
    //$(".pinput").off("click", ".add-new-short", foo); 
    addShort: function() {
      $('.pinput').on('click', '.add-new-short', function() {
        var url = $.pinput.ip_config + "/test/question?token=" + token,
          settings = $.pinput.plugin.extend({
            type: 'post',
            contentType: "application/json",
            url: url,
            data: JSON.stringify({ "qType": 2, "pid": $element.pid }),
            success: function(res) {
              if (!res.status) {
                var res = res.data,
                  no = $.pinput.plugin.getnum(),
                  str = $($.pinput.ui.short).attr('qid', res.qid).find('.pinput-item-tit .tit').text(no + '.').end();
                $element.dl.append(str);
                $.pinput.plugin.addAnimate();
                $.pinput.plugin.addOrder(no, 0);
              }
            }
          });
        $.ajax(settings);
      });
    },

    //增加复合题
    addComposite: function() {
      $('.pinput').on('click', '.add-new-composite', function() {
        var url = $.pinput.ip_config + "/test/material?token=" + token,
          settings = $.pinput.plugin.extend({
            type: 'post',
            contentType: "application/json",
            url: url,
            data: JSON.stringify({ "pid": $element.pid }),
            success: function(res) {
              if (!res.status) {
                var res = res.data,
                  no = $.pinput.plugin.getnum(),
                  str = str = $($.pinput.ui.composite).attr('mid', res.mid).find('.pinput-item-tit .tit').text(no + '.').end();
                $element.dl.append(str);
                $.pinput.plugin.addAnimate();
              }
            }
          });
        $.ajax(settings);
      });
    },

    //增加子题-选择题
    addSubCommon: function() {
      $('.pinput').on('click', '.add-simple.choice', function() {
        var __this = $(this),
          no = parseInt(__this.parents('dt').find('.pinput-item-tit .tit').text()),
          $dt = __this.parents('dt'),
          l = $dt.find('.pinput-question').size(),
          num = no + '-' + (l + 1),
          score = $.pinput.plugin.extendScore($dt, 3),
          str = $($.pinput.ui.subCommon).find('.pinput-problem-info .tit').text(num + '.').end().find('.score input').val(score).end(),
          url = $.pinput.ip_config + "/test/question?token=" + token,
          data = {
            "pid": $element.pid,
            "qType": 1,
            "mid": parseInt($dt.attr('mid')),
            "qScore": score
          };

        settings = $.pinput.plugin.extend({
          type: 'post',
          contentType: "application/json",
          url: url,
          data: JSON.stringify(data),
          success: function(res) {
            if (!res.status) {
              $dt.find('.pinput-item-question').append(str.attr({ "qid": res.data.qid, "data-type": 1 }));
              $.pinput.plugin.addAnimate($dt);
              $.pinput.plugin.addOrder(num, score);
              $.pinput.plugin.sumScore();
            }
          }
        });
        $.ajax(settings);
      })
    },

    //增加子题-普通题
    addSubShort: function() {
      $('.pinput').on('click', '.add-simple.nochoice', function() {
        var __this = $(this),
          no = parseInt(__this.parents('dt').find('.pinput-item-tit .tit').text()),
          $dt = __this.parents('dt'),
          l = $dt.find('.pinput-question').size(),
          num = no + '-' + (l + 1),
          str = $($.pinput.ui.subShort).find('.pinput-problem-info .tit').text(num + '.').end(),
          url = $.pinput.ip_config + "/test/question?token=" + token,
          data = {
            "pid": $element.pid,
            "qType": 2,
            "mid": parseInt($dt.attr('mid'))
          },
          settings = $.pinput.plugin.extend({
            type: 'post',
            contentType: "application/json",
            url: url,
            data: JSON.stringify(data),
            success: function(res) {
              if (!res.status) {
                $dt.find('.pinput-item-question').append(str.attr({ "qid": res.data.qid, "data-type": 2 }));
                $.pinput.plugin.addAnimate($dt);
                $.pinput.plugin.addOrder(num, 0);
              }
            }
          });
        $.ajax(settings);
      })
    },

    //增加答题方式-主观题
    addShortReply: function() {
      $('.pinput').on('click', '.add-options li', function() {
        var __this = $(this),
          types = ['img', 'vedio', 'text', 'position'],
          texts = { 'img': '图片', 'vedio': '音频', 'text': '文本', 'position': '填空' },
          type = { 'img': 3, 'vedio': 4, 'text': 2, 'position': 1 },
          _class = __this.attr('class');

        for (var k in types) {
          if (_class.indexOf(types[k]) != -1) {
            var no = __this.parents('.pinput-answer').find('ul li').size() + 1;
            if (types[k] == 'position') {
              var str = $($.pinput.ui.position).attr('type', type[types[k]]).find('.letter').text(no + '.').end();
            } else {
              var str = $($.pinput.ui.reply).attr('type', type[types[k]]).find('.letter').text(no + '.').end().find('.reply').text('[' + texts[types[k]] + '答题框]').end();
            }
            __this.parents('.pinput-answer').find('ul').append(str);
            break;
          }
        }

        var data = $.pinput.plugin.formatReply(__this),
          url = $.pinput.ip_config + "/test/question?token=" + token,
          settings = $.pinput.plugin.extend({
            type: 'put',
            contentType: "application/json",
            url: url,
            data: JSON.stringify(data),
            success: function(res) {
              console.log(res);
              if (!res.status) {
                //颜色变灰
                console.log('成功');
              } else {
                str.remove();
              }
            },
            error: function() {
              str.remove();
            }
          });
        console.log(data);
        $.ajax(settings);
      })
    },

    //增加解析
    addAnalysis: function() {
      $('.pinput').on('click', '.add-analysis', function() {
        $(this).parent().find('.analysis-ul').append($.pinput.ui.analysis);
      });

    },

    //增加选项-选择题
    addAanswer: function() {
      var _this = this;

      $('.pinput').on('click', '.add-answer', function() {
        var letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
          $ul = $(this).parent().find('ul'),
          l = $ul.find('li').size();

        if (letters[l])
          $ul.append($($.pinput.ui.choice).find('.letter').text(letters[l]).end());

        _this.save_answer().call($(this))

      });
    },

    //拖动题目
    sortQuestion: function() {
      $element.dl.on('mousemove', function() {
        $.pinput.handle.sortQuestionInit();
        $(this).parents('dt').hasClass('sort') ? $element.dl.sortable('enable') : $element.dl.sortable("disable");
      });

      $element.dl.on('mousedown', function(e) {
        $element.dl.sortable('enable');
        if (!$(e.target).hasClass('show'))
          $element.dl.sortable("disable");

        //拖动完成后重新渲染右边很丑的导航条
        // $.pinput.plugin.order();
      });
    },

    //拖动题目初始化
    sortQuestionInit: function() {
      $element.dl.sortable({
        axis: 'y',
        revert: false,
        start: function() {},
        update: function() {
          var url = $.pinput.ip_config + "/test/paper?token=" + token,
            structs = new Array(),
            $dt = $element.dl.find('dt');

          $.each($dt, function() {
            var _this = $(this),
              $sub = _this.find('.pinput-question');
            if (_this.attr('qid')) {
              struct = {
                qid: parseInt(_this.attr('qid'))
              };
            } else if (_this.attr('mid')) {
              struct = {
                mid: parseInt(_this.attr('mid')),
                stem: $.pinput.plugin.getids($sub)
              };
            }
            /*struct = {
              qid: parseInt(_this.attr('qid')),
              isComposite: _this.attr('qid') == 2 ? 1 : -1,
              stem: $.pinput.plugin.getids($sub)
            };*/

            structs.push(struct);
          });
          var settings = $.pinput.plugin.extend({
            type: 'put',
            contentType: "application/json",
            url: url,
            data: JSON.stringify({ "pid": $element.pid, "paperStructJson": structs }),
            success: function(res) {
              console.log(res);
              if (!res.status) {
                $.pinput.plugin.initNum();
                $.pinput.plugin.order();
              } else {
                $element.dl.sortable('cancel');
              }
            },
            error: function() {
              $element.dl.sortable('cancel');
            }
          });
          $.ajax(settings);
        }
      });
    },

    //拖动答题选项
    sortAnswer: function() {
      //主观
      $element.dl.on('mousemove', '.short-ul', function() {
        $('.short-ul').sortable({
          axis: 'y',
          revert: false,
          start: function() {},
          update: function(event, ui) {
            var $ul = $(event.target),
              data = $.pinput.plugin.formatReply($ul),
              url = $.pinput.ip_config + "/test/question?token=" + token,
              settings = $.pinput.plugin.extend({
                type: 'put',
                contentType: "application/json",
                url: url,
                data: JSON.stringify(data),
                success: function(res) {
                  console.log(res);
                  if (!res.status) {
                    //颜色变灰
                    $.pinput.plugin.shortNum.call($ul);
                  } else {
                    $ul.sortable('cancel');
                  }
                },
                error: function() {
                  $ul.sortable('cancel');
                }
              });
            $.ajax(settings);
          },
          stop: function() {}
        });
      });

      //客观
      $element.dl.on('mousemove', '.common-ul', function() {
        $('.common-ul').sortable({
          axis: 'y',
          revert: false,
          start: function() {},
          update: function(event, ui) {
            var $ul = $(event.target),
              btn = false,
              i = 0,
              data = $.pinput.plugin.formatChoice($ul),
              url = $.pinput.ip_config + "/test/question?token=" + token;

            //数据都为空 则不请求服务器
            for (var j = 0; j < data.choices.length; j++) {
              data['choices'][j] == '' ? ++i : '';
            }

            if (i == data.choices.length) {
              $.pinput.plugin.commonNum.call($ul);
              return;
            }

            var settings = $.pinput.plugin.extend({
              type: 'put',
              contentType: "application/json",
              url: url,
              data: JSON.stringify(data),
              success: function(res) {
                console.log(res);
                if (!res.status) {
                  //颜色变灰
                  $.pinput.plugin.commonNum.call($ul);
                } else {
                  $ul.sortable('cancel');
                }
              },
              error: function() {
                $ul.sortable('cancel');
              }
            });
            $.ajax(settings);
          },
          stop: function() {}
        });
      });

      $element.dl.on('mousedown', '.short-ul,.common-ul', function(e) {});
    },

    //展开隐藏
    showHide: function() {
      $('.pinput').on('click', '.pinput-item-slide', function() {
        var $dt = $(this).parents('dt');
        $dt.toggleClass('sort');
        $dt.find('.pinput-item-slide').toggleClass('pinput-item-slide-a');
        $dt.find('.pinput-item-main').toggle();
        $dt.find('.pinput-item-opt .del').toggle();
      })
    },

    //保存(获得失去焦点)
    saveData: function() {
      var _this = this;
      //点击
      $('.pinput').on('click', 'div[contenteditable="true"]', function() {
        if (this.tagName != 'INPUT')
          $(this).trigger('focus');
      });

      //获取焦点
      $('.pinput').on('focus', 'div[contenteditable="true"],input', function() {
        var _this = $(this),
          ele = this.tagName,
          val = ele == 'INPUT' ? _this.val() : _this.html();
        _this.parents('.ui-sortable').sortable();
        _this.attr('attr') == 'score' ? _this.data('data', Number(val)) : _this.data('data', $.pinput.plugin.trim(val));
        _this.parents('.ui-sortable').sortable("disable");
      });

      //失去焦点
      $('.pinput').on('blur', 'div[contenteditable="true"],input', function() {
        var __this = $(this),
          attr = __this.attr('attr');
        __this.parents('.ui-sortable').sortable("enable");

        switch (attr) {
          case 'sscore':
          case 'score':
            var val = Number(__this.val());
            var rex1 = /^[\d\.]+$/;
            if (!rex1.test(val)) {
              __this.val('');
              return;
            }
            break;
          default:
            var _val = this.tagName == 'INPUT' ? __this.val() : __this.html(),
              val = $.pinput.plugin.trim(_val);
            if (val == '')
              return;
            break;
        }

        if (!$element.drop) {
          if (val == __this.data('data'))
            return;
        }

        $element.drop = false;
        var fn = 'save_' + attr;
        if (typeof _this[fn] == 'function')
          _this[fn].call(__this);

      });
    },

    /***保存***/
    //分数(主观)
    save_sscore: function() {
      var _this = this,
        data = $.pinput.plugin.formatReply(_this),
        url = $.pinput.ip_config + "/test/question?token=" + token,
        settings = $.pinput.plugin.extend({
          type: 'put',
          contentType: "application/json",
          url: url,
          data: JSON.stringify(data),
          success: function(res) {
            console.log(res);
            if (!res.status) {
              //颜色变灰
              console.log('成功');
              _this.parents('.pinput-item-boder').find('.pinput-problem .score input').val(data.qScore.toFixed(2));
              var $dt = _this.parents('dt'),
                type = $dt.attr('data-type');
              switch (parseInt(type)) {
                case 2:
                  var tit = parseInt($dt.find('.pinput-item-slide .tit').text());
                  break;
                case 3:
                  var tit = _this.parents('.pinput-question').find('.pinput-problem .tit').text(),
                    tit = tit.substring(0, tit.length - 1);
                  break;
              }
              $.pinput.plugin.setScore(tit, data.qScore);
            }
          }
        });
      $.ajax(settings);
    },
    //分数(客观)
    save_score: function() {
      var _this = this,
        $dt = _this.parents('dt'),
        type = $dt.attr('data-type');

      switch (parseInt(type)) {
        case 1:
          var qid = $dt.attr('qid'),
            tit = parseInt($dt.find('.pinput-item-slide .tit').text());
          break;
        case 3:
          var mid = $dt.attr('mid'),
            qid = _this.parents('.pinput-question').attr('qid'),
            tit = _this.parents('.pinput-question').find('.pinput-problem .tit').text(),
            tit = tit.substring(0, tit.length - 1);
          break;
      }

      var data = {
          "pid": $element.pid,
          "qid": parseInt(qid),
          "mid": typeof(mid) == 'undefined' ? '' : parseInt(mid),
          "qScore": Number(_this.val())
        },
        url = $.pinput.ip_config + "/test/question?token=" + token,
        settings = $.pinput.plugin.extend({
          type: 'put',
          contentType: "application/json",
          url: url,
          data: JSON.stringify(data),
          success: function(res) {
            console.log(res);
            if (!res.status) {
              //颜色变灰
              console.log('成功');
              _this.addClass('save');
              $.pinput.plugin.setScore(tit, data.qScore);
            }
          }
        });
      $.ajax(settings);
    },

    //标题
    save_title: function() {
      var _this = this,
        $dt = _this.parents('dt'),
        type = $dt.attr('data-type');

      switch (parseInt(type)) {
        case 1:
        case 2:
          var qid = $dt.attr('qid');
          break;
        case 3:
          var mid = $dt.attr('mid'),
            qid = _this.parents('.pinput-question').attr('qid');
          break;
      }

      var data = {
          "pid": $element.pid,
          "qid": parseInt(qid),
          "mid": typeof(mid) == 'undefined' ? '' : parseInt(mid),
          "qContent": _this.html()
        },
        url = $.pinput.ip_config + "/test/question?token=" + token,
        settings = $.pinput.plugin.extend({
          type: 'put',
          contentType: "application/json",
          url: url,
          data: JSON.stringify(data),
          success: function(res) {
            if (!res.status) {
              //颜色变灰
              _this.addClass('save');
              console.log('成功');
            }
          }
        });
      console.log(data);
      $.ajax(settings);
    },

    //填空题
    save_position: function() {
      var _this = this,
        url = $.pinput.ip_config + "/test/question?token=" + token,
        data = $.pinput.plugin.formatReply(_this);

      var settings = $.pinput.plugin.extend({
        type: 'put',
        contentType: "application/json",
        url: url,
        data: JSON.stringify(data),
        success: function(res) {
          console.log(res);
          if (!res.status) {
            //颜色变灰
            _this.parent().parent().addClass('save');
            console.log('成功');
          }
        }
      });
      $.ajax(settings);


    },

    //选项(客观)
    save_answer: function() {
      var _this = this,
        $dt = _this.parents('dt'),
        url = $.pinput.ip_config + "/test/question?token=" + token,
        type = $dt.attr('data-type'),
        answer = new Array();

      switch (parseInt(type)) {
        case 1:
          var $answer = $dt.find('.answer'),
            qid = $dt.attr('qid');
          break;
        case 3:
          var mid = $dt.attr('mid'),
            qid = _this.parents('.pinput-question').attr('qid'),
            $answer = _this.parents('.pinput-answer').find('.answer');
          break;
      }

      $.each($answer, function() {
        answer.push($(this).html());
      });

      var data = {
          "pid": $element.pid,
          "qid": parseInt(qid),
          "mid": typeof(mid) == 'undefined' ? '' : parseInt(mid),
          "choices": answer
        },
        settings = $.pinput.plugin.extend({
          type: 'put',
          contentType: "application/json",
          url: url,
          data: JSON.stringify(data),
          success: function(res) {
            console.log(res);
            if (!res.status) {
              //颜色变灰
              _this.parent().addClass('save');
              console.log('成功');
            }
          }
        });
      $.ajax(settings);
    },

    //解析
    save_analysis: function() {
      var _this = this,
        url = $.pinput.ip_config + "/test/question?token=" + token,
        data = $.pinput.plugin.formatAnalysis(_this);

      var settings = $.pinput.plugin.extend({
        type: 'put',
        contentType: "application/json",
        url: url,
        data: JSON.stringify(data),
        success: function(res) {
          console.log(res);
          if (!res.status) {
            //颜色变灰
            _this[0]['tagName'] == 'DIV' ? _this.parent().addClass('save') : '';
            console.log('成功');
          }
        }
      });
      $.ajax(settings);
    },

    //材料
    save_material: function() {
      var _this = this,
        $dt = _this.parents('dt'),
        data = { "pid": $element.pid, "mid": parseInt($dt.attr('mid')), "mContent": $dt.find('.subject').html() },
        url = $.pinput.ip_config + "/test/material?token=" + token,
        settings = $.pinput.plugin.extend({
          type: 'put',
          contentType: "application/json",
          url: url,
          data: JSON.stringify(data),
          success: function(res) {
            console.log(res);
            if (!res.status) {
              //颜色变灰
              _this.addClass('save');
              console.log('成功');
            }
          }
        });
      $.ajax(settings);
    },

    //删除
    delQuestion: function() {
      //删除选项(主观)
      $('.pinput').on('click', '.short-ul .del', function(e) {
        var _this = $(this),
          $dt = _this.parents('dt');
        _this.parent().addClass('li-del');

        var tit = parseInt($dt.find('.pinput-item-slide .tit').text());

        var data = $.pinput.plugin.formatReply(_this),
          url = $.pinput.ip_config + "/test/question?token=" + token,
          settings = $.pinput.plugin.extend({
            type: 'put',
            contentType: "application/json",
            url: url,
            data: JSON.stringify(data),
            success: function(res) {
              console.log(res);
              if (!res.status) {
                //颜色变灰
                console.log('成功');

                _this.parents('.pinput-item-boder').find('.pinput-problem .score input').val(data.qScore);
                var $ul = _this.parents('.short-ul');
                _this.parent().remove();
                $.pinput.plugin.setScore(tit, data.qScore);
                $.pinput.plugin.shortNum.call($ul);
              } else {
                _this.parent().removeClass('li-del');
              }
            },
            error: function() {
              _this.parent().removeClass('li-del');
            }
          });
        $.ajax(settings);
      });

      //删除选项(客观)
      $('.pinput').on('click', '.common-ul .del', function(e) {
        var _this = $(this),
          $ul = _this.parents('.common-ul'),
          url = $.pinput.ip_config + "/test/question?token=" + token;

        if (_this.parents('.common-ul').find('li').size() == 1) {
          alert('至少有一个选项');
          return;
        }

        //标记
        _this.parent().addClass('li-del');

        var data = $.pinput.plugin.formatChoice(_this),
          settings = $.pinput.plugin.extend({
            type: 'put',
            contentType: "application/json",
            url: url,
            data: JSON.stringify(data),
            success: function(res) {
              console.log(res);
              if (!res.status) {
                //颜色变灰
                _this.parent().remove();
                $.pinput.plugin.commonNum.call($ul);
              } else {
                _this.parent().removeClass('li-del');
              }
            },
            error: function() {
              _this.parent().removeClass('li-del');
            }
          });
        $.ajax(settings);
      });

      //删除解析
      $('.pinput').on('click', '.analysis-ul .del', function(e) {
        var _this = $(this),
          url = $.pinput.ip_config + "/test/question?token=" + token;

        //标记
        _this.parent().addClass('li-del');

        var data = $.pinput.plugin.formatAnalysis(_this),
          settings = $.pinput.plugin.extend({
            type: 'put',
            contentType: "application/json",
            url: url,
            data: JSON.stringify(data),
            success: function(res) {
              console.log(res);
              if (!res.status) {
                //颜色变灰
                console.log('成功');
                _this.parent().remove();
              } else {
                _this.parent().removeClass('li-del');
              }
            },
            error: function() {
              _this.parent().removeClass('li-del');
            }
          });
        $.ajax(settings);
      });

      //删除题目
      $('.pinput').on('click', '.pinput-item-opt .del', function(e) {
        var _this = $(this),
          $dt = _this.parents('dt'),
          type = $dt.attr('data-type');

        switch (parseInt(type)) {
          case 1:
          case 2:
            var qid = parseInt($dt.attr('qid')),
              url = $.pinput.ip_config + "/test/paper/question?token=" + token,
              data = {
                "qid": qid,
                "pid": $element.pid
              };
            break;
          case 3:
            var mid = parseInt($dt.attr('mid')),
              url = $.pinput.ip_config + "/test/paper/material?token=" + token,
              data = {
                "mid": mid,
                "pid": $element.pid
              };
            break;
        }

        var settings = $.pinput.plugin.extend({
          type: 'delete',
          headers: { "Content-Type": "application/json;charset=utf-8" },
          url: url,
          data: JSON.stringify(data),
          success: function(res) {
            if (!res.status) {
              //var tit = $dt.index() + 1;
              var tit = $dt.find(".pinput-item-tit .tit").text();
              tit = tit.substring(0, tit.length - 1);
              //删除
              if ($dt.parent('div').length) {
                $dt.parent('div').remove().end();
              } else {
                $dt.remove().end();
              }

              $.pinput.plugin.initNum();
              $.pinput.plugin.delOrder(tit, type);
            }
          }
        });
        $.ajax(settings);
        e.stopPropagation();
      });

      //删除子题
      $('.pinput').on('click', '.pinput-problem-info .del', function() {
        var _this = $(this),
          $dt = _this.parents('dt'),
          $question = _this.parents('.pinput-question'),
          data = {
            "qid": parseInt($question.attr('qid')),
            "mid": parseInt(_this.parents('dt').attr('mid')),
            "pid": $element.pid
          },
          url = $.pinput.ip_config + "/test/paper/question?token=" + token,
          settings = $.pinput.plugin.extend({
            type: 'delete',
            headers: { "Content-Type": "application/json;charset=utf-8" },
            data: JSON.stringify(data),
            url: url,
            success: function(res) {
              if (!res.status) {
                //var tit = ($dt.index()+1) + '-' + ($question.index()+1);
                var tit = $question.find(".pinput-problem-info .tit").text();
                tit = tit.substring(0, tit.length - 1)
                  //删除
                $question.remove();
                $.pinput.plugin.initSubNum($dt);
                $.pinput.plugin.delOrder(tit, $question.attr('data-type'));
              }
            }
          });
        $.ajax(settings);
      });

    },

    //正确选项(客观)
    saveCorrect: function() {
      $element.dl.on("mouseover", ".answer-li .choice", function() {
        $(this).parents('ul').sortable("disable");
      });
      $element.dl.on("mouseout", ".answer-li .choice", function() {
        $(this).parents('ul').sortable("enable");
      });

      $('.pinput').on('click', '.answer-li .choice', function() {
        var _this = $(this),
          $dt = _this.parents("dt"),
          type = $dt.attr('data-type'),
          url = $.pinput.ip_config + "/test/question?token=" + token;

        var value = $.pinput.plugin.trim($.pinput.plugin.remove_space(_this.parents('li').find('.answer').html()));
        if (value == '')
          return;

        _this.toggleClass('correct');

        var correct = [],
          $answer = _this.parents('.pinput-answer').find(".choice");

        $.each($answer, function(k) {
          if ($(this).hasClass('correct'))
            correct.push(k);
        });

        switch (parseInt(type)) {
          case 1:
            var qid = $dt.attr('qid');
            break;
          case 3:
            var mid = $dt.attr('mid'),
              qid = _this.parents('.pinput-question').attr('qid');
            break;
        };

        var data = {
          "pid": $element.pid,
          "qid": parseInt(qid),
          "mid": typeof(mid) == 'undefined' ? '' : parseInt(mid),
          "qAnswer": correct
        };
        var settings = $.pinput.plugin.extend({
          type: 'put',
          contentType: "application/json",
          url: url,
          data: JSON.stringify(data),
          success: function(res) {
            if (!res.status) {
              //颜色变灰
              console.log('成功');
            } else {
              _this.toggleClass('correct');
            }
          },
          error: function() {
            _this.toggleClass('correct');
          }
        });
        $.ajax(settings);
      })
    },

    //拖动word保存
    dropSave: function() {
      $element.dl.on('drop', 'div[contenteditable="true"],input', function() {
        $element.drop = true;
        this.tagName == 'INPUT' ? $(this).trigger('focus', 'drop') : $(this).trigger('click', 'drop');
      });
    },

    //题序
    jump: function() {
      //跳转到指定题目
      $('.t-stat-score-detail').on('click', '.t-stat-li', function() {
        var tit = $(this).attr('tit');
        $.pinput.handle.jumpOrder(tit);
      });

      // $('.t-stat-score-detail h2').click(function(){
      //  $('.pinput dt').toggleClass('sort');
      //  $('.pinput .pinput-item-slide').toggleClass('pinput-item-slide-a');
      //  $('.pinput .pinput-item-main').toggle();
      //  $('.pinput .pinput-item-opt .del').toggle();
      //  if ($element.btn) {
      //    $(this).text('全部展开');
      //  } else {
      //    $(this).text('全部收起');
      //  }
      //  $element.btn = !$element.btn;
      // });

      $(".t-stat-score-detail h2").on('click', function() {
        if ($(this).text().trim() == "全部收起") {
          $('.pinput').find('.pinput-item-slide').addClass('pinput-item-slide-a');
          $('.pinput dt').addClass('sort');
          $('.pinput').find('.pinput-item-main').css("display", "none");
          $('.pinput').find('.pinput-item-opt .del').css("display", "none");
          $(this).text('全部展开');
        } else {
          $('.pinput').find('.pinput-item-slide').removeClass('pinput-item-slide-a');
          $('.pinput dt').removeClass('sort');
          $('.pinput').find('.pinput-item-main').css("display", "block");
          $('.pinput').find('.pinput-item-opt .del').css("display", "block");
          $(this).text('全部收起');
        }
      });

      $('.toggle-stat').click(function() {
        var _this = $(this);
        if (_this.hasClass('t-toggle')) {
          $(".t-box").show();
          $(".t-box").stop(true, true).animate({
            width: 116
          }, 300, function() {
            $(".t-box").animate({ height: 366 }, function() {
              _this.removeClass('t-toggle');
            })
          });
          $('.assist').animate({
            top: 560
          }, 300)
        } else {
          _this.addClass('t-toggle');
          $(".t-box").stop(true, true).animate({
            height: 30
          }, 300, function() {
            $(".t-box").animate({ width: 0, height: 0 }, function() {
              $(".t-box").hide();
            })
          });
          $('.assist').animate({
            top: 240
          }, 300)
        }
      });
    },

    jumpOrder: function(tit) {
      var tit = tit + '';
      if (tit.indexOf('-') !== -1) {
        var arr = tit.split('-');
        var $dt = $('.pinput').find('dt').eq(arr[0] - 1),
          $ele = $dt.find('.pinput-question').eq(arr[1] - 1);
      } else {
        var $ele = $('.pinput').find('dt').eq(tit - 1);
      }
      $('body,html').animate({ 'scrollTop': $ele.offset().top }, 1000);
    },

    toogleModal: function() {
      var _this, testSelectedTagIds;
      //打开摸态框
      $('.pinput').on('click', '.qid-tag .add', function() {
        _this = $(this); //在这里!!!!!!!!
        var $dt = _this.parents('dt');

        testSelectedTagIds = [];
        $.each(_this.siblings('p'), function() {
          testSelectedTagIds.push(Number($(this).attr("tagid")));
        })

        $.each($('.public-tag-list li'), function() {
          $(this).attr("class", "fl");
          if (testSelectedTagIds.indexOf(Number($(this).attr("tagid"))) != -1) {
            $(this).addClass('selected');
          }
        })

        $.each($('.private-tag-list li'), function() {
          $(this).attr("class", "fl");
          if (testSelectedTagIds.indexOf(Number($(this).attr("tagid"))) != -1) {
            $(this).addClass('selected');
          }
        })

        $(".mask").css('display', 'block');
        $(".tag-modal").css('display', 'block');
      })

      //关闭摸态框
      $('.tag-modal').on('click', '.closed', function() {
        $(".mask").css('display', 'none');
        $(".tag-modal").css('display', 'none');
      })

      //选择tag,增加删除
      $('.tag-modal').on('click', 'li[tagid]', function() {
        var _li = $(this),
          tagId = Number(_li.attr("tagid")),
          tagName = _li.text().trim();
        var $dt = _this.parents('dt'),
          type = $dt.attr('data-type');

        switch (parseInt(type)) {
          case 1:
          case 2:
            var qid = Number($dt.attr('qid'));
            break;
          case 3:
            var qid = Number(_this.parents('.pinput-question').attr('qid'));
            break;
        }
        console.log(testSelectedTagIds)
        console.log(tagId)

        if (testSelectedTagIds.indexOf(tagId) != -1) {
          //删除
          var settings = $.pinput.plugin.extend({
            type: 'delete',
            contentType: "application/json",
            url: $.pinput.ip_config + "/tag/test/question?token=" + token,
            data: JSON.stringify({ "tagId": [tagId], "qid": qid }),
            success: function(res) {
              if (!res.status) {
                testSelectedTagIds.splice(testSelectedTagIds.indexOf(tagId), 1);
                _li.removeClass('selected');
                $.each(_this.siblings('p'), function() {
                  if (Number($(this).attr("tagid")) == tagId) {
                    $(this).remove().end();
                  }
                })
              }
            }
          });
          $.ajax(settings);
        } else {
          //新增
          var settings = $.pinput.plugin.extend({
            type: 'post',
            contentType: "application/json",
            url: $.pinput.ip_config + "/tag/test/question?token=" + token,
            data: JSON.stringify({ "tagId": [tagId], "qid": qid }),
            success: function(res) {
              if (!res.status) {
                testSelectedTagIds.push(tagId);
                _li.addClass('selected');
                _this.before('<p tagid="' + tagId + '">' + tagName + '<i class="delete-tag">删除</i></p>')
              }
            }
          });
          $.ajax(settings);
        }

      })

      //单独删除标签
      $('.pinput').on('click', '.delete-tag', function() {
        var _tag_i = $(this),
          tagId = Number(_tag_i.parent().attr("tagid")),
          $dt = _tag_i.parents('dt'),
          type = $dt.attr('data-type');

        switch (parseInt(type)) {
          case 1:
          case 2:
            var qid = Number($dt.attr('qid'));
            break;
          case 3:
            var qid = Number(_tag_i.parents('.pinput-question').attr('qid'));
            break;
        }
        console.log(tagId, qid)

        //删除
        var settings = $.pinput.plugin.extend({
          type: 'delete',
          contentType: "application/json",
          url: $.pinput.ip_config + "/tag/test/question?token=" + token,
          data: JSON.stringify({ "tagId": [tagId], "qid": qid }),
          success: function(res) {
            if (!res.status) {
              _tag_i.parent().remove();
            }
          }
        });
        $.ajax(settings);

      })

    },

  }; //$.pinput.handle


  //插件
  $.pinput.plugin = {
    init: function(obj) {
      obj.addClass('pinput').append($.pinput.ui.main);
    },
    setScore: function(tit, score) {
      $('.t-stat-score-detail li[tit=' + tit + ']').find('i').text(score.toFixed(2));
      $.pinput.plugin.sumScore();
    },
    sumScore: function() {
      var s = 0;
      $.each($('.t-stat-li'), function() {
        s += Number($(this).find('i').text());
      });
      $('.t-stat-score-total p').text(s.toFixed(2));
    },
    addOrder: function(tit, score) {
      var tit = tit + '',
        li = '<li class="t-stat-li" tit="' + tit + '"><span class="t-stat-tit fl">' + tit + '.</span><span class="t-stat-score fl"><i>' + score.toFixed(2) + '</i>分</span></li>';
      if (tit.indexOf('-') != -1) {
        var noArr = tit.split('-'),
          no = parseInt(noArr[0]) + 1;
      }
      var $_li = $('li[tit^=' + no + ']');

      if ($_li.size()) {
        $_li.before(li);
      } else {
        $('.t-stat-score-detail ul').append(li);
      }
    },
    delOrder: function(tit, type) {
      var tit = tit + '';
      if (tit.indexOf('-') == -1) { //代表非复合题下的子题
        if (type == 3) { //复合题父题自身
          tit = tit + '-';

          //$('.t-stat-score-detail .scroll').find('li[tit^=' + tit + ']').remove();
          //console.log($('.t-stat-score-detail .scroll').find('li[tit^=' + tit + ']').length)
          var $target = $('.t-stat-score-detail .scroll').find('li[tit^=' + tit + ']');
          $.each($target, function() {
            var _this = $(this);
            _this.remove();
          })
        } else { //主观题和客观题
          $('.t-stat-score-detail').find('li[tit=' + tit + ']').remove();
        }
      } else { //复合题下的子题
        $('.t-stat-score-detail').find('li[tit=' + tit + ']').remove();
      }
      $.pinput.plugin.order();
      $.pinput.plugin.sumScore();
    },
    order: function() {
      var $stat_li = $('.t-stat-score-detail .t-stat-li'),
        i = 0;
      $.each($('.pinput dt .pinput-item-slide .tit'), function() {
        var _this = $(this),
          $dt = _this.parents('dt'),
          type = $dt.attr('data-type'),
          num = parseInt(_this.text());
        //获取分数
        switch (parseInt(type)) {
          case 3: //复合
            $.each($dt.find('.pinput-question'), function() {
              var no = $(this).find('.pinput-problem .tit').text() + '',
                _no = no.substr(0, no.length - 1),
                $score = $(this).find('.score input').val();
              $stat_li.eq(i).attr('tit', _no).find('.t-stat-tit').text(no);
              //更新分数
              if (!$score) { $score = 0; }
              $stat_li.eq(i).find(".t-stat-score i").text($score);
              i++;
            });
            break;
          default:
            var $score = $dt.find(".score input").val();
            $stat_li.eq(i).attr('tit', num).find('.t-stat-tit').text(num + '.');
            //同时刷新那个很丑的导航条的分数
            if (!$score) {
              $score = 0;
            }
            $stat_li.eq(i).find(".t-stat-score i").text($score);
            i++;
            break;
        }
      });

    },
    getnum: function() {
      return parseInt($('.pinput dt').size()) + 1;
    },
    initNum: function() {
      var i = 1;
      $.each($('.pinput dt'), function() {
        $(this).find('.pinput-item-tit .tit').text((i++) + '.');
        var j = 1,
          $sub = $(this).find('.pinput-question');
        $.each($sub, function() {
          $(this).find('.pinput-problem-info .tit').text((i - 1) + '-' + (j++) + '.');
        });
      });
    },
    initSubNum: function($dt) {
      var $question = $dt.find('.pinput-question'),
        no = $dt.find(".pinput-item-tit .tit").text();
      //no = $dt.index() + 1;
      no = no.substring(0, no.length - 1);
      $.each($question, function(k) {
        $(this).find('.pinput-problem-info .tit').text(no + '-' + (k + 1) + '.');
      });
    },
    shortNum: function() {
      var $li = this.find('li'),
        i = 1;
      $.each($li, function() {
        $(this).find('.letter').text((i++) + '.');
      });
    },
    commonNum: function() {
      var $li = this.find('li'),
        letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
      $.each($li, function(k) {
        $(this).find('.letter').text(letters[k]);
      });
    },
    trim: function(str) {
      return str ? str.replace(/(^\s*)|(\s*$)/g, "") : str;
    },
    remove_space: function(str) {
      return str.replace(/&nbsp;/g, "");
    },
    extend: function(obj) {
      return $.extend(true, {}, $.pinput.handle.settings, obj);
    },
    getids: function($obj) {
      var ids = [];
      if ($obj.size()) {
        $obj.each(function() {
          ids.push($(this).attr('qid'));
        });
      }
      return ids;
    },
    addAnimate: function(obj) {
      var _height = arguments[0] ? obj.find('.pinput-question:last').offset().top : $("dt:last").offset().top;
      $('body,html').animate({ 'scrollTop': _height }, 800);
    },
    formatReply: function(obj) {
      //交互
      var $ul = obj.parents('.pinput-answer').find('ul'),
        $answer = $ul.find('.answer-li'),
        score = 0,
        choices = [],
        aChoice = [],
        qAnswer = [],
        aScore = [];
      $.each($answer, function() {
        var _this = $(this);

        if (_this.hasClass('li-del')) return true;

        var _score = Number(_this.find('.score input').val());
        score += _score;
        aChoice.push(parseInt(_this.attr('type')));
        aScore.push(_score);
        if (parseInt(_this.attr('type')) != 1) { //非填空题
          qAnswer.push("");
        } else {
          if (_this.find('.reply-position input').val()) { //填空题有数据
            qAnswer.push(_this.find('.reply-position input').val());
          } else {
            qAnswer.push("");
          }
        }
      });
      choices.push(aChoice);
      choices.push(aScore);

      var $dt = obj.parents('dt'),
        type = $dt.attr('data-type');

      switch (parseInt(type)) {
        case 2:
          var qid = $dt.attr('qid');
          break;
        case 3:
          var mid = $dt.attr('mid'),
            qid = obj.parents('.pinput-question').attr('qid');
          break;
      }

      var data = {
        "pid": $element.pid,
        "qid": parseInt(qid),
        "mid": typeof(mid) == 'undefined' ? '' : parseInt(mid),
        "choices": choices,
        "qScore": score,
        "qAnswer": qAnswer
      }
      return data;
    },
    formatChoice: function(obj) {
      var $dt = obj.parents('dt'),
        type = $dt.attr('data-type'),
        choices = [],
        answer = [];

      switch (parseInt(type)) {
        case 1:
          var qid = $dt.attr('qid'),
            $answer = $dt.find('.answer-li');
          break;
        case 3:
          var mid = $dt.attr('mid'),
            qid = obj.parents('.pinput-question').attr('qid'),
            $answer = obj.parents('.pinput-answer').find('.answer-li');
          break;
      }

      $.each($answer, function() {
        var _this = $(this);
        if (_this.hasClass('li-del')) return true;
        choices.push(_this.find('.answer').html());
        if (_this.find('.choice').hasClass('correct')) {
          answer.push(choices.length - 1);
        }
      });

      var data = {
        "pid": $element.pid,
        "qid": parseInt(qid),
        "mid": typeof(mid) == 'undefined' ? '' : parseInt(mid),
        "choices": choices,
        "qAnswer": answer
      };
      return data;
    },
    formatAnalysis: function(obj) {
      var $dt = obj.parents('dt'),
        type = $dt.attr('data-type'),
        resolve = {};

      switch (parseInt(type)) {
        case 1:
        case 2:
          var $analysis = $dt.find('.analysis-li'),
            qid = $dt.attr('qid');
          break;
        case 3:
          var mid = parseInt($dt.attr('mid')),
            qid = obj.parents('.pinput-question').attr('qid'),
            $analysis = obj.parents('.analysis-ul').find('.analysis-li');
          console.log($analysis)
          break;
      }

      $.each($analysis, function(index) {
        var _this = $(this);
        if (_this.hasClass('li-del')) return true;
        if (!_this.find('.analysis-li1 input').val()) {
          resolve["本题解析" + index] = _this.find('.analysis-li3').html();
        } else {
          resolve[_this.find('.analysis-li1 input').val()] = _this.find('.analysis-li3').html();
        }
      });
      // if (_this.hasClass('li-del')) return true;
      // resolve[_this.find('.analysis-li1 input').val()] = _this.find('.analysis-li3').html();
      // console.log(resolve)
      var data = {
        "pid": $element.pid,
        "qid": parseInt(qid),
        "mid": typeof(mid) == 'undefined' ? '' : parseInt(mid),
        "qResolve": resolve
      };
      return data;
    },
    getLocalTime: function(nS) {
      var now = new Date(nS);
      var year = now.getFullYear();
      var month = now.getMonth() + 1;
      var date = now.getDate();
      var hou = now.getHours();
      var min = now.getMinutes();
      return year + '年' + month + '月' + date + '日' + ' ' + hou + ':' + min;
    },
    in_array: function(i, arr) {
      return arr.indexOf(i) != -1;
    },
    //继承分数
    extendScore: function($obj, type) {
      switch (type) {
        case 1:
          var $ele = $obj.find('dt[data-type=1]');
          break;
        case 3:
          var $ele = $obj.find('div[data-type=1]');
          break;
      }
      var score = $ele.size() ? $ele.find('.score input').val() : 0;
      return Number(score);
    }
  };
}));
