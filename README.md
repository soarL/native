./gradlew assembleRelease

lin2598056

启动模拟器
C:\Users\Administrator\AppData\Local\Android\Sdk\tools\emulator -avd car -writable-system
默认背景
F:\car-native\node_modules\react-navigation-stack\dist\views\StackView\StackViewCard.js
添加host
adb shell 
echo -e \n >> /system/etc/hosts 
echo 192.168.0.246 www.xxx.com >> /system/etc/hosts

node_modules/react-native-splash-screen/android/src/main/res/values/styles.xml 在第二个样式里添加 <item name="android:windowFullscreen">true</item>