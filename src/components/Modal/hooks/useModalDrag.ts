import { useTimeout } from "@vueuse/core";
import { watchEffect } from "vue";

interface ElementProps extends Element {
  offsetLeft: number;
  offsetTop: number;
  offsetWidth: number;
  offsetHeight: number;
  style: Record<string, string>;
  onmousedown: (e: MouseEvent) => void;
  onmouseup: () => void;
}

/**
 * Modal拖拽
 */
export function useModalDragMove() {
  const { ready, start } = useTimeout(30, { controls: true });

  // 单个拖拽逻辑
  const dragItem = (wrap: Element) => {
    if (!wrap) return;
    const dragDom = wrap.querySelector('.ant-modal') as ElementProps;
    const dragHeaderElm = wrap.querySelector('.ant-modal-header') as ElementProps;
    if (!dragHeaderElm || !dragDom) return;

    // 头部鼠标样式改为move
    dragHeaderElm.style.cursor = 'move';
    // 去除modal中的下填充
    dragDom.style.paddingBottom = '0';

    // 头部添加鼠标按下
    dragHeaderElm.onmousedown = e => {
      // 获取鼠标按下时的坐标
      const startX = e.clientX;
      const startY = e.clientY;

      const screenWidth = document.body.clientWidth; // body当前宽度
      const screenHeight = document.documentElement.clientHeight; // 可见区域高度

      // 对话框宽高
      const dragDomWidth = dragDom.offsetWidth;
      const dragDomHeight = dragDom.offsetHeight;

      // 边界值
      const minDragDomLeft = dragDom.offsetLeft;
      const maxDragDomLeft = screenWidth - dragDom.offsetLeft - dragDomWidth;
      const minDragDomTop = dragDom.offsetTop;
      const maxDragDomTop = screenHeight - dragDom.offsetTop - dragDomHeight;

      // 获取左和上样式值
      const domLeft = getComputedStyle(dragDom).left;
      const domTop = getComputedStyle(dragDom).top;
      let styL = Number(domLeft);
      let styT = Number(domTop);

      // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
      if (domLeft.includes('%')) {
        styL = +document.body.clientWidth * (+domLeft.replace(/%/g, '') / 100);
        styT = +document.body.clientHeight * (+domTop.replace(/%/g, '') / 100);
      } else {
        styL = +domLeft.replace(/px/g, '');
        styT = +domTop.replace(/px/g, '');
      }

      document.onmousemove = function (e) {
        // 通过事件委托，计算移动的距离
        let left = e.clientX - startX;
        let top = e.clientY - startY;

        // 边界处理
        if (-left > minDragDomLeft) {
          left = -minDragDomLeft;
        } else if (left > maxDragDomLeft) {
          left = maxDragDomLeft;
        }

        if (-top > minDragDomTop) {
          top = -minDragDomTop;
        } else if (top > maxDragDomTop) {
          top = maxDragDomTop;
        }

        // 移动当前元素
        dragDom.style.cssText += `;left:${left + styL}px;top:${top + styT}px;`;
      };

      // 鼠标松开清除
      document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    };

    /**
     * 防止松开鼠标时，拖拽解除失效
     */
    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;
    };
  };

  // 处理拖拽
  const handleDrag = () => {
    const dragWraps = document.querySelectorAll('.ant-modal-wrap');
    for (const wrap of Array.from(dragWraps)) {
      if (!wrap) continue;
      const display = getComputedStyle(wrap).display;
      if (display !== 'none') {
        // 开启拖拽
        dragItem(wrap);
      }
    }
  };

  watchEffect(() => {
    start();
    if (ready) handleDrag();
  });
}
