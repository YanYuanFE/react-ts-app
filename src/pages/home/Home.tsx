import React, { useState, useEffect, useLayoutEffect } from "react";
import { DatePicker, Space } from "antd";

const { RangePicker } = DatePicker;

const Home = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log(count, "useEffect");
    document.title = `You click ${count}`;
    return () => {
      console.log(count, "end useEffect");
      document.title = "remove";
    };
  }, []);
  useLayoutEffect(() => {
    console.log(count, "useLayoutEffect");
    document.title = `You click ${count}`;
    return () => {
      console.log(count, "end useLayoutEffect");
      document.title += "!!!";
    };
  }, []);
  console.log(count, "update");
  return (
    <div className="home" css={{ color: "red" }}>
      Home
      <button onClick={() => setCount(count + 1)}>set {count}</button>
      <Space direction="vertical" size={12}>
        <RangePicker />
        <RangePicker showTime />
        <RangePicker picker="week" />
        <RangePicker picker="month" />
        <RangePicker picker="year" />
      </Space>
    </div>
  );
};

export default Home;
