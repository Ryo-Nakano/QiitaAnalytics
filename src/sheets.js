import { SSID } from 'script_properties';

export const spreadsheet = getSpreadSheet();
export const dbSheet = spreadsheet.getSheetByName("DB");

function getSpreadSheet() {
  try {
    return SpreadsheetApp.openById(SSID);
  }
  catch(error) {
    console.error(error);
    const msg = [
      "スプレッドシートID の設定が正しくない可能性があります。",
      "[各種設定 > スプレッドシートID を設定] から再度設定を行なってください。",
    ].join('\n');
    console.warn(msg);
    throw Error('failed to get spreadsheet ...');
  }
};

function showAlertModal() {
  const ui = SpreadsheetApp.getUi();
  const title = 'お願い';
  const body = [
    'スプレッドシートIDが正しく設定されていない可能性があります。',
    '',
    '下の入力欄からスプレッドシートIDの設定をしてください！🙏',
    '(入力された値はスクリプトプロパティに保存されます)',
    '　',
  ].join('\n');

  const result = ui.prompt(title, body, ui.ButtonSet.OK);
  const input = result.getResponseText();

  return input;
};

function saveProperty(key, value) {
  try {
    const scriptProperties = PropertiesService.getScriptProperties();
    scriptProperties.setProperty(key, value);
  }
  catch(error) {
    console.error(error);
    throw Error('failed to save script property ...');
  }
};

function showDoneModal() {
  const ui = SpreadsheetApp.getUi();
  const title = '保存しました';
  ui.alert(title, '', ui.ButtonSet.OK);
};
