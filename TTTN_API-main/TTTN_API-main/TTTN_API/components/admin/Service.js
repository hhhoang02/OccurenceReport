const { User } = require("../Model");

// them nguoi dung
const addUser = async (userName, sdt, email, position, type) => {
  try {
    let addUser = await User.findOne({ email });
    if (addUser) return false;
    addUser = new User({ userName, sdt, email, position, type });
    await addUser.save();
    return true;
  } catch (error) {
    console.log("add user failed: ", error);
  }
  return false;
};

const login = async (userName, email, avatar) => {
  try {
    let user = await User.findOne({ email });
    if (user) {
      return user;
    } else {
      const type = 1;
      const lock = false;
      user = new User({ userName, email, type, avatar, lock });
      await user.save();
      return user;
    }
  } catch (error) {
    console.log("login failed: ", error);
  }
  return false;
};

// lay dannh sach user
const getAllUsers = async () => {
  try {
    return await User.find();
  } catch (error) {
    console.log("getalluser failed: ", error);
  }
  return [];
};

// thay doi loai tai khoan user
const Role = async (id) => {
  try {
    const user = await User.findById(id);
    if (user) {
      if (user.type === 1) {
        user.type = 0;
      } else {
        user.type = 1;
      }
      await user.save();
      return true;
    }
  } catch (error) {
    console.log("role user failed", error);
  }
  return false;
};

// thay doi Lock tai khoan user
const Lock = async (id) => {
  try {
    const user = await User.findById(id);
    if (user) {
      if (user.lock) {
        user.lock = false;
      } else {
        user.lock = true;
      }
      await user.save();
      return user;
    }
  } catch (error) {
    console.log("lock user failed", error);
  }
  return false;
};

// lấy danh sách nhân viên
const getUser = async (type) => {
  try {
    return await User.find({type: type});
  } catch (error) {
    console.log("Failed to get user", error);
  }
};

//thêm thông tin nhân viên
const profile = async(id, sdt, position) => {
try {
  let user = await User.findById(id);
  if (user) {
    user.sdt = sdt ? sdt: user.sdt;
    user.position = position ? position : user.position;
    await user.save();
    return user;
  }
} catch (error) {
  console.log("Failed to profile user", error);
}
return false;
}

module.exports = { addUser, login, getAllUsers, Role, Lock , getUser, profile};
