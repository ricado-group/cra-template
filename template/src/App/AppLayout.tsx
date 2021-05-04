import React from "react";
import { Card, Menu } from "antd";
import {
  QuestionCircleOutlined,
  LockOutlined,
  AimOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import { AccountMenu, AppShell, redirectToAccounts } from "@ricado/core-ui";
import { useQueryCache } from "react-query";
import { IUserAccountModel } from "../UserAccount/UserAccountClient";

function getSelectedMenuKeys(pathname: string): string[] {
  const pathAsArray: string[] = pathname.split("/");
  const rootSegment: string = pathAsArray[1];
  return [rootSegment];
}

const AppLayout: React.FC = ({ children }) => {
  const { pathname } = useLocation();
  const cache = useQueryCache();
  const user = cache.getQueryData<IUserAccountModel>("currentUser");

  function handleLockSession(): void {
    redirectToAccounts("SessionLock");
  }

  function handleLogout(): void {
    redirectToAccounts("SignOut");
  }

  if (!user) return null;

  return (
    <AppShell title="Welcome to <app_name>">
      {{
        side: (
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={getSelectedMenuKeys(pathname)}
          >
            <Menu.Item key="feature" icon={<AimOutlined />}>
              <Link to="/feature">
                <span>Feature</span>
              </Link>
            </Menu.Item>
          </Menu>
        ),
        content: <Card>{children}</Card>,
        header: (
          <AccountMenu user={user}>
            <Menu.Item key="help">
              <Link to="/help">
                <QuestionCircleOutlined />
                Help
              </Link>
            </Menu.Item>
            <Menu.Item key="lock" onClick={handleLockSession}>
              <LockOutlined />
              Lock Session
            </Menu.Item>
            <Menu.Item key="signOut" onClick={handleLogout}>
              <LogoutOutlined />
              Sign Out
            </Menu.Item>
          </AccountMenu>
        ),
      }}
    </AppShell>
  );
};

export default AppLayout;
