/**
 * @ 把常用的方法，都封装成为module；
 * @ 封装公共方法
 */

// 插入数据
exports.dateFormat = function (timestamp, formats) {
  	// formats格式包括
    // 1. Y-m-d
    // 2. Y-m-d H:i:s
    // 3. Y年m月d日
    // 4. Y年m月d日 H时i分
    formats = formats || 'Y-m-d';

    var zero = function (value) {
        if (value < 10) {
            return '0' + value;
        }
        return value;
    };

    var myDate = timestamp? new Date(timestamp): new Date();

    var year = myDate.getFullYear();
    var month = zero(myDate.getMonth() + 1);
    var day = zero(myDate.getDate());

    var hour = zero(myDate.getHours());
    var minite = zero(myDate.getMinutes());
    var second = zero(myDate.getSeconds());

    return formats.replace(/Y|m|d|H|i|s/ig, function (matches) {
        return ({
            Y: year,
            m: month,
            d: day,
            H: hour,
            i: minite,
            s: second
        })[matches];
    });
};

// // 插入数据
// var arr = ["10","J","Q","K","A","2","3","4"];
// randomArrs(arr); // ["10", "J", "K", "Q", "4", "3", "A", "2"] 为随机数组
exports.randomArrs = function (a) {
    var len = a.length;
    for(var i=0;i<len;i++){
        var end = len - 1 ;
        var index = (Math.random()*(end + 1)) >> 0;
        var t = a[end];
        a[end] = a[index];
        a[index] = t;
    }
    return a;
}

/**
 * @ 查找内容 图片 路径 返回数组
 * @ 参数 X 表示 内容，返回 图片数组
 */
exports.searchImgUrl=function(x){
    //校验通过执行查找图片路径，删除
    let imgReg = /<img.*?(?:>|\/>)/gi;
    //匹配src属性
    let srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
    let arr = x.match(imgReg);
    let newArr = []
    // alert('所有已成功匹配图片的数组：'+arr);
    arr.forEach(v=>{
        let src = v.match(srcReg);
         //获取图片地址
        if(src[1]){
            //alert('已匹配的图片地址'+(i+1)+'：'+src[1]);
            if(src[1].indexOf("http://")!=-1||src[1].indexOf("https://")!=-1)// !=-1含有 ==-1不含有
            {
            }else{
            newArr.push(src[1])
            }
        }
    })
    return newArr
}








