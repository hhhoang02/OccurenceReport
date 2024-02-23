import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Pressable,
  PermissionsAndroid,
  FlatList,
  Image,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'react-native-paper';
import uuid from 'react-native-uuid';
import COLOR, {
  BG_COLOR,
  HEIGHT,
  PADDING_HORIZONTAL,
  PADDING_TOP,
  WIDTH,
} from '../../utilities';

import { SelectList } from 'react-native-dropdown-select-list';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import { UserContext } from '../../provider/Provider';
import Spinner from 'react-native-loading-spinner-overlay';
interface Report {
  id: number;
  name: string;
  screen: string;
  vector: any;
  description: string;
}
let image: any = [];
let imageURL: any = [];

const renderItem = ({ item }: any) => {
  console.log(item);

  return (
    <View style={{ paddingVertical: 10 }}>
      <Image style={{ height: 100, width: 100 }} source={{ uri: item.img }} />
    </View>
  )
}


const Report = (props: any) => {
  const { navigation }: NativeStackHeaderProps = props;

  const { addReport, isLoaddingAddReport, setIsLoaddingAddReport } = useContext(UserContext);
  const [inputText, setInputText] = useState('');
  const [selected, setSelected] = React.useState('');
  const [addImage, setAddImage] = useState<boolean>(false);
  const [description, setDescription] = useState('');
  

  const handleReport = async () => {
    try {
      setIsLoaddingAddReport(true);
      const uploadImages = async () => {
        await Promise.all(image.map(async (element: any) => {
          const reference = storage().ref(`${uuid.v4()}.jpg`);
          await reference.putFile(element.img);
          const url = await reference.getDownloadURL();
          imageURL.push(url);
        }));
      };
      await uploadImages();
      await addReport({ inputText, selected, imageURL, description });
      imageURL = [];
      image = [];
      setAddImage(!addImage);
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  }

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const result: any = await launchCamera({
          mediaType: 'photo',
          cameraType: 'front',
        });
        const object = { id: image.length + 1, img: result.assets[0].uri };
        image.push(object);
        setAddImage(!addImage);
      } else {
        console.log('Từ chối');
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Camera

  const requestCameraPermissionPhoto = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera Ok');
        //Mở thư viện ảnh
        const result: any = await launchImageLibrary({ mediaType: 'photo' });
        console.log(result.assets[0].uri);
        image.push(result ? { id: image.length + 1, img: result.assets[0].uri } : null);
        setAddImage(!addImage);
      } else {
        console.log('Từ chối');
      }
    } catch (error) {
      console.log(error);
    }
  };
  const data = [
    { key: '1', value: 'Cơ sở vật chất' },
    { key: '2', value: 'Thiết bị mạng' },
    { key: '3', value: 'Vệ sinh phòng học' },
    { key: '4', value: 'Góp ý phòng học' },
    { key: '5', value: 'Sự cố khác' },
  ];
  return (
    <ScrollView
      style={{
        backgroundColor: COLOR.white,
        width: WIDTH,
        height: HEIGHT,
        paddingHorizontal: PADDING_HORIZONTAL,
        paddingTop: PADDING_TOP,
      }}>
      {/* <Pressable onPress={() => navigation.goBack()}>
                <Icon name='chevron-back' size={26} />
            </Pressable> */}
      <Spinner
        visible={isLoaddingAddReport}
        textContent={'Loading...'}
        textStyle={{ color: COLOR.white }}
      />
      <Text
        style={{
          color: 'red',
          fontSize: 30,
          textAlign: 'center',
          marginTop: 10,
          fontWeight: 'bold',
        }}>
        BÁO CÁO SỰ CỐ
      </Text>

      <View style={styles.text}>
        <TextInput placeholder="Phòng" value={inputText} onChangeText={setInputText} />
      </View>
      <View style={styles.dropdown}>
        <SelectList
          setSelected={(val: any) => setSelected(val)}
          data={data}
          save="value"
          placeholder="Sự cố đang gặp phải"
        />
        <View style={styles.description}>
          <TextInput
            multiline
            value={description}
            onChangeText={setDescription}
          />
        </View>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            marginTop: 20,
            justifyContent: 'space-between',
            alignContent: 'center',
          }}>
          <TouchableOpacity style={styles.image} onPress={requestCameraPermission}>
            <Image
              style={{ width: 30, height: 30 }}
              source={require('../../assets/camera.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.image} onPress={requestCameraPermissionPhoto}>
            <Image
              style={{ width: 25, height: 25 }}
              source={require('../../assets/image.png')}
            />
          </TouchableOpacity>
        </View>

        <View>
          <FlatList
            numColumns={2}
            scrollEnabled={false}
            columnWrapperStyle={{ columnGap: 5, justifyContent: 'center' }}
            data={image}
            keyExtractor={item => item.id}
            renderItem={renderItem}
          />
        </View>
        <View>
          <Button onPress={handleReport} style={styles.button} textColor="white">
            Gửi yêu cầu
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

export default Report;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    color: BG_COLOR,
  },
  text: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 20,
  },
  dropdown: {
    marginTop: 20,
  },
  textAreaContainer: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    width: 350,
    height: 150,
  },
  textArea: {
    paddingVertical: 0,
  },
  description: {
    marginTop: 20,
    borderColor: 'gray',
    borderWidth: 1,
    height: HEIGHT * 0.3
  },
  button: {
    backgroundColor: 'orange',
    marginTop: 20,
    borderRadius: 10,
    marginBottom: 50
  },
  image: {
    backgroundColor: '#eaeaea',
    width: '48%',
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
