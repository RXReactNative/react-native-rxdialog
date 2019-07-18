/**
 * @this RXAlert
 *
 * author : srxboys
 * @flow  : 用于 静态语法检查
 * 
 * -------------------------------------------
 * 
 * 可调用的方法列表:
 * @function hiddenAll   隐藏所有
 * @function show        显示(子类实现 【必须】)
 *                        show(title, content, buttons, Callback, 
 *                             contentOptions:{contentTextStyle: ?}, 
 *                             titleOptions:{titleTextStyle: ?} 
 *                           ) 
 * @function hide        隐藏
**/

'use strict'
import React, { Component } from 'react'
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native'

// import FadeAnimation  from '../animations/FadeAnimation'
// import ScaleAnimation from '../animations/ScaleAnimation'
// import SlideAnimation from '../animations/SlideAnimation'
import AlertAnimation from '../animations/AlertAnimation'

import Dialog from '../main/Dialog'
import DialogTopView from '../level/DialogTopView'

import {
  // ISIphoneX, ISIphone,ISAndroid, IFIphone, IFIphoneX,
  // DeviceHeight,
  DeviceWidth
 } from '../util/PlatformType.js'

const width = DeviceWidth * 0.7;
const borderRadius = 10;
const backgroundColor = 'rgba(0,0,0,0.1)';
const DEFAULT_TITLE_FONT_SIZE = 16;
const DEFAULT_CONTENT_FONT_SIZE = 14;
const DEFAULT_BUTTON_FONT_SIZE = 16;
export default class RXAlert extends Dialog {
  static show(title, content, buttons, Callback, contentOptions, titleOptions) {
    title = title || '';
    content = content || '';
    buttons = buttons || [];
    Callback = Callback || {};
    contentOptions = contentOptions || {};
    titleOptions = titleOptions || {};

    if (title.length < 1 && content.length < 1) {
      console.log('title和content不能同时为空', title, content);
      return;
    }

    if (!Array.isArray(buttons) || buttons.length < 1) {
      buttons = [{ text: '确定', style: { color: '#fd521d', fontWeight: 'bold' } }]
    }

    let key;
    const alertView = (
        <View style={{ width: width, borderRadius, backgroundColor: '#fff', overflow: 'hidden' }}>
          {
            title.length > 0 ?
              <View>
                <View style={{
                  padding: content.length < 1 ? 20 : 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderTopLeftRadius: borderRadius,
                  borderTopRightRadius: borderRadius
                }}>
                  <Text style={[{ fontSize: DEFAULT_TITLE_FONT_SIZE, fontWeight: 'bold' },
                  { ...titleOptions.titleTextStyle }]}>{title}</Text>
                </View>
              </View>
              :
              <View style={{
                height: borderRadius + 5,
                borderTopLeftRadius: borderRadius,
                borderTopRightRadius: borderRadius
              }} />
          }
          {
            content.length > 0 ?
              <Text style={[{
                fontSize: DEFAULT_CONTENT_FONT_SIZE,
                padding: 20,
                paddingTop: 5,
                textAlign: 'center',
              }, { ...contentOptions.contentTextStyle }]}>
                {content}
              </Text>
              : null
          }
          <View style={{
            height: 1,
            backgroundColor,
            width: width
          }} />
          {
            buttons.length < 3 ?
              <View style={{
                height: 44,
                // flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor,
                borderBottomLeftRadius: borderRadius,
                borderBottomRightRadius: borderRadius
              }}>
                {
                  buttons.map((item, index) => {
                    return (
                      <TouchableOpacity activeOpacity={0.5} key={'alert-button-' + index} style={{
                        flex: 1,
                        height: 44,
                        marginLeft: index == 0 ? 0 : 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#fff',
                        borderBottomLeftRadius: index == 0 ? borderRadius : 0,
                        borderBottomRightRadius: index == buttons.length - 1 ? borderRadius : 0
                      }} onPress={() => {
                        DialogTopView.remove(key);
                        Callback && Callback(index);
                      }} >
                        <Text style={[{ fontSize: DEFAULT_BUTTON_FONT_SIZE }, { ...item.style }]}>{item.text}</Text>
                      </TouchableOpacity>
                    )
                  })
                }
              </View>
              :
              <View style={{
                height: 45 * buttons.length - 1,
                alignItems: 'center',
                backgroundColor,
                borderBottomLeftRadius: borderRadius,
                borderBottomRightRadius: borderRadius
              }}>
                {
                  buttons.map((item, index) => {
                    return (
                      <TouchableOpacity activeOpacity={0.5} key={'alert-button-' + index} style={{
                        height: 44,
                        width: width,
                        marginTop: index == 0 ? 0 : 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#fff',
                        borderBottomLeftRadius: index == buttons.length - 1 ? borderRadius : 0,
                        borderBottomRightRadius: index == buttons.length - 1 ? borderRadius : 0
                      }} onPress={() => {
                        DialogTopView.remove(key);
                        Callback && Callback(index);
                      }} >
                        <Text style={[{ fontSize: DEFAULT_BUTTON_FONT_SIZE }, { ...item.style }]}>{item.text}</Text>
                      </TouchableOpacity>
                    )
                  })
                }
              </View>
          }
        </View>
    )
    let element = Dialog.addPropsValue(this, alertView, 'alert', Callback);
    key = DialogTopView.add(element);
    return key;
  }
  
  static getDialogAnimated() {
    //测试 选择不同的动画
    // let animated = new FadeAnimation({ animationDuration: 200 }) 
    // let animated = new SlideAnimation({slideFrom: 'bottom'})
    // let animated = new SlideAnimation({slideFrom: 'left'})
    // let animated = new ScaleAnimation()

    //
    let animated = new AlertAnimation();
    return (  animated )
  }
}