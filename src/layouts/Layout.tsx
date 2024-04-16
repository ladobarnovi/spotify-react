import React, { ReactNode, useEffect, useState } from "react";
import { ELayout } from "store/global/globalSlice";
import MainLayout from "layouts/MainLayout/MainLayout";
import { useLayout } from "hooks/useLayout";
import LoginLayout from "layouts/LoginLayout/LoginLayout";
import { useAuth } from "../context/AuthContext";

interface IProps {
  children: ReactNode
}

function Layout({ children }: IProps) {
  const { layout } = useLayout();

  const [ element, setElement ] = useState<ReactNode>();

  useEffect(() => {
    const el = (() => {
      if (layout === ELayout.Main) {
        return <MainLayout>{ children }</MainLayout>;
      }
      else if (layout === ELayout.Login) {
        return <LoginLayout>{ children }</LoginLayout>
      }

      return <div>{ children }</div>;
    })();

    setElement(el);
  }, [ layout ])

  return (
    <div id="layout">
      { element }
    </div>
  )
}

export default Layout;
