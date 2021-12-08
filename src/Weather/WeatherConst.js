import sun from './Picture/sun.png';
import fog from './Picture/fog.png';
import rain from './Picture/rain.png';
import snow from './Picture/snow.png';import cloudBeforeSun from './Picture/cloudBeforeSun.png';
import cloudSunAndRain from './Picture/cloudSunAndRain.png';
import thunderstorm from './Picture/thunderstorm.png';
import manyCloud from './Picture/manyCloud.png';

const authorizationKey = "CWB-1BBC5EA4-812C-46AC-ACD8-0FD64A6E794C";

export const locationDefault = [
    "嘉義", "臺北", "高雄", "臺中", "新竹", "澎湖", "花蓮", "臺東", "蘭嶼", "基隆", "宜蘭", "金門", "馬祖"
];

export const cityDefault = [
    '嘉義縣', '新北市', '嘉義市', '新竹縣', '新竹市', '臺北市', '臺南市', '宜蘭縣', '苗栗縣',
    '雲林縣', '花蓮縣', '臺中市', '臺東縣', '桃園市', '南投縣', '高雄市', '金門縣', '屏東縣',
    '基隆市', '澎湖縣', '彰化縣', '連江縣'
];

export const fetchWeather = (locationName) => {
    return fetch(
        `https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=${authorizationKey}&elementName=TEMP,D_TX,D_TN&parameterName=CITY,CITY_SN&locationName=${locationName}`
    )
    .then((response) => response.json())
    .then((data) => {

        return data.records.location.map((locationData) => {
            const weatherElements = locationData.weatherElement.reduce(
                (neededElements, item) => {
                    if (["TEMP", "D_TX", "D_TN"].includes(item.elementName)) {
                        neededElements[item.elementName] = item.elementValue;
                    }
                    return neededElements;
                    },
                {}
            );
    
            return {
                observationTime: locationData.time.obsTime,
                locationName: locationData.locationName,
                temperature: weatherElements.TEMP,
                hightTemp: weatherElements.D_TX,
                lowTemp: weatherElements.D_TN,
            };
        })
        
    });
};

export const fetchWeatherForecast = (cityName) => {
    return fetch(
        `https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=${authorizationKey}&locationName=${cityName}`
    )
      .then((response) => response.json())
      .then((data) => {
        return data.records.location.map((locationData) => {
            const weatherElements = locationData.weatherElement.reduce(
                (neededElements, item) => {
                    if (['Wx', 'PoP', 'CI', 'MinT', 'MaxT'].includes(item.elementName)) {
                        neededElements[item.elementName] = item.time[0].parameter;
                    }
                    return neededElements;
                },
                {}
              );

              return {
                locationName: locationData.locationName,
                description: weatherElements.Wx.parameterName, // 晴時多雲
                weatherCode: weatherElements.Wx.parameterValue, // 2
                rainPossibility: weatherElements.PoP.parameterName + " " + weatherElements.PoP.parameterUnit, // 降雨機率
                comfort: weatherElements.CI.parameterName, // 稍有寒意至舒適
                hightTemp: weatherElements.MaxT.parameterName + "°" + weatherElements.MaxT.parameterUnit, // 最高溫度
                lowTemp: weatherElements.MinT.parameterName + "°" + weatherElements.MinT.parameterUnit, // 最低溫度
            };
        })
      });
  };

