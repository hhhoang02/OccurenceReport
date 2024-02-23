import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, { useContext, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { UserContext } from '../../provider/Provider';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { RootStackTrangChuNVHCEnum } from '../../Stack/RootStackTrangChuNVHC';
import COLOR, { HEIGHT, WIDTH } from '../../utilities';
import Icon from 'react-native-vector-icons/Ionicons';

const CTYeuCau = (props: NativeStackHeaderProps) => {
  console.log(props.route.params);
  const { item }: any = props?.route?.params;
  const { navigation } = props;
  const [status, setStatus] = useState<boolean>(item.status2 != null ? true : false);
  const { updateStatusReport, doneStatusReport } = useContext(UserContext);
  const loi = ['Lỗi từ phía giảng viên', 'Lỗi từ phía hệ thống', 'Khác'];
  const thoigian = ['15 phút', '30 phút', '1 tiếng', '2 tiếng', '1 ngày',];
  const [errorFrom, setErrorFrom] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [note, setNote] = useState<string>('');

  const handleTiepNhan = async () => {
    setStatus(true);
    await updateStatusReport(item._id);
  }
  const handleDone = async () => {
    await doneStatusReport(item._id, errorFrom, time, note);
    navigation.goBack();
  }
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 10 }}>
        <Pressable onPress={() => navigation.goBack()} style={{ position: 'absolute', left: 10 }}>
          <Icon name='chevron-back' size={26} color={COLOR.orange} />
        </Pressable>
        <Text style={{
          color: 'black',
          fontSize: 16,
          fontFamily: 'Poppins',
          fontWeight: '700',
        }}>{item.reportType}</Text>
      </View>
      <Text style={{ fontSize: 16, color: 'black', fontWeight: '400' }}>
        Tên người yêu cầu:
      </Text>
      <View style={styles.detail}>
        <View style={styles.img}>
          <Image
            source={{ uri: item.annunciator.avatar }}
            style={{ width: 50, height: 50, borderRadius: 50 }}
          />
        </View>
        <View style={styles.text}>
          <Text style={{ fontSize: 18, color: 'black', fontWeight: '500' }}>
            {item.annunciator.userName}
          </Text>
          <Text style={{ fontSize: 16, color: 'black', fontWeight: '400' }}>
            {item.annunciator.sdt}
          </Text>
        </View>
        <TouchableOpacity style={styles.img}>
          <Image
            source={require('../../assets/LienHe.png')}
            style={{ width: 50, height: 50 }}
          />
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 30 }}>
        <View style={{ flexDirection: 'row', width: '70%', marginTop: 10 }}>
          <Text style={{ fontWeight: '400', color: 'black', fontSize: 18 }}>
            Thời Gian:{' '}
          </Text>
          <Text style={{ fontWeight: '500', color: 'black', fontSize: 18 }}>
            {item.status1.time}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', width: '70%', marginTop: 20 }}>
          <Text style={{ fontWeight: '400', color: 'black', fontSize: 18 }}>
            Phòng:{' '}
          </Text>
          <Text style={{ fontWeight: '500', color: 'black', fontSize: 18 }}>
            {item.room}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', width: '70%', marginTop: 20 }}>
          <Text style={{ fontWeight: '400', color: 'black', fontSize: 18 }}>
            Mô tả sự cố:{' '}
          </Text>
          <Text style={{ fontWeight: '500', color: 'black', fontSize: 18 }}>
            {item.description}
          </Text>
        </View>
      </View>
      {(!status) ? <></> :
        <View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <View style={{ width: '65%' }}>
              <SelectDropdown
                data={loi}
                defaultButtonText='Lỗi sự cố từ'
                onSelect={(selectedItem, index) => {
                  console.log(selectedItem, index);
                  setErrorFrom(selectedItem)
                }}

                buttonStyle={styles.dropdown3BtnStyle}
                rowStyle={styles.dropdown3RowStyle}
              />
            </View>
            <View style={{ width: '33%' }}>
              <SelectDropdown
                data={thoigian}
                defaultButtonText='Thời gian'
                //defaultValueByIndex={0}
                // defaultValue={{
                //   title: 'England',
                //   image: require('./Images/England.jpg'),
                //}}
                onSelect={(selectedItem, index) => {
                  console.log(selectedItem, index);
                  setTime(selectedItem)
                }}
                buttonStyle={styles.dropdown3BtnStyle}
                rowStyle={styles.dropdown3RowStyle}
              />
            </View>
          </View>
          <View
            style={{
              width: '100%',
              height: 200,
              borderWidth: 0.5,
              borderRadius: 10,
              marginTop: 20,
            }}>
            <TextInput
              placeholder="Ghi chú:"
              value={note}
              onChangeText={setNote}
              style={{ fontSize: 16, color: 'black', marginLeft: 10 }}></TextInput>
          </View>
        </View>
      }
      {(!status)
        ? <View>
          <TouchableOpacity style={styles.btn} onPress={handleTiepNhan}>
            <Text style={{ color: 'white', fontWeight: '700', fontSize: 18 }}>
              Tiếp Nhận
            </Text>
          </TouchableOpacity>
        </View>
        : <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', position: 'absolute', bottom: 100, alignSelf: 'center' }}>
          <TouchableOpacity onPress={() => handleDone()} style={styles.btnHoanThanh}>
            <Text style={{ color: 'white', fontWeight: '700', fontSize: 18 }}>Hoàn thành</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnChuaXuLy}>
            <Text style={{ color: 'white', fontWeight: '700', fontSize: 18 }}>Chưa xử lý được</Text>
          </TouchableOpacity>
        </View>
      }


    </View>
  );
};

export default CTYeuCau;

const styles = StyleSheet.create({
  btnChuaXuLy: {
    width: '48%',
    height: 50,
    backgroundColor: 'red',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnHoanThanh: {
    width: '48%',
    height: 50,
    backgroundColor: 'green',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropdown3BtnStyle: {
    width: '100%',
    height: 45,
    backgroundColor: '#F1F4F5',
    borderRadius: 10,
    borderWidth: 0.5,
    paddingHorizontal: 0,
  },

  dropdown3RowStyle: {
    borderBottomColor: '#F1F4F5',
    borderRadius: 10,
    height: 50,
  },
  btn: {
    marginTop: 50,
    width: '100%',
    height: 50,
    backgroundColor: '#DE741C',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    width: '60%',
  },
  img: {
    width: '20%',
  },
  detail: {
    marginTop: 20,
    justifyContent: 'center',
    width: '100%',
    flexDirection: 'row',
  },
  container: {
    width: WIDTH,
    height: HEIGHT,
    padding: 15,
  },
});
