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
  const storeItemData = tabFunction({
    name: 'Qiita から現時点の記事データを取得してシートに保存',
    functionName: 'storeItemData',
  });

  spreadsheet.addMenu('カンタン操作', [setQiitaApiToken, setSpreadsheetId, storeItemData]);
};

export default addTabFunctions;
