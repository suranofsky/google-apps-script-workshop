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

  Logger.log("button was clickedx!");
  
  var apiKey = myForm.apiKey;
  var oclcNumber = "304924";
  var apiEndpoint = "http://www.worldcat.org/webservices/catalog/content/" + oclcNumber + "?wskey=" + apiKey + 
    "&recordSchema=info:srw/schema/1/marcxml-v1.1&frbrGrouping=off&servicelevel=full&sortKeys=LibraryCount,,0&frbrGrouping=off";
  
  var ui = SpreadsheetApp.getUi();

  
  var options = {
     "method" : "GET",
  }
  try {
    var xml = UrlFetchApp.fetch(apiEndpoint,options).getContentText();
    ui.alert(xml);
  }
  catch(err) {
    ui.alert("Communication with API failed.  Please check your API key.");
    ui.alert(err);
    return;
  }
  
  }