const sql = require("../connection");
const verifyPassword = require('../utils/verifyPassword')

const Sinhvien = function (sinhvien) {
  this.masv = sinhvien.masv;
  this.hoten = sinhvien.hoten;
  this.ngaysinh = sinhvien.ngaysinh;
  this.diachi = sinhvien.diachi;
  this.malop = sinhvien.malop;
  this.tendn = sinhvien.tendn;
  this.matkhau = sinhvien.matkhau;
};

Sinhvien.create = (newSinhvien, result) => {
  const { masv, hoten, ngaysinh, diachi, malop, tendn, matkhau } = newSinhvien;
  sql.query(
    "call sp_ins_encrypted_sinhvien(?, ?, ?, ?, ?, ?, ?)",
    [masv, hoten, ngaysinh, diachi, malop, tendn, matkhau],
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      result(null, { ...newSinhvien });
    }
  );
};

Sinhvien.login = (sinhvienInfo, result) => {
  const { tendn, matkhau } = sinhvienInfo;

  sql.query(
    "select matkhau from sinhvien where tendn = ?",
    tendn,
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      if (res.length && verifyPassword(matkhau, res[0].matkhau)) {
        result(null, { check: true });
      } else {
        result(null, { check: false });
      }
    }
  );
};

module.exports = Sinhvien;
