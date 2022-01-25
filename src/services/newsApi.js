import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {cryptoApi} from "./cryptoApi";

const newsApiHeaders = {
    'x-bingapis-sdk': 'true',
    'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
    'x-rapidapi-key': 'f3d92f4cd9msh73b3eb298292b51p19c125jsneb70c7ac7f5f'
}

const baseUrl = "https://bing-news-search1.p.rapidapi.com";

const createRequest = (url) => ({
    url,
    headers: newsApiHeaders
})

export const newsApi = createApi({
    reducerPath: 'newsApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder) => ({
        getNews: builder.query({
            query: ({newsCategory, count}) => createRequest(`/news/search?q${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`)
        })
    })
})

export const {
    useGetNewsQuery,
} = newsApi;