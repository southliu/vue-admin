import { shallowRef } from "vue";

interface IOption {
  text: string;
  width?: number;
  height?: number;
}

/**
 * 水印
 * @param options - 配置
 */
export function useWatermark(options: IOption) {
  const watermarkEl = shallowRef<HTMLElement>()
  const domSymbol = Symbol('watermark-dom');
  const id = domSymbol.toString();

  function createCanvas(str: string) {
    // 去除重复水印
    if (document.getElementById(id) !== null) {
      document.body.removeChild(document.getElementById(id) as HTMLElement)
    }

    const can = document.createElement('canvas');
    const width = 300;
    const height = 240;
    Object.assign(can, { width, height });

    const cans = can.getContext('2d');
    if (cans) {
      cans.rotate((-20 * Math.PI) / 120);
      cans.font = '15px Vedana';
      cans.fillStyle = 'rgba(0, 0, 0, 0.15)';
      cans.textAlign = 'left';
      cans.textBaseline = 'middle';
      cans.fillText(str, width / 20, height);
    }
    return can.toDataURL('image/png');
  }

  function createWatermark(str: string) {
    
  }

  function clearWatermark() {

  }

  return { createWatermark, clearWatermark }
}