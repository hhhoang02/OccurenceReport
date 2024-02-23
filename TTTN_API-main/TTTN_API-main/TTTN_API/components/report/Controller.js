const reportService = require("./Service");

const addReport = async (
  room,
  reportType,
  image,
  description,
  annunciator,
  status1,
  time,
  day,
  complete
) => {
  try {
    return await reportService.addReport(
      room,
      reportType,
      image,
      description,
      annunciator,
      status1,
      time,
      day,
      complete
    );
  } catch (error) {
    console.log("add report error: ", error);
  }
  return false;
};

const getAllReport = async () => {
  try {
    return await reportService.getAllReport();
  } catch (error) {
    console.log("get all report error: ", error);
  }
};

const getReportByUser = async (id) => {
  try {
    return await reportService.getReportByUser(id);
  } catch (error) {
    console.log("get report by user error: ", error);
  }
};

const getReportByReportRecipient = async (id) => {
  try {
    return await reportService.getReportByReportRecipient(id);
  } catch (error) {
    console.log("get report by reportRecipient error: ", error);
  }
};

const getCompletionReport = async () => {
  try {
    return await reportService.getCompletionReport();
  } catch (error) {
    console.log("get completion report error: ", error);
  }
};

const getUnCompletionReport = async () => {
  try {
    return await reportService.getUnCompletionReport();
  } catch (error) {
    console.log("get completion report error: ", error);
  }
};

const getReceiveIncidents = async () => {
  try {
    return await reportService.getReceiveIncidents();
  } catch (error) {
    console.log("get completion report error: ", error);
  }
};

const getReportByDate = async (startDate, endDate) => {
  try {
    return await reportService.getReportByDate(startDate, endDate);
  } catch (error) {
    console.log("get completion report error: ", error);
  }
};

const addStatus = async (status, time, date) => {
  try {
    return await reportService.addStatus(status, time, date);
  } catch (error) {
    console.log("add status error: ", error);
  }
};

const getReportByID = async (id) => {
  try {
    return await reportService.getReportByID(id);
  } catch (error) {
    console.log("get report by ID error: ", error);
  }
};

const getReportByRequest = async (annunciator,reportRecipient,complete) => {
  try {
    return await reportService.getReportByRequest(annunciator, reportRecipient, complete);
  } catch (error) {
    console.log("get report by request error: ", error);
  }
};

const receiveIncidents = async (reportRecipient, status2, time, day, id) => {
  try {
    return await reportService.receiveIncidents(
      reportRecipient,
      status2,
      time,
      day,
      id
    );
  } catch (error) {
    console.log("receiveIncidents error: ", error);
  }
};

const completionReport = async (
  id,
  status3,
  time,
  day,
  complete,
  errorto,
  timeto,
  note
) => {
  try {
    return await reportService.completionReport(
      id,
      status3,
      time,
      day,
      complete,
      errorto,
      timeto,
      note
    );
  } catch (error) {
    console.log("completionReport error: ", error);
  }
};

const evaluate = async (id, start, evaluate) => {
  try {
    return await reportService.evaluate(id, start, evaluate);
  } catch (error) {
    console.log("evaluate error", error);
  }
};

module.exports = {
  addReport,
  getAllReport,
  addStatus,
  getReportByID,
  receiveIncidents,
  completionReport,
  evaluate,
  getReportByUser,
  getReportByReportRecipient,
  getCompletionReport,
  getUnCompletionReport,
  getReceiveIncidents,
  getReportByDate,getReportByRequest
};
