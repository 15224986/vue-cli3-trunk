const Mock = require('mockjs');
const Random = Mock.Random;
// 引入自定义工具
require('../utils.js');


// Basic
// Random.boolean( min?, max?, current? )           返回一个随机的布尔值
// Random.natural( min?, max? )                     返回一个随机的自然数（大于等于 0 的整数）
// Random.integer( min?, max? )                     返回一个随机的整数
// Random.float( min?, max?, dmin?, dmax? )         返回一个随机的浮点数
// Random.character( pool? )                        返回一个随机字符
// Random.string( pool?, min?, max? )               返回一个随机字符串
// Random.range( start?, stop, step? )              返回一个整型数组
// Date
// Random.date( format? )                           返回一个随机的日期字符串
// Random.time( format? )                           返回一个随机的时间字符串
// Random.datetime( format? )                       返回一个随机的日期和时间字符串
// Random.now( unit?, format? )                     返回当前的日期和时间字符串
// Image
// Random.image( size?, background?, foreground?, format?, text? ) 生成一个随机的图片地址
// Random.dataImage( size?, text? )                 生成一段随机的 Base64 图片编码
// Color
// Random.color()                                   随机生成一个有吸引力的颜色，格式为 '#RRGGBB'
// Random.hex()                                     随机生成一个有吸引力的颜色，格式为 '#RRGGBB'。
// Random.rgb()                                     随机生成一个有吸引力的颜色，格式为 'rgb(r, g, b)'
// Random.rgba()                                    随机生成一个有吸引力的颜色，格式为 'rgba(r, g, b, a)'
// Random.hsl()                                     随机生成一个有吸引力的颜色，格式为 'hsl(h, s, l)'
// Text
// Random.paragraph( min?, max? )                   随机生成一段文本
// Random.cparagraph( min?, max? )                  随机生成一段中文文本
// Random.sentence( min?, max? )                    随机生成一个句子，第一个单词的首字母大写
// Random.csentence( min?, max? )                   随机生成一段中文文本
// Random.word( min?, max? )                        随机生成一个单词
// Random.cword( pool?, min?, max? )                随机生成一个汉字
// Random.title( min?, max? )                       随机生成一句标题，其中每个单词的首字母大写
// Random.ctitle( min?, max? )                      随机生成一句中文标题
// Name
// Random.first()                                   随机生成一个常见的英文名
// Random.last()                                    随机生成一个常见的英文姓
// Random.name( middle? )                           随机生成一个常见的英文姓名
// Random.cfirst()                                  随机生成一个常见的中文名
// Random.clast()                                   随机生成一个常见的中文姓
// Random.cname()                                   随机生成一个常见的中文姓名
// Web
// Random.url( protocol?, host? )                   随机生成一个 URL
// Random.protocol()                                随机生成一个 URL 协议
// Random.domain()                                  随机生成一个域名
// Random.tld()                                     随机生成一个顶级域名（Top Level Domain）
// Random.email( domain? )                          随机生成一个邮件地址
// Random.ip()                                      随机生成一个 IP 地址 Address
// Random.region()                                  随机生成一个（中国）大区
// Random.province()                                随机生成一个（中国）省（或直辖市、自治区、特别行政区）
// Random.city( prefix? )                           随机生成一个（中国）市
// Random.county( prefix? )                         随机生成一个（中国）县
// Random.zip()                                     随机生成一个邮政编码（六位数字）
// Helper
// Random.capitalize( word )                        把字符串的第一个字母转换为大写
// Random.upper( str )                              把字符串转换为大写
// Random.lower( str )                              把字符串转换为小写
// Random.pick( arr )                               从数组中随机选取一个元素，并返回
// Random.shuffle( arr )                            打乱数组中元素的顺序，并返回 Miscellaneous
// Random.guid()                                    随机生成一个 GUID
// Random.id()                                      随机生成一个 18 位身份证
// Random.increment( step? )                        生成一个全局的自增整数


const produceData = function (opt) {
    let articles = [];
    for (let i = 0; i < 20; i++) {
        let newArticleObject = {
            'id': 1+i,
            'maliceId': Random.natural(),                   // 随机生成一个自然数，什么叫自然数，就是大于等于0的
            'maliceIdType': Random.constellation(),         // 调用自定义方法
            'sourceDetection': /\d{16,18}/,                 // 正则获取字符串
            'violationType': Random.cname(),                // 随机生成中文名字
            'numberAssignment': Random.pick( ['中国工商银行', '北京、移动', 'mail', '中国联通', ''] ),  // 随机获取数组中的一项
            'recognitionTime': Mock.mock('@datetime'),      // 获取时间
            'updataTime': Random.datetime(),                // 随机生成日期时间
            'score': Random.natural(1, 800),                // 随机生成1-800的数字
            'domain': Random.domain(),                      // 生成随机域名
            'ip': Random.ip(),                              // 生成随机IP
            'url': Random.url(),                            // 生成随机URL
            'province': Random.province(),                  // 生成随机省份
            'city': Random.city(),                          // 生成随机城市
            'county': Random.county(),                      // 生成在某个省份的某个城市
            // 通过Random.csentence( length )指定句子的汉字个数
            // 通过Random.csentence( min?, max? )指定句子汉字个数的范围
            'csentence': Random.csentence(),                // 生成一条随机的中文句子
            // 通过Random.cparagraph(length )指定句子的个数
            // 通过Random.cparagraph(min?, max?）指定句子的个数的范围
            'cparagraph': Random.cparagraph()               // 生成随机的中文段落

        }
        articles.push(newArticleObject)
    }
    return articles
}
let mockData = {
    'code': 200,
    'originLists|10': [
        {
            'id|+1': 1,
            'content': '@csentence()'
        }
    ],
    'dataset|5-20': [
        {
            'tenantID|+1': 1,
            'sex|1-2':1,
            'text': '@csentence()',
            'checked': '@boolean'
        }
    ],
    'pagination':{
        'current|+1': 1,
        'size': 20,
        'pages|1-150': 30
    },
    'table|5-20': [
        {
            'id|+1': 1,
            'cname': '@cname()',
            'username': /\d{16,18}/,
            'county': '@county(true)',
            'maliceIdType|1': ['手机号', 'QQ号', '微信号', '银行卡号', '邮箱', '端口号', '链接'],
            'constellation': '@constellation()',
            'recognitionTime': '@date()',
            'url': '@url()',
            'csentence':'@csentence(1,20)'
        }
    ],
    // 'table': produceData(),
    'msg': '成功'
};

export default mockData;
