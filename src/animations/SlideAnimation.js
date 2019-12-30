/**
 * @this SlideAnimation 划入动画
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
import { Animated } from 'react-native';
import Animation from './Animation';

export default class SlideAnimation extends Animation {
  constructor({
    toValue = 0,
    slideFrom = 'bottom',
    useNativeDriver = true,
  } = {}) {
    super({ toValue, useNativeDriver });
    this.animations = this.createAnimations(slideFrom);
  }

  toValue(toValue=0, onFinished= () => { }) {
    Animated.spring(this.animate, {
      toValue,
      velocity: 0,
      tension: 65,
      friction: 10,
      useNativeDriver: this.useNativeDriver,
    }).start(onFinished);
  }

  createAnimations(slideFrom='bottom') {
    const transform = [];

    if (['top', 'bottom'].includes(slideFrom)) {
      if (slideFrom === 'bottom') {
        transform.push({
          translateY: this.animate.interpolate({
            inputRange: [0, 1],
            outputRange: [800, 1],
          }),
        });
      } else {
        transform.push({
          translateY: this.animate.interpolate({
            inputRange: [0, 1],
            outputRange: [-800, 1],
          }),
        });
      }
    } else if (['left', 'right'].includes(slideFrom)) {
      if (slideFrom === 'right') {
        transform.push({
          translateX: this.animate.interpolate({
            inputRange: [0, 1],
            outputRange: [800, 1],
          }),
        });
      } else {
        transform.push({
          translateX: this.animate.interpolate({
            inputRange: [0, 1],
            outputRange: [-800, 1],
          }),
        });
      }
    }

    const animations = {
      transform,
    };

    return animations;
  }
}
