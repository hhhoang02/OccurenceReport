import { Image, Modal, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import COLOR, { HEIGHT, PADDING_HORIZONTAL, PADDING_TOP, WIDTH } from '../../utilities'
import Icon from 'react-native-vector-icons/Ionicons'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamListLichSu } from '../../Stack/RootStackLichSu';
import StepIndicator from 'react-native-step-indicator';
import StarRating from 'react-native-star-rating-widget';
import { UserContext } from '../../provider/Provider';
type Props = NativeStackScreenProps<RootStackParamListLichSu>;



const Lichsu_ChitietNVHC = ({ route, navigation }: Props) => {
    const { item } = route?.params as any;
    const idReport = item._id
    const { evaluateReport } = useContext(UserContext);

    const initStatePosition = item.status1 && item.status2 && item.status3 ? 3 : item.status1 && item.status2 ? 2 : 1
    const [currentPosition, setcurrentPosition] = useState<number>(initStatePosition);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [rating, setRating] = useState<number>(0);
    const [evaluate, setEvaluate] = useState<string>('');
    const [enableBtn, setEnableBtn] = useState<boolean>(false);

    const handleEvaluteReport = async () => {
        await evaluateReport({ rating, evaluate, idReport });
        setModalVisible(!modalVisible);
        setEnableBtn(true);
    }
    const renderLabel = (e: any) => {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10, columnGap: 10 }}>
                {e.position == 0 ?
                    <Image style={{ width: 50, height: 50 }} source={require('../../assets/Step1.png')} /> :
                    e.position == 1 ?
                        <Image style={{ width: 50, height: 50 }} source={require('../../assets/Step2.png')} /> :
                        <Image style={{ width: 50, height: 50 }} source={require('../../assets/Step3.png')} />
                }
                <View style={{ flexDirection: 'column' }}>
                    <Text style={{
                        color: '#593E67',
                        fontSize: 18,
                        fontFamily: 'Helvetica Neue',
                        fontWeight: '700',
                    }}>{e.label}</Text>
                    <Text style={{
                        color: '#DE741C',
                        fontSize: 16,
                        fontFamily: 'Poppins',
                        fontWeight: '400',
                    }}>{e.position == 0 ? item.status1.time : e.position == 1 ? item?.status2?.time : item?.status3?.time}    {e.position == 0 ? item.status1.date : e.position == 1 ? item?.status2?.date : item?.status3?.date}</Text>
                </View>
            </View>
        )
    }
    return (
        <View style={{ width: WIDTH, height: HEIGHT, paddingHorizontal: PADDING_HORIZONTAL, paddingTop: PADDING_TOP }}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                hardwareAccelerated
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={{ rowGap: 30, width: '100%', alignItems: 'center' }}>
                            <Text style={{
                                color: '#B85B56', fontSize: 20, fontFamily: 'Helvetica Neue', fontWeight: '700',
                            }}>Đánh giá</Text>
                            <StarRating
                                rating={rating}
                                onChange={setRating}
                            />
                            <View style={{ width: '100%', height: HEIGHT * 0.3, paddingVertical: 0, borderWidth: 0.5, borderRadius: 5 }}>
                                <TextInput returnKeyType='done' style={{ fontSize: 18 }} placeholder='Ghi đánh giá' value={evaluate} onChangeText={setEvaluate} />
                            </View>
                        </View>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={handleEvaluteReport}>
                            <Text style={styles.textStyle}>Đánh giá</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <View style={{ width: '100%', height: 'auto', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                <Pressable onPress={() => navigation.goBack()} style={{ position: 'absolute', left: 0 }}>
                    <Icon name='chevron-back' size={26} />
                </Pressable>
                <Text style={{ color: '#593E67', fontSize: 24, fontFamily: 'Helvetica Neue', fontWeight: '700', }}>YÊU CẦU</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', height: HEIGHT / 9, marginTop: 20, columnGap: 15 }}>
                <Image source={{ uri: item.annunciator.avatar }} style={{ width: 60, height: 60, borderRadius: 50, borderWidth: 0.5, borderColor: COLOR.gray }} />
                <View style={{ flexDirection: 'column', justifyContent: 'center', rowGap: 5 }}>
                    <Text style={{ color: '#804F1E', fontSize: 19, fontFamily: 'Helvetica Neue', fontWeight: '700', letterSpacing: 0.60, }}>{item.reportType}</Text>
                    <Text style={{ color: '#5EC401', fontSize: 14, fontFamily: 'Helvetica Neue', fontWeight: '400', textTransform: 'capitalize' }}>{item.annunciator.userName}</Text>
                    <View style={{ flexDirection: 'row', columnGap: 10 }}>
                        <Text style={styles.textBottom}>{item.thoigian}</Text>
                        <Text style={styles.textBottom}>SĐT: {item.annunciator.sdt ? item.annunciator.sdt : "chưa có thông tin"}</Text>
                    </View>
                </View>
            </View>

            <View style={{ width: '100%', height: 300, marginTop: HEIGHT / 15 }}>
                <Text style={{
                    color: '#593E67',
                    fontSize: 18,
                    fontFamily: 'Poppins',
                    fontWeight: '700',
                }}>
                    Trạng thái yêu cầu
                </Text>
                <StepIndicator
                    direction={'vertical'}
                    stepCount={3}
                    customStyles={{ labelAlign: 'flex-start', separatorStrokeWidth: 1, stepIndicatorSize: 20, currentStepIndicatorSize: 20, currentStepStrokeWidth: 0, stepIndicatorCurrentColor: COLOR.orange, stepIndicatorFinishedColor: COLOR.orange, stepIndicatorUnFinishedColor: '#ffcd71', separatorUnFinishedColor: '#ffcd71', separatorFinishedColor: COLOR.orange }}
                    labels={['Yêu cầu', 'Yêu cầu đã được tiếp nhận', 'Yêu cầu đã được hoàn thành']}
                    currentPosition={currentPosition - 1}
                    renderLabel={renderLabel}
                    renderStepIndicator={(e) => e.stepStatus === 'finished' || e.stepStatus === 'current' ? <Icon name='checkmark-sharp' size={16} /> : <></>}
                />
            </View>
            <View style={{ width: '100%', height: 'auto', paddingVertical: 10, paddingHorizontal: 10, borderRadius: 10, backgroundColor: '#e4e4e4', alignSelf: 'center', position: 'absolute', bottom: 100 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 16 }}>Đánh giá : </Text>
                    <StarRating rating={item.start} enableSwiping onChange={() => undefined} />
                </View>
                <Text style={{ alignSelf: 'center', fontSize: 16 }}>{item.evaluate}</Text>
            </View>

        </View>
    )
}

export default Lichsu_ChitietNVHC

const styles = StyleSheet.create({
    textBottom: {
        color: '#804F1E',
        fontSize: 14,
        fontFamily: 'Helvetica Neue',
        fontWeight: '400',
        textTransform: 'capitalize',
    },
    elevation: {
        elevation: 1,
        shadowColor: '#202020',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        width: WIDTH * 0.9,
        height: HEIGHT * 0.6,
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