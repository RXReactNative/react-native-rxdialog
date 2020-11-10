declare module 'react-native-rxdialog' {
  import { Component } from 'react'
  import {
    ViewStyle,
    Animated
  } from 'react-native'

  interface RXAlertButtonProps {
    text ?: string
    style ?: ViewStyle
  }

  abstract class AbstractAnimation {
    //驱动动画效果
    toValue: (
      toValue: number, 
      onFinished : () => { }
    ) => void

    //创建动画
    createAnimations: () => Animation
  }

  /**
   * @this : RXAlert
   */
  export class RXAlert extends RXDialog {
    show: (
      title : string | null,
      content : string| null,
      buttons : Array<RXAlertButtonProps>,
      Callback : (index : number) => void,
      contentOptions ?: ViewStyle | null,
      titleOptions ?: ViewStyle | null,
    ) => void
   }
  
 /**
  * @this : base - 弹框
  */
  export class RXDialog {
    //
    static show: () => void
    //
    static hide: () => void
    //
    static hiddenAll: () => void

    //弹框 动画
    static getDialogAnimated: () => void
    //弹框 样式
    static getDialogStyles: () => void
    //遮罩层 动画
    static getOverlayAnimated: () => void
    //遮罩层 样式
    static getOverlayStyles: () => void
    //遮罩层 是否可以点击
    static getOverlayEnable: () => void

    //将上面 getxxx() 的方法 里面的属性，都添加到 element 里面去
    static addPropsValue: () => void
  }

  /**
  * @this : base - Animation
  */
  export class RXAnimation extends AbstractAnimation{
    //使用原生动画驱动
    useNativeDriver: () => boolean
    //Animated.Value
    animate: () => Animated.Value | null
    //create Animation
    animations: () => Animated.Animated | null

    //驱动动画效果
    toValue: (
      toValue: number, 
      onFinished : () => { }
    ) => void

    //创建动画
    // createAnimations: () => Animation
  }

  // 弹框动画
  export class RXAlertAnimation extends RXAnimation{}
  // 渐变动画
  export class RXFadeAnimation extends RXAnimation{}
  // 缩放动画
  export class RXScaleAnimation extends RXAnimation{}
  // 划入动画
  export class RXSlideAnimation extends RXAnimation {
    //--- 创建动画
    createAnimations: ( //defautl -> 'bottom'
      slideFrom: 'top' | 'bottom' | 'left' | 'right' 
    ) => Animation
    
  }

  /**
  * @this : 显示弹框
  */
  export class RXDialogTopView extends Component{
    //add element
    static add: (e?: JSX.Element) => void
    //remove element
    static remove: (key ?: number) => void
    //remove all element
    static removeAll: () => void
  }

  /**
  * @this : util
  */
  export const DeviceWidth: number
  export const DeviceHeight: number

  export function ISIphone() : boolean
  export function ISIphoneX() : boolean
  export function ISAndroid() : boolean

  export function IFIphone(iosStyle: any, androidStyle: any) : any
  export function IFIphoneX(iphoneXStyle: any, iosStyle: any, androidStyle: any) : any
}