const KEY = 'QIITA_API_TOKEN';

const setQiitaApiToken = () => {
  const input = showInputModal();
  if(!input) return;
  saveProperty(KEY, input);
  showDoneModal();
};

const showInputModal = () => {
  try {
    const ui = SpreadsheetApp.getUi();
    const title = 'お願い';
    const body = [
      '下の入力欄に Qiita API のアクセストークンを入力してください。',
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
  ui.alert(title, '', ui.ButtonSet.OK);
};

export default setQiitaApiToken;
