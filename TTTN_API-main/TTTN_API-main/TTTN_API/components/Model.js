const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
  id: { type: ObjectId },
  userName: { type: String },
  sdt: { type: String },
  email: { type: String, unique: true },
  position: { type: String },
  avatar: { type: String},
  type: { type: Number }, //0 la quanly, 1 la nhanvien
  lock: {type: Boolean}, 
});

const ReportSchema = new Schema({
  id: { type: ObjectId },
  room: { type: String },
  reportType: { type: String },
  image: { type: [String] },
  description: { type: String },
  start: { type: Number },
  evaluate: { type: String },
  status1: {status: { type: Boolean}, time:{ type: String}, date: { type: String}},
  status2: {status: { type: Boolean}, time:{ type: String}, date: { type: String}},
  status3: {status: { type: Boolean}, time:{ type: String}, date: { type: String}},
  annunciator: { type: String, ref: "User" },
  reportRecipient: { type: String, ref: "User" },
  complete: {type: String}, // 1 hoàn thành,0 chưa hoàn thành, 2: đã tiếp nhận
  errorto: {type: String},
  time: {type: String},
  note: {type: String},
});

const StatusSchema = new Schema({
  id: { type: ObjectId },
  status: { type: Boolean },
  time: { type: String },
  date: { type: String },
  
});

let User = mongoose.model("User", UserSchema);
let Report = mongoose.model("Report", ReportSchema);
let Status = mongoose.model("Status", StatusSchema);

module.exports = { User, Report, Status };
