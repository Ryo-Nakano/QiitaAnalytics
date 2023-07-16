import qiitaApi from 'qiita_api';
import { SSID } from 'script_properties';

const STORE_ITEM_DATA = 'storeItemData';

const storeItemData = () => {
  try {
    // ① items を取得
    const items = fetchItems();
    // ② 取得したデータをシート出力用に成形
    const serializedData = serialize(items);
    // ③ 成形済みデータをシートの最終行に追加
    addToLastRow(serializedData);
  }
  catch(error) {
    // Qiita API から 403 が返って来たときの対応
    // 23:45 前後だとリクエストが集中してて 403 が返ってくることがある...？
    setTriggerToRetryStoreItemDataIfNeeded();
  }
};

const fetchItems = () => {
  try {
    let page = 1;
    let items = [];
    while(true) {
      const res = qiitaApi.authenticatedUser.items.get({page});
      items = [...items, ...res.body];
      if(!res.hasNext) break;
      page += 1;
    }
    return items;
  }
  catch(error) {
    console.error(error);
    throw Error('faild to fetch data ...');
  }
};

const serialize = (items) => {
  try {
    return items.map(item => {
      const date = Utilities.formatDate(new Date(), 'JST', 'yyyy-MM-dd');
      const id = item.id;
      const title = item.title;
      const isPrivate = item.private;
      const createdAt = item.created_at.split('T')[0];
      const viewsCouont = item.page_views_count;
      const likesCount = item.likes_count;
      const stocksCount = item.stocks_count;
      return [date, id, title, isPrivate, createdAt, viewsCouont, likesCount, stocksCount];
    });
  }
  catch(error) {
    console.error(error);
    throw Error('failed to serialize data ...');
  }
};

const addToLastRow = (data) => {
  try {
    if(!data.length) return;
    const getLastRow = (sheet) => {
      return sheet.getDataRange().getValues().filter(row => row[0]).length + 1;
    };

    const spreadsheet = SpreadsheetApp.openById(SSID);
    const dbSheet = spreadsheet.getSheetByName("_DB");

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

const setTriggerToRetryStoreItemDataIfNeeded = () => {
  try {
    // 現在時刻の 1分後 を取得
    const nextMinute = (() => {
      const date = new Date();
      date.setMinutes(date.getMinutes() + 1);
      return date;
    })();

    // 今日の 23:55 を取得
    const today2355 = (() => {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth();
      const day = now.getDate();
      const date = new Date(year, month, day, 23, 55, 0);
      return date;
    })();

    // 1分後の時刻が 23:55 を超えている場合 → 処理離脱
    if (nextMinute > today2355) return console.warn("23:55 を超えていたためトリガーの再設定を取りやめました");

    // 既に storeItemData のトリガーが設定されていた場合 → 削除
    const triggersToDelete = ScriptApp.getProjectTriggers().filter(trigger => {
      const handlerFunction = trigger.getHandlerFunction();
      return handlerFunction == STORE_ITEM_DATA;
    });
    triggersToDelete.forEach(trigger => ScriptApp.deleteTrigger(trigger));

    // storeItemData のトリガーを 1分後 に再設定
    ScriptApp.newTrigger(STORE_ITEM_DATA)
      .timeBased()
      .at(nextMinute)
      .create();

    console.log(`${STORE_ITEM_DATA} のトリガーを 1分後 に再設定しました`);
  }
  catch(error) {
    console.error(error);
    throw Error('failed to set trigger to retry storeItemData ...');
  }
};

export default storeItemData;
