import { FlatList, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import COLOR, { BG_COLOR, HEIGHT, PADDING_HORIZONTAL, PADDING_TOP, WIDTH } from '../../utilities';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RootStackTrangChuEnum } from '../../Stack/RootStackTrangChu';
import { RootStackTrangChuNVHCEnum } from '../../Stack/RootStackTrangChuNVHC';
import { UserContext } from '../../provider/Provider';




interface SERVICE_ONLINE {
  id: number,
  screen: string,
  name: string,
  vector: any,
}

const RenderItem = (props: any) => {
  const { item } = props.item;
  console.log(item);
  const { navigation }: NativeStackHeaderProps = props;
  return (
    <TouchableOpacity onPress={() => navigation.navigate(item.screen)} style={{ width: WIDTH / 2.2, height: WIDTH / 2, backgroundColor: COLOR.orange, marginBottom: 10, alignItems: 'center', flexDirection: 'column', borderRadius: 10, rowGap: 5, padding: 5 }}>
      <Image source={item.vector} style={{ maxWidth: '90%', maxHeight: 100 }} />
      <Text style={{ color: COLOR.white, fontSize: 17, fontWeight: '600' }}>{item.name}</Text>
    </TouchableOpacity>
  )
}
const TrangChuNVHC = ({ navigation }: NativeStackHeaderProps) => {
  const { userGoogle } = useContext(UserContext);

  return (
    <View style={{ backgroundColor: BG_COLOR, width: WIDTH, height: HEIGHT, paddingHorizontal: PADDING_HORIZONTAL, paddingTop: PADDING_TOP }}>
      <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
        <View style={{ alignItems: 'center', flexDirection: 'column' }}>
          <Image style={{ width: 50, height: 50, backgroundColor: COLOR.white, borderRadius: 50 }} source={{uri : userGoogle.user.photo}} />
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: COLOR.white, marginTop: 10 }}>{userGoogle.user.name}</Text>
        </View>
        <Pressable onPress={() => navigation.navigate(RootStackTrangChuEnum.ThongBao)} style={{ position: 'absolute', right: 0 }}>
          <Icon name='bell-outline' size={30} color={COLOR.white} />
        </Pressable>
      </View>
      <View style={{ backgroundColor: COLOR.white, height: HEIGHT / 1.3, width: WIDTH, position: 'absolute', bottom: 0, borderTopLeftRadius: 35, borderTopRightRadius: 35, alignItems: 'center', paddingVertical: 20, rowGap: 10 }} >
        <Text style={{ color: '#B85B56', fontSize: 20, fontWeight: '700' }}>Dịch vụ trực tuyến</Text>
        <FlatList
          data={data}
          numColumns={2}
          columnWrapperStyle={{ columnGap: 10 }}
          renderItem={(item) => <RenderItem item={item} navigation={navigation} />}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </View>
  )
}

export default TrangChuNVHC

const styles = StyleSheet.create({})
const data: SERVICE_ONLINE[] = [
  {
    id: 1,
    name: 'Tiếp Nhận Sự Cố',
    screen: 'DSSuCo',
    vector: require('../../assets/BCSC.png'),
  },
  {
    id: 2,
    name: 'Kiểm Tra Phòng',
    screen: 'DSSuCo',
    vector: require('../../assets/HTCNTT.png'),
  }
]