/**
 * @this Base Animation class
 *
 * @author : srxboys
 * @flow  : 用于 静态语法检查
 * 
 * @source_from https://github.com/jacklam718/react-native-popup-dialog
 * 
 * 
 * @document https://reactnative.cn/docs/animated/
 * -------------------------------------------
 * 
 * * 配置动画 - - Animated提供了三种动画类型：
 * decay()  以指定的初始速度开始变化，然后变化速度越来越慢直至停下。
 * spring() 提供了一个简单的弹簧物理模型.
 * timing() 使用easing 函数让数值随时间动起来
 * -------------------------------------------
 * 
 * * 自定义动画组件 - - 可以直接使用的动画组件：
 * Animated.Image
 * Animated.ScrollView
 * Animated.Text
 * Animated.View
 * -------------------------------------------
 * 
 * * 组合动画 - - 使用组合函数以复杂的方式进行组合：
 * Animated.delay()在给定延迟后开始动画。
 * Animated.parallel()同时启动多个动画。
 * Animated.sequence()按顺序启动动画，等待每一个动画完成后再开始下一个动画。
 * Animated.stagger()按照给定的延时间隔，顺序并行的启动动画。
 * -------------------------------------------
 * 
 * * 合成动画值 - - 使用加减乘除以及取余等运算来把两个动画值合成为一个新的动画值：
 * Animated.add()
 * Animated.subtract()
 * Animated.divide()
 * Animated.modulo()
 * Animated.multiply()
 * -------------------------------------------
 * 
 * * 插值 - - 允许输入范围映射到不同的输出范围
 * interpolate()
 * -------------------------------------------
 * 
 * * 处理手势和其他事件
 * Animated.event()
 * -------------------------------------------
 * 
 **/

'use strict'
import {
  Animated
} from 'react-native';

export default class Animation {
  useNativeDriver: boolean //使用原生动画驱动
  animate: Object //Animated.Value
  animations: Object //createAnimations

  constructor({
    toValue = 0,
    useNativeDriver = true,
  }: {
    toValue?: number;
    useNativeDriver?: boolean;
  } = {}) {
    this.useNativeDriver = useNativeDriver;
    this.animate = new Animated.Value(toValue);
    this.animations = this.createAnimations();
  }

  //Animation 底层方法 覆盖
  toValue(): void {
    // 需要子类去实现
    throw Error('not implemented yet');
  }

  //Animation 底层方法 覆盖
  createAnimations(): Object {
    // 需要子类去实现
    throw Error('not implemented yet');
  }
}