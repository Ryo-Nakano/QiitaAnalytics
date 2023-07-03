const KEY = 'SSID';

const setSpreadsheetId = () => {
  const spreadsheetId = SpreadsheetApp.getActiveSpreadsheet().getId();
  saveProperty(KEY, spreadsheetId);
  showDoneModal();
};

const showInputModal = () => {
  try {
    const ui = SpreadsheetApp.getUi();
    const title = 'お願い';
    const body = [
      '下の入力欄に スプレッドシートID を入力してください。',
      '(入力された値はスクリプトプロパティに保存されます)',
      '　',
    ].join('\n');
  
    const result = ui.prompt(title, body, ui.ButtonSet.OK);
    const input = result.getResponseText();
    const button = result.getSelectedButton();
    if(button == ui.Button.CLOSE) return;
  
    return input;
  }
  catch(error) {
    console.error(error);
    throw Error('failed to show input modal ...');
  }
};

const saveProperty = (key, value) => {
  try {
    const scriptProperties = PropertiesService.getScriptProperties();
    scriptProperties.setProperty(key, value);
  }
  catch(error) {
    console.error(error);
    throw Error('failed to save script property ...');
  }
};

const showDoneModal = () => {
  const ui = SpreadsheetApp.getUi();
  const title = '保存しました';
  const body = 'スプレッドシートID を自動で取得、保存しました。';
  ui.alert(title, body, ui.ButtonSet.OK);
};

export default setSpreadsheetId;
