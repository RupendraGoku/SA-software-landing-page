function doGet() {
  return ContentService.createTextOutput("Form bridge is working for client leads.");
}

function doPost(e) {
  try {
    const sheet = SpreadsheetApp
      .getActiveSpreadsheet()
      .getSheetByName("Sheet1");

    const data = e && e.parameter ? e.parameter : {};

    sheet.appendRow([
      new Date(),
      data.Name || "",
      data.Email || "",
      data.PhoneNumber || "",
      data.Help || "",
      data.StartTime || "",
    ]);

    return buildIframeResponse_("success");

  } catch (error) {
    return buildIframeResponse_(
      "error",
      error?.message || "Unknown error"
    );
  }
}

function buildIframeResponse_(status, message) {
  const payload = JSON.stringify({
    source: "demo-modal-submit",
    status: status,
    message: message || "",
  });

  return HtmlService.createHtmlOutput(
    "<script>" +
    "window.parent.postMessage(" + payload + ", '*');" +
    "</script>"
  ).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}