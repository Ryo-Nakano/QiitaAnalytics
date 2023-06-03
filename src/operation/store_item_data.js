import { SSID } from 'constants';
import qiitaApi from 'qiita_api';

const storeItemData = () => {
  // ① items を取得
  const items = fetchItems();
  // ② 取得したデータをシート出力用に成形
  const serializedData = serialize(items);
  // ③ 成形済みデータをシートの最終行に追加
  addToLastRow(serializedData);
};

const fetchItems = () => {
  let page = 1;
  let items = [];
  while(true) {
    const res = qiitaApi.authenticatedUser.items.get({page});
    items = [...items, ...res.body];
    if(!res.hasNext) break;
    page += 1;
  }
  return items;
};

const serialize = (items) => {
  return items.map(item => {
    const id = item.id;
    const title = item.title;
    const createdAt = item.created_at;
    const viewCouont = item.page_views_count;
    const likesCount = item.likes_count;
    const stocksCount = item.stocks_count;
    return [id, title, createdAt, viewCouont, likesCount, stocksCount];
  });
};

const addToLastRow = (data) => {
  try {
    if(!data.length) return;
    const getLastRow = (sheet) => {
      return sheet.getDataRange().getValues().filter(row => row[0]).length + 1;
    };

    const spreadsheet = SpreadsheetApp.openById(SSID);
    const dbSheet = spreadsheet.getSheetByName("DB");

    const lastRow = getLastRow(dbSheet);
    const fromRow = lastRow;
    const fromCol = 1;
    const rows = data.length;
    const cols = data[0].length;
    const range = dbSheet.getRange(fromRow, fromCol, rows, cols);

    range.setValues(data);
  }
  catch(error) {
    console.error(error);
    throw Error('failed to export data ...');
  }
};

export default storeItemData;
