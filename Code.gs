function doGet() {
  return HtmlService.createHtmlOutputFromFile("Index");
}

function processForm(form) {
  var name = form.name;
  /*
  Add your own google sheet id here. You can refer to the docs here:
  https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet-app#openbyidid
  */
  var ss = SpreadsheetApp.openById("1gUd_EyaiLnTP4LDJqMU8");

  // Remember to change the sheet names accordingly. Sheet 1 is the list of registered names and Sheet 2 is the responses gathered from the form submission in this case.
  var sheet1 = ss.getSheetByName("Sheet1");
  var sheet2 = ss.getSheetByName("Sheet2");
  var data = sheet1.getDataRange().getValues();
  var nameExists = false;

  // Add in your own logic here. This is just a sample which checks whether the name exists in the list.
  for (var i = 0; i < data.length; i++) {
    if (data[i][0] == name) {
      if (data[i][1] != "Y") {
        sheet1.getRange(i + 1, 2).setValue("Y");
        nameExists = true;
        break;
      } else {
        return {
          status: "Duplicate",
          message: "Your name has already been submitted.",
        };
      }
    }
  }

  if (nameExists) {
    sheet2.appendRow([name]);
    return { status: "Success" };
  } else {
    return {
      status: "Error",
      message: "Your name is not in the registered list.",
    };
  }
}

function getHtmlContent(filename, message) {
  var html = HtmlService.createTemplateFromFile(filename);
  if (message) {
    html.message = message;
  }
  return html.evaluate().getContent();
}
