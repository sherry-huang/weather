import React, { Component } from 'react';
import styles from './WeatherCard.module.scss';
import { switchIcon } from '../WeatherConst';
import cx from 'classnames';

class WeatherCard extends Component {
    render() {
        const { data } = this.props;
        return (
            <div className={cx({
                [styles['weather-card']]: true,
                [styles.transparent]: !!data.transparent,
            })}>
                <div className={styles['card-box']}>
                    <div className={styles['card-header']}>
                        <div className={styles['header-left']}>
                            <div className={styles['box-title']}>{data.locationName}</div>
                            <div>{data.description}</div>
                        </div>
                        <div className={styles['header-right']}>
                            <img
                                className={styles['weather-img']}
                                alt={data.comfort}
                                src={switchIcon(data.weatherCode)}
                            />
                        </div>
                    </div>
                    <div className={styles.card}>
                        <div className={styles['card-detail']}>
                            <div className={styles.detail}>{`降雨機率：${data.rainPossibility}`}</div>
                            <div className={styles.detail}>{`最高溫度：${data.hightTemp}`}</div>
                            <div className={styles.detail}>{`最低溫度：${data.lowTemp}`}</div>
                            <div className={styles.detail}>{`舒適度：${data.comfort}`}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default WeatherCard;