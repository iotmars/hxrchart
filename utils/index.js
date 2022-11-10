
export function changeUnitV2 (num) {
  function toThousands (num, decimals, dec_point, thousands_sep) {
    /*
     * 参数说明：
     * num：要格式化的数字
     * decimals：保留几位小数
     * dec_point：小数点符号
     * thousands_sep：千分位符号
     * */
    num = (num + '').replace(/[^0-9+-Ee.]/g, '');
    var n = !isFinite(+num) ? 0 : +num,
      prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
      sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
      dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
      s = '',
      toFixedFix = function (n, prec) {
        var k = Math.pow(10, prec);
        return '' + Math.ceil(n * k) / k;
      };

    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    var re = /(-?\d+)(\d{3})/;
    while (re.test(s[0])) {
      s[0] = s[0].replace(re, "$1" + sep + "$2");
    }

    if ((s[1] || '').length < prec) {
      s[1] = s[1] || '';
      s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
  }
  function tenThousand (num, w) {
    return (((num * 0.0001) * 10) / 10).toFixed(w)
  }
  var lsarr = [
    num,
    tenThousand(num, 2),
    toThousands(tenThousand(num, 2),2),
    toThousands(num),
    tenThousand(num, 0),
    toThousands(tenThousand(num, 0)),
    toThousands(num),
  ]
  return lsarr
}

export function isNumber(val){
  let regPos = /^(\-|\+)?\d+(\.\d+)?$/;
  if (regPos.test(val)){
    return true
  }else{
    return false
  }
}

export function numberReplace (r, v, f) {
  let format = f
  let nullReplace = r
  let res = v

  let nr = '--'
  if (typeof (r) === 'string') {
    nr = nullReplace
  }
  let regPos = /^[0-9]+.?[0-9]*/
  if (res < 0) {
    var lsres = Math.abs(res);
    if (regPos.test(lsres)) {
      if (format) {
        
        res = changeUnitV2(res)[format]
      }
    } else {
      res = nr
    }
  } else {
    if (regPos.test(res)) {
      if (format) {
        res = changeUnitV2(res)[format]
      }
    } else {
      res = nr
    }
  }

  return res

}

/**
 * 获取当前周
 * 
 */

export function getCurrentWeek (date) {
  let num;
  var time, checkDate = new Date(date.getTime());
  // Find Thursday of this week starting on Monday
  checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));
  let year = checkDate.getFullYear()
  time = checkDate.getTime();
  checkDate.setMonth(0); // Compare with Jan 1
  checkDate.setDate(1);
  num = Math.floor(Math.round((time - checkDate) / 86400000) / 7)
  return year + '-' + (num + 1);
}
/**
 * 获取上周
 * 
 */
export function getLastWeek (date) {
  let d1 = new Date(date.setTime(date.getTime() - 7 * 24 * 60 * 60 * 1000));
  let num = getCurrentWeek(d1)
  return num;
}

/**
 * 获取前一天
 * @param date
 */
export function getYesterday (date) {
  let day = new Date(date);
  let yesterday = ''
  day.setTime(day.getTime() - 24 * 60 * 60 * 1000);
  yesterday = day.getFullYear() + "-" + prefixInteger((day.getMonth() + 1)) + "-" + prefixInteger(day.getDate());
  return yesterday
}

export function prefixInteger (num) {
  return (Array(2).join(0) + num).slice(-2);
}
/**
 * 判断两个日期是否是同一天
 * @param date
 * @param antherDate
 */
export function judgeSameDay (date, antherDate) {
  return date.getFullYear() === antherDate.getFullYear() && date.getMonth() === antherDate.getMonth() && date.getDate() === antherDate.getDate();
}

/**
 * 数字递增效果
 * @param target
 * @param startVal
 * @param endVal
 * @param decimals
 * @param duration
 * @param options
 * options:{
      useEasing: true,  // 过渡动画效果，默认ture
      useGrouping: true,  // 千分位效果，例：1000->1,000。默认true
      separator: ',',   // 使用千分位时分割符号
      decimal: '.',   // 小数位分割符号
      prefix: '',    // 前置符号
      suffix: ''    // 后置符号，可汉字
  }
  new CountUp('num1', 0, 123456789, 0, 2,this.options)
 */

