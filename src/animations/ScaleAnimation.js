/**
 * @this ScaleAnimation : 缩放
 *
 * @author : srxboys
 * @flow  : 用于 静态语法检查
 * 
 * @source_from https://github.com/jacklam718/react-native-popup-dialog
 * -------------------------------------------
 * 
 * 
 * 
 **/

'use strict'
import {
  Animated
} from 'react-native';
import Animation from './Animation';

export default class ScaleAnimation extends Animation {
  toValue(toValue=0, onFinished = () => { })  {
    switch (toValue) {
      case 0: 
        Animated.spring(this.animate, {
          toValue,
          velocity: 0, //速度
          tension: 65, //拉力
          friction: 7, //摩擦
          useNativeDriver: this.useNativeDriver,
        }).start(onFinished);
        break;
      case 1:
        Animated.spring(this.animate, {
          toValue,
          velocity: 2,
          tension: 65,
          friction: 7,
          useNativeDriver: this.useNativeDriver,
        }).start(onFinished);
        break;
      default:
        break;
    }
  }

  createAnimations() {
    const transform = [{
      scale: this.animate.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      }),
    },];

    const animations = {
      transform,
    };

    return animations;
  }
}