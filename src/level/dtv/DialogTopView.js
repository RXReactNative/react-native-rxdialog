/**
 * @this DialogTopView
 *
 * @author : srxboys
 * @flow  : 用于 静态语法检查
 *
 * @source_from react-native-overlayer
 * -------------------------------------------
**/

'use strict'
import React, { Component } from 'react'
import {
  StyleSheet,
  AppRegistry,
  View,
  Animated,
  TouchableWithoutFeedback
} from 'react-native'

import Emitter from '../Emitter';

import {
  // ISIphoneX, ISIphone,ISAndroid, IFIphone, IFIphoneX,
  DeviceWidth, DeviceHeight
} from '../../util/PlatformType.js'

const width = DeviceWidth;
const height = DeviceHeight;

let keyValue = 0;
// const RXTRNLoadingKey = 'RX_Top_RN_loading_key'

export default class DialogTopView extends Component {
  static add(element) {
    if (!element) return;
    let key = ++keyValue;
    Emitter.emit("addOverlay-Alert", { key, element });
    return key;
  }

  static remove(key) {
    if (!key) return;
    Emitter.emit("removeOverlay-Alert", { key });
  }

  static removeAll() {
    Emitter.emit("removeAllOverlay-Alert", {});
  }

  constructor(props) {
    super(props);
    this.state = {
      elements: [],
      visible: false,
      deleteAllEnable: false
    };
  }

  componentWillMount() {
    Emitter.addListener("addOverlay-Alert", e => this.add(e));
    Emitter.addListener("removeOverlay-Alert", e => this.remove(e));
    Emitter.addListener("removeAllOverlay-Alert", e => this.removeAll(e));

    Emitter.addListener("addOverlay-Loading", e => this.addLoading(e));
    Emitter.addListener("removeOverlay-Loading", () => this.removeLoading());
  }

  componentWillUnmount() {
    Emitter.removeLister();
  }

  add(e) {
    const { elements } = this.state;
    elements.push(e);
    this.setState({ elements });

    this.doAnimated(e, true, () => {
      var visible = true;
      this.setState({ visible })
    })
  }

  remove(e) {
    const { elements } = this.state;
    if (!elements) return;
    let element = null;
    let index = 0;

    for (let i = elements.length - 1; i >= 0; --i) {
      if (elements[i].key === e.key) {
        element = elements[i];
        index = i;
        break;
      }
    }

    if (!element) return;
    this.doAnimated(element, false, () => {
      elements.splice(index, 1);
      const visible = elements.length > 0 ? true : false;
      this.setState({ elements, visible });
    })
  }

  doAnimated(e, show = true, Callback) {
    const props = e.element.props;
    const dialogAnimation = props.dialog.dialogAnimation;
    if (!dialogAnimation) return;

    const overlayAnimated = props.overlay.overlayAnimated;

    const toValue = show ? 1 : 0;

    overlayAnimated.toValue(toValue);
    dialogAnimation.toValue(toValue, () => { Callback && Callback(); });
  }

  delete(e) {
    const { elements } = this.state;
    for (let i = elements.length - 1; i >= 0; --i) {
      if (elements[i].key === e.key) {
        React.cloneElement(e, {
          hidden: true
        });
        break;
      }
    }
  }

  removeAll(e) {
    //明确了，不要结束动画
    const { elements } = this.state;
    if (elements.length <= 0) return;
    const e = elements[elements.length - 1];
    this.delete(e);
    this.setState({ deleteAllEnable: true });
  }

  deleteAll() {
    // let { elements } = this.state;
    this.setState({ elements: [] });
  }

  render() {
    const { elements } = this.state;
    // 如果存在loading  只加载loading，loading结束后加载其他element
    // let laodingItem = null;

    // for (let i = elements.length - 1; i >= 0; --i) {
    //   if (elements[i].key === RXTRNLoadingKey) {
    //     laodingItem = elements[i].element;
    //     break;
    //   }
    // }
    // if (laodingItem) {
    //   return (
    //     <View style={{ flex: 1 }}>
    //       <Animated.View style={{ flex: 1, transform: transform }}>
    //         {this.props.children}
    //       </Animated.View>
    //       <View style={styles.overlayContainer}>
    //         {laodingItem}
    //       </View>
    //     </View>
    //   )
    // }

    let element = null; // view
    let key = 0;        // view 在当前缓存的key
    let dialog = { // 弹框样式、动画
      dialogAnimation: { animations: null },
      dialogStyle: {}
    };
    let overlay = { // 遮罩层样式、动画
      overlayAnimated: { animations: null },
      overlayStyle: {}
    };
    let Callback = {};
    if (elements.length) {
      const index = elements.length - 1;
      key = elements[index].key;
      element = elements[index].element;
      dialog = element.props.dialog;
      overlay = element.props.overlay;
      Callback = element.props.Callback;
    }


    return (
      <View style={[styles.container, styles.dialog, dialog.dialogStyle]}>
        <Animated.View style={{ flex: 1, width, height }}>
          {this.props.children}
        </Animated.View>

        <Animated.View style={[styles.dialog, dialog.dialogStyle, overlay.overlayAnimated.animations]} >
          {
            element ?
              <TouchableWithoutFeedback
                disabled={overlay.overlayEnable ? false : true}
                onPress={() => {
                  DialogTopView.remove(key)
                  Callback && Callback(-1)
                }
                }>
                <View style={[overlay.overlayStyle, { width, height }]} />
              </TouchableWithoutFeedback>
              : null
          }
        </Animated.View>
        <Animated.View style={[styles.dialog, dialog.dialogAnimation.animations]} >
          {
            element ?
              <View key={'DialogTopView' + key} >
                {element}
              </View>
              : null
          }
        </Animated.View>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
    alignItems: 'center',
    width,
    height,
  },
  dialog: {
    overflow: 'visible', // hidden  visible scroll
    position: 'absolute',
  }
});


if (!AppRegistry.registerComponentForRXAlert) {
  AppRegistry.registerComponentForRXAlert = AppRegistry.registerComponent;
}

AppRegistry.registerComponent = function (appKey, componentProvider) {

  class RootElement extends Component {
    render() {
      let Component = componentProvider();
      return (
        <DialogTopView>
          <Component {...this.props} />
        </DialogTopView>
      );
    }
  }

  return AppRegistry.registerComponentForRXAlert(appKey, () => RootElement);
}