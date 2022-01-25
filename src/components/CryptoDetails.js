import React, {useState} from "react";
import HTMLReactParser from "html-react-parser";
import {useParams} from "react-router-dom";
import millify from "millify";
import {Col, Row, Typography, Select} from "antd";
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined} from '@ant-design/icons';

import {useGetCoinDetailsQuery, useGetCoinHistoryQuery} from "../services/cryptoApi";
import LineChart from "./LineChart";

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
    const {coinId} = useParams();
    const [timePeriod, setTimePeriod] = useState('7d');
    const {data, isFetching} = useGetCoinDetailsQuery(coinId);
    const {data:coinHistory} = useGetCoinHistoryQuery({coinId, timePeriod});
    const coinDetails = data?.data?.coin;

    if (isFetching) return "Loading";

    const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

    const stats = [
        { title: 'Price to USD', value: `$ ${coinDetails.price && millify(coinDetails.price)}`, icon: <DollarCircleOutlined /> },
        { title: 'Rank', value: coinDetails.rank, icon: <NumberOutlined /> },
        { title: 'Market Cap', value: `$ ${coinDetails.marketCap && millify(coinDetails.marketCap)}`, icon: <DollarCircleOutlined /> },
        { title: 'All-time-high(daily avg.)', value: `$ ${millify(coinDetails.allTimeHigh.price)}`, icon: <TrophyOutlined /> },
    ];
    const genericStats = [
        { title: 'Number Of Markets', value: coinDetails.numberOfMarkets, icon: <FundOutlined /> },
        { title: 'Number Of Exchanges', value: coinDetails.numberOfExchanges, icon: <MoneyCollectOutlined /> },
        { title: 'Aprroved Supply', value: coinDetails.supply.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
        { title: 'Total Supply', value: `$ ${millify(coinDetails.supply.total)}`, icon: <ExclamationCircleOutlined /> },
        { title: 'Circulating Supply', value: `$ ${millify(coinDetails.supply.circulating)}`, icon: <ExclamationCircleOutlined /> },
    ];

    return(
        <Col className="coin-detail-container">
            <Col className="coin-heading-container">
                <Title level={2} className="coin-name">
                    {coinDetails.name} ({coinDetails.symbol}) Price
                </Title>
                <p>{coinDetails.name} Live price in USD. View value statistics, market cap and supply.</p>
            </Col>
            <Select defaultValue="7d" className="select-timeperiod" placeholder="Select Time Period" onChange={(value) =>
                setTimePeriod(value)}>
                {time.map((date) =>
                    <Option key={date}>{date}</Option>)}
            </Select>

            <LineChart coinHistory={coinHistory} currentPrice={millify(coinDetails.price)} coinName={coinDetails.name}/>

            <Col className="stats-container">
                <Col className="coin-value-statistics">
                    <Col className="coin-value-statistics-heading">
                        <Title level={3} className="coin-details-heading">
                            {coinDetails.name} Value Statistics
                        </Title>
                        <p>An overview showing the statistics of {coinDetails.name}</p>
                    </Col>
                    {stats.map(({icon, title, value}) => (
                        <Col className="coin-stats" key={title}>
                             <Col className="coin-stats-name">
                                 <Text>{icon}</Text>
                                 <Text>{title}</Text>
                             </Col>
                            <Text className="stats">{value}</Text>
                        </Col>
                    ))}
                </Col>
                <Col className="other-stats-info">
                    <Col className="coin-value-statistics-heading">
                        <Title level={3} className="coin-details-heading">
                            Other Statistics
                        </Title>
                        <p>An overview showing more statistics</p>
                    </Col>
                    {genericStats.map(({icon, title, value}) => (
                        <Col className="coin-stats" key={title}>
                            <Col className="coin-stats-name">
                                <Text>{icon}</Text>
                                <Text>{title}</Text>
                            </Col>
                            <Text className="stats">{value}</Text>
                        </Col>
                    ))}
                </Col>
            </Col>
            <Col className="coin-desc-link">
                <Row className="coin-desc">
                    <Title className="coin-details-heading" level={3}>
                        What is {coinDetails.name}
                        {HTMLReactParser(coinDetails.description)}
                    </Title>
                </Row>
                <Col className="coin-links">
                    <Title className="coin-details-heading" level={3}>
                        {coinDetails.name} links
                    </Title>
                    {coinDetails.links.map((link)=>(
                        <Row className="coin-link" key={link.name}>
                            <Title level={5} className="link-name">
                                {link.type}
                            </Title>
                            <a href={link.url} target="_blank" rel='noreferrer'>{link.name}</a>
                        </Row>
                    ))}
                </Col>
            </Col>
        </Col>
    )
}

export default CryptoDetails;