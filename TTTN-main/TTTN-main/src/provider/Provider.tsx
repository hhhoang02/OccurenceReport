import { GoogleSignin } from "@react-native-google-signin/google-signin";
import axios from "axios";
import { createContext, useState } from "react";

export const UserContext = createContext<any>({});
export const UserProvider = (props: any) => {
    const { children } = props;
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [role, setRole] = useState<number>();
    const [idReportRecipient, setIdReportRecipient] = useState<string>('');
    const [userGoogle, setUserGoogle] = useState<Object>();
    const [isLoadding, setIsLoadding] = useState<boolean>(false);
    const [isLoaddingAddReport, setIsLoaddingAddReport] = useState<boolean>(false);
    const [userResponse, setUserResponse] = useState<any>();
    const login = (userName: any, email: any, avatar: any) => {
        console.log(avatar);
        axios({
            method: 'post',
            url: 'https://tttn-api-86140b31a001.herokuapp.com/users/login',
            data: {
                userName: userName,
                email: email,
                avatar: avatar,
            },
            responseType: 'json'
        })
            .then(async function (response) {
                if (!response?.data?.lock) {
                    setUserResponse(response?.data);
                    setIsLoadding(false);
                    setIsLoggedIn(true);
                    setRole(response.data.role);
                    setIdReportRecipient(response.data.idUser);
                } else {
                    console.warn('Account had been');
                    setIsLoadding(false);
                    await GoogleSignin.signOut();
                }
                return response.data;
            });
    }
    const logout = async () => {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
        setIsLoggedIn(false);
    }
    const getAllReport = () => axios({
        method: 'get',
        url: `https://tttn-api-86140b31a001.herokuapp.com/users/getAllReport`,
        responseType: 'json'
    })
        .then(function (response) {
            return response.data;
        });
    const getReportByID = () => axios({
        method: 'get',
        url: `https://tttn-api-86140b31a001.herokuapp.com/users/getReportByUser/${idReportRecipient}`,
        responseType: 'json'
    })
        .then(function (response) {

            return response.data;
        });
    const updateStatusReport = (idReport: any) => axios({
        method: 'post',
        url: `https://tttn-api-86140b31a001.herokuapp.com/users/receiveIncidents/${idReportRecipient}/${idReport}`,
        responseType: 'json'
    })
        .then(function (response) {
            return response.data;
        });
    const doneStatusReport = (idReport: any, errorFrom: any, time: any, note: any) => {
        console.log(idReport, errorFrom, time, note);
        return axios({
            method: 'post',
            url: `https://tttn-api-86140b31a001.herokuapp.com/users/completionReport/${idReport}`,
            data: {
                errorto: errorFrom,
                timeto: time,
                note: note,
            },
            responseType: 'json'
        })
            .then(function (response) {
                return response.data;
            });
    }
    const addReport = ({ inputText, selected, imageURL, description }: any) =>
        axios({
            method: 'post',
            url: `https://tttn-api-86140b31a001.herokuapp.com/users/addReport`,
            responseType: 'json',
            data: {
                room: inputText,
                reportType: selected,
                image: imageURL,
                description: description,
                annunciator: idReportRecipient,
            },
        })
            .then(function (response) {
                setIsLoaddingAddReport(false)
                return response.data;
            });

    const evaluateReport = ({ rating, evaluate, idReport }: any) => axios({
        method: 'post',
        url: `https://tttn-api-86140b31a001.herokuapp.com/users/evaluate/${idReport}`,
        responseType: 'json',
        data: {
            start: rating,
            evaluate: evaluate,
        },
    })
        .then(function (response) {
            return response.data;
        });
    const getReportByAnnunciator = () => axios({
        method: 'get',
        url: `https://tttn-api-86140b31a001.herokuapp.com/users/getReportByReportRecipient/${idReportRecipient}`,
        responseType: 'json',
    })
        .then(function (response) {
            return response.data;
        });
    const addNumberPhone = (sdt: number) => axios({
        method: 'post',
        url: `https://tttn-api-86140b31a001.herokuapp.com/users/profile`,
        data: {
            id: idReportRecipient,
            sdt: sdt,
        },
        responseType: 'json',
    })
        .then(function (response) {
            setUserResponse(response.data)
            return response.data;
        });
    const getAllAdmin = () => axios({
        method: 'get',
        url: `https://tttn-api-86140b31a001.herokuapp.com/users/getAdmin`,
        responseType: 'json',
    })
        .then(function (response) {
            return response.data;
        });
    return (
        <UserContext.Provider
            value={{ isLoggedIn, setIsLoggedIn, isLoadding, setIsLoadding, isLoaddingAddReport, setIsLoaddingAddReport, login, logout, userGoogle, setUserGoogle, role, getAllReport, getReportByID, updateStatusReport, doneStatusReport, addReport, evaluateReport, getReportByAnnunciator, userResponse, addNumberPhone, getAllAdmin }}>
            {children}
        </UserContext.Provider>
    )
}