/**
 * @this Dialog
 *
 * author : srxboys
 * @flow  : 用于 静态语法检查
 * 
 * -------------------------------------------
 * 
 * 可用参数列表:
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