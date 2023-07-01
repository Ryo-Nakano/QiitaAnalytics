import { SSID } from 'script_properties';

export const spreadsheet = getSpreadSheet();
export const dbSheet = spreadsheet.getSheetByName("DB");

function getSpreadSheet() {
  try {
    return SpreadsheetApp.openById(SSID);
  }
  catch(error) {
    const input = showAlertModal();
    if(!input) return SpreadsheetApp.getActiveSpreadsheet();

    saveProperty('SSID', input);
    showDoneModal();

    return SpreadsheetApp.getActiveSpreadsheet();
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
