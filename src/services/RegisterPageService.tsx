import type { AxiosResponse } from "axios";
import axiosInstance from "../config/AxiosConfig";
import type { UserType } from "../types/Types";

class RegisterPageService {

    register(newUser: UserType): Promise<any>{
        return new Promise((resolve:any, reject:any)=>{
            axiosInstance.post('/users', newUser) //promise döner o yüzden then ile yakalanır
            .then((responce:AxiosResponse<any, any>)=> resolve(responce.data))
            .catch((error:any)=> reject(error));
        })
    }

}

export default new RegisterPageService();