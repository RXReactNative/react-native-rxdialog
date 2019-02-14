/**
 * @this RXDialogTest
 *
 * author : srxboys
 * @flow  : 用于 静态语法检查
 * 
 * -------------------------------------------
 * 
 * 弊端：(待解决)
 * 1、DialogTopView 同时多个弹框 出现/消失 动画不准确( 特别是：消失的动画 ) 
 * 
**/

'use strict'
import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native'

import PropTypes from 'prop-types';
import RXAlert   from "../src/UI/RXAlert"

export default class RXDialogTest extends Component {

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'green'}}>
        <TouchableOpacity onPress={() => {
          // YLAlert.show(
          //   '标题',
          //   '内容 ---- 嘻嘻',
          //   [
          //     {text: '确认', style:{color: red}},
          //     {text: '取消'}
          //   ], (index)=>{
          //     console.log('click index='+ index);
          //   }
          // );

          RXAlert.show(
            '标题',
            '内容 ---- 嘻嘻',
            [
              { text: '确认', style:{color: 'red'} },
              { text: '取消' }
            ], (index)=>{
              console.log('click index='+ index);
            },{
              contentTextStyle: { color: 'blue', fontSize: 30}
            },{
              titleTextStyle: { color: 'orange' }
            }
          );
        }}>
            <View style={{marginTop: 80, marginLeft: 40, marginRight: 40}}>
                <Text style={{height:100, color:'blue'}}> 111111 ___ `overlay`还没有实现 ___ 弹框还是有bug </Text>
            </View>
        </TouchableOpacity>
      </View>
    )
  }
}