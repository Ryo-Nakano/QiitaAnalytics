import { spreadsheet } from "sheets";

const tabFunction = ({name, functionName}) => ({
  name,
  functionName,
});

const addTabFunctions = () => {
  const setQiitaApiToken = tabFunction({
    name: 'Qiita API のアクセストークンを設定',
    functionName: 'setQiitaApiToken',
  });

  spreadsheet.addMenu('事前準備', [setQiitaApiToken]);
};

export default addTabFunctions;
