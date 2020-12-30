import React, { ReactNode } from "react";
import { Redirect } from "react-router-dom";
import { stringify } from "querystring";

const SecurityLayout: React.FC<any> = ({ children }) => {
  // state = {
  //   isReady: false,
  // };
  //
  // componentDidMount() {
  //   this.setState({
  //     isReady: true,
  //   });
  //   // const { dispatch } = this.props;
  //   //
  //   // if (dispatch) {
  //   //   dispatch({
  //   //     type: 'user/fetchCurrent',
  //   //   });
  //   // }
  // }

  // 你可以把它替换成你自己的登录认证规则（比如判断 token 是否存在）
  // const access_token = currentUser && currentUser.currentUser;
  // const isLogin = currentUser && currentUser.code === 0 && currentUser.data.user_id;
  // const isLogin = !!(localStorage.getItem('x-token') && localStorage.getItem('x-token') !== 'x-token');
  const isLogin = !!localStorage.getItem("x-token");
  const queryString = stringify({
    redirect: window.location.href,
  });
  // if ((!isLogin && loading) || !isReady) {
  // if ((!isLogin) || !isReady) {
  //   return <PageLoading />;
  // }

  if (!isLogin && window.location.pathname !== "/auth/login") {
    return <Redirect to={`/auth/login?${queryString}`} />;
  }
  if (!isLogin && window.location.pathname !== "/") {
    return <Redirect to="/auth/login" />;
  }
  if (isLogin && window.location.pathname === "/auth/login") {
    return <Redirect to="/" />;
  }

  return children;
};

export default SecurityLayout;
