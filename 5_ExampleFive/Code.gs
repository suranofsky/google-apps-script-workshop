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
  

  var range = spreadsheet.getRange('C3:E10');
  //range.setBackground('blue');
  //ALTERNATIVE SYNTAX
  //row, col, number of rows, number of columns
  //var range = spreadsheet.getRange(1,1,5,5);
  range.getCell(1,1).setValue(myForm.firstName);
  
  spreadsheet.toast(myForm.firstName);
}