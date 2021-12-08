import React, { Component } from "react";
import dayjs from "dayjs";
import styles from "./Weather.module.scss";
import {
    fetchWeatherForecast, cityDefault, cityNorthOptions,
    cityWestOptions, citySouthOptions, cityEastOptions,
    cityOtherOptions, handleData, cityOptions
} from "./WeatherConst";
import WeatherCard from "./Card/WeatherCard";
import { Checkbox, Form, Button, TreeSelect, Row, Col } from "antd";
import { isEqual } from "lodash";

class Weather extends Component {
    formRef = React.createRef();

    state = {
        data: [],
        location: cityDefault,
        lastUpdate: "",
        selectData: []
    };

    componentDidMount() {
        // const fetchingData = async () => {
        //     const data = await Promise.all([
        //         fetchWeather(locationDefault)
        //     ]);
        //     this.setState({
        //         data: data[0]
        //     })
        // }
        // fetchingData();

        const fetchingForecast = async () => {
        const data = await Promise.all([fetchWeatherForecast(cityDefault)]);
        this.setState({
            data: this.fillCard(data[0]),
            lastUpdate: dayjs(new Date()).format("YYYY-MM-DD HH:mm"),
        });
        };
        fetchingForecast();
    }

    componentDidUpdate(prevProps, prevState) {
        if (!isEqual(prevState, this.state)) {
        this.formRef.current.setFieldsValue(this.state);
        }
    }

    componentWillUnmount() {}

    onChange = (value, key) => {
        this.setState({
            [key]: value,
        });
    };

    onSelect = (value) => {
        this.setState({
            selectData: value,
        })
    }

    onFinish = () => {
        let submitData = [];
        this.state.selectData.forEach((item) => {
            const tmpData = this.handleRegionToCountry(item);
            submitData = !!tmpData.length ? submitData.concat(tmpData) : submitData.concat(item);
        })
        const fetchingForecast = async () => {
        const data = await Promise.all([
            fetchWeatherForecast(submitData),
        ]);
        this.setState({
            data: this.fillCard(data[0]),
        });
        };
        fetchingForecast();
    };

    handleRegionToCountry = (regionData) => {
        switch (regionData) {
            case '北部':
                return ['基隆市', '新北市', '臺北市', '桃園市', '新竹縣', '新竹市']
            case '南部':
                return ['嘉義縣', '嘉義市', '臺南市', '高雄市', '屏東縣']
            case '西部':
                return ['苗栗縣', '臺中市', '彰化縣', '雲林縣', '南投縣']
            case '東部':
                return ['宜蘭縣', '花蓮縣', '臺東縣']
            case '其他':
                return ['金門縣', '連江縣', '澎湖縣']
            default:
                return []
        }
    }

    renderCheckBox = () => {
        const renderData = [
        cityNorthOptions,
        cityWestOptions,
        citySouthOptions,
        cityEastOptions,
        cityOtherOptions,
        ];

        return renderData.map((data, id) => (
        <Row gutter={[16, 24]} key={id}>
            {data.map((item, idx) => (
            <Col span={4} key={idx}>
                <Checkbox value={item.value}>{item.label}</Checkbox>
            </Col>
            ))}
        </Row>
        ));
    };

    fillCard = (data) => {
        const num = data.length < 4 ? data.length : data.length % 4;
        const tmpArr = !!data.length ? new Array(4 - num).fill({
            transparent: true
        }) : [];
        return [ ...data, ...tmpArr]
    }

    render() {
        const { SHOW_PARENT } = TreeSelect;
        const treeData = handleData(cityOptions);

    return (
        <div className={styles["weather"]}>
            <div className={styles["weather-box"]}>
                <div className={styles["weather-header"]}>
                    <div className={styles["weather-title"]}>Current Weather</div>
                    <div className={styles["weather-desc"]}>選擇想查看的地區，即可查詢即時天氣。</div>
                    <div className={styles["weather-desc"]}>{`最後查詢時間：${
                        !!this.state.lastUpdate ? this.state.lastUpdate : "無查詢資料"
                    }`}</div>
                    <div className={styles["weather-form"]}>
                        <Form
                            ref={this.formRef}
                            onFinish={this.onFinish}
                            initialValues={this.state}
                            layout="inline"
                        >
                            <Form.Item className={styles['tree-form']}>
                                <TreeSelect
                                    style={{ width: "100%" }}
                                    value={this.state.value}
                                    dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                                    treeData={treeData}
                                    placeholder="請選擇想查看的區域"
                                    treeDefaultExpandAll
                                    onChange={this.onSelect}
                                    multiple
                                    treeCheckable
                                    showCheckedStrategy={SHOW_PARENT}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button htmlType="submit">送出查詢</Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
                <div className={styles["weather-list"]}>
                    {this.state.data.map((item, idx) => (
                        <WeatherCard key={idx} data={item} switchIcon={this.switchIcon} />
                    ))}
                </div>
            </div>
        </div>
    );
  }
}

export default Weather;
