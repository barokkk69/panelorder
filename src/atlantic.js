/**
 * src/atlantic.js
 * Wrapper for Atlantic QRIS payment (example provider).
 * Adjust endpoints and params as needed for your real provider.
 */

const axios = require("axios");
const QRCode = require("qrcode");
const { ApiAtlantic } = require("../config");

async function createPayment({ nominal, reff }) {
  const body = new URLSearchParams({
    api_key: ApiAtlantic,
    nominal: String(nominal),
    reff_id: reff,
    type: "ewallet",
    metode: "qris"
  }).toString();
  const res = await axios.post("https://atlantich2h.com/deposit/create", body, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" }
  });
  return res.data;
}

async function checkPayment({ id }) {
  const body = new URLSearchParams({ api_key: ApiAtlantic, id }).toString();
  const res = await axios.post("https://atlantich2h.com/deposit/status", body, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" }
  });
  return res.data;
}

async function generateQRImage(qrString) {
  // returns Buffer
  return await QRCode.toBuffer(qrString);
}

module.exports = { createPayment, checkPayment, generateQRImage };
