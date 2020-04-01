 function getValueForFieldSubField(allTheFields,field,subfield) {
    var slimNsp = XmlService.getNamespace('http://www.loc.gov/MARC21/slim'); 
    var dataFields = getDataField(allTheFields,field); //040
    if (dataFields == null) return null;
    var subfields = dataFields.getChildren("subfield",slimNsp);
    //FOR EACH SUBFIELD - IF THE 'CODE' OF THE SUBFIELD MATCHES THE SUBFIELD WE'RE
    //LOOKING FOR RETURN THE VALUE (245$a)
    for (x = 0; x <= subfields.length; x++) {
      if (subfields[x] == null) continue;
      var subfieldCode = subfields[x].getAttribute('code').getValue();
      if (subfieldCode.toLowerCase() == subfield.toLowerCase()) {
         return subfields[x].getValue();
      }
    }
  }

   function getDataField(dataFields,lookForField) {
     //Logger.log("looking for...." + lookForField);
     for (var z = 0; z < dataFields.length; z++) {
       var tagAttribute = dataFields[z].getAttribute("tag");
       //Logger.log("looking for" + lookForField);
       if (tagAttribute != null && tagAttribute.getValue() == lookForField) {  //e.g. 040
         return dataFields[z];
       }
     }
     return null;
   }