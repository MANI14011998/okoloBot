var token = ; // FILL IN YOUR OWN TOKEN
var telegramUrl = "https://api.telegram.org/bot" + token;
var webAppUrl = ; // FILL IN YOUR GOOGLE WEB APP ADDRESS
var ssId = ; // FILL IN THE ID OF YOUR SPREADSHEET
var adminID = "x";   // 4. Fill in your own Telegram ID for debugging

function getMe() {
  var url = telegramUrl + "/getMe";
  var response = UrlFetchApp.fetch(url);
  Logger.log(response.getContentText());
}

function setWebhook() {
  var url = telegramUrl + "/setWebhook?url=" + webAppUrl;
  var response = UrlFetchApp.fetch(url);
  Logger.log(response.getContentText());
}

function sendText(id,text) {
  var url = telegramUrl + "/sendMessage?chat_id=" + id + "&text=" + encodeURIComponent(text);
  var response = UrlFetchApp.fetch(url);
  Logger.log(response.getContentText());
}

function doGet(e) {
  return HtmlService.createHtmlOutput("Hi there");
}

function doPost(e) {
  try {
    // this is where telegram works
    var data = JSON.parse(e.postData.contents);
    var text = data.message.text;
    var id = data.message.chat.id;
    var name = data.message.chat.first_name + " " + data.message.chat.last_name;
    if(text.indexOf("-")!=-1&&text.indexOf("-")!=-1){
    
    let [long,lat] = text.split("-")[1].split(" ")[1].split("&");
    var answer = "Hi " + name +"your Longitude"+ long+"Latitude"+lat;
    sendText(id,answer);
    SpreadsheetApp.openById(ssId).getSheets()[0].appendRow([new Date(),id,name,text,answer,long,lat]);
    }else{
      sendText(id,"hi");
    }
    
    if(/^@/.test(text)) {
      var sheetName = text.slice(1).split(" ")[0];
      var sheet = SpreadsheetApp.openById(ssId).getSheetByName(sheetName) ? SpreadsheetApp.openById(ssId).getSheetByName(sheetName) : SpreadsheetApp.openById(ssId).insertSheet(sheetName);
      var newText = 
      sheet.appendRow([new Date(),id,name,newText]);
      sendText(id,"your text '" + newText + "' is now added to the sheet '" + sheetName + "'");
    }
  } catch(e) {
    sendText(adminID, JSON.stringify(e,null,4));
  }
}


