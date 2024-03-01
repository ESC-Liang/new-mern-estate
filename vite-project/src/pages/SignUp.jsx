import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// export模块, 为各个状态准备数据.
export default function SignUp() {
  // 表单数据
  const [formData, setformData] = useState({});
  // 错误提示数据
  const [error, setError] = useState(null);
  // 提交后按钮变颜色数据
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // 表单变化函数
  const handleChange = (e) => {
    setformData({
      // 表单初始数据
      ...formData,
      // 表单键值对, 键是 id, 值是 value
      [e.target.id]: e.target.value,
    });
  };

  // 表单提交函数
  const handleSubmit = async (e) => {
    // 去除默认值,默认值是点击按键就刷新.
    e.preventDefault();

    try {
      // 设置loading 为true, 就是说,点击了提交按钮.
      setLoading(true);

      // fetch 方法获取数据.得到的返回值是Pormise 函数产生的 res
      const res = await fetch("api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      // 将获得的数据json化后赋值给data变量.
      const data = await res.json();
      //  如果data.success 是false, 也就是说有error,
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      //如果data.success 不是false, 也就是说成功了,
      setLoading(false);
      setError(null);

      // 跳转至sign-in 页面
      navigate("sign-in");

      // 如果有error
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg"
          id="username"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />

        {/* 点击了form 中的按钮,form onSubmit={handleSubmit} 触发了提交数据事件,也就是loading 就此开始 */}
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled: opacity-80"
        >
          {loading ? "Loading..." : "Sign up"}
        </button>
      </form>

      <div className="flex gap-2 mt-5">
        <p>Have an accout?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-700">Sign in</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5"> {error} </p>}
    </div>
  );
}
