// src/services/userService.js
import axiosInstance from "../utils/axiosInstance";

export async function fetchUserProfile() {
  const res = await axiosInstance.get("/users/me");
  return res.data;
}

export async function updateUserProfile(data) {
  return await axiosInstance.put("/users/me", data);
}

export async function changePassword(oldPassword, newPassword) {
  return await axiosInstance.patch("/users/password", {
    oldPassword,
    newPassword,
  });
}

export async function deleteMyAccount() {
  return await axiosInstance.delete("/users/me");
}

export async function getCurrentUser() {
  const res = await axiosInstance.get("/users/me");
  return res.data;
}