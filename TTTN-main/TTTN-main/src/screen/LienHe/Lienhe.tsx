import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import COLOR, { HEIGHT, PADDING_HORIZONTAL, PADDING_TOP, WIDTH } from '../../utilities'
import Icon from 'react-native-vector-icons/Ionicons'
import { RootStackLienHeEnum } from '../../Stack/RootStackLienHe'
import { NativeStackHeaderProps } from '@react-navigation/native-stack'
import { UserContext } from '../../provider/Provider'
import { useIsFocused } from '@react-navigation/native'



const RenderItem = (props: any) => {
  const { data } = props;
  const { navigation }: NativeStackHeaderProps = props
  const item = data.item;



  return (
    <Pressable onPress={() => navigation.navigate(RootStackLienHeEnum.Lienhe_Detail, { item: item })} style={{ width: '100%', height: 'auto', flexDirection: 'row', borderRadius: 10, backgroundColor: '#e0e0e0', marginBottom: 5, padding: 10 }}>
      <Image source={{ uri: item.avatar }} style={{ width: 60, height: 60, borderRadius: 50, borderWidth: 1, borderColor: 'white' }} />
      <View style={{ flexDirection: 'column', justifyContent: 'center', paddingLeft: 20, rowGap: 5 }}>
        <Text style={{
          color: 'black',
          fontSize: 17,
          fontFamily: 'Poppins',
          fontWeight: '500',
          width: '70%'
        }}
        >{item.userName}</Text>
        <Text style={{
          color: COLOR.gray,
          fontSize: 14,
          fontFamily: 'Poppins',
          fontWeight: '400',
        }}>{item.sdt}</Text>
      </View>
      <Icon name='chevron-forward' size={26} style={{ alignSelf: 'center', position: 'absolute', right: '5%' }} />
    </Pressable >
  )
}


const LienHe = ({ navigation }: any) => {
  const isFocus = useIsFocused();
  const { getAllAdmin } = useContext(UserContext);
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllAdmin();
      setData(response);
    }
    if (isFocus) {
      fetchData();
    }

  }, [isFocus])
  return (
    <View style={{ width: WIDTH, height: HEIGHT, paddingHorizontal: PADDING_HORIZONTAL, paddingTop: PADDING_TOP }}>
      <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginBottom: WIDTH / 5 }}>
        <Icon name='chevron-back' size={26} color={COLOR.gray} style={{ position: 'absolute', left: 0 }} />
        <Text style={{ color: '#593E67', fontSize: 24, fontFamily: 'Poppins', fontWeight: '700' }}>Liên Hệ</Text>
      </View>
      <View style={{ rowGap: 20 }}>
        <Text style={{ color: COLOR.gray, fontSize: 16, fontFamily: 'Poppins', fontWeight: '600' }}>Phòng kĩ thuật</Text>
        <FlatList
          scrollEnabled={false}
          data={data}
          renderItem={(item) => <RenderItem data={item} navigation={navigation} />}
          keyExtractor={(item) => item._id.toString()}
        />
      </View>
    </View >
  )
}

export default LienHe

const styles = StyleSheet.create({})
