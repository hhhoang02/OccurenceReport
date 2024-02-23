import { Alert, Image, Modal, Pressable, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import COLOR, { BG_COLOR, BUTTON_COLOR, HEIGHT, WIDTH } from '../../utilities';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import Realm from 'realm';
import axios from 'axios';
import { UserContext } from '../../provider/Provider';
import Spinner from 'react-native-loading-spinner-overlay';

interface Item {
    id: number;
    name: string;
    familyName: string;
}
const DangNhap = () => {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [focus, setFocus] = useState<number>(0);
    const [choseSchool, setChoseSchool] = useState<string>('Lựa chọn cơ sở');
    const [familySchool, setFamilySchool] = useState<string>('');
    const { login, setUserGoogle, isLoadding, setIsLoadding } = useContext(UserContext);

    const Item = ({ item }: { item: Item }) => {
        return (
            <Pressable onPress={() => { setFocus(item.id), setChoseSchool(item.name), setFamilySchool(item.familyName) }} style={{ maxWidth: '100%', borderBottomWidth: 1, alignItems: 'center', borderColor: focus === item.id ? '#ff8800' : '#626262' }}>
                <Text style={[{ fontSize: 18, fontWeight: '500', color: focus === item.id ? '#ff8800' : '#626262' },]}>{item.name}</Text>
            </Pressable>
        )
    }
    const app = new Realm.App({
        id: "application-0-hzgnr",
    });
    GoogleSignin.configure({
        webClientId: '866351015855-c5ndv8jah0pbh3btmt4rj8dvkdr2jtjs.apps.googleusercontent.com',
    });
    // Handle user state changes
    async function onGoogleButtonPress() {
        // Check if your device supports Google Play
        try {
            // Sign into Google
            const playService = await GoogleSignin.hasPlayServices();

            if (!playService) return;
            setIsLoadding(true);
            const { idToken }: any = await GoogleSignin.signIn();
            const userGoogle = await GoogleSignin.signIn();
            setUserGoogle(userGoogle);
            if (userGoogle.user.email.includes('fpt.edu.vn')) {
                if (userGoogle.user.familyName?.includes(familySchool) && familySchool != "") {
                    // use Google ID token to sign into Realm
                    const credential = Realm.Credentials.google({ idToken });
                    const user = await app.logIn(credential);
                    if (user) {
                        await login(userGoogle.user.name, userGoogle.user.email, userGoogle.user.photo);
                    }
                } else {
                    await GoogleSignin.revokeAccess();
                    setIsLoadding(false);
                    console.error("Chọn đúng cơ sở dùm cái !!!");
                }
            } else {
                await GoogleSignin.revokeAccess();
                setIsLoadding(false);
                console.error("Chọn cái Mail fpt.edu.vn dùm cái !!!");
            }

        } catch (error: any) {
            // some other error happened
            console.log(error);
            setIsLoadding(false);
            console.error("Có cái gì đó sai sai nè !!!");
        }
    }
    return (
        <View style={{ backgroundColor: COLOR.white, width: WIDTH, height: HEIGHT, justifyContent: 'center' }}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                hardwareAccelerated
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={{ rowGap: 20 }}>
                            {data.map((item: any) => {
                                return <Item item={item} key={item.id} />
                            }
                            )}
                        </View>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.textStyle}>Xác nhận</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <Spinner
                visible={isLoadding}
                textContent={'Loading...'}
                textStyle={{ color: COLOR.white }}
            />
            <View style={{ position: 'absolute', top: 0, height: HEIGHT / 3, width: WIDTH, backgroundColor: BG_COLOR, borderBottomLeftRadius: 35, borderBottomRightRadius: 35 }}>
            </View>
            <View style={{ alignItems: 'center', backgroundColor: COLOR.white, borderRadius: 20, borderWidth: 0.5, borderColor: '#d7d7d7', width: WIDTH / 1.3, height: HEIGHT / 2, alignSelf: 'center' }}>
                <Image style={{ width: 180, height: 90, marginTop: 30 }} source={require('../../assets/logo.png')} />
                <View style={{ width: '100%', alignItems: 'center', paddingTop: 60, rowGap: 40 }}>
                    <TouchableOpacity style={[{ width: '85%', height: 'auto', paddingVertical: 5, borderRadius: 10, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#d6d6d6', backgroundColor: '#ececec', paddingHorizontal: 5 }, styles.elevation]}
                        onPress={() => setModalVisible(true)}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: COLOR.gray }}>{choseSchool}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onGoogleButtonPress} style={[{ width: '80%', height: 45, borderRadius: 10, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#d6d6d6', backgroundColor: BUTTON_COLOR }, styles.elevation]}>

                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: COLOR.white }}>Google</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default DangNhap

const styles = StyleSheet.create({
    elevation: {
        elevation: 5,
        shadowColor: '#202020',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        width: 300,
        height: 400,
        backgroundColor: 'white',
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        width: '50%',
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        position: 'absolute',
        bottom: 20,

    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#ff8800',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
})
const data = [
    {
        id: 1,
        name: 'FPT Polytechnic HO',
        familyName: "FPL HO"
    },
    {
        id: 2,
        name: 'FPT Polytechnic Hà Nội',
        familyName: "FPL HN"

    },
    {
        id: 3,
        name: 'FPT Polytechnic Hồ Chí Minh',
        familyName: "FPL HCM"
    },
    {
        id: 4,
        name: 'FPT Polytechnic Đà nẵng',
        familyName: "FPL DN"
    },
    {
        id: 5,
        name: 'FPT Polytechnic Cần thơ',
        familyName: "FPL CT"

    },
    {
        id: 6,
        name: 'FPT Polytechnic Tây Nguyên',
        familyName: "FPL TN"

    },
    {
        id: 7,
        name: 'FPT Polytechnic Hải Phòng',
        familyName: "FPL HP"

    }
]