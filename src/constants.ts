const scriptProperties: GoogleAppsScript.Properties.Properties = PropertiesService.getScriptProperties();
const SSID: string | null = scriptProperties.getProperty('SSID');
const QIITA_API_TOKEN: string | null = scriptProperties.getProperty('QIITA_API_TOKEN');

export {
  SSID,
  QIITA_API_TOKEN,
};
