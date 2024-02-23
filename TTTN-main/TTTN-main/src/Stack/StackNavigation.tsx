
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { RootStackTrangChu, configStack } from './RootStackTrangChu';
import { RootStackLichsu } from './RootStackLichSu';
import { RootStackLienHe } from './RootStackLienHe';
import { RootStackCaiDat } from './RootStackCaiDat';
import { RootStackTrangChuNVHC } from './RootStackTrangChuNVHC';
import { RootStackLichSuNVHC } from './RootStackLichSuNVHC';
import { RootStackCaiDatNVHC } from './RootStackCaiDatNVHC';

const Stack = createNativeStackNavigator();
export const TrangChuNavigation = () => {

    return <Stack.Navigator initialRouteName='TrangChu' screenOptions={(props) => configStack(props)} >
        {RootStackTrangChu().map((item: any) => {
            return <Stack.Screen key={item.id} name={item.name} component={item.component} options={item.options} />
        })}
    </Stack.Navigator>
}
export const LichSuNavigation = () => {

    return <Stack.Navigator initialRouteName='TrangChu' screenOptions={(props) => configStack(props)} >
        {RootStackLichsu().map((item: any) => {
            return <Stack.Screen key={item.id} name={item.name} component={item.component} options={item.options} />
        })}
    </Stack.Navigator>
}
export const LienHeNavigation = () => {

    return <Stack.Navigator initialRouteName='TrangChu' screenOptions={(props) => configStack(props)} >
        {RootStackLienHe().map((item: any) => {
            return <Stack.Screen key={item.id} name={item.name} component={item.component} options={item.options} />
        })}
    </Stack.Navigator>
}
export const CaiDatNavigation = () => {

    return <Stack.Navigator initialRouteName='TrangChu' screenOptions={(props) => configStack(props)} >
        {RootStackCaiDat().map((item: any) => {
            return <Stack.Screen key={item.id} name={item.name} component={item.component} options={item.options} />
        })}
    </Stack.Navigator>
}

export const TrangChuNVHCNavigation = () => {

    return <Stack.Navigator initialRouteName='TrangChu' screenOptions={(props) => configStack(props)} >
        {RootStackTrangChuNVHC().map((item: any) => {
            return <Stack.Screen key={item.id} name={item.name} component={item.component} options={item.options} />
        })}
    </Stack.Navigator>
}
export const LichSuNVHCNavigation = () => {

    return <Stack.Navigator initialRouteName='TrangChu' screenOptions={(props) => configStack(props)} >
        {RootStackLichSuNVHC().map((item: any) => {
            return <Stack.Screen key={item.id} name={item.name} component={item.component} options={item.options} />
        })}
    </Stack.Navigator>
}
export const CaiDatNVHCNavigation = () => {

    return <Stack.Navigator initialRouteName='TrangChu' screenOptions={(props) => configStack(props)} >
        {RootStackCaiDatNVHC().map((item: any) => {
            return <Stack.Screen key={item.id} name={item.name} component={item.component} options={item.options} />
        })}
    </Stack.Navigator>
}