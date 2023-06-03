import qiitaApi from 'qiita_api';

const storeItemData = () => {
  // ① items を取得
  const items = fetchItems();
  // ② 取得したデータをシート出力用に成形
  const outputData = serialize(items);
  // ③ 成形済みデータをシートの最終行に追加
  addToLastRow(outputData);
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

const serialize = (items) => {};
const addToLastRow = (data) => {};

export default storeItemData;
