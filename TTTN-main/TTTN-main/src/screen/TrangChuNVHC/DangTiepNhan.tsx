import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../provider/Provider';
import { RootStackTrangChuNVHCEnum } from '../../Stack/RootStackTrangChuNVHC';
import { useIsFocused } from '@react-navigation/native';
interface DangTiepNhan {
  room: string;
  reportType: string,
  image1: string;
  image2: string;
  description: string;
  status1: {
    status: boolean;
    time: string;
    date: string;
  };
  annunciator: {
    userName: string;
  };
  reportRecipient: {
    userName: string;
  };
  status2: any;
  status3: any;
  evaluate: string;
  start: 5
}
const RenderItem = ({ data, navigation, setRender }: any) => {
  const { item } = data;
  return (
    <Pressable onPress={() => navigation.navigate(RootStackTrangChuNVHCEnum.CTYeuCau, { item: item, setRender: setRender })} style={styles.containerPD}>
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
const DangTiepNhan = (props: any) => {
  const isFocused = useIsFocused();
  const { navigation } = props?.route;

  const { getReportByAnnunciator } = useContext(UserContext);
  const [data, setData] = useState<any>([]);
  const getData = async () => {
    const response = await getReportByAnnunciator();
    setData(response.filter((item: any) => {
      return item.status3 == null;
    }));
  }
  useEffect(() => {
    if (isFocused) {
      getData();
    }
  }, [isFocused])
  return (
    <View style={styles.container}>
      <FlatList
        style={{ marginTop: 10 }}
        data={data}
        renderItem={(item: any) => <RenderItem data={item} navigation={navigation} />}
        keyExtractor={item => item._id.toString() as never}

      />
    </View>
  );
};

export default DangTiepNhan;

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
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  containerPD: {
    width: '100%',
    height: 'auto',
    marginTop: 10,
    padding: 10,
    borderWidth: 0.5,
    borderRadius: 10
  },
  container: {
    padding: 10,
    width: '100%',
    height: '100%',
  },
});


