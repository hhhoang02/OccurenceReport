import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import COLOR, { BG_COLOR, HEIGHT, PADDING_HORIZONTAL, PADDING_TOP, WIDTH } from '../../utilities'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { NativeStackHeaderProps } from '@react-navigation/native-stack'
import { RootStackLichSuEnum } from '../../Stack/RootStackLichSu'
import { UserContext } from '../../provider/Provider'
import { useIsFocused } from '@react-navigation/native'
import { RootStackLichSuNVHCEnum } from '../../Stack/RootStackLichSuNVHC'


interface LichSu {
    id: number,
    avatar: any,
    suco: string,
    ten: string,
    thoigian: string,
    sdt: string
}

const RenderItem = (props: any) => {
    const { item } = props.data;
    const { navigation }: NativeStackHeaderProps = props;
    return (
        <Pressable onPress={() => navigation.navigate(RootStackLichSuNVHCEnum.Lichsu_ChitietNVHC, { item: item })} style={{ flexDirection: 'row', paddingHorizontal: PADDING_HORIZONTAL, alignItems: 'center', width: WIDTH, height: HEIGHT / 9, marginBottom: 5, columnGap: 15, borderBottomWidth: 1, borderColor: '#d9d9d9' }}>
            <Image source={{ uri: item.annunciator.avatar }} style={{ width: 60, height: 60, borderRadius: 50, borderWidth: 0.5, borderColor: COLOR.gray }} />
            <View style={{ flexDirection: 'column', justifyContent: 'center', rowGap: 5 }}>
                <Text style={{ color: '#804F1E', fontSize: 19, fontFamily: 'Helvetica Neue', fontWeight: '700', letterSpacing: 0.60, }}>{item.reportType}</Text>
                <Text style={{ color: '#5EC401', fontSize: 14, fontFamily: 'Helvetica Neue', fontWeight: '400', textTransform: 'capitalize' }}>{item.annunciator.userName}</Text>
                <View style={{ flexDirection: 'row', columnGap: 10 }}>
                    <Text style={styles.textBottom}>{item.status1.date}</Text>
                    <Text style={styles.textBottom}> SĐT: {item.annunciator.sdt ? item.annunciator.sdt : "chưa có thông tin"}</Text>
                </View>
            </View>
        </Pressable>
    )
}
const LichsuNVHC = ({ navigation }: NativeStackHeaderProps) => {
    const isFocused = useIsFocused();
    const { getReportByAnnunciator } = useContext(UserContext);
    const [data, setData] = useState<any>([]);
    useEffect(() => {
        const getData = async () => {
            const response = await getReportByAnnunciator();
            setData(response.filter((item: any) => {
                return item.status3 != null;
            }));
        }
        if (isFocused) {
            getData();
        }
    }, [isFocused]);

    return (
        <View style={{ backgroundColor: BG_COLOR, width: WIDTH, height: HEIGHT, paddingHorizontal: PADDING_HORIZONTAL, paddingTop: PADDING_TOP }}>
            <View style={{ backgroundColor: COLOR.white, height: HEIGHT / 1.05, width: WIDTH, position: 'absolute', bottom: 0, borderTopLeftRadius: 35, borderTopRightRadius: 35, alignItems: 'center', paddingVertical: 20, rowGap: 10 }} >
                <Text style={{ color: '#593E67', fontSize: 24, fontFamily: 'Helvetica Neue', fontWeight: '700' }}>LỊCH SỬ</Text>
                <FlatList
                    style={{ marginBottom: 55 }}
                    removeClippedSubviews
                    maxToRenderPerBatch={6}
                    data={data}
                    renderItem={(item) => <RenderItem data={item} navigation={navigation} />}
                    keyExtractor={(item) => item._id.toString()}
                />
            </View>
        </View>
    )
}

export default LichsuNVHC

const styles = StyleSheet.create({
    textBottom: {
        color: '#804F1E',
        fontSize: 14,
        fontFamily: 'Helvetica Neue',
        fontWeight: '400',
        textTransform: 'capitalize',
    }
})
