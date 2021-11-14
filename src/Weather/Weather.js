import React, { Component } from 'react';
import dayjs from 'dayjs';
import styles from './Weather.module.scss';
import { fetchWeatherForecast, cityDefault,
        cityNorthOptions, cityWestOptions, citySouthOptions,
        cityEastOptions, cityOtherOptions
    } from './WeatherConst';
import WeatherCard from './Card/WeatherCard';
import { Checkbox, Form, Button, Row, Col } from 'antd';
import { isEqual } from 'lodash';
import { faSun, faCloud, faCloudSun,
        faCloudSunRain, faCloudRain, faCloudShowersHeavy,
        faSnowflake, faSmog
    } from '@fortawesome/free-solid-svg-icons';

class Weather extends Component {
    formRef = React.createRef();

    state = {
        data: [],
        location: cityDefault,
        lastUpdate: ""
    }

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
            const data = await Promise.all([
                fetchWeatherForecast(cityDefault)
            ]);
            this.setState({
                data: data[0],
                lastUpdate: dayjs(new Date()).format('YYYY-MM-DD HH:mm')
            })
        }
        fetchingForecast();
        
        
    }

    componentDidUpdate(prevProps, prevState) {
        if(!isEqual(prevState, this.state)) {
            this.formRef.current.setFieldsValue(this.state);
        }
    }

    componentWillUnmount() {
    }

    switchIcon = (code) => {
        switch (code) {
            case 1:
                return faSun;
            case 2:
                return faCloudSun;
            case 3:
                return faCloudSunRain;
            case 4:
            case 5:
            case 6:
            case 7:
                return faCloud;
            case 8:
            case 9:
            case 10:
            case 11:
            case 12:
            case 13:
            case 14:
            case 20:
            case 29:
            case 30:
            case 31:
            case 32:
                // 雨
                return faCloudRain;
            case 15:
            case 16:
            case 17:
            case 18:
            case 19:
            case 21:
            case 22:
            case 33:
            case 34:
            case 35:
            case 36:
            case 37:
            case 38:
            case 39:
            case 41:
                // 大雨
                return faCloudShowersHeavy;
            case 23:
            case 42:
                // 雪
                return faSnowflake;
            default:
                // 霧 25 26 27 28
                return faSmog;
        }

    }

    // type: undone, done, archive
    onChange = (value, key) => {
        this.setState({
            [key]: value
        })
    }

    onFinish = () => {

        const fetchingForecast = async () => {
            const data = await Promise.all([
                fetchWeatherForecast(this.state.location)
            ]);
            this.setState({
                data: data[0]
            })
        }
        fetchingForecast();
    }

    renderCheckBox = () => {
        const renderData = [
            cityNorthOptions,
            cityWestOptions,
            citySouthOptions,
            cityEastOptions,
            cityOtherOptions
        ];

        return renderData.map((data, id) => (
                <Row gutter={[16, 24]} key={id}>
                    { data.map((item, idx) => (
                        <Col span={4} key={idx}>
                            <Checkbox value={item.value}>{item.label}</Checkbox>
                        </Col>
                    ))}
                </Row>
            )
        )
    }

    render() {
        const itemLayout = { wrapperCol: { span: 14 }}
        const btnLayout = { wrapperCol: { offset: 20 }}
        return (
            <div className={styles['weather']}>
                <div className={styles['weather-header']}>
                    <div className={styles['weather-title']}>天氣查詢</div>
                    <div className={styles['weather-form']}>
                        <Form
                            ref={this.formRef}
                            onFinish={this.onFinish}
                            initialValues={this.state}
                        >
                            <Form.Item
                                name="location"
                                label="請選擇地區"
                                {...itemLayout}
                            >
                                <Checkbox.Group
                                    onChange={(e) => this.onChange(e, "location")}
                                >
                                        {/* { cityOptions.map((item, idx) => {
                                            <Row>
                                                <Col span={2} key={idx}>
                                                    <Checkbox value={item.value}>{item.label}</Checkbox>
                                                </Col>
                                            </Row>
                                        })} */}
                                        {this.renderCheckBox()}
                                </Checkbox.Group>
                            </Form.Item>
                            <Form.Item {...btnLayout}>
                                <Button
                                    htmlType="submit"
                                >送出查詢</Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
                <div className={styles['last-update']}>{`最後查詢時間：${!!this.state.lastUpdate ? this.state.lastUpdate : "無查詢資料"}`}</div>
                <div className={styles['weather-list']}>
                    {
                        this.state.data.map((item, idx) => (
                            <WeatherCard
                                key={idx}
                                data={item}
                                switchIcon={this.switchIcon}
                            />
                        ))
                    }
                </div>
            </div>
        )
    }
}

// const mapStateToProps = (state) => ({
//     todoList: selectors.makeGetTodoList(state),
// });

// const mapDispatchToProps = {
//     ...actions,
// };

// const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default Weather;