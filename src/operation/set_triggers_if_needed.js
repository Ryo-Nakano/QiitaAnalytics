const STORE_ITEM_DATA_DAILY = 'storeItemDataDaily';
const ADD_TAB_FUNCTIONS = 'addTabFunctions';

const setTriggersIfNeeded = () => {
  const triggerFunctions = ScriptApp.getProjectTriggers()?.map(trigger => trigger.getHandlerFunction());
  
  if(!triggerFunctions || !triggerFunctions.length) {
    setStoreItemDataDailyTrigger();
    setAddTabFunctionsTrigger();
    console.log(`${STORE_ITEM_DATA_DAILY} のトリガーを設定しました`);
    console.log(`${ADD_TAB_FUNCTIONS} のトリガーを設定しました`);
    return;
  }

  if(!triggerFunctions.includes(STORE_ITEM_DATA_DAILY)) {
    setStoreItemDataDailyTrigger();
    console.log(`${STORE_ITEM_DATA_DAILY} のトリガーを設定しました`);
    return;
  }

  if(!triggerFunctions.includes(ADD_TAB_FUNCTIONS)) {
    setAddTabFunctionsTrigger();
    console.log(`${ADD_TAB_FUNCTIONS} のトリガーを設定しました`);
    return;
  }
};

const setStoreItemDataDailyTrigger = () => {
  ScriptApp
    .newTrigger(STORE_ITEM_DATA_DAILY)
    .timeBased()
    .atHour(23)
    .nearMinute(35)
    .everyDays(1)
    .create();
};

const setAddTabFunctionsTrigger = () => {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  ScriptApp
    .newTrigger(ADD_TAB_FUNCTIONS)
    .forSpreadsheet(spreadsheet)
    .onOpen()
    .create();
};

export default setTriggersIfNeeded;
