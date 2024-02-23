const { Report, Status } = require("../Model");

// them su co
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
    const addReport = new Report({
      room,
      reportType,
      image,
      description,
      annunciator,
      "status1.status": status1,
      "status1.time": time,
      "status1.date": day,
      complete,
    });
    await addReport.save();
    return addReport;
  } catch (error) {
    console.log("add report error: ", error);
  }
  return false;
};

// lay danh sach su co
const getAllReport = async () => {
  try {
    return await Report.find()
      .sort({ _id: -1 })
      .populate("annunciator reportRecipient status1 status2 status3");
  } catch (error) {
    console.log("get all report error: ", error);
  }
  return [];
};

// lấy ds sự cố theo nguoi dung
const getReportByUser = async (id) => {
  try {
    return await Report.find({ annunciator: id })
      .sort({ _id: -1 })
      .populate("annunciator reportRecipient status1 status2 status3");
  } catch (error) {
    console.log("get all report error: ", error);
  }
  return [];
};

// lấy danh sách sự cố theeo người tueeps nhận
const getReportByReportRecipient = async (id) => {
  try {
    return await Report.find({ reportRecipient: id })
      .sort({ _id: 1 })
      .populate("annunciator reportRecipient status1 status2 status3");
  } catch (error) {
    console.log("get all report by reportRecipient error: ", error);
  }
  return [];
};

// lấy danh sách hoàn thành
const getCompletionReport = async () => {
  try {
    const report = await Report.find({ "status3.status": true })
      .sort({ _id: -1 })
      .populate("annunciator reportRecipient status1 status2 status3");

    return report;
  } catch (error) {
    console.log("get all report by reportRecipient error: ", error);
  }
  return false;
};

// lấy danh sách chưa hoàn thành
const getUnCompletionReport = async () => {
  try {
    const report = await Report.find({ complete: 0 })
      .sort({ _id: -1 })
      .populate("annunciator reportRecipient status1 status2 status3");

    return report;
  } catch (error) {
    console.log("get all report by reportRecipient error: ", error);
  }
  return false;
};

// lấy danh sách đã tiếp nhân
const getReceiveIncidents = async () => {
  try {
    const report = await Report.find({ complete: 2 })
      .sort({ _id: -1 })
      .populate("annunciator reportRecipient status1 status2 status3");

    return report;
  } catch (error) {
    console.log("get all report by reportRecipient error: ", error);
  }
  return false;
};

// lấy danh sách theo ngày
const getReportByDate = async (startDate, endDate) => {
  try {
    const report = await Report.find({
      "status1.date": { $gte: startDate, $lte: endDate },
    })
      .sort({ _id: -1 })
      .populate("annunciator reportRecipient status1 status2 status3");
    return report;
  } catch (error) {
    console.log("get all report by date error: ", error);
  }
  return false;
};

// lấy danh sách theo yêu cầu

const getReportByRequest = async (annunciator, reportRecipient, complete) => {
  try {
    const query = {};

    if (annunciator !== "") {
      query.annunciator = annunciator;
    }

    if (reportRecipient !== "") {
      query.reportRecipient = reportRecipient;
    }

    if (complete !== "") {
      query.complete = complete;
    }
    console.log("Query: " + query);
    const report = await Report.find(query)
      .sort({ _id: -1 })
      .populate("annunciator reportRecipient status1 status2 status3");

    return report;
  } catch (error) {
    console.log(" getReportByRequest error: ", error);
  }
  return false;
};

// them trang thai
const addStatus = async (status, time, date) => {
  try {
    const addStatus = new Status({ status, time, date });
    await addStatus.save();
    return addStatus;
  } catch (error) {
    console.log("add status error: ", error);
  }
  return false;
};

//tiep nhan su co
const receiveIncidents = async (reportRecipient, status2, time, day, id) => {
  try {
    const report = await Report.findById(id);
    if (report) {
      report.reportRecipient = reportRecipient
        ? reportRecipient
        : report.reportRecipient;
      report.status2.status = status2;
      report.status2.time = time;
      report.status2.date = day;
      report.complete = "2";
      await report.save();
      return true;
    }
    return false;
  } catch (error) {
    console.log("ReceiveIncidents error:", error);
  }
  return false;
};

//hoàn thành sự cố
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
    const report = await Report.findById(id);
    if (report) {
      report.status3.status = status3;
      report.status3.time = time;
      report.status3.date = day;
      report.complete = complete ? complete : report.complete;
      report.errorto = errorto ? errorto : report.errorto;
      report.time = timeto ? timeto : report.time;
      report.note = note ? note : report.note;
      console.log("?????????", report);
      await report.save();
      return true;
    }
    return false;
  } catch (error) {
    console.log("completionReport error:", error);
  }
  return false;
};

// lay chi tiet report
const getReportByID = async (id) => {
  try {
    const getReportByID = await Report.findById(id).populate(
      "annunciator reportRecipient status1 status2 status3"
    );
    return getReportByID;
  } catch (error) {
    console.log("getReportByID error:", error);
  }
  return [];
};

// danh gia
const evaluate = async (id, start, evaluate) => {
  try {
    const report = await Report.findById(id);
    if (report) {
      report.start = start;
      report.evaluate = evaluate;
      await report.save();
      return true;
    }
    return false;
  } catch (error) {
    console.log("evaluate error:", error);
  }
  return false;
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
  getReportByDate,
  getReportByRequest,
};
