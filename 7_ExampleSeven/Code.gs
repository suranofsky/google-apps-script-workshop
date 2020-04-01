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
    
    var ui = SpreadsheetApp.getUi();
    var activeSheet = SpreadsheetApp.getActiveSheet();
    Logger.log("button was clickedx!");
    
    
    var lastrow = activeSheet.getLastRow();
    var range = activeSheet.getRange(1,1,lastrow,1);
    var values = range.getDisplayValues();
    for (var row = 0; row < values.length; row++) {
      ui.alert(values[row]);
    
      
      
      var apiKey = myForm.apiKey;
      var oclcNumber = values[row];
      var apiEndpoint = "http://www.worldcat.org/webservices/catalog/content/" + oclcNumber + "?wskey=" + apiKey + 
        "&recordSchema=info:srw/schema/1/marcxml-v1.1&frbrGrouping=off&servicelevel=full&sortKeys=LibraryCount,,0&frbrGrouping=off";
      
      
      
      
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
    
    

  }