import React, { useEffect, useState } from "react";

const AddressSelector = ({ value, onChange }) => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [form, setForm] = useState({
    province: null,
    district: null,
    ward: null,
    detail: "",
  });

  // 🔥 load provinces
  useEffect(() => {
    fetch("https://provinces.open-api.vn/api/p/")
      .then((res) => res.json())
      .then(setProvinces);
  }, []);

  // 🔥 load lại địa chỉ cũ (QUAN TRỌNG)
  useEffect(() => {
    if (!value) return;

    setForm(value);

    // load districts nếu có province
    if (value.province?.code) {
      fetch(
        `https://provinces.open-api.vn/api/p/${value.province.code}?depth=2`,
      )
        .then((res) => res.json())
        .then((data) => {
          setDistricts(data.districts || []);

          // load wards nếu có district
          if (value.district?.code) {
            fetch(
              `https://provinces.open-api.vn/api/d/${value.district.code}?depth=2`,
            )
              .then((res) => res.json())
              .then((d) => {
                setWards(d.wards || []);
              });
          }
        });
    }
  }, [value]);

  // ========================
  // HANDLE
  // ========================

  const handleProvince = async (e) => {
    const code = Number(e.target.value);
    const province = provinces.find((p) => p.code === code);

    const res = await fetch(
      `https://provinces.open-api.vn/api/p/${code}?depth=2`,
    );
    const data = await res.json();

    setDistricts(data.districts);
    setWards([]);

    const newForm = {
      ...form,
      province,
      district: null,
      ward: null,
    };

    setForm(newForm);
    onChange?.(newForm);
  };

  const handleDistrict = async (e) => {
    const code = Number(e.target.value);
    const district = districts.find((d) => d.code === code);

    const res = await fetch(
      `https://provinces.open-api.vn/api/d/${code}?depth=2`,
    );
    const data = await res.json();

    setWards(data.wards);

    const newForm = {
      ...form,
      district,
      ward: null,
    };

    setForm(newForm);
    onChange?.(newForm);
  };

  const handleWard = (e) => {
    const code = Number(e.target.value);
    const ward = wards.find((w) => w.code === code);

    const newForm = {
      ...form,
      ward,
    };

    setForm(newForm);
    onChange?.(newForm);
  };

  const handleDetail = (e) => {
    const newForm = {
      ...form,
      detail: e.target.value,
    };

    setForm(newForm);
    onChange?.(newForm);
  };

  return (
    <div>
      <label className="mb-1 mt-3">Địa chỉ nhận hàng</label>

      {/* PROVINCE */}
      <select
        className="form-control mb-2"
        value={form.province?.code || ""}
        onChange={handleProvince}
      >
        <option value="">Chọn Tỉnh / Thành phố</option>
        {provinces.map((p) => (
          <option key={p.code} value={p.code}>
            {p.name}
          </option>
        ))}
      </select>

      {/* DISTRICT */}
      <select
        className="form-control mb-2"
        value={form.district?.code || ""}
        onChange={handleDistrict}
        disabled={!form.province}
      >
        <option value="">Chọn Quận / Huyện</option>
        {districts.map((d) => (
          <option key={d.code} value={d.code}>
            {d.name}
          </option>
        ))}
      </select>

      {/* WARD */}
      <select
        className="form-control mb-2"
        value={form.ward?.code || ""}
        onChange={handleWard}
        disabled={!form.district}
      >
        <option value="">Chọn Phường / Xã</option>
        {wards.map((w) => (
          <option key={w.code} value={w.code}>
            {w.name}
          </option>
        ))}
      </select>

      {/* DETAIL */}
      <input
        placeholder="Số nhà, tên đường..."
        className="form-control mb-2"
        value={form.detail || ""}
        onChange={handleDetail}
      />
    </div>
  );
};

export default AddressSelector;
