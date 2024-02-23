import CaiDatNVHC from "../screen/CaiDatNVHC/CaiDatNVHC";
import EditThongTinNVHC from "../screen/CaiDatNVHC/EditThongTinNVHC";


export enum RootStackCaiDatNVHCEnum {
    CaiDatNVHC = 'CaiDatNVHC',
    EditThongTinNVHC = 'EditThongTinNVHC'
}

export type RootStackParamListCaiDatNVHC = {
    CaiDatNVHC: undefined,
    EditThongTinNVHC: undefined
}


export const RootStackCaiDatNVHC = () => {
    const Screen: any = [
        { id: 1, name: RootStackCaiDatNVHCEnum.CaiDatNVHC, component: CaiDatNVHC, options: {} },
        { id: 2, name: RootStackCaiDatNVHCEnum.EditThongTinNVHC, component: EditThongTinNVHC, options: {} },
    ]
    return Screen;
}

export const configStack = ({ props }: any) => {
    return {
        headerShown: false,
    }
}