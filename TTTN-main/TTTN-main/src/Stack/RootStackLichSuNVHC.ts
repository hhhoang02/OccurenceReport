import LichsuNVHC from "../screen/LichSuNVHC/LichsuNVHC";
import Lichsu_ChitietNVHC from "../screen/LichSuNVHC/Lichsu_ChitietNVHC";

export enum RootStackLichSuNVHCEnum {
    LichsuNVHC = 'LichsuNVHC',
    Lichsu_ChitietNVHC = 'Lichsu_ChitietNVHC',
}

export type RootStackParamListLichSuNVHC = {
    LichsuNVHC: undefined,
    Lichsu_ChitietNVHC: undefined,
}


export const RootStackLichSuNVHC = () => {
    const Screen: any = [
        { id: 1, name: RootStackLichSuNVHCEnum.LichsuNVHC, component: LichsuNVHC, options: {} },
        { id: 2, name: RootStackLichSuNVHCEnum.Lichsu_ChitietNVHC, component: Lichsu_ChitietNVHC, options: {} },
    ]
    return Screen;
}

export const configStack = ({ props }: any) => {
    return {
        headerShown: false,
    }
}