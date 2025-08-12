import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <header>====Header====</header>
      <main>{children}</main>
    </div>
  );
};

export default MainLayout;
