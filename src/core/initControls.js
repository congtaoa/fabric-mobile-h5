import { fabric } from "fabric";
import verticalImg from '../assets/images/control/middlecontrol.svg';
import horizontalImg from '../assets/images/control/middlecontrolhoz.svg';
import edgeImg from '../assets/images/control/edgecontrol.svg';
import rotateImg from '../assets/images/control/rotateicon.svg';

const deleteIcon = "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";

const img = document.createElement('img');
img.src = verticalImg;

const img2 = document.createElement('img');
img2.src = horizontalImg;

const img3 = document.createElement('img');
img3.src = edgeImg;

const img4 = document.createElement('img');
img4.src = rotateImg;

const img5 = document.createElement('img');
img5.src = deleteIcon;

// 两边中间图标
function renderIcon(ctx, left, top, styleOverride, fabricObject) {
  const wsize = 20;
  const hsize = 25;
  ctx.save();
  ctx.translate(left, top);
  ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
  ctx.drawImage(img, -wsize / 2, -hsize / 2, wsize, hsize);
  ctx.restore();
}

// 上下中间图标
function renderIconHoz(ctx, left, top, styleOverride, fabricObject) {
  const wsize = 25;
  const hsize = 20;
  ctx.save();
  ctx.translate(left, top);
  ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
  ctx.drawImage(img2, -wsize / 2, -hsize / 2, wsize, hsize);
  ctx.restore();
}

// 四角图标
function renderIconEdge(ctx, left, top, styleOverride, fabricObject) {
  const wsize = 25;
  const hsize = 25;
  ctx.save();
  ctx.translate(left, top);
  ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
  ctx.drawImage(img3, -wsize / 2, -hsize / 2, wsize, hsize);
  ctx.restore();
}

// 旋转图标
function renderIconRotate(ctx, left, top, styleOverride, fabricObject) {
  const wsize = 40;
  const hsize = 40;
  ctx.save();
  ctx.translate(left, top);
  ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
  ctx.drawImage(img4, -wsize / 2, -hsize / 2, wsize, hsize);
  ctx.restore();
}

// 删除图标
function renderIconDel(ctx, left, top, styleOverride, fabricObject) {
  const wsize = 20;
  const hsize = 20;
  ctx.save();
  ctx.translate(left, top);
  ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
  ctx.drawImage(img5, -wsize / 2, -hsize / 2, wsize, hsize);
  ctx.restore();
}

// 删除事件
function deleteObject(eventData, transform) {
  let target = transform.target;
  let canvas = target.canvas;
  canvas.remove(target);
  canvas.requestRenderAll();
}

