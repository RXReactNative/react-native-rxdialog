
# react-native-rxdialog

## Getting started

`$ npm install react-native-rxdialog --save`

### Mostly automatic installation

`$ react-native link react-native-rxdialog`

<br />

---

### support for custom UI(View)

example : -> https://github.com/RXReactNative/react-native-rxdialog-example

<br />

---


#### 框架默认支持
![srxboys](https://github.com/RXReactNative/react-native-rxdialog/blob/master/screen_img/1.png)
![srxboys](https://github.com/RXReactNative/react-native-rxdialog/blob/master/screen_img/2.png)

#### [ 二次开发 demo ( rxdialog-example ) ](https://github.com/RXReactNative/react-native-rxdialog-example)
![srxboys](https://github.com/RXReactNative/react-native-rxdialog/blob/master/screen_img/3.png)
![srxboys](https://github.com/RXReactNative/react-native-rxdialog/blob/master/screen_img/4.png)
![srxboys](https://github.com/RXReactNative/react-native-rxdialog/blob/master/screen_img/5.png)

<br /><br />

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-rxdialog` and add `RNRxdialog.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNRxdialog.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.reactlibrary.RNRxdialogPackage;` to the imports at the top of the file
  - Add `new RNRxdialogPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-rxdialog'
  	project(':react-native-rxdialog').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-rxdialog/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-rxdialog')
  	```

#### Windows
[Read it! :D](https://github.com/ReactWindows/react-native)

1. In Visual Studio add the `RNRxdialog.sln` in `node_modules/react-native-rxdialog/windows/RNRxdialog.sln` folder to their solution, reference from their app.
2. Open up your `MainPage.cs` app
  - Add `using Rxdialog.RNRxdialog;` to the usings at the top of the file
  - Add `new RNRxdialogPackage()` to the `List<IReactPackage>` returned by the `Packages` method


## Usage
```javascript
import RNRxdialog from 'react-native-rxdialog';

// TODO: What to do with the module?
RNRxdialog;
```
  
