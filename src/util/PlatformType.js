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
  PixelRatio,
  Dimensions,
  Platform,
} from 'react-native'

const X_WIDTH = 375;
const X_HEIGHT = 812;
const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;

const { height, width } = Dimensions.get('window');

export const DeviceWidth = Platform.OS === 'web' ? document.documentElement.clientWidth : width;
export const DeviceHeight = Platform.OS === 'web' ? document.documentElement.clientHeight : height;


/**
 * 判断是否为 iphoneX
 * @returns {boolean}
 */
export function ISIphoneX() {
  if (Platform.OS === 'web') return false;

  return (
    Platform.OS === 'ios' &&
    //Portrait && (ios => PortraitUpsideDown)  人像
    ((DeviceHeight === X_HEIGHT && DeviceWidth === X_WIDTH) ||
      // OrientationLandscapeLeft OrientationLandscapeRight  风景
      (DeviceHeight === X_WIDTH && DeviceWidth === X_HEIGHT)) ||

    ((DeviceHeight === XSMAX_HEIGHT && DeviceWidth === XSMAX_WIDTH) ||
      (DeviceHeight === XSMAX_WIDTH && DeviceWidth === XSMAX_HEIGHT))
  );
}


/**
 * 判断是否为 Iphone
 * @returns {boolean}
 */
export function ISIphone() {
  return (
    Platform.OS === 'ios'
  )
}

/**
 * 判断是否为 Android
 * @returns {boolean}
 */
export function ISAndroid() {
  return (
    ISIphone() ? false : true
  )
}



/**
 * 根据是否是iPhone返回不同的样式
 * @param iosStyle
 * @param androidStyle
 * @returns {*}
 */
export function IFIphone(iosStyle = {}, androidStyle = {}) {
  return IFIphoneX(iosStyle, iosStyle, androidStyle);
}

/**
 * 根据是否是iPhoneX返回不同的样式
 * @param iphoneXStyle
 * @param iosStyle
 * @param androidStyle
 * @returns {*}
 */
export function IFIphoneX(iphoneXStyle = {}, iosStyle = {}, androidStyle = {}) {
  if (ISIphoneX()) {
    return iphoneXStyle;
  } else if (ISIphone()) {
    return iosStyle
  } else {
    if (androidStyle || androidStyle === 0) return androidStyle;
    return iosStyle
  }
}
