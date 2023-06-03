import Operation from 'operation';
import qiitaApi from 'qiita_api';

// embed arrow function
global.func2 = () => {
  const msg = 'hello hello !!';
  console.log(msg);
};

global.TEST = () => {
  const res = qiitaApi.authenticatedUser.items.get();
  const items = res.body;
  console.log(items);
};

global.storeItemDataDaily = () => {
  Operation.storeItemData();
};
