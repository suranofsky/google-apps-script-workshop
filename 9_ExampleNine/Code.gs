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
    var outputRange = activeSheet.getRange(1,2,lastrow,2);
    for (var rowNumber = 0; rowNumber < values.length; rowNumber++) {
      //ui.alert(rowNumber);
    
      
      
      var apiKey = myForm.apiKey;
      var oclcNumber = values[rowNumber];
      var apiEndpoint = "http://www.worldcat.org/webservices/catalog/content/" + oclcNumber + "?wskey=" + apiKey + 
        "&recordSchema=info:srw/schema/1/marcxml-v1.1&frbrGrouping=off&servicelevel=full&sortKeys=LibraryCount,,0&frbrGrouping=off";
      
      
      
      
      var options = {
        "method" : "GET",
      }
      try {
        var xml = UrlFetchApp.fetch(apiEndpoint,options).getContentText();
        //ui.alert(xml);
      }
      catch(err) {
        ui.alert("Communication with API failed.  Please check your API key.");
        ui.alert(err);
        return;
      }
      
      var document = XmlService.parse(xml);
      var root = document.getRootElement();
      //create namespace object
      var slimNsp = XmlService.getNamespace('http://www.loc.gov/MARC21/slim'); 
      //pull out datafields and conrolfields
      var dataFields = root.getChildren("datafield",slimNsp);
      var controlFields = root.getChildren("controlfield",slimNsp);
      
      var title = getValueForFieldSubField(dataFields,"245","a");
      var subtitle = getValueForFieldSubField(dataFields,"100","a");
      
      //row number starts with zero - because it was a collection of values
      //columns start with one...so adding 1 to the row number variable
      outputRange.getCell(rowNumber+1, 1).setValue(title);
      outputRange.getCell(rowNumber+1, 2).setValue(subtitle);
  
    }
    
    ui.alert("done");

  }