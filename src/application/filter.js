var myFilter = angular.module("myFilter", []);

//数字转为选项字母
myFilter.filter("createChoice", function() {
  return function(data) {
    var arr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

    //如果是数组则要循环
    if (angular.isArray(data)) {
      var result = [];
      angular.forEach(data, function(value, index, array) {
        result.push((angular.isUndefined(arr[value])) ? '' : arr[value])
      })
      return result;
    } else {
      return (angular.isUndefined(arr[data])) ? '' : arr[data];
    }

  }
})

//数组分割
myFilter.filter('arraySplit', function() {
  return function(arr, delimiter) {
    //var delimiter = ',';
    if (angular.isArray(arr) && angular.isString(delimiter)) {
      return arr.join(delimiter);
    }
    return arr;
  }
})

//过滤掉字符串中的特殊字符
myFilter.filter('escape2Html', function() {
  return function(str) {
    if ($.trim(str) !== '') {
      var arrEntities = { 'lt': '<', 'gt': '>', 'nbsp': ' ', 'amp': '&', 'quot': '"' };
      return str.replace(/&(lt|gt|nbsp|amp|quot);/ig, function(all, t) {
        return arrEntities[t];
      });
    }
    return str;
  }
})

//时间
myFilter.filter("timeFormat", function() {
  return function(str) {
    var timeNum = parseInt(str) * 1000;
    var time = new Date(timeNum);
    var year = time.getFullYear();
    var month = time.getMonth() + 1;
    var day = time.getDate();
    var hours = time.getHours();
    var minutes = time.getMinutes();
    //如果小于10就在前面补上"0";
    if (month < 10) { month = "0" + month; }
    if (day < 10) { day = "0" + day }
    if (hours < 10) { hours = "0" + hours }
    if (minutes < 10) { minutes = "0" + minutes }
    var date = year + "/" + month + "/" + day + " " + hours + ":" + minutes;
    return date;
  }
})

myFilter.filter("timeFormat1", function() {
  return function(str) {
    var timeNum = parseInt(str);
    var time = new Date(timeNum);
    var year = time.getFullYear();
    var month = time.getMonth() + 1;
    var day = time.getDate();
    var hours = time.getHours();
    var minutes = time.getMinutes();
    //如果小于10就在前面补上"0";
    if (month < 10) { month = "0" + month; }
    if (day < 10) { day = "0" + day }
    if (hours < 10) { hours = "0" + hours }
    if (minutes < 10) { minutes = "0" + minutes }
    var date = year + "/" + month + "/" + day + " " + hours + ":" + minutes;
    return date;
  }
})


//格式化不超过一天的时间,只接受秒数 不接受毫秒数
myFilter.filter('hmdFormat', ['$filter', function($filter) {
  return function(date) {
    var minutes = '';
    var hours = '';
    var seconds = '';
    var time = '';

    //如果超过一天
    if (date >= 86400) {
      //如果不为毫秒数,则转成毫秒数
      if (date.toString().length == 10) date *= 1000;
      return $filter('date')(date, 'yyyy/MM/dd HH:mm:ss');
    }
    if (date < 60) {
      seconds = date;
    } else {

      //如果在一小时内
      if (date > 60 && date < 60 * 60) {
        minutes = parseInt(date / 60);

        //如果有余数
        if (!date % 60 === 0) {
          seconds = date % 60;
        }
        //如果超过一小时
      } else {
        hours = parseInt(date / 3600);
        var num = date % 3600;

        if (!num == 0) {
          if (num < 60) {
            seconds = num;
          } else if (num > 60 && num < 60 * 60) {
            minutes = parseInt(num / 60);
            //如果有余数
            if (!num % 60 === 0) {
              seconds = num % 60;
            }
          }
        }
      }
    }
    if (!hours == '') time += hours + '小时';
    if (!minutes == '') time += minutes + '分钟';
    if (!seconds == '') time += seconds + '秒';

    return time;
  }
}])

//时间差
myFilter.filter('timeTips', function() {
  return function(data) {
    var date = parseInt(data);
    var sec = Math.ceil(new Date().getTime() / 1000) - date;
    if (sec > 60 * 60 * 24) {
      return Math.floor(sec / 60 * 60 * 24) + "天前";
    }
    if (sec > 60 * 60) {
      return Math.floor(sec / 60 / 60) + '小时前';
    }
    if (sec > 60) {
      return Math.floor(sec / 60) + '分钟前';
    }
    return '刚刚';
  };
});

myFilter.filter('removeHtml', function() {
  return function(str) {
    str = str.replace(/<\/?[^>]*>/g, ''); //去除HTML tag
    str = str.replace(/[ | ]*\n/g, '\n'); //去除行尾空白
    //str = str.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
    str = str.replace(/ /ig, ''); //去掉 
    return str;
  }
});

//过滤html
myFilter.filter('to_trusted', ['$sce', function($sce) {
  return function(text) {
    return $sce.trustAsHtml(text);
  };
}]);




/* */
myFilter.filter('imgToTrusted', ['$sce', function($sce) {
  return function(text) {
    if (angular.isString(text)) {
      var text = text.replace(/<img.*_src=\"(.*)\".*type=\"vedio\">/, "<iframe height=498 width=510 src=\"$1\" frameborder=0 allowfullscreen></iframe>")
      text = text.replace(/<img.*_src=\"(.*)\".*type=\"mp3\">/, "<audio controls src=\"$1\" style=\"margin-top:24px\"></audio>");
    }
    return $sce.trustAsHtml(text);
  };
}]);



myFilter.filter("noAnswer", function() {
  return function(str) {
    if (!str) {
      return "[学生未作答]";
    } else {
      return "";
    }
  }
})


myFilter.filter('limitword', function() {
  return function(value, wordwise, max, tail) {
    if (!value) return '';
    max = parseInt(max, 10);
    if (!max) return value;
    if (value.length <= max) return value;
    value = value.substr(0, max);
    if (wordwise) {
      var lastspace = value.lastIndexOf('');
      if (lastspace != -1) {
        value = value.substr(0, lastspace);
      }
    }
    return value + (tail || '...');
  };
})
