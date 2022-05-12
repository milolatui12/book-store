const Sinhvien = require("../models/sinhvien.model");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({ msg: "empty" });
    return;
  }

  const sinhvien = new Sinhvien({
    masv: req.body.masv,
    hoten: req.body.hoten,
    ngaysinh: req.body.ngaysinh,
    diachi: req.body.diachi,
    malop: req.body.malop,
    tendn: req.body.tendn,
    matkhau: req.body.matkhau,
  });

  Sinhvien.create(sinhvien, (err, data) => {
    if (err) {
      res.status(500).send({ msg: "error 1", err: err });
    } else {
      res.status(200).send(data);
    }
  });
};


exports.login = (req, res) => {
  if (!req.body) {
    res.status(400).send({ msg: "empty" });
    return;
  }

  const sinhvienInfo = {
    ...req.body
  }

  Sinhvien.login(sinhvienInfo, (err, data) => {
    if(err) {
      res.status(500).send({msg: "err", err: err})
    } else {
      res.status(200).send(data)
    }
  })
}