import CaiDat from "../screen/CaiDat/Caidat";
import EditThongTin from "../screen/CaiDat/EditThongTin";
export enum RootStackCaiDatEnum {
    CaiDat = 'CaiDat',
    EditThongTin = 'EditThongTin'
}

export type RootStackParamListCaiDat = {
    CaiDat: undefined,
    EditThongTin: undefined
}


export const RootStackCaiDat = () => {
    const Screen: any = [
        { id: 1, name: RootStackCaiDatEnum.CaiDat, component: CaiDat, options: {} },
        { id: 2, name: RootStackCaiDatEnum.EditThongTin, component: EditThongTin, options: {} },
    ]
    return Screen;
}

export const configStack = ({ props }: any) => {
    return {
        headerShown: false,
    }
}