export const cityOptions = [
    { label: '基隆市', value: '基隆市', parent: '北部'},
    { label: '新北市', value: '新北市', parent: '北部'},
    { label: '臺北市', value: '臺北市', parent: '北部'},
    { label: '桃園市', value: '桃園市', parent: '北部'},
    { label: '新竹縣', value: '新竹縣', parent: '北部'},
    { label: '新竹市', value: '新竹市', parent: '北部'},
    { label: '苗栗縣', value: '苗栗縣', parent: '西部'},
    { label: '臺中市', value: '臺中市', parent: '西部'},
    { label: '彰化縣', value: '彰化縣', parent: '西部'},
    { label: '雲林縣', value: '雲林縣', parent: '西部'},
    { label: '南投縣', value: '南投縣', parent: '西部'},
    { label: '嘉義縣', value: '嘉義縣', parent: '南部'},
    { label: '嘉義市', value: '嘉義市', parent: '南部'},
    { label: '臺南市', value: '臺南市', parent: '南部'},
    { label: '高雄市', value: '高雄市', parent: '南部'},
    { label: '屏東縣', value: '屏東縣', parent: '南部'},
    { label: '宜蘭縣', value: '宜蘭縣', parent: '東部'},
    { label: '臺東縣', value: '臺東縣', parent: '東部'},
    { label: '花蓮縣', value: '花蓮縣', parent: '東部'},
    { label: '金門縣', value: '金門縣', parent: '其他'},
    { label: '連江縣', value: '連江縣', parent: '其他'},
    { label: '澎湖縣', value: '澎湖縣', parent: '其他'}
];

export const cityNorthOptions = [
    { label: '基隆市', value: '基隆市' },
    { label: '新北市', value: '新北市' },
    { label: '臺北市', value: '臺北市' },
    { label: '桃園市', value: '桃園市' },
    { label: '新竹縣', value: '新竹縣' },
    { label: '新竹市', value: '新竹市' },
];

export const cityWestOptions = [
    { label: '苗栗縣', value: '苗栗縣' },
    { label: '臺中市', value: '臺中市' },
    { label: '彰化縣', value: '彰化縣' },
    { label: '雲林縣', value: '雲林縣' },
    { label: '南投縣', value: '南投縣' },
];

export const citySouthOptions = [
    { label: '嘉義縣', value: '嘉義縣' },
    { label: '嘉義市', value: '嘉義市' },
    { label: '臺南市', value: '臺南市' },
    { label: '高雄市', value: '高雄市' },
    { label: '屏東縣', value: '屏東縣' },
];

export const cityEastOptions = [
    { label: '宜蘭縣', value: '宜蘭縣' },
    { label: '花蓮縣', value: '花蓮縣' },
    { label: '臺東縣', value: '臺東縣' },
];

export const cityOtherOptions = [
    { label: '金門縣', value: '金門縣' },
    { label: '連江縣', value: '連江縣' },
    { label: '澎湖縣', value: '澎湖縣' }
];

export const handleData = (cityOptions) => {
    const oriData = [
        {
            title: "北部",
            value: "北部",
            key: "北部",
            children: [],
        }, {
            title: "西部",
            value: "西部",
            key: "西部",
            children: [],
        }, {
            title: "南部",
            value: "南部",
            key: "南部",
            children: [],
        }, {
            title: "東部",
            value: "東部",
            key: "東部",
            children: [],
        }, {
            title: "其他",
            value: "其他",
            key: "其他",
            children: [],
        },
    ];

    return cityOptions.reduce((acc, curItem) => {
        return acc.map((region) => {
            return region.value === curItem.parent ? {
                ...region,
                children: [
                    ...region.children,
                    {
                        title: curItem.label,
                        value: curItem.value,
                        key: curItem.value
                    }
                ]
            } : region
        })
    }, oriData)
}

export const switchIcon = (code) => {
    switch (parseInt(code)) {
    case 1:
        // 晴天
        return sun;
    case 2:
    case 3:
        // 晴時多雲、多雲時晴
        return cloudBeforeSun;
    case 4:
    case 5:
    case 6:
    case 7:
        // 多雲、陰天
        return manyCloud;
    case 8:
    case 9:
    case 10:
    case 11:
    case 12:
    case 13:
    case 14:
        // 多雲有雨
        return cloudSunAndRain;
    case 20:
    case 29:
    case 30:
    case 31:
    case 32:
        // 雨
        return rain;
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
        // 雷雨
        return thunderstorm;
    case 23:
    case 42:
        // 雪
        return snow;
    default:
        // 霧 25 26 27 28
        return fog;
    }
};