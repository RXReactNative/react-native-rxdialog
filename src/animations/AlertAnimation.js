/**
 * @this AlertAnimation : 弹框的动画
 *
 * @author : srxboys
 * @flow  : 用于 静态语法检查
 * 
 * -------------------------------------------
 * 
 * 
 * 
 **/

'use strict'
import {
  Easing,
  Animated
} from 'react-native';
import Animation from './Animation';

export default class AlertAnimation extends Animation {
  animate: Object
  animationDuration: number

  constructor({
    toValue = 0,
    animationDuration = 200,
    useNativeDriver = true,
  } = {}) {
    super({
      toValue,
      useNativeDriver
    });
    this.animationDuration = animationDuration;
  }

  toValue(toValue: number, onFinished?: Function = () => { }): void {
    switch (toValue) {
      case 0:
        Animated.decay(this.animate, {
            duration: 0.2,
            toValue,
            velocity: 0,
            useNativeDriver: this.useNativeDriver,
        }).start(onFinished)
        break;
      case 1:
        Animated.timing(this.animate, {
          easing: Easing.linear,
          duration: this.animationDuration,
          toValue,
          useNativeDriver: this.useNativeDriver,
        }).start(onFinished)
        break;
    }
  }

  createAnimations(): Object {
    const transform = [{
      scale: this.animate.interpolate({
        // inputRange: [0, 0.9, 1],
        // outputRange: [0.5, 1.2, 1],
        inputRange: [0.1, 0.5, 1],
        outputRange: [1, 1.1, 1],
      }),
    },];

    const animations = {
      transform,
    };

    return animations;
  }
}