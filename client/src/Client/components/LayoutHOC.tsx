import React from 'react';
import { NavBar, NavBarProps } from './NavBar/NavBar.tsx';
import { Footer } from './Footer/Footer.tsx';

interface LayoutHOCProps<P> extends Partial<NavBarProps> {
  componentProps?: P;
  hideNavbar?: boolean;
  hideFooter?: boolean;
  backgroundColor?: string;
}

const withLayout = <P extends object>(
  Component: React.ComponentType<P>,
  {
    componentProps,
    hideNavbar = false,
    hideFooter = false,
    title,
    showBackButton = false,
    onBackClick,
    showLogoutButton = false,
    backgroundColor
  }: LayoutHOCProps<P>
) => {
  return () => (
    <div className="dvh-screen flex flex-col m-0">
      {!hideNavbar && (
        <NavBar
          title={title || 'עזר לחיים'}
          showBackButton={showBackButton}
          onBackClick={onBackClick}
          showLogoutButton={showLogoutButton}
        />
      )}
      <div className={`relative flex-1 ${backgroundColor || 'bg-white'} max-h-full overflow-auto`}>
        <main className="flex items-center flex-col p-5 box-border h-full">
          <Component {...(componentProps as P)} />
        </main>
      </div>
      {!hideFooter && <Footer />}
    </div>
  );
};

export default withLayout;
