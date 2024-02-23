import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Pressable,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { RootStackTrangChuNVHCEnum } from '../../Stack/RootStackTrangChuNVHC';
import { UserContext } from '../../provider/Provider';
import { useIsFocused } from '@react-navigation/native';



const RenderItem = ({ data, navigation }: any) => {
  const { item } = data;
  return (
    <Pressable onPress={() => navigation.navigate(RootStackTrangChuNVHCEnum.CTYeuCau, { item: item })} style={styles.containerPD}>
      <View style={styles.title}>
        <Text style={{ fontSize: 17, fontWeight: '700', color: 'black' }}>{item.reportType}</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.left}>
          <Image source={{ uri: item.annunciator.avatar }} style={{ width: 50, height: 50, borderRadius: 50 }} />
        </View>
        <View style={styles.right}>
          <Text style={{ fontSize: 16, fontWeight: '500', color: 'black' }}>{item.annunciator.userName}</Text>
          <View style={styles.bottom}>
            <Text>{item.room}</Text>
            <Text>{item.status1.time}</Text>
            <Text>{item.status1.date}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};
const HienCo = (props: any) => {
  const isFocused = useIsFocused();
  const { navigation } = props?.route;
  const { getAllReport } = useContext(UserContext);
  const [data, setData] = useState<any>([]);
  const getData = async () => {
    const response = await getAllReport();
    setData(response.filter((item: any) => {
      return item.status2 == null;
    }));
  }
  useEffect(() => {
    if (isFocused) {
      getData();
    }
  }, [isFocused])


  return (

    <View style={styles.container}>
      {data ?
        <FlatList
          style={{ marginTop: 10 }}
          data={data}
          renderItem={(item: any) => <RenderItem data={item} navigation={navigation} />}
          keyExtractor={item => item._id.toString()}
        /> : <></>}
    </View>
  );
};

export default HienCo;

const styles = StyleSheet.create({
  bottom: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  right: {
    width: '80%',
  },
  left: {
    width: '20%',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    padding: 10,
  },
  title: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between'
  },
  containerPD: {
    width: '100%',
    height: 'auto',
    marginTop: 10,
    padding: 10,
    borderWidth: 0.5,
    borderRadius: 10,
  },
  container: {
    padding: 10,
    width: '100%',
    height: '100%',
  },
});


