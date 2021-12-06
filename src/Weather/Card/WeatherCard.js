import React, { Component } from 'react';
import styles from './WeatherCard.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class WeatherCard extends Component {
    render() {
        const { switchIcon, data } = this.props;
        return (
            <div className={styles['weather-card']}>
                <div className={styles['card-box']}>
                    <div className={styles['card-header']}>
                        <div className={styles['header-left']}>
                            <div className={styles['box-title']}>{data.locationName}</div>
                            <div>{data.description}</div>
                        </div>
                        <div className={styles['header-right']}>
                            <FontAwesomeIcon
                                icon={switchIcon(data.weatherCode)}
                                color="#b4b4b4"
                                size="3x"
                            />
                        </div>
                    </div>
                    <div className={styles.card}>
                        <div className={styles['card-detil']}>
                            <div className={styles.detil}>{`降雨機率：${data.rainPossibility}`}</div>
                            <div className={styles.detil}>{`最高溫度：${data.hightTemp}`}</div>
                            <div className={styles.detil}>{`最低溫度：${data.lowTemp}`}</div>
                            <div className={styles.detil}>{`舒適度：${data.comfortability}`}</div>
                            {/* locationName: locationData.locationName,
                            description: weatherElements.Wx.parameterName, // 晴時多雲
                            weatherCode: weatherElements.Wx.parameterValue, // 2
                            rainPossibility: weatherElements.PoP.parameterName, // 降雨機率
                            comfortability: weatherElements.CI.parameterName, // 稍有寒意至舒適
                            hightTemp: weatherElements.D_TX, // 最高溫度
                            lowTemp: weatherElements.D_TN, // 最低溫度 */}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default WeatherCard;