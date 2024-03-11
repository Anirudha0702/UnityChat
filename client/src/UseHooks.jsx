import { useQuery } from "@tanstack/react-query";
import _getDoc from "./db/Firebase/getDoc";
import FindUsers from "./db/MongoDB/findUSers";
import GetStatusOfUser from "./db/MongoDB/GetStatusOfUser";
export const  GetUser=(userId)=>{
    return useQuery(
       {
        queryKey:['Users',userId],
        queryFn:()=> _getDoc('Users',userId),
        enabled:!!userId    
        })
}
export const Search=(key)=>{
    return useQuery(
        {
            queryKey:['mongo_users',key],
            queryFn:()=>FindUsers(key),
            enabled:key.length>2   
            })
}
export const GetStatus=(userId)=>{
    return useQuery(
        {
            queryKey:['status',userId],
            queryFn:()=>GetStatusOfUser(userId),
            enabled:!!userId   
            })
}
