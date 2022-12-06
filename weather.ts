import axios from 'axios';

export const getWeather = async () => {
    const response = await axios.get('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&start_date=2022-06-08&end_date=2022-06-08&daily=temperature_2m_max&timezone=GMT')
    return response.data
}