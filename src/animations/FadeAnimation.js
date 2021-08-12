/**
 * @this FadeAnimation : 渐变动画
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

export default class FadeAnimation extends Animation {
  constructor(
    {
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

  toValue(toValue = 0, onFinished = () => { }) {
    Animated.timing(this.animate, {
      toValue,
      duration: this.animationDuration,
      useNativeDriver: this.useNativeDriver,
    }).start(onFinished);
  }

  createAnimations() {
    return {
      opacity: this.animate
    };
  }
}