import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const cryptoApiHeaders ={
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    'x-rapidapi-key': 'f3d92f4cd9msh73b3eb298292b51p19c125jsneb70c7ac7f5f'
}

const baseUrl = "https://coinranking1.p.rapidapi.com";

const createRequest = (url) => ({
    url,
    headers: cryptoApiHeaders
})


export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder) => ({
        getCoins: builder.query({
            query: (count) => createRequest(`/coins?limit=${count}`)
        }),
        getCoinsDetails: builder.query({
            query: (coinId) => createRequest(`/coins/${coinId}`)
        }),
    })
})

export const {
    useGetCoinsQuery, useGetCoinsDetails
} = cryptoApi