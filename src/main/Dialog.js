/**
 * @this Dialog
 *
 * author : srxboys
 * @flow  : 用于 静态语法检查
 * 
 * -------------------------------------------
 * 
 * 可重写方法列表:
 * @function hiddenAll          隐藏所有
 * @function show               显示(@require 子类实现)
 * @function hide               隐藏
 * @function getDialogAnimated  dialog 的 动画
 * @function getDialogStyles    dialog 的 位置、颜色等
 * @function getOverlayAnimated 遮罩层 的 动画
 * @function getOverlayStyles   遮罩层 的 样式
 * @function getOverlayEnable   遮罩层 是否 点击
 * 
 * 可调用的方法列表(不可重写)
 * @function addPropsValue      添加装饰(子类调用 【必须】)
**/

'use strict'
import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  ScrollView,
  NativeModules,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native'

import DialogTopView  from '../level/DialogTopView'
import FadeAnimation  from '../animations/FadeAnimation';
import ScaleAnimation from '../animations/ScaleAnimation';
import SlideAnimation from '../animations/SlideAnimation';


export default class Dialog {

  static hiddenAll() {
    DialogTopView.removeAll();
  }

  static show() {
    // 需要子类去实现  content(View)
    throw Error('not implemented yet');
  }

  static hide(key) {
    DialogTopView.remove(key);
  }

  // 弹框 动画
  static getDialogAnimated() {
    return ( new FadeAnimation({ animationDuration: 200 }) );
  }

  // 弹框 样式
  static getDialogStyles() {
    return {
      justifyContent: 'center',
    }
  }

  // 遮罩层 动画
  static getOverlayAnimated() {
    return ( new FadeAnimation({ animationDuration: 200 }) );
  }

  // 遮罩层 样式
  static getOverlayStyles() {
    return {
      backgroundColor: 'rgba(0,0,0,0.4)'
    }
  }

  // 遮罩层 是否可以点击
  static getOverlayEnable() {
    return false;
  }

  static addPropsValue(self, view, className = 'alert',Callback) {
    if(!self) return null;
    if (!view) return null;
    Callback = Callback || {}

    let dialogStyle = self.getDialogStyles() || this.getDialogStyles();
    let dialogAnimation = self.getDialogAnimated() || this.getDialogAnimated();

    let overlayStyle = self.getOverlayStyles() || this.getOverlayStyles();
    let overlayAnimated = self.getOverlayAnimated() || this.getOverlayAnimated();
    let overlayEnable = self.getOverlayEnable() || this.getOverlayEnable();

    let dialogOnDisappearCompleted = view.props.dialogOnDisappearCompleted;
    let element = React.cloneElement(view, {
      dialogOnDisappearCompleted: () => { //预留的方法，现在没用
        dialogOnDisappearCompleted && dialogOnDisappearCompleted();
      },
      dialog: {
        dialogClassName: className,
        dialogHidden: false,
        dialogStyle,
        dialogAnimation,
      },
      overlay: {
        overlayAnimated,
        overlayStyle,
        overlayEnable, 
      },
      Callback: Callback
    });
    return element;
  }
}