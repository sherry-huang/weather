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
                comfortability: weatherElements.CI.parameterName, // 稍有寒意至舒適
                hightTemp: weatherElements.MaxT.parameterName + "°" + weatherElements.MaxT.parameterUnit, // 最高溫度
                lowTemp: weatherElements.MinT.parameterName + "°" + weatherElements.MinT.parameterUnit, // 最低溫度
            };
        })
      });
  };

export const locationOptions = [
    { label: '嘉義', value: '嘉義' },
    { label: '臺北', value: '臺北' },
    { label: '高雄', value: '高雄' },
    { label: '臺中', value: '臺中' },
    { label: '新竹', value: '新竹' },
    { label: '澎湖', value: '澎湖' },
    { label: '花蓮', value: '花蓮' },
    { label: '臺東', value: '臺東' },
    { label: '蘭嶼', value: '蘭嶼' },
    { label: '基隆', value: '基隆' },
    { label: '宜蘭', value: '宜蘭' },
    { label: '馬祖', value: '馬祖' },
    { label: '金門', value: '金門' },
  ];

export const cityOptions = [
    { label: '基隆市', value: '基隆市' },
    { label: '新北市', value: '新北市' },
    { label: '臺北市', value: '臺北市' },
    { label: '桃園市', value: '桃園市' },
    { label: '新竹縣', value: '新竹縣' },
    { label: '新竹市', value: '新竹市' },
    { label: '苗栗縣', value: '苗栗縣' },
    { label: '臺中市', value: '臺中市' },
    { label: '彰化縣', value: '彰化縣' },
    { label: '雲林縣', value: '雲林縣' },
    { label: '南投縣', value: '南投縣' },
    { label: '嘉義縣', value: '嘉義縣' },
    { label: '嘉義市', value: '嘉義市' },
    { label: '臺南市', value: '臺南市' },
    { label: '高雄市', value: '高雄市' },
    { label: '金門縣', value: '金門縣' },
    { label: '屏東縣', value: '屏東縣' },
    { label: '宜蘭縣', value: '宜蘭縣' },
    { label: '臺東縣', value: '臺東縣' },
    { label: '花蓮縣', value: '花蓮縣' },
    { label: '連江縣', value: '連江縣' },
    { label: '澎湖縣', value: '澎湖縣' }
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