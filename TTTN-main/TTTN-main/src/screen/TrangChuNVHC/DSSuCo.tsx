import { Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React from 'react'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import HienCo from './HienCo';
import DangTiepNhan from './DangTiepNhan';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import COLOR, { WIDTH } from '../../utilities';
import Icon from 'react-native-vector-icons/Ionicons';

const renderScene = SceneMap({
    HienCo: HienCo,
    DangTiepNhan: DangTiepNhan,
});



const DSSuCo = ({ navigation }: NativeStackHeaderProps) => {

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'HienCo', title: 'Hien Co', navigation: navigation },
        { key: 'DangTiepNhan', title: 'Đang tiếp nhận', navigation: navigation },
    ]);

    return (

        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: WIDTH }}
            renderTabBar={(props) => (
                <View>
                    <Pressable onPress={() => navigation.goBack()} style={{paddingTop: 20, paddingLeft: 10}}>
                        <Icon name='chevron-back' size={26} color={COLOR.orange} />
                    </Pressable>
                    <TabBar
                        {...props}
                        indicatorStyle={{ backgroundColor: 'white' }}
                        style={{ backgroundColor: '#FFA500', margin: 10, borderRadius: 10 }}
                    />
                </View>
            )}
        />

    )
}

export default DSSuCo

const styles = StyleSheet.create({
    container: {
        color: 'orange',
    }
})