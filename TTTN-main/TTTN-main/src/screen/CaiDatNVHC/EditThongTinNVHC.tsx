import { Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import COLOR, { BG_COLOR, HEIGHT, PADDING_HORIZONTAL, PADDING_TOP, WIDTH } from '../../utilities'
import { NativeStackHeaderProps } from '@react-navigation/native-stack'
import { UserContext } from '../../provider/Provider'

const EditThongTinNVHC = ({ navigation }: NativeStackHeaderProps) => {
    const { userGoogle, userResponse, addNumberPhone } = useContext(UserContext);
    const [sdt, setSdt] = useState<string>();
    const handleAddNumberPhone = async () => {
        await addNumberPhone(sdt);
        navigation.goBack();
    }
    return (
        <View style={{ backgroundColor: BG_COLOR, width: WIDTH, height: HEIGHT, paddingHorizontal: PADDING_HORIZONTAL, paddingTop: PADDING_TOP }}>
            <Pressable onPress={() => navigation.goBack()}>
                <Icon name='chevron-back' size={26} color={COLOR.white} />
            </Pressable>
            <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                <View style={{ alignItems: 'center', flexDirection: 'column' }}>
                    <Image style={{ width: 100, height: 100, backgroundColor: COLOR.white, borderRadius: 50 }} source={{ uri: userGoogle.user.photo }} />
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: COLOR.white, marginTop: 10 }}>{userGoogle.user.name}</Text>
                    <Text style={{ fontSize: 16, color: COLOR.white, marginTop: 10 }}>{userResponse.sdt}</Text>
                </View>
            </View>
            <View style={{ backgroundColor: COLOR.white, height: HEIGHT / 1.5, width: WIDTH, position: 'absolute', bottom: 0, borderTopLeftRadius: 35, borderTopRightRadius: 35, alignItems: 'flex-start', paddingVertical: 30, rowGap: 20, paddingHorizontal: 20 }} >
                <View style={styles.item}>
                    <TextInput placeholder='Số điện thoại' value={sdt} onChangeText={setSdt} />
                </View>
                <TouchableOpacity style={styles.btn} onPress={handleAddNumberPhone} >
                    <Text style={{ color: 'white', fontWeight: '700', fontSize: 18 }}>
                        Lưu thông tin
                    </Text>
                </TouchableOpacity>
            </View>

        </View >
    )
}

export default EditThongTinNVHC

const styles = StyleSheet.create({
    btn: {
        width: '100%',
        height: 50,
        backgroundColor: '#DE741C',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textItem: {
        color: '#593E67',
        fontSize: 18,
        fontFamily: 'Poppins',
        fontWeight: '400'
    },
    icon: {
        backgroundColor: '#EDF0F0',
        padding: 10,
        borderRadius: 10
    },
    item: {
        width: '100%',
        borderWidth: 0.5,
        borderRadius: 10
    }
})