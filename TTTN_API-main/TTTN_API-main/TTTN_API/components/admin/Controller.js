const adminService = require("./Service");

const addUser = async (userName, sdt, email, position, type) => {
  try {
    return await adminService.addUser(userName, sdt, email, position, type);
  } catch (error) {
    console.log("add user error: ", error);
  }
  return false;
};

const login = async (userName, email, avatar) => {
  try {
    return await adminService.login(userName, email, avatar);
  } catch (error) {
    console.log("login error: ", error);
  }
  return false;
};

const getAllUsers = async () => {
  try {
    return await adminService.getAllUsers();
  } catch (error) {
    console.log("getAllUsers error: ", error);
  }
};

const Role = async (id) => {
  try {
    return await adminService.Role(id);
  } catch (error) {
    console.log("Role error: ", error);
  }
};

const Lock = async (id) => {
    try {
        return await adminService.Lock(id);
    } catch (error) {
        console.log("Lock error: ", error);
    }
};

const getUser = async (type) => {
  try {
      return await adminService.getUser(type);
  } catch (error) {
      console.log("getUser error: ", error);
  }
};

const profile = async (id, sdt, position) => {
try {
  return await adminService.profile(id, sdt, position);
} catch (error) {
  console.log("profile error: ", error);
}
};

module.exports = { addUser, getAllUsers, login, Role ,Lock, getUser, profile};
