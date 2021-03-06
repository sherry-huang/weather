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
            case '??????':
                return ['?????????', '?????????', '?????????', '?????????', '?????????', '?????????']
            case '??????':
                return ['?????????', '?????????', '?????????', '?????????', '?????????']
            case '??????':
                return ['?????????', '?????????', '?????????', '?????????', '?????????']
            case '??????':
                return ['?????????', '?????????', '?????????']
            case '??????':
                return ['?????????', '?????????', '?????????']
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
                    <div className={styles["weather-desc"]}>??????????????????????????????????????????????????????</div>
                    <div className={styles["weather-desc"]}>{`?????????????????????${
                        !!this.state.lastUpdate ? this.state.lastUpdate : "???????????????"
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
                                    placeholder="???????????????????????????"
                                    treeDefaultExpandAll
                                    onChange={this.onSelect}
                                    multiple
                                    treeCheckable
                                    showCheckedStrategy={SHOW_PARENT}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button htmlType="submit">????????????</Button>
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
