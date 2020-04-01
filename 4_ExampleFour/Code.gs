 function onOpen() {
  var menu = SpreadsheetApp.getUi().createAddonMenu(); 
  menu.addItem('Launch My New Addon', 'showSidebar');
  menu.addToUi();
}


function showSidebar() {
  var html = HtmlService.createHtmlOutputFromFile('sidebar')
      .setTitle('My New Addon:')
      .setWidth(500);
  SpreadsheetApp.getUi() 
      .showSidebar(html);    
}


function startLookup(myForm) {
  var spreadsheet = SpreadsheetApp.getActive();
  Logger.log("button was clicked!");
  spreadsheet.toast(myForm.firstName);
}