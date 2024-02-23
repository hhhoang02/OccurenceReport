var express = require("express");
var router = express.Router();
const adminController = require("../components/admin/Controller");
const reportController = require("../components/report/Controller");
const {checkTokenWeb} = require("../components/middle/Authen");
const jwt = require("jsonwebtoken");

/* GET home page. */
// router.get("/", function (req, res, next) {
//   res.render("index", { title: "Express" });
// });

// http://localhost:3000/login
// hiển thị trang login
router.get("/login",[checkTokenWeb] ,async (req, res, next) => {
  res.render("login", { title: "Login" });
});
// login admin
// http://localhost:3000/login
router.post("/login", async (req, res, next) => {
  try {
    const { userName, pass } = req.body;
    if (userName === "admin" && pass === "admin") {
      // tạo token
      const token = jwt.sign({}, "secret", { expiresIn: 1 * 60 * 60 });
      // lưu token vào session
      req.session.token = token;
      return res.redirect("/");
    }
    return res.redirect("/login");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ result: false });
  }
});

// http://localhost:3000/logout
// xử lý logout
router.get("/logout",[checkTokenWeb] ,async (req, res, next) => {
  try {
    req.session.destroy();
    return res.redirect("/login");
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// lay danh sach user
// http://localhost:3000
router.get("/",[checkTokenWeb], async (req, res, next) => {
  try {
    const user = await adminController.getAllUsers();
    return res.render("index", { user, title: "Nhan vien quan tri" });
  } catch (error) {
    return res.status(500).json({ result: false });
  }
});

// thêm user
// http://localhost:3000/addUser
router.post("/addUser", async (req, res, next) => {
  try {
    const { userName, sdt, email, position, type } = req.body;
    const addUser = await adminController.addUser(
      userName,
      sdt,
      email,
      position,
      type
    );
    if (addUser) {
      return res.status(200).json({ result: true });
    }
    return res.status(400).json({ result: false });
  } catch (error) {
    console.log("addUser error: ", error);
    return res.status(500).json({ result: false });
  }
});

// thay doi loai tai khoan user
// http://localhost:3000/role/:id
router.get("/role/:id",[checkTokenWeb], async (req, res, next) => {
  try {
    const { id } = req.params;
    const role = await adminController.Role(id);
    if (role) {
      return res.redirect("/");
    }
    return res.status(400).json({ result: false });
  } catch (error) {
    console.log("role error: ", error);
    next(error);
  }
});

// đổi lock user
// http://localhost:3000/lock/:id
router.get("/lock/:id",[checkTokenWeb], async (req, res, next) => {
  try {
    const { id } = req.params;
    const lock = await adminController.Lock(id);
    if (lock) {
      return res.status(200).json(lock);
    }
    return res.status(400).json({ result: false });
  } catch (error) {
    console.log("Lock error: ", error);
    next(error);
  }
});

// lay danh sach report
// http://localhost:3000/getAllReport
router.get("/getAllReport",[checkTokenWeb], async (req, res, next) => {
  try {
    const report = await reportController.getAllReport();
    const user = await adminController.getUser(1);
    const admin = await adminController.getUser(0);
    return res.render("report", {
      report,
      user,
      admin,
      title: "Nhan vien quan tri",
    });
  } catch (error) {
    return res.status(500).json({ result: false });
  }
});

// lay ds theo user
//  http://localhost:3000/getReportByUser/:id
router.get("/getReportByUser/:id",[checkTokenWeb], async (req, res, next) => {
  try {
    const { id } = req.params;
    const report = await reportController.getReportByUser(id);
    const user = await adminController.getUser(1);
    const admin = await adminController.getUser(0);
    return res.render("report", {
      report,
      user,
      admin,
      title: "Nhan vien quan tri",
    });
    //return res.status(200).json({ result: report });
  } catch (error) {
    return res.status(500).json({ result: false });
  }
});

// lay ds ng tiếp nhận
//  http://localhost:3000/getReportByReportRecipient/:id
router.get("/getReportByReportRecipient/:id",[checkTokenWeb], async (req, res, next) => {
  try {
    const { id } = req.params;
    const report = await reportController.getReportByReportRecipient(id);
    const user = await adminController.getUser(1);
    const admin = await adminController.getUser(0);
    return res.render("report", {
      report,
      user,
      admin,
      title: "Nhan vien quan tri",
    });
    //return res.status(200).json({ result: report });
  } catch (error) {
    return res.status(500).json({ result: false });
  }
});

//lay chi tiet report
// http://localhost:3000/getReport/:id
router.get("/getReport/:id",[checkTokenWeb], async (req, res, next) => {
  try {
    const { id } = req.params;
    const getReportByID = await reportController.getReportByID(id);
    return res.render("getReportByID", {
      getReportByID,
      title: "Nhan vien quan tri",
    });
  } catch (error) {
    return res.status(500).json({ result: false });
  }
});

// lấy ds đã hoàn thành
// http://localhost:3000/getCompletionReport
router.get("/getCompletionReport",[checkTokenWeb], async (req, res, next) => {
  try {
    const report = await reportController.getCompletionReport();
    const user = await adminController.getUser(1);
    const admin = await adminController.getUser(0);
    return res.render("report", {
      report,
      user,
      admin,
      title: "Nhan vien quan tri",
    });
  } catch (error) {
    return res.status(500).json({ result: false });
  }
});

// lấy ds đã tiếp nhận
// http://localhost:3000/getReceiveIncidents
router.get("/getReceiveIncidents",[checkTokenWeb], async (req, res, next) => {
  try {
    const report = await reportController.getReceiveIncidents();
    const user = await adminController.getUser(1);
    const admin = await adminController.getUser(0);
    return res.render("report", {
      report,
      user,
      admin,
      title: "Nhan vien quan tri",
    });
  } catch (error) {
    return res.status(500).json({ result: false });
  }
});

// lấy ds chưa hoàn thành
// http://localhost:3000/getUnCompletionReport
router.get("/getUnCompletionReport",[checkTokenWeb], async (req, res, next) => {
  try {
    const report = await reportController.getUnCompletionReport();
    const user = await adminController.getUser(1);
    const admin = await adminController.getUser(0);
    return res.render("report", {
      report,
      user,
      admin,
      title: "Nhan vien quan tri",
    });
  } catch (error) {
    return res.status(500).json({ result: false });
  }
});

// lấy ds theo ngày
// http://localhost:3000/getReportByDate/:day
router.get("/getReportByDate/:day",[checkTokenWeb], async (req, res, next) => {
  try {
    const { day } = req.params;

    const text = day+" ngày trước";

    const date = new Date();
    const options = { timeZone: "Asia/Ho_Chi_Minh" };
    date.toLocaleString("en-GB", options);

    console.log(date);

    const endDate =
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1) +
      "-" +
      (date.getDate() < 10 ? "0" + date.getDate() : date.getDate());

    const getDay =
      date.getDate() - day < 1
        ? date.getDate() + 30 - day
        : date.getDate() - day;

    const startDate =
      date.getFullYear() +
      "-" +
      (date.getDate() - day < 1
        ? (date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1) - 1
        : date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1) +
      "-" +
      (getDay < 10 ? "0" + getDay : getDay);
    const report = await reportController.getReportByDate(startDate, endDate);
    const user = await adminController.getUser(1);
    const admin = await adminController.getUser(0);
     return res.render("report", { report, user, admin ,text, title: "Nhan vien quan tri" });
    // return res.status(200).json({ result: report });
  } catch (error) {
    return res.status(500).json({ result: false });
  }
});

// lấy danh sách theo yêu cầu
// http://localhost:3000/getReportByRequest
router.post('/getReportByRequest',[checkTokenWeb], async (req, res, next) => {
  try {
    const {annunciator,reportRecipient,complete} = req.body;
    console.log("getReportByRequest", req.body);
    const report = await reportController.getReportByRequest(annunciator, reportRecipient, complete);
    const user = await adminController.getUser(1);
    const admin = await adminController.getUser(0);
    return res.render("report", {
      report,
      user,
      admin,
      title: "Nhan vien quan tri",
    });
  } catch (error) {
    console.log("getReportByRequest: ",error);
    return res.status(500).json({ result: false });
  }
});

module.exports = router;