export function CountUp (target, startVal, endVal, decimals, duration, options) {
  var self = this;
  self.version = function () {
    return "1.9.2"
  };
  self.options = {
    useEasing: true,
    useGrouping: true,
    separator: ",",
    decimal: ".",
    easingFn: easeOutExpo,
    formattingFn: formatNumber,
    prefix: "",
    suffix: "",
    numerals: []
  };
  if (options && typeof options === "object") {
    for (var key in self.options) {
      if (options.hasOwnProperty(key) && options[key] !== null) {
        self.options[key] = options[key]
      }
    }
  }
  if (self.options.separator === "") {
    self.options.useGrouping = false
  } else {
    self.options.separator = "" + self.options.separator
  }
  var lastTime = 0;
  var vendors = ["webkit", "moz", "ms", "o"];
  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + "RequestAnimationFrame"];
    window.cancelAnimationFrame = window[vendors[x] + "CancelAnimationFrame"] || window[vendors[x] + "CancelRequestAnimationFrame"]
  }
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function (callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function () {
        callback(currTime + timeToCall)
      },
        timeToCall);
      lastTime = currTime + timeToCall;
      return id
    }
  }
  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function (id) {
      clearTimeout(id)
    }
  }
  function formatNumber (num) {
    num = num.toFixed(self.decimals);
    num += "";
    var x, x1, x2, x3, i, l;
    x = num.split(".");
    x1 = x[0];
    x2 = x.length > 1 ? self.options.decimal + x[1] : "";
    if (self.options.useGrouping) {
      x3 = "";
      for (i = 0, l = x1.length; i < l; ++i) {
        if (i !== 0 && ((i % 3) === 0)) {
          x3 = self.options.separator + x3
        }
        x3 = x1[l - i - 1] + x3
      }
      x1 = x3
    }
    if (self.options.numerals.length) {
      x1 = x1.replace(/[0-9]/g,
        function (w) {
          return self.options.numerals[+ w]
        });
      x2 = x2.replace(/[0-9]/g,
        function (w) {
          return self.options.numerals[+ w]
        })
    }
    return self.options.prefix + x1 + x2 + self.options.suffix
  }
  function easeOutExpo (t, b, c, d) {
    return c * (- Math.pow(2, -10 * t / d) + 1) * 1024 / 1023 + b
  }
  function ensureNumber (n) {
    return (typeof n === "number" && !isNaN(n))
  }
  self.initialize = function () {
    if (self.initialized) {
      return true
    }
    self.error = "";
    self.d = (typeof target === "string") ? document.getElementById(target) : target;
    if (!self.d) {
      self.error = "[CountUp] target is null or undefined";
      return false
    }
    self.startVal = Number(startVal);
    self.endVal = Number(endVal);
    if (ensureNumber(self.startVal) && ensureNumber(self.endVal)) {
      self.decimals = Math.max(0, decimals || 0);
      self.dec = Math.pow(10, self.decimals);
      self.duration = Number(duration) * 1000 || 2000;
      self.countDown = (self.startVal > self.endVal);
      self.frameVal = self.startVal;
      self.initialized = true;
      return true
    } else {
      self.error = "[CountUp] startVal (" + startVal + ") or endVal (" + endVal + ") is not a number";
      return false
    }
  };
  self.printValue = function (value) {
    var result = self.options.formattingFn(value);
    if (self.d.tagName === "INPUT") {
      this.d.value = result
    } else {
      if (self.d.tagName === "text" || self.d.tagName === "tspan") {
        this.d.textContent = result
      } else {
        this.d.innerHTML = result
      }
    }
  };
  self.count = function (timestamp) {
    if (!self.startTime) {
      self.startTime = timestamp
    }
    self.timestamp = timestamp;
    var progress = timestamp - self.startTime;
    self.remaining = self.duration - progress;
    if (self.options.useEasing) {
      if (self.countDown) {
        self.frameVal = self.startVal - self.options.easingFn(progress, 0, self.startVal - self.endVal, self.duration)
      } else {
        self.frameVal = self.options.easingFn(progress, self.startVal, self.endVal - self.startVal, self.duration)
      }
    } else {
      if (self.countDown) {
        self.frameVal = self.startVal - ((self.startVal - self.endVal) * (progress / self.duration))
      } else {
        self.frameVal = self.startVal + (self.endVal - self.startVal) * (progress / self.duration)
      }
    }
    if (self.countDown) {
      self.frameVal = (self.frameVal < self.endVal) ? self.endVal : self.frameVal
    } else {
      self.frameVal = (self.frameVal > self.endVal) ? self.endVal : self.frameVal
    }
    self.frameVal = Math.round(self.frameVal * self.dec) / self.dec;
    self.printValue(self.frameVal);
    if (progress < self.duration) {
      self.rAF = requestAnimationFrame(self.count)
    } else {
      if (self.callback) {
        self.callback()
      }
    }
  };
  self.start = function (callback) {
    if (!self.initialize()) {
      return
    }
    self.callback = callback;
    self.rAF = requestAnimationFrame(self.count)
  };
  self.pauseResume = function () {
    if (!self.paused) {
      self.paused = true;
      cancelAnimationFrame(self.rAF)
    } else {
      self.paused = false;
      delete self.startTime;
      self.duration = self.remaining;
      self.startVal = self.frameVal;
      requestAnimationFrame(self.count)
    }
  };
  self.reset = function () {
    self.paused = false;
    delete self.startTime;
    self.initialized = false;
    if (self.initialize()) {
      cancelAnimationFrame(self.rAF);
      self.printValue(self.startVal)
    }
  };
  self.update = function (newEndVal) {
    if (!self.initialize()) {
      return
    }
    newEndVal = Number(newEndVal);
    if (!ensureNumber(newEndVal)) {
      self.error = "[CountUp] update() - new endVal is not a number: " + newEndVal;
      return
    }
    self.error = "";
    if (newEndVal === self.frameVal) {
      return
    }
    cancelAnimationFrame(self.rAF);
    self.paused = false;
    delete self.startTime;
    self.startVal = self.frameVal;
    self.endVal = newEndVal;
    self.countDown = (self.startVal > self.endVal);
    self.rAF = requestAnimationFrame(self.count)
  };
  if (self.initialize()) {
    self.printValue(self.startVal)
  }
};

/*根据当前页面地址跳转到另一模板页面*/
export function jumpTo (path) {
  let pathTo = ''
  if (path.indexOf('commonA') > -1) {
    pathTo = '/common/commonB'
  } else {
    pathTo = '/common/commonA'
  }
  return pathTo
}

export function removeStorage () {
  window.localStorage.removeItem('jobId')
  window.localStorage.removeItem('jobName')
  window.localStorage.removeItem('inTime')
  window.sessionStorage.removeItem('power')
  window.localStorage.removeItem('token')
  window.localStorage.removeItem('webId')
  window.localStorage.removeItem('webName')
  window.sessionStorage.removeItem('webPower')
  window.localStorage.removeItem('webToken')
  window.sessionStorage.removeItem('pageCode')
}

export function getQueryString (name) {
  let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  if (window.location.hash.indexOf("?") < 0) {
    return null;
  }
  let r = window.location.hash.split("?")[1].match(reg);
  if (r != null) return decodeURIComponent(r[2]);
  return null;
}