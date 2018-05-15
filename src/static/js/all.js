$(function() {
    //阻止默认
    var cookiesArr = document.cookie.split(";");
    for (var i = 0; i < cookiesArr.length; i++) {
        if (cookiesArr[i].indexOf("user") != -1) {
            var user = cookiesArr[i].split("=");
            var userInfo = JSON.parse(decodeURIComponent(user[1]));
            var tid = userInfo.tid;
        }
    };

    //计算总分
    function totalScore(){
        var s = 0;
        $.each($('.t-stat-li'),function(){
            s += Number($(this).find('i').text());
        });
        $('.t-stat-score-total p').text(s.toFixed(2));
    }

    var hash = window.location.hash.split("/");
    var pid = hash[hash.length - 1];
    //阻止默认
    $('.mtk-contenter').on('focus', 'input', function() {
        $(this).blur();
    })

    $('.mtk-contenter').on('focus', 'div', function() {
        $(this).blur();
    })

    $('.left-input').on('click', 'span', function(ev) {
        ev.stopPropagation();
        $element = $(this).parent().parent().parent();
        var qtype = $element.attr("data-type");

        var content = $element.find(".title").html();

        var resolve = {}; //存放解析subject
        var analysis = $element.find(".analysis");
        for (var k = 0; k < analysis.length; k++) {
            var key = $(analysis[k]).find(".analysis-li1 input").val();
            var value = $(analysis[k]).find(".analysis-li3").html();
            resolve[key] = value;
        }

        //找到正确选项analysis-li1
        //<dt data-type="1" ng-attr-qid="{{question.qid}}" ng-if="question.isComposite==-1 && question.qtype==1">


        //添加选择题
        if (qtype == 1) {
            var score = $element.find('input[attr="score"]').val(); //分数
            //包含正确答案及选项
            var choices = [];
            var answer = [];
            var answerList = $element.find(".answer-li");
            for (var i = 0; i < answerList.length; i++) {
                var choice = $(answerList[i]).find(".answer").html();
                choices.push(choice);
                if ($(answerList[i]).find(".choice").hasClass('correct')) {
                    //console.log($(answerList[i]).index());
                    var index = $(answerList[i]).index();
                    answer.push(index);
                }
            };


            $.ajax({
                type: 'PUT',
                contentType: "application/json",
                url: "http://115.29.177.200/mstudy/question",
                data: JSON.stringify({
                    "pid": parseInt(pid),
                    "qtype": parseInt(qtype),
                    "tid": parseInt(tid),
                    "answer": answer,
                    "content": content,
                    "choices": choices,
                    "resolve": resolve,
                    "score": parseInt(score)
                }),
                success: function(data) {
                    if (data.ret == 1) {
                        //添加成功
                        var html = "<div class='ui-sortable-handle'><dt data-type='1' qid=" + data.con.qid + "></dt></div>";
                        html = $(html).find("dt").append($element.html()).end();
                        $(".pinput-dl").append(html);

                        $(".pinput-dl").find("dt").last().find(".pinput-item-opt span").replaceWith('<a class="del" href="javascript:;"></a><a class="show" href="javascript:;"></a>');

                        var qIndex = $(".pinput-dl").find("dt").length; //题序
                        $(".pinput-dl").find("dt").last().find("span.tit").text($(".pinput-dl").find("dt").length+'.');

                        var oLi = '<li class="t-stat-li" tit="' + qIndex + '">' + '<span class="t-stat-tit fl">' + qIndex + '. </span>' + '<span class="t-stat-score fl"><i>' + score + '</i>分</span></li>';
                        $(".t-stat .scroll").append(oLi);

                        //计算总分
                        totalScore();
                        //更改题序
                        var top = $(".pinput-dl").find("dt").last().offset().top;
                        $('body').animate({
                            'scrollTop': top
                        }, 800);

                    }
                }
            })
        };


        //第二种题型qtype==2
        if (qtype == 2) {
            var score = $element.find('.pinput-problem-info input').val();
            var choices = [];
            choices[0] = [];
            choices[1] = [];
            var answerList = $element.find(".answer-li");
            for (var i = 0; i < answerList.length; i++) {
                var itemType = $(answerList[i]).find(".reply").attr("item-type");
                itemType = parseInt(itemType);
                choices[0].push(itemType);
                var sscore = $(answerList[i]).find("input").val();
                sscore = parseFloat(sscore);
                choices[1].push(sscore);

            };

            $.ajax({
                type: 'PUT',
                contentType: "application/json",
                url: "http://115.29.177.200/mstudy/question",
                data: JSON.stringify({
                    "pid": parseInt(pid),
                    "qtype": parseInt(qtype),
                    "tid": parseInt(tid),
                    "content": content,
                    "choices": choices,
                    "resolve": resolve,
                    "score": parseInt(score)
                }),
                success: function(data) {
                    if (data.ret == 1) {
                        //添加成功
                        var html = "<div class='ui-sortable-handle'><dt data-type='2' qid=" + data.con.qid + "></dt></div>";

                        html = $(html).find("dt").append($element.html()).end();
                        $(".pinput-dl").append(html);

                        $(".pinput-dl").find("dt").last().find(".pinput-item-opt span").replaceWith('<a class="del" href="javascript:;"></a><a class="show" href="javascript:;"></a>');
                        var qIndex = $(".pinput-dl").find("dt").length; //题序
                        $(".pinput-dl").find("dt").last().find("span.tit").text($(".pinput-dl").find("dt").length+'.');

                        var oLi = '<li class="t-stat-li" tit="' + qIndex + '">' + '<span class="t-stat-tit fl">' + qIndex + '. </span>' + '<span class="t-stat-score fl"><i>' + score + '</i>分</span></li>';
                        $(".t-stat .scroll").append(oLi);
                        //计算总分
                        totalScore();
                        //更改题序
                        var top = $(".pinput-dl").find("dt").last().offset().top;
                        $('body').animate({
                            'scrollTop': top
                        }, 800);


                    } else {
                        alert("添加失败!")
                    }
                }
            })
        };

        if (qtype == 3) {
            var content = $element.find('div[attr="material"]').html();
            //先调用新增复合题的接口
            $.ajax({
                type: 'PUT',
                contentType: "application/json",
                url: "http://115.29.177.200/mstudy/stem",
                data: JSON.stringify({
                    "pid": parseInt(pid),
                    "tid": parseInt(tid),
                    "content": content
                }),
                success: function(data) {
                    //子题存在多个，需要循环
                    var qsid = data.con.qsid;
                    if (data.ret == 1) {
                        //调用新增子题接口，需判断子题类型
                        //根据子题类型传递参数
                        $ele = $element.find(".pinput-question"); //找到当前子题的最外层的包裹元素

                        var html = "<div class='ui-sortable-handle'><dt data-type='3' qsid=" + data.con.qsid + "></dt></div>";

                        $dt = $(html).find("dt").append($element.html()).end();
                        $(".pinput-dl").append($dt);
                        $(".pinput-dl").find("dt").last().find(".pinput-item-opt span").replaceWith('<a class="del" href="javascript:;"></a><a class="show" href="javascript:;"></a>');
                        var qIndex = $(".pinput-dl").find("dt").length; //题序
                        $(".pinput-dl").find("dt").last().find(".pinput-item span.tit").text(qIndex+'.');
                        var $stit = $(".pinput-dl").find("dt").last().find(".pinput-question"); //子题列表
                        //console.log($ele);
                        //计算总分
                        totalScore();
                        //循环获取每一道子题
                        for (var j = 0; j < $ele.length; j++) {
                            var $target = $($ele[j]); //当前子题
                            var stype = $target.attr("data-type"); //子题类型
                            var score = $target.find('.score input').val(); //子题分数
                            var content = $target.find('div[attr="title"]').html(); //子题内容

                            var resolve = {}; //存放解析subject
                            var analysis = $target.find(".analysis");
                            var resolve = {};
                            for (var k = 0; k < analysis.length; k++) {
                                var key = $(analysis[k]).find(".analysis-li1 input").val();
                                var value = $(analysis[k]).find(".analysis-li3").html();
                                resolve[key] = value;
                            };


                            var sIndex = 0; //子题索引

                            if (stype == 1) {
                                //包含正确答案及选项

                                var choices = [];
                                var answer = [];
                                var answerList = $target.find(".answer-li");
                                for (var i = 0; i < answerList.length; i++) {
                                    var choice = $(answerList[i]).find(".answer").html();
                                    choices.push(choice);
                                    if ($(answerList[i]).find(".choice").hasClass('correct')) {
                                        //console.log($(answerList[i]).index());
                                        var index = $(answerList[i]).index();
                                        answer.push(index);
                                    }
                                };

                                $.ajax({
                                    type: 'PUT',
                                    contentType: "application/json",
                                    url: "http://115.29.177.200/mstudy/question/item",
                                    data: JSON.stringify({
                                        "pid": parseInt(pid),
                                        "qtype": parseInt(stype),
                                        "tid": parseInt(tid),
                                        "qsid": qsid,
                                        "answer": answer,
                                        "content": content,
                                        "choices": choices,
                                        "resolve": resolve,
                                        "score": parseInt(score)
                                    }),
                                    success: function(data) {

                                        if (data.ret == 1) {
                                            //添加成功
                                            sIndex++;
                                            //有问题
                                            var Index = qIndex + '-' + sIndex;
                                            $stit.eq(sIndex - 1).find(".pinput-problem-info .tit").text(qIndex + '-' + sIndex + '.');
                                            //右侧很丑的导航条
                                            var oLi = '<li class="t-stat-li" tit="' + qIndex + '-' + j + '">' + '<span class="t-stat-tit fl">' + qIndex + '-' + sIndex + '. </span>' + '<span class="t-stat-score fl"><i>' + score + '</i>分</span></li>';
                                            $(".t-stat .scroll").append(oLi);
                                            //更改题序
                                            var top = $(".pinput-dl").find("dt").last().offset().top;
                                            $('body').animate({
                                                'scrollTop': top
                                            }, 800);

                                        }
                                    }
                                })
                            };

                            if (stype == 2) {
                                var choices = [];
                                choices[0] = [];
                                choices[1] = [];
                                var answerList = $target.find(".answer-li");

                                for (var i = 0; i < answerList.length; i++) {
                                    var itemType = $(answerList[i]).find(".reply").attr("item-type");
                                    itemType = parseInt(itemType);
                                    choices[0].push(itemType);
                                    var sscore = $(answerList[i]).find("input").val();
                                    sscore = parseInt(sscore);
                                    choices[1].push(sscore);

                                };


                                $.ajax({
                                    type: 'PUT',
                                    contentType: "application/json",
                                    url: "http://115.29.177.200/mstudy/question/item",
                                    data: JSON.stringify({
                                        "pid": parseInt(pid),
                                        "qtype": parseInt(stype),
                                        "tid": parseInt(tid),
                                        "qsid": qsid,
                                        "content": content,
                                        "choices": choices,
                                        "resolve": resolve
                                    }),
                                    success: function(data) {
                                        if (data.ret == 1) {
                                            sIndex++;
                                            var Index = qIndex + '-' + sIndex;
                                            $stit.eq(sIndex - 1).find(".pinput-problem-info .tit").text(qIndex + '-' + sIndex + '.');

                                            var oLi = '<li class="t-stat-li" tit="' + qIndex + '-' + j + '">' + '<span class="t-stat-tit fl">' + qIndex + '-' + sIndex + '. </span>' + '<span class="t-stat-score fl"><i>' + score + '</i>分</span></li>';
                                            $(".t-stat .scroll").append(oLi);
                                            //更改题序
                                            var top = $(".pinput-dl").find("dt").last().offset().top;
                                            $('body').animate({
                                                'scrollTop': top
                                            }, 800);


                                        } else {
                                            alert("添加失败!");
                                        }
                                    }
                                })
                            };
                        }

                    }

                }
            })
        }
    });


    $('.left-input').on('click', '.pinput-item-slide', function() {
        var $dt = $(this).parents('dt');
        $dt.toggleClass('sort');
        $dt.find('.pinput-item-slide').toggleClass('pinput-item-slide-a');
        $dt.find('.pinput-item-main').toggle();
        $dt.find('.pinput-item-opt').toggle();
    })

    $(".paperName .toggle").on('click',function() {
        if ($(".paperName .toggle").text().trim() == "收起") {
            $('.left-input').find('.pinput-item-slide').addClass('pinput-item-slide-a');
            $('.left-input').find('.pinput-item-main').css("display","none");
            $('.left-input').find('.pinput-item-opt').css("display","none");
            $(".paperName .toggle").text("展开")
        } else {
            $('.left-input').find('.pinput-item-slide').removeClass('pinput-item-slide-a');
            $('.left-input').find('.pinput-item-main').css("display","block");
            $('.left-input').find('.pinput-item-opt').css("display","block");
            $(".paperName .toggle").text("收起")
        }
    })


})
