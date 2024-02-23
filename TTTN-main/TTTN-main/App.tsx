/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useContext, useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { BottomTab } from './src/Tab/TabNavigation';
import { Provider } from 'react-native-paper';
import DangNhap from './src/screen/DangNhap/Dangnhap';
import { BG_COLOR } from './src/utilities';
import { UserContext, UserProvider } from './src/provider/Provider';
const Navigation = () => {
  const { isLoggedIn } = useContext(UserContext);
  return !isLoggedIn ? <DangNhap /> :
    <BottomTab />

}
function App(): JSX.Element {

  return (
    <UserProvider>
      <Provider theme={{ version: 2 }}>
        <StatusBar barStyle="light-content" backgroundColor={BG_COLOR} />
        <Navigation />
      </Provider>
    </UserProvider>

  );
}

const styles = StyleSheet.create({
});

export default App;
