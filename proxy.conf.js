var defaultTarget = "https://localhost:5001";
module.exports = [
  {
    context: ["/weatherforecast/**", "/api/**"],
    target: defaultTarget,
    secure: false,
    changeOrigin: true,
  },
];
