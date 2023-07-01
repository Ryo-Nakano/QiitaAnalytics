import { spreadsheet } from "sheets";

const addTabFunctions = () => {
  const tabFunction = ({name, functionName}) => ({
    name,
    functionName,
  });
  const setQiitaApiToken = tabFunction({
    name: 'Qiita API のアクセストークンを設定',
    functionName: 'setQiitaApiToken',
  });
  const setSpreadsheetId = tabFunction({
    name: 'スプレッドシートID を設定',
    functionName: 'setSpreadsheetId',
  });

  spreadsheet.addMenu('各種設定', [setQiitaApiToken, setSpreadsheetId]);
};

export default addTabFunctions;
