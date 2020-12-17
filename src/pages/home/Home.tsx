import React, { useState, useEffect, useLayoutEffect } from "react";

export const Home = () => {
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
    </div>
  );
};
