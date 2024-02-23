var express = require("express");
var router = express.Router();
const adminController = require("../components/admin/Controller");
const reportController = require("../components/report/Controller");

// login user
// http://localhost:3000/users/login
router.post("/login", async (req, res, next) => {
  try {
    const { userName, email, avatar } = req.body;
    const user = await adminController.login(userName, email, avatar);
    console.log(">>>>>>>>>", user);
    if (user) {
      let result = {
        message: "Login thành công",
        error: false,
        idUser: user._id,
        role: user.type,
        avatar: user.avatar,
        lock: user.lock,
        chucvu: user.position,
        sdt: user.sdt,
      };
      return res.status(200).json(result);
    }
    return res.status(400).json({ result: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ result: false });
  }
});

// lay danh sach report
// http://localhost:3000/users/getAllReport
router.get("/getAllReport", async (req, res, next) => {
  try {
    const report = await reportController.getAllReport();
    return res.status(200).json(report);
  } catch (error) {
    return res.status(500).json({ result: false });
  }
});

// lay ds theo user
//  http://localhost:3000/users/getReportByUser/:id
router.get("/getReportByUser/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const report = await reportController.getReportByUser(id);
    return res.status(200).json(report);
  } catch (error) {
    return res.status(500).json({ result: false });
  }
});

// lay ds theo người tiếp nhận
//  http://localhost:3000/users/getReportByReportRecipient/:id
router.get("/getReportByReportRecipient/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const report = await reportController.getReportByReportRecipient(id);
    return res.status(200).json(report);
  } catch (error) {
    return res.status(500).json({ result: false });
  }
});

// lấy ds đã hoàn thành
// http://localhost:3000/users/getCompletionReport/1
router.get("/getCompletionReport", async (req, res, next) => {
  try {
    const result = await reportController.getCompletionReport();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ result: false });
  }
});

// lấy ds chưa hoàn thành
// http://localhost:3000/users/getUnCompletionReport
router.get("/getUnCompletionReport", async (req, res, next) => {
  try {
    const result = await reportController.getUnCompletionReport();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ result: false });
  }
});

//lay chi tiet report
// http://localhost:3000/users/getReport/:id
router.get("/getReport/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const getReportByID = await reportController.getReportByID(id);
    return res.status(200).json({ result: getReportByID });
  } catch (error) {
    return res.status(500).json({ result: false });
  }
});

// them report
// http://localhost:3000/users/addReport
router.post("/addReport", async (req, res, next) => {
  try {
    const { room, reportType, image, description, annunciator } = req.body;

    const date = new Date();
    const options = { timeZone: "Asia/Ho_Chi_Minh" };
    date.toLocaleString("en-GB", options);

    console.log(date);
    
    const time =
      (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) +
      ":" +
      (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes());

    const day =
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1) +
      "-" +
      (date.getDate() < 10 ? "0" + date.getDate() : date.getDate());

    const complete = 0;
    const status1 = true;
    const newReport = await reportController.addReport(
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

    if (newReport) {
      return res.status(200).json({ result: true });
    }

    return res.status(400).json({ result: false });
  } catch (error) {
    console.log("addReport error: ", error);
    return res.status(500).json({ result: false });
  }
});

// tiếp nhận sự cố
// http://localhost:3000/users/receiveIncidents/:reportRecipient/:id
router.post(
  "/receiveIncidents/:reportRecipient/:id",
  async (req, res, next) => {
    try {
      const { reportRecipient, id } = req.params;
      const date = new Date();
    const options = { timeZone: "Asia/Ho_Chi_Minh" };
    date.toLocaleString("en-GB", options);

    console.log(date);
    
    const time =
      (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) +
      ":" +
      (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes());

    const day =
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1) +
      "-" +
      (date.getDate() < 10 ? "0" + date.getDate() : date.getDate());

      const status2 = true;
      const receiveIncidents = await reportController.receiveIncidents(
        reportRecipient,
        status2,
        time,
        day,
        id
      );
      if (receiveIncidents) {
        return res.status(200).json({ result: true });
      }

      return res.status(400).json({ result: false });
    } catch (error) {
      console.log("receiveIncidents error: ", error);
      next(error);
    }
  }
);

// hoàn thành sự cố
//http://localhost:3000/users/completionReport/:id
router.post("/completionReport/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { errorto, timeto, note } = req.body;
    const date = new Date();
    const options = { timeZone: "Asia/Ho_Chi_Minh" };
    date.toLocaleString("en-GB", options);

    console.log(date);
    
    const time =
      (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) +
      ":" +
      (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes());

    const day =
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1) +
      "-" +
      (date.getDate() < 10 ? "0" + date.getDate() : date.getDate());

    const status3 = true;
    const complete = 1;
    const completionReport = await reportController.completionReport(
      id,
      status3,
      time,
      day,
      complete,
      errorto,
      timeto,
      note
    );
    if (completionReport) {
      return res.status(200).json({ result: true });
    }

    return res.status(400).json({ result: false });
  } catch (error) {
    console.log("CompletionReport error", error);
    next(error);
  }
});

// dánh giá hoàn thiện
//http://localhost:3000/users/evaluate/:id
router.post("/evaluate/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { start, evaluate } = req.body;
    const addevaluate = await reportController.evaluate(id, start, evaluate);
    if (addevaluate) {
      return res.status(200).json({ result: true });
    }
    return res.status(400).json({ result: false });
  } catch (error) {
    console.log("evaluate error", error);
    next(error);
  }
});

// theem thông tin nhân viên
//http://localhost:3000/users/profile
router.post("/profile", async (req, res, next) => {
  try {
    const { id, sdt, position } = req.body;
    const profile = await adminController.profile(id, sdt, position);
    if (profile) {
      let result = {
        result: true,
        sdt: profile.sdt,
      };
      return res.status(200).json(result);
    }
    return res.status(400).json({ result: false });
  } catch (error) {
    console.log("profile error", error);
    next(error);
  }
});

// lay sach quan ly
//http://localhost:3000/users/getAdmin
router.get("/getAdmin", async (req, res, next) => {
  try {
    const admin = await adminController.getUser(0);
    return res.status(200).json(admin);
  } catch (error) {
    console.log("get admin error", error);
    next(error);
  }
});

module.exports = router;