// 选中样式列表
function initControls(canvas) {
  // fabric.utils
  fabric.Object.prototype.controls.ml = new fabric.Control({
    x: -0.5,
    y: 0,
    offsetX: -1,
    cursorStyleHandler: fabric.controlsUtils.scaleSkewCursorStyleHandler,
    actionHandler: fabric.controlsUtils.scalingXOrSkewingY,
    getActionName: fabric.controlsUtils.scaleOrSkewActionName,
    cursorStyle: 'pointer',
    render: renderIcon
  });

  fabric.Object.prototype.controls.mr = new fabric.Control({
    x: 0.5,
    y: 0,
    offsetX: 1,
    cursorStyleHandler: fabric.controlsUtils.scaleSkewCursorStyleHandler,
    actionHandler: fabric.controlsUtils.scalingXOrSkewingY,
    getActionName: fabric.controlsUtils.scaleOrSkewActionName,
    cursorStyle: 'pointer',
    render: renderIcon
  });

  fabric.Object.prototype.controls.mb = new fabric.Control({
    x: 0,
    y: 0.5,
    offsetY: 1,
    cursorStyleHandler: fabric.controlsUtils.scaleSkewCursorStyleHandler,
    actionHandler: fabric.controlsUtils.scalingYOrSkewingX,
    getActionName: fabric.controlsUtils.scaleOrSkewActionName,
    cursorStyle: 'pointer',
    render: renderIconHoz
  });

  fabric.Object.prototype.controls.mt = new fabric.Control({
    x: 0,
    y: -0.5,
    offsetY: -1,
    cursorStyleHandler: fabric.controlsUtils.scaleSkewCursorStyleHandler,
    actionHandler: fabric.controlsUtils.scalingYOrSkewingX,
    getActionName: fabric.controlsUtils.scaleOrSkewActionName,
    cursorStyle: 'pointer',
    render: renderIconHoz
  });

  fabric.Object.prototype.controls.tl = new fabric.Control({
    x: -0.5,
    y: -0.5,
    cursorStyleHandler: fabric.controlsUtils.scaleCursorStyleHandler,
    actionHandler: fabric.controlsUtils.scalingEqually,
    cursorStyle: 'pointer',
    render: renderIconEdge
  });

  fabric.Object.prototype.controls.tr = new fabric.Control({
    x: 0.5,
    y: -0.5,
    cursorStyleHandler: fabric.controlsUtils.scaleCursorStyleHandler,
    actionHandler: fabric.controlsUtils.scalingEqually,
    cursorStyle: 'pointer',
    render: renderIconEdge
  });

  fabric.Object.prototype.controls.bl = new fabric.Control({
    x: -0.5,
    y: 0.5,
    cursorStyleHandler: fabric.controlsUtils.scaleCursorStyleHandler,
    actionHandler: fabric.controlsUtils.scalingEqually,
    cursorStyle: 'pointer',
    render: renderIconEdge
  });

  fabric.Object.prototype.controls.br = new fabric.Control({
    x: 0.5,
    y: 0.5,
    cursorStyleHandler: fabric.controlsUtils.scaleCursorStyleHandler,
    actionHandler: fabric.controlsUtils.scalingEqually,
    cursorStyle: 'pointer',
    render: renderIconEdge
  });

  fabric.Object.prototype.controls.mtr = new fabric.Control({
    x: 0,
    y: 0.5,
    cursorStyleHandler: fabric.controlsUtils.rotationStyleHandler,
    actionHandler: fabric.controlsUtils.rotationWithSnapping,
    offsetY: 30,
    withConnecton: false,
    actionName: 'rotate',
    cursorStyle: 'pointer',
    render: renderIconRotate
  });

  fabric.Object.prototype.controls.deleteControl = new fabric.Control({
    x: -0.5,
    y: -0.5,
    offsetY: 0,
    offsetX: 0,
    cursorStyle: 'pointer',
    mouseUpHandler: deleteObject,
    render: renderIconDel,
    cornerSize: 24
  });

  // Customize controls
  fabric.Object.prototype.set({
    transparentCorners: false,
    borderColor: '#51B9F9',
    cornerColor: '#FFF',
    borderScaleFactor: 2.5,
    cornerStyle: 'circle',
    cornerStrokeColor: '#0E98FC',
    borderOpacityWhenMoving: 1
  });

  canvas.selectionColor = 'rgba(46, 115, 252, 0.11)';
  canvas.selectionBorderColor = 'rgba(98, 155, 255, 0.81)';
  canvas.selectionLineWidth = 1.5;
  // 指定textbox
  const textBoxControls = fabric.Textbox.prototype.controls = {};

  textBoxControls.mtr = fabric.Object.prototype.controls.mtr;
  textBoxControls.tr = fabric.Object.prototype.controls.tr;
  textBoxControls.br = fabric.Object.prototype.controls.br;
  textBoxControls.tl = fabric.Object.prototype.controls.tl;
  textBoxControls.bl = fabric.Object.prototype.controls.bl;
  textBoxControls.deleteControl = fabric.Object.prototype.controls.deleteControl;
  // textBoxControls.mt = fabric.Object.prototype.controls.mt;
  // textBoxControls.mb = fabric.Object.prototype.controls.mb;

  textBoxControls.ml = new fabric.Control({
    x: -0.5,
    y: 0,
    offsetX: -1,
    cursorStyleHandler: fabric.controlsUtils.scaleSkewCursorStyleHandler,
    actionHandler: fabric.controlsUtils.changeWidth,
    actionName: 'resizing',
    render: renderIcon
  });

  textBoxControls.mr = new fabric.Control({
    x: 0.5,
    y: 0,
    offsetX: 1,
    cursorStyleHandler: fabric.controlsUtils.scaleSkewCursorStyleHandler,
    actionHandler: fabric.controlsUtils.changeWidth,
    actionName: 'resizing',
    render: renderIcon
  });
}


export default initControls;
