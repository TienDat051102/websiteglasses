const NotFound = () => {
  return (
    <div
      style={{
        height: "100vh",
        background: "#0f172a",
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1 style={{ fontSize: 100 }}>404</h1>
      <p>Trang không tồn tại hoặc đã bị lỗi</p>
      <button
        onClick={() => (window.location.href = "/")}
        style={{
          padding: "10px 20px",
          marginTop: 20,
          background: "red",
          color: "#fff",
          border: "none",
          borderRadius: 8,
        }}
      >
        Về trang chủ
      </button>
    </div>
  );
};

export default NotFound;
