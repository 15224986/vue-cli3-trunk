/**
 * el-dialog 拖拽效果
 * value  如果是 true 则开边缘检测，否则只开启顶部检测
 */
export default {
    bind(el, binding, vnode, oldVnode) {
        const dialogHeaderEl = el.querySelector('.el-dialog__header');
        const dragDom = el.querySelector('.el-dialog');
        dialogHeaderEl.style.cursor = 'move';
        dragDom.classList.add('moc-drag-dialog');
        // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
        const sty = window.getComputedStyle(dragDom, null) || dragDom.currentStyle;

        dialogHeaderEl.onmousedown = (e) => {
            // 鼠标按下，计算当前元素距离可视区的距离
            const disX = e.clientX - dialogHeaderEl.offsetLeft,
                  disY = e.clientY - dialogHeaderEl.offsetTop;
            // 获取到的值带px 正则匹配替换
            let styL,
                styT;
            // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
            if(sty.left.includes('%')) {
                styL = +document.body.clientWidth * (+sty.left.replace(/\%/g, '') / 100);
                styT = +document.body.clientHeight * (+sty.top.replace(/\%/g, '') / 100);
            }else {
                styL = +sty.left.replace(/\px/g, '');
                styT = +sty.top.replace(/\px/g, '');
            };
            document.onmousemove = function (e) {
                // 通过事件委托，计算移动的距离
                const l = e.clientX - disX;
                const t = e.clientY - disY;
                // 计算移动的距离
                let moveX = l + styL,
                    moveY = t + styT;
                // 移动当前元素
                dragDom.style.left = `${moveX}px`;
                dragDom.style.top = `${moveY}px`;
            };
            document.onmouseup = function (e) {
                /**
                 * 边缘检测
                 */
                let top =  dragDom.offsetTop,
                   styT = sty.top.replace(/\px/g, '')-0;
                if( top < 0){
                    dragDom.style.top = `${styT - top}px`;
                }
                if( binding.value === true ){
                    let left =  dragDom.offsetLeft,
                        styL = sty.left.replace(/\px/g, '')-0,
                        width = dragDom.offsetWidth,
                        height = dragDom.offsetHeight,
                        winWidth = document.body.clientWidth,
                        winHeight = document.body.clientHeight;
                    if( left < 0){
                        dragDom.style.left = `${styL - left}px`;
                    }
                    let moveX = winWidth - left - width;
                    if( moveX < 0 ){
                        dragDom.style.left = `${ styL + moveX }px`;
                    }
                    let moveY = winHeight - top - height;
                    if( moveY < 0 ){
                        dragDom.style.top = `${ styT + moveY }px`;
                    }
                }
                document.onmousemove = null;
                document.onmouseup = null;
            };
        }
    }
}
