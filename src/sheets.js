import { SSID } from 'script_properties';

export const spreadsheet = getSpreadSheet();
export const dbSheet = spreadsheet.getSheetByName("_DB");

export const addToLastRow = ({sheet, data}) => {
  try {
    if(!sheet || !data || !data.length) return;

    const lastRow = getLastRow(sheet);
    const fromRow = lastRow;
    const fromCol = 1;
    const rows = data.length;
    const cols = data[0].length;
    const range = sheet.getRange(fromRow, fromCol, rows, cols);

    range.setValues(data);
  }
  catch(error) {
    console.error(error);
    throw Error('faild to add data to last row ...');
  }
};
export const updateRow = ({sheet, rowData, rowNum}) => {
  try {
    if(!sheet || !rowData || !rowData.length || rowNum == null) return;

    const fromRow = rowNum;
    const fromCol = 1;
    const rows = rowData.length;
    const cols = rowData[0].length;
    const range = sheet.getRange(fromRow, fromCol, rows, cols);

    range.setValues(rowData);
    console.log(`${rowNum}行目のデータを更新しました: `, rowData);
  }
  catch(error) {
    console.log(error);
    throw Error('failed to update row data ...');
  }
};

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
    return SpreadsheetApp.getActiveSpreadsheet();
  }
};

function getLastRow (sheet) {
  return sheet.getDataRange().getValues().filter(row => row[0]).length + 1;
};


// memo: 過去の遺産 === === === === ===
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
