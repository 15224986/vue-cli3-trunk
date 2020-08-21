const Mock = require('mockjs');
const Random = Mock.Random;

Random.extend({
    constellation: function(date) {
        var constellations = ['白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座']
        return this.pick(constellations)
    },
    teaye: function(date) {
        var constellations = ["垃圾短信", "垃圾彩信", "RCS", "骚扰电话", "骚扰诈骗场景识别", "自定义流程", "事件链"]
        return this.pick(constellations)
    }
})

export default Random;

