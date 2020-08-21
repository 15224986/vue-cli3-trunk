<template>
    <!-- template 只可以存在一个根组件 -->
    <div class="page-container">
        # github

        #### github 创建项目
        echo "# XXX >> README.md                                // 添加结尾
        git init                                                // 把这个目录变成Git可以管理的仓库
        git add README.md                                       // 文件添加到仓库
        git commit -m "first commit"                            // 添加注释
        git remote add origin git@github.com:15224986/moc.git   // 关联远程仓库
        git push -u origin master                               // 把本地库的所有内容推送到远程库上

        #### github 更新项目
        git add .                       // 不但可以跟单一文件，还可以跟通配符，更可以跟目录。一个点就把当前目录下所有未追踪的文件全部add了
        git commit -m "项目说明.md"      // 添加注释
        git push                        // 上传本地代码
    </div>
</template>

<script>
    // 执行逻辑
    export default {
        /**
         * 组件的名字
         */
        name: 'HelloWorld',
        /**
         * vue-router 组件内的守卫
         */
        beforeRouteEnter (to, from, next) {
            // 在渲染该组件的对应路由被 confirm 前调用
            // 不！能！获取组件实例 `this`
            // 因为当守卫执行前，组件实例还没被创建
            console.log("beforeRouteEnter");
            next();
        },
        beforeRouteUpdate (to, from, next) {
            // 在当前路由改变，但是该组件被复用时调用
            // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
            // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
            // 可以访问组件实例 `this`
            console.log("beforeRouteUpdate");
            next();
        },
        beforeRouteLeave (to, from, next) {
            // 导航离开该组件的对应路由时调用
            // 可以访问组件实例 `this`
            console.log("beforeRouteLeave");
            next();
        },
        /**
         * 组件的注册表
         */
        components: {
            /* 包含 Vue 实例可用组件的注册表。 */
            
        },
        /**
         * 数据
         */
        data() {
            return {
                
            }
        },
        /**
         * props 可以是数组或对象，用于接收来自父组件的数据。
         */
        props:{
            
        },
        /**
         * VUE 的钩子
         * 1.beforeCreate --- created 
         * 2.beforeMount --- mounted 
         * 3.beforeUpdate --- updated 
         * 4.beforeDestroy --- destroyed
         *
         * vue 生命周期 详解
         * 
         * Vue实例有一个完整的生命周期，也就是从开始创建、初始化数据、编译模板、挂载Dom、渲染→更新→渲染、销毁等一系列过程，我们称这是Vue的生命周期。
         * 通俗说就是Vue实例从创建到销毁的过程，就是生命周期。
         * 每一个组件或者实例都会经历一个完整的生命周期，总共分为三个阶段：初始化、运行中、销毁。
         *
         * 1.实例、组件通过new Vue() 创建出来之后会初始化事件和生命周期，然后就会执行beforeCreate钩子函数，
         *   这个时候，数据还没有挂载呢，只是一个空壳，无法访问到数据和真实的dom，一般不做操作
         *   
         * 2.挂载数据，绑定事件等等，然后执行created函数，这个时候已经可以使用到数据，也可以更改数据,在这里更改数据不会触发updated函数，
         *   在这里可以在渲染前倒数第二次更改数据的机会，不会触发其他的钩子函数，一般可以在这里做初始数据的获取
         *   
         * 3.接下来开始找实例或者组件对应的模板，编译模板为虚拟dom放入到render函数中准备渲染，然后执行beforeMount钩子函数，
         *   在这个函数中虚拟dom已经创建完成，马上就要渲染,在这里也可以更改数据，不会触发updated，在这里可以在渲染前最后一次更改数据的机会，
         *   不会触发其他的钩子函数，一般可以在这里做初始数据的获取
         *   
         * 4.接下来开始render，渲染出真实dom，然后执行mounted钩子函数，此时，组件已经出现在页面中，
         *   数据、真实dom都已经处理好了,事件都已经挂载好了，可以在这里操作真实dom等事情...
         *
         * 5.当组件或实例的数据更改之后，会立即执行beforeUpdate，
         *   然后vue的虚拟dom机制会重新构建虚拟dom与上一次的虚拟dom树利用diff算法进行对比之后重新渲染，一般不做什么事儿
         *
         * 6.当更新完成后，执行updated，数据已经更改完成，dom也重新render完成，可以操作更新后的虚拟dom.
         *
         * 7.当经过某种途径调用$destroy方法后，立即执行beforeDestroy，一般在这里做一些善后工作，例如清除计时器、清除非指令绑定的事件等等
         *
         * 8.组件的数据绑定、监听...去掉后只剩下dom空壳，这个时候，执行destroyed，在这里做善后工作也可以
         * 
         */
        beforeCreate() {
            // el 和 data 并未初始化
            // 举个栗子：可以在这加个loading事件
        },
        created() {
            // 完成了 data 数据的初始化，el没有
            // 在这结束loading，还做一些初始化，实现函数自执行
            
            /**
             * Axios API地址  https://www.kancloud.cn/yunye/axios/234845
             */
            var url="../static/json/vueData.json"; 
            // var url="https://www.wwtliu.com/sxtstu/blueberrypai/getIndexBanner.php";
            this.$axios.get(url).then((response)=> {
                    console.log(response.data);
                }).catch((error)=> {
                    console.log(error);
                });

            // 带有参数
            // var url="https://www.wwtliu.com/sxtstu/news/juhenews.php?type=junshi&count=30";
            // this.$axios.get(url).then(function (response) {
            //         console.log(response.data.result.data);
            //     }).catch(function (error) {
            //         console.log(error);
            //     });
            
            // 可选地，上面的请求可以这样做
            var self = this;
            self.$axios.get('https://www.wwtliu.com/sxtstu/news/juhenews.php', {
                    params: {
                        type: "junshi",
                        count: 30
                    }
                }).then(function (response) {
                    self.axiosArray = response.data.result.data;
                    // console.log(response.data.result.data);
                }).catch(function (error) {
                    console.log(error);
                });

            /**
             * post 请求数据
             */
            // var url="/sxtstu/blueberrypai/login.php";
            // this.$axios.post(url, {
            //         user_id:"iwen@qq.com",
            //         passwoed:"iwen123",
            //         verification_code:"crfvw"
            //     }).then(function (response) {
            //         console.log(response);
            //     }).catch(function (error) {
            //         console.log(error);
            //     });
            
            /**
             * 跨域加载豆瓣数据
             * http://api.douban.com/v2/movie/top250?start=25&count=25 
             * 
             * this.HOST = /api = http://api.douban.com/v2
             * /api是在config>index.js文件中的proxyTable里面添加的通用路径
             * 在main.js文件中，将/api配置到vue的HOST上面
             */
            var doubanUrl = this.HOST + "/movie/top250";
            self.$axios.get( doubanUrl , {
                    params: {
                        count: 30,
                        start: 0
                    }
                }).then(function (response) {
                    // console.log(response.data.subjects);
                    self.doubanArray = response.data.subjects;
                }).catch(function (error) {
                    console.log(error);
                });
            
            /**
             * mock 数据模拟库
             */
            self.$axios.post("/news/index").then(function (res){
                self.mockArray = res.data;
                // console.log(res.data);
            }).catch(function (err){
                console.log("err")
            });
        },
        beforeMount() {
            // 完成了 el 和 data 初始化 

        },
        mounted() {
            // 完成挂载
            // 在这发起后端请求，拿回数据，配合路由钩子做一些事情
            window.addEventListener('scroll', this.handleScroll); //监听页面滚动事件
        },
        beforeUpdate: function () {
            
        },
        updated: function () {
            
        },
        beforeDestroy: function () {
            
        },
        destroyed: function () {
            // 这样写在当前页面是没有任何问题的，但是同事发现从我的这个页面跳转到他的页面的时候，
            // 随着页面滚动报了很多错，思前想后，结合vue的原理发现，vue是所有对象方法都是基于window的。
            // 那么就要用到vue的destroyed钩子函数来销毁这个事件监听。
            

            window.removeEventListener('scroll', this.handleScroll); //监听页面滚动事件
        },
        /**
         * 自定义指令（ 局部 ）
         */
        directives:{
            autofocus: {
                inserted: function (el) {
                    el.focus()
                }
            }
        },
        /**
         * 混入 (mixins) 是一种分发 Vue 组件中可复用功能的非常灵活的方式。
         * 混入对象可以包含任意组件选项。当组件使用混入对象时，所有混入对象的选项将被混入该组件本身的选项。
         */
        mixins: [],
        /**
         * 侦听器
         */
        watch: {
            /* 实时监控数据的变化 */
            // firstName: function (val) {
            //     this.firstName2 = val + ' ' + 'input'
            // }
        },
        /**
         * 过滤器
         */
        filters: {
        },
        /**
         * 计算属性
         */
        computed: {
            /**
             * computed 和 methods 的区别
             * 
             * 我们可以将同一函数定义为一个方法而不是一个计算属性。两种方式的最终结果确实是完全相同的。
             * 然而，不同的是计算属性是基于它们的依赖进行缓存的。只在相关依赖发生改变时它们才会重新求值。
             * 这就意味着只要 message 还没有发生改变，多次访问 reversedMessage 计算属性会立即返回之前的计算结果，而不必再次执行函数。
             * 
             */

            /* 计算属性将被混入到 Vue 实例中。 */
            // fullName: function () {
            //     return this.firstName+" "+"input"
            // },
            // fullName2: {
            //     // getter
            //     get: function () {
            //         return this.firstName + ' ' + this.lastName
            //     },
            //     // setter
            //     set: function (newValue) {
            //         var names = newValue.split(' ')
            //         this.firstName = names[0]
            //         this.lastName = names[names.length - 1]
            //     }
            // },
            // classObject: function () {
            //     return {
            //         active: this.isActive && !this.error,
            //         'text-danger': this.error && this.error.type === 'fatal'
            //     }
            // },
            storeVal: function () {
                return this.$store.state.count;
            },
            jianjianVal: function () {
                return this.$store.getters.getDatas;
            },
            
        },
        /*
         * 事件处理
         */
        methods :{
            getMsg(data){
                this.info = data
            },
            currentTab(){
                if( this.currentText === "keepAlive1" ){
                    this.currentText = "keepAlive2";
                    this.currentView = "keepAlive2";
                }else{
                    this.currentText = "keepAlive1";
                    this.currentView = "keepAlive1";
                } 
            },
            storeChange(){
                // this.$store.commit('countChange');
                this.$store.dispatch('countChange');
            },
            jianjianFun(){
                this.$store.commit('jianjianFun');
            },
            handleScroll(){
                console.log( $(window).scrollTop() );
            }
        }
    }
</script>

<!-- Add "scoped" 样式只在当前组件内生效 -->
<style lang="scss" scoped>
    h1,
    h2 {
      font-weight: normal;
    }
    ul {
      list-style-type: none;
      padding: 0;
    }
    li {
      display: inline-block;
      margin: 0 10px;
    }
    a {
      color: #42b983;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
    header{
        line-height: 60px;
        background-color: #fff;
    }
    header span{
        font-size: 20px;
        font-weight: 700;
        color: #ccc;
    }
    .section{
        width: 920px;
        min-height: 220px;
        padding: 10px 20px 20px;
        margin: 30px auto;
        background-color: #fff;
    }
    .section + .section{
        margin-top: 30px;

    }
    .section-tit{
        padding-bottom: 10px;
        line-height: 1.675;
    }
    input{
        height: 26px;
        line-height: 26px;
        text-indent: 4px;
    }
    .block{
        display: block;
        text-align: left;
    }
    table{
        width: 100%;
        border-collapse: collapse;
        border-spacing: 0;
        td,th{
            line-height: 32px;
            border: #eee 1px solid; 
        }
    }
    thead{
        border-bottom: #eee 2px solid;
        background-color: #f8f8f8;
    }
       
</style>
