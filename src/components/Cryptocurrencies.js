import React, {useState} from "react";
import millify from "millify";
import {Link} from 'react-router-dom';
import {Card, Input, Col, Row} from 'antd';

import {useGetCoinsQuery} from "../services/cryptoApi";

const Cryptocurrencies = () => {
    const {data:cryptosList, isFetching} = useGetCoinsQuery();
    const [cryptos, setCryptos] = useState(cryptosList?.data?.coins);
    console.log(cryptos);

    return(
        <div>
            Cryptocurrencies
        </div>
    )

}

export default Cryptocurrencies;