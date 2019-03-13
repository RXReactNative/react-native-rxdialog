/**
 * @this   Android/iOS  平台判断
 *
 * author : srxboys
 * @flow
 *
 * 导入可以copy【方便】

  import {ISIphoneX, ISIphone,ISAndroid, IFIphone, IFIphoneX, DeviceWidth, DeviceHeight} from '../../util/PlatformType.js'

 */

'use strict'
import React from 'react';

import {
     StyleSheet,
     PixelRatio,
     Dimensions,
     Platform,
     DeviceInfo
 } from 'react-native'


const {PlatformConstants} = require('NativeModules');
const ReactNativeVersion = require('ReactNativeVersion');

const P_WIDTH = 375;
const P_HEIGHT = 812;

export const DeviceWidth = Dimensions.get('window').width;      //设备的宽度
export const DeviceHeight = Dimensions.get('window').height;    //设备的高度

const { minor = 0 } = PlatformConstants.reactNativeVersion || {};

/**
 * 判断是否为 iphoneX
 * @returns {boolean}
 */
export function ISIphoneX(){
    if (Platform.OS === 'web') return false; 
    if (minor >= 50) {  //React Native 在0.50.1版本,添加了一个SafeAreaView的Component，来完美支持iPhoneX的适配。
        // console.log('ISIphoneX ==> minor >= 50 ==> DeviceInfo.isIPhoneX_deprecated=' +DeviceInfo.isIPhoneX_deprecated)
        return DeviceInfo.isIPhoneX_deprecated;
    }

    return (
        Platform.OS === 'ios' &&
        ((DeviceWidth === P_WIDTH && DeviceHeight === P_HEIGHT) ||
            (DeviceWidth === P_HEIGHT && DeviceHeight === P_WIDTH))
    )
}

/**
 * 判断是否为 Iphone
 * @returns {boolean}
 */
export function ISIphone(){
  return (
      Platform.OS === 'ios'
  )
}

/**
 * 判断是否为 Android
 * @returns {boolean}
 */
export function ISAndroid(){
  return (
      ISIphone()?false: true
  )
}



/**
 * 根据是否是iPhone返回不同的样式
 * @param iosStyle
 * @param androidStyle
 * @returns {*}
 */
export function IFIphone(iosStyle: any, androidStyle: any) {
    return IFIphoneX(iosStyle, iosStyle, androidStyle);
}

/**
 * 根据是否是iPhoneX返回不同的样式
 * @param iphoneXStyle
 * @param iosStyle
 * @param androidStyle
 * @returns {*}
 */
export function IFIphoneX(iphoneXStyle: any, iosStyle: any, androidStyle: any) {
    if (ISIphoneX()) {
        return iphoneXStyle;
    } else if (ISIphone()) {
        return iosStyle
    } else {
        if (androidStyle || androidStyle===0 ) return androidStyle;
        return iosStyle
    }
}
