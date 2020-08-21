export default {
    install: function (Vue, options) {
        // v-dialogDrag: 弹窗拖拽
		Vue.directive('mocDialogDrag', {
		    bind(el, binding, vnode, oldVnode) {
		        const dialogHeaderEl = el.querySelector('.el-dialog__header');
		        const dragDom = el.querySelector('.el-dialog');
		        dialogHeaderEl.style.cursor = 'move';
                dragDom.classList.add('moc-drag-dialog');
		        // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
		        const sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null);

		        dialogHeaderEl.onmousedown = (e) => {
		            // 鼠标按下，计算当前元素距离可视区的距离
		            const disX = e.clientX - dialogHeaderEl.offsetLeft;
		            const disY = e.clientY - dialogHeaderEl.offsetTop;

		            // 获取到的值带px 正则匹配替换
		            let styL, styT;

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

		                // 获取弹出框距离顶部和左侧的距离
		                let dragDomX = dragDom.offsetLeft,
		                    dragDomY = dragDom.offsetTop;
		                // 计算移动的距离
		                let moveX = l + styL,
		                    moveY = t + styT,
		                    top = sty.top.replace(/\px/g, '')-0,
		                    left = sty.left.replace(/\px/g, '')-0;
		                /**
		                 * 边缘检测
		                 */
		                if(dragDomX<=0&&moveX<left){
		                    moveX = left;
		                }
		                if(dragDomY<=0 && moveY<top){
		                    moveY = top;
		                }
		                // 移动当前元素
		                dragDom.style.left = `${moveX}px`;
		                dragDom.style.top = `${moveY}px`;
		            };

		            document.onmouseup = function (e) {
		                document.onmousemove = null;
		                document.onmouseup = null;
		            };
		        }
		    }
		})
    }
}