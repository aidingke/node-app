function settime ($el,countdown) {
    if(countdown === 0){
      $el.removeAttr('disabled')
      // $el.val('发送验证码').css('backgroundColor','#e70034')
      $el.val('获取验证码').css('backgroundColor','transparent')
    }else{
      // $el.attr('disabled', 'true').css('backgroundColor','#bfbfbf')
      $el.attr('disabled', 'true').css('backgroundColor','transparent')
      $el.val(`重新发送(${countdown}s)`)
      countdown--
      setTimeout(function() {
        settime($el,countdown)
      }, 1000);
    }
    
  }
  /**
   * 倒计时30min
   * 
   * @param {any} timeServer 
   * @param {function} callBack 
   */
  function countDown(timeServer,callBack){
    let {second,init_munite,init_second}={}
    if(timeServer>0){
      timeServer = timeServer - 1000
      init_munite = Math.floor(timeServer/60000)
      second = timeServer - init_munite*60000;
      // init_munite --;
      init_second=Math.floor(second/1000)
      init_munite= init_munite<10 ?`0${init_munite}` : init_munite
      init_second=init_second<10?`0${init_second}`: init_second
      // 
      callBack(init_munite,init_second)
      setTimeout(() => {
        countDown(timeServer,callBack)
      },1000);
    }else{
      callBack('00','00')
    }
  }
  /**
   * 添加天数
   * 
   * @param {any} date 要添加的日期
   * @param {any} days 添加的数值  默认是1
   * @returns 
   */
  function addDate (date, days = 1) {
    /*if (days === undefined || days === '') {
      days = 1
    }*/
    // var date = new Date(date);
    date.setDate(date.getDate() + days)
    var month = date.getMonth() + 1
    var day = date.getDate()
    return date.getFullYear() + '-' + this.getFormatDate(month) + '-' + this.getFormatDate(day)
  }
  /**
   * 格式化日期  yyyy-MM-dd
   * 
   * @param {any} arg 
   * @returns 
   */
  function getFormatDate (arg) {
    if (arg === undefined || arg === '') {
      return ''
    }
    var re = arg + ''
    if (re.length < 2) {
      re = '0' + re
    }
    return re
  }
  
  /**
   * 遍历日期存为数组对象
   * 
   * @param {Date} startTime 
   * @param {Date} endTime 
   * @returns 
   */
  function eachDate(startTime,endTime){
    let allDate = {}
    let index = 0
    while(endTime.getTime() - startTime.getTime() >= 0){
      let year = startTime.getFullYear()
      let month = startTime.getMonth() + 1
      let day = startTime.getDate() 
      let week = startTime.getDay()
      let objDate = {
                      day: day,
                      month: month,
                      year: year,
                      week: week,
                      date: startTime,
                      index: index
                    }
      index++
      if(allDate[`${year}年${month}月`]){
        allDate[`${year}年${month}月`].push(objDate)
      } else {
        allDate[`${year}年${month}月`] = []
        if(objDate.week > 0){
           for (let index = 0; index < objDate.week; index++) {
             allDate[`${year}年${month}月`].push({day: '',month: '',year: '',week: '',date: ''})
           }
        }
        allDate[`${year}年${month}月`].push(objDate)
      }
      startTime = this.getDate(this.addDate(startTime,1))
    }
    return allDate
  }
  
  /**
   * 2017-7-1
   * 字符串日期转Date
   * @param {any} datestr 
   * @returns 
   */
  function getDate(datestr){
    let date =  new Date(datestr.replace(/-/g, '/'))
    return date
  }
  
  function scroll(callBack){
    $(window).scroll(function(){
      let scrollTop = $(this).scrollTop()
      let scrollHeight = $(document).height()
      let windowHeight = $(this).height()
      if(scrollHeight - (scrollTop+windowHeight) < 120){
        callBack && callBack()
      }
    })
  }
  
  
  /* 获取地址栏参数 */
  function getQueryString (name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      var r = window.location.search.substr(1).match(reg);
      var context = "";
      if (r != null)
          context = r[2];
      reg = null;
      r = null;
      return context == null || context == "" || context == "undefined" ? "" : context;
  }
  export default {
    settime: settime,
    addDate: addDate,
    getFormatDate: getFormatDate,
    eachDate: eachDate,
    getDate: getDate,
    countDown: countDown,
    scroll: scroll,
    getQueryString: getQueryString,
  } 
  
  
  // WEBPACK FOOTER //
  // ./src/common/common.js