import setQiitaApiToken from "./set_qiita_api_token";
import setSpreadsheetId from "./set_spreadsheet_id";
import setTriggersIfNeeded from "./set_triggers_if_needed";

const initializeQiitaAnalytics = () => {
  setQiitaApiToken();
  setSpreadsheetId();
  setTriggersIfNeeded();
  showDoneModal();
};

const showDoneModal = () => {
  const ui = SpreadsheetApp.getUi();
  const title = '設定が完了しました！';
  const body = [
    '画面をリロードしてください',
  ].join('\n');
  ui.alert(title, body, ui.ButtonSet.OK);
};

export default initializeQiitaAnalytics;
