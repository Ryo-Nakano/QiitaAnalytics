const scriptProperties = PropertiesService.getScriptProperties();
const SSID = scriptProperties.getProperty('SSID');
const QIITA_API_TOKEN = scriptProperties.getProperty('QIITA_API_TOKEN');

export {
  SSID,
  QIITA_API_TOKEN,
};
