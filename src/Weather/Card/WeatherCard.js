import React, { Component } from 'react';
import { Card, Avatar } from 'antd';
import styles from './WeatherCard.module.scss';
import { EnvironmentOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const { Meta } = Card;
class WeatherCard extends Component {
    render() {
        const { switchIcon, data } = this.props;
        return (
            <div className={styles['weather-card']}>
                <Card style={{ width: 300 }}>
                    <Meta
                        avatar={<Avatar icon={<EnvironmentOutlined />}/>}
                        title={data.locationName}
                        description={data.description}
                        style={{ textAlign: "left"}}
                    />
                    <div className={styles.card}>
                        <div className={styles['card-detil']}>
                            <div className={styles['detail-left']}>
                                <p>{`降雨機率：${data.rainPossibility}`}</p>
                                <p>{`最高溫度：${data.hightTemp}`}</p>
                                <p>{`最低溫度：${data.lowTemp}`}</p>
                                {/* locationName: locationData.locationName,
                                description: weatherElements.Wx.parameterName, // 晴時多雲
                                weatherCode: weatherElements.Wx.parameterValue, // 2
                                rainPossibility: weatherElements.PoP.parameterName, // 降雨機率
                                comfortability: weatherElements.CI.parameterName, // 稍有寒意至舒適
                                hightTemp: weatherElements.D_TX, // 最高溫度
                                lowTemp: weatherElements.D_TN, // 最低溫度 */}
                            </div>
                            <div className={styles['detail-right']}>
                                <FontAwesomeIcon icon={switchIcon(data.weatherCode)} size="4x"/>
                            </div>
                        </div>
                        <p>{`舒適度：${data.comfortability}`}</p>
                    </div>
                </Card>
            </div>
        )
    }
}

export default WeatherCard;