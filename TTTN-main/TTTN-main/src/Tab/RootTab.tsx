import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { CaiDatNVHCNavigation, CaiDatNavigation, LichSuNVHCNavigation, LichSuNavigation, LienHeNavigation, TrangChuNVHCNavigation, TrangChuNavigation } from "../Stack/StackNavigation";
import COLOR, { BG_COLOR } from "../utilities";

export enum RootTabScreenENum {
    StackTrangChu = 'Trang chủ',
    StackLichSu = 'Lịch sử',
    StackLienHe = 'Liên hệ',
    StackCaiDat = 'Cài đặt',
    StackTrangChuNVHC = 'Trang chủ',
    StackLichSuNVHC = 'Lịch sử',
    StackCaiDatNVHC = 'Cài đặt',
};

export type RootTabParamList = {
    StackTrangChu: undefined,
    StackLichSu: undefined,
    StackLienHe: undefined,
    StackCaiDat: undefined,
    StackTrangChuNVHC: undefined,
    StackLichSuNVHC: undefined,
    StackCaiDatNVHC: undefined,
};

export const RootBottomTabGiangVien = () => {

    const Screens: any[] = [
        { id: 1, name: RootTabScreenENum.StackTrangChu, component: TrangChuNavigation, option: {} },
        { id: 2, name: RootTabScreenENum.StackLichSu, component: LichSuNavigation, option: {} },
        { id: 3, name: RootTabScreenENum.StackLienHe, component: LienHeNavigation, option: {} },
        { id: 4, name: RootTabScreenENum.StackCaiDat, component: CaiDatNavigation, option: {} },
    ]
    return Screens;
}
export const RootBottomTabNVHC = () => {

    const Screens: any[] = [
        { id: 1, name: RootTabScreenENum.StackTrangChuNVHC, component: TrangChuNVHCNavigation, option: {} },
        { id: 2, name: RootTabScreenENum.StackLichSuNVHC, component: LichSuNVHCNavigation, option: {} },
        { id: 4, name: RootTabScreenENum.StackCaiDatNVHC, component: CaiDatNVHCNavigation, option: {} },
    ]
    return Screens;
}
export const configTab = ({ route }: any) => {
    let color: any
    return {
        tabBarIcon: ({ focused }: any) => {
            let iconName: any;
            color = focused ? BG_COLOR : COLOR.gray
            console.log(route.name);

            if (route.name === RootTabScreenENum.StackTrangChu) {
                iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === RootTabScreenENum.StackLichSu) {
                iconName = focused ? 'history' : 'history';
            }
            else if (route.name === RootTabScreenENum.StackLienHe) {
                iconName = focused ? 'phone' : 'phone-outline';
            }
            else if (route.name === RootTabScreenENum.StackCaiDat) {
                iconName = focused ? 'cog' : 'cog-outline';
            }

            return (
                <Icon name={iconName} size={27} color={color} />
            );
        },

    }
}