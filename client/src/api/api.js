/*
 * @Author: 农村高富帅
 * @Date: 2024-08-12 16:43:00
 * @LastEditors: 农村高富帅
 * @LastEditTime: 2024-08-12 17:24:10
 * @FilePath: /client/src/api/api.js
 * @Description: 
 * @mail: gaozemin0509@gmail.com
 */
import http from "./http";


export const apiCall = async (apiFunction, ...args) => {
    try {
        const response = await apiFunction(...args)
        return { res: response, err: null }
    }
    catch (e) {
        return { res: null, err: e }
    }

}

// get usre list
export const get_user_list = (data) => {
    return http.get("api/get_user_list", data)
}

// create user
export const create_user = (data) => {
    return http.post("api/create_user", data)
}

// edit user
export const edit_user = (data) => {
    return http.put("api/edit_user", data)
}