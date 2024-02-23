import CTYeuCau from "../screen/TrangChuNVHC/CTYeuCau";
import DSSuCo from "../screen/TrangChuNVHC/DSSuCo";
import TrangChuNVHC from "../screen/TrangChuNVHC/TrangChuNVHC";


export enum RootStackTrangChuNVHCEnum {
    TrangChuNVHC = 'TrangChuNVHC',
    DSSuCo = 'DSSuCo',
    CTYeuCau = 'CTYeuCau'
}

export type RootStackParamListLienHe = {
    TTrangChuNVHCra: undefined,
    DSSuCo: undefined,
    CTYeuCau: undefined,
}


export const RootStackTrangChuNVHC = () => {
    const Screen: any = [
        { id: 1, name: RootStackTrangChuNVHCEnum.TrangChuNVHC, component: TrangChuNVHC, options: {} },
        { id: 2, name: RootStackTrangChuNVHCEnum.DSSuCo, component: DSSuCo, options: {} },
        { id: 3, name: RootStackTrangChuNVHCEnum.CTYeuCau, component: CTYeuCau, options: {} },
    ]
    return Screen;
}

export const configStack = ({ props }: any) => {
    return {
        headerShown: false,
    }
}