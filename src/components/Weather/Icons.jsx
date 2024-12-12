import dayThunderstorm from '../../assets/weather-icons/wi-day-thunderstorm.svg';
import nightThunderstorm from '../../assets/weather-icons/wi-night-thunderstorm.svg';
import dayStormShowers from '../../assets/weather-icons/wi-day-storm-showers.svg';
import nightAltStormShowers from '../../assets/weather-icons/wi-night-alt-storm-showers.svg';
import dayHail from '../../assets/weather-icons/wi-day-hail.svg';
import nightAltHail from '../../assets/weather-icons/wi-night-alt-hail.svg';
import dayShowers from '../../assets/weather-icons/wi-day-showers.svg';
import nightShowers from '../../assets/weather-icons/wi-night-showers.svg';
import nightAltShowers from '../../assets/weather-icons/wi-night-alt-showers.svg';
import daySprinkle from '../../assets/weather-icons/wi-day-sprinkle.svg';
import nightAltSprinkle from '../../assets/weather-icons/wi-night-alt-sprinkle.svg';
import dayRain from '../../assets/weather-icons/wi-day-rain.svg';
import nightRain from '../../assets/weather-icons/wi-night-rain.svg';
import dayRainMix from '../../assets/weather-icons/wi-day-rain-mix.svg';
import nightRainMix from '../../assets/weather-icons/wi-night-rain-mix.svg';
import dayRainWind from '../../assets/weather-icons/wi-day-rain-wind.svg';
import nightAltRainWind from '../../assets/weather-icons/wi-night-alt-rain-wind.svg';
import daySleet from '../../assets/weather-icons/wi-day-sleet.svg';
import nightSleet from '../../assets/weather-icons/wi-night-sleet.svg';
import daySnow from '../../assets/weather-icons/wi-day-snow.svg';
import nightSnow from '../../assets/weather-icons/wi-night-snow.svg';
import daySnowWind from '../../assets/weather-icons/wi-day-snow-wind.svg';
import nightSnowWind from '../../assets/weather-icons/wi-night-snow-wind.svg';
import daySleetStorm from '../../assets/weather-icons/wi-day-sleet-storm.svg';
import nightAltSleetStorm from '../../assets/weather-icons/wi-night-alt-sleet-storm.svg';
import dayFlurries from '../../assets/weather-icons/wi-day-flurries.svg';
import nightFlurries from '../../assets/weather-icons/wi-night-flurries.svg';
import dayFog from '../../assets/weather-icons/wi-day-fog.svg';
import nightFog from '../../assets/weather-icons/wi-night-fog.svg';
import smoke from '../../assets/weather-icons/wi-smoke.svg';
import dayHaze from '../../assets/weather-icons/wi-day-haze.svg';
import sandstorm from '../../assets/weather-icons/wi-sandstorm.svg';
import daySnowflakeCold from '../../assets/weather-icons/wi-day-snowflake-cold.svg';
import nightSnowflakeCold from '../../assets/weather-icons/wi-night-snowflake-cold.svg';
import daySunny from '../../assets/weather-icons/wi-day-sunny.svg';
import nightClear from '../../assets/weather-icons/wi-night-clear.svg';
import dayCloudy from '../../assets/weather-icons/wi-day-cloudy.svg';
import nightAltCloudy from '../../assets/weather-icons/wi-night-alt-cloudy.svg';
import dayCloudyHigh from '../../assets/weather-icons/wi-day-cloudy-high.svg';
import nightAltCloudyHigh from '../../assets/weather-icons/wi-night-alt-cloudy-high.svg';
import cloudy from '../../assets/weather-icons/wi-cloudy.svg';
import daySunnyOvercast from '../../assets/weather-icons/wi-day-sunny-overcast.svg';
import nightPartlyCloudy from '../../assets/weather-icons/wi-night-partly-cloudy.svg';
import cloud from '../../assets/weather-icons/wi-cloud.svg'; // Fallback default icon

// Map of weather codes to corresponding icons
const weatherIconMap = {
  // Thunderstorms
  200: { day: dayThunderstorm, night: nightThunderstorm },
  201: { day: dayThunderstorm, night: nightThunderstorm },
  202: { day: dayThunderstorm, night: nightThunderstorm },
  230: { day: dayStormShowers, night: nightAltStormShowers },
  231: { day: dayStormShowers, night: nightAltStormShowers },
  232: { day: dayStormShowers, night: nightAltStormShowers },
  233: { day: dayHail, night: nightAltHail },

  // Drizzle
  300: { day: dayShowers, night: nightAltShowers },
  301: { day: daySprinkle, night: nightAltSprinkle },
  302: { day: dayRain, night: nightRain },

  // Rain
  500: { day: dayRain, night: nightRain },
  501: { day: dayRainMix, night: nightRainMix },
  502: { day: dayRainWind, night: nightAltRainWind },
  511: { day: daySleet, night: nightSleet },
  520: { day: dayShowers, night: nightShowers },
  521: { day: dayStormShowers, night: nightAltStormShowers },
  522: { day: dayRainWind, night: nightAltRainWind },

  // Snow
  600: { day: daySnow, night: nightSnow },
  601: { day: daySnowWind, night: nightSnowWind },
  602: { day: daySleetStorm, night: nightAltSleetStorm },
  610: { day: dayRainMix, night: nightRainMix },
  611: { day: daySleet, night: nightSleet },
  612: { day: daySleet, night: nightSleet },
  621: { day: daySnow, night: nightSnow },
  622: { day: daySnowWind, night: nightSnowWind },
  623: { day: dayFlurries, night: nightFlurries },

  // Atmosphere
  700: { day: dayFog, night: nightFog },
  711: { day: smoke, night: smoke },
  721: { day: dayHaze, night: nightFog },
  731: { day: sandstorm, night: sandstorm },
  741: { day: dayFog, night: nightFog },
  751: { day: daySnowflakeCold, night: nightSnowflakeCold },

  // Clear and Clouds
  800: { day: daySunny, night: nightClear },
  801: { day: dayCloudy, night: nightAltCloudy },
  802: { day: dayCloudyHigh, night: nightAltCloudyHigh },
  803: { day: cloudy, night: cloudy },
  804: { day: cloudy, night: cloudy },

  // Unknown
  900: { day: daySunnyOvercast, night: nightPartlyCloudy },
};

export default weatherIconMap;