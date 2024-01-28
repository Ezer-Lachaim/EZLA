import React from 'react';
import { NavBar, NavBarProps } from './NavBar/NavBar.tsx';
import { Footer } from './Footer/Footer.tsx';

interface LayoutHOCProps<P> extends Partial<NavBarProps> {
  componentProps?: P;
  hideNavbar?: boolean;
  hideFooter?: boolean;
  backgroundColor?: string;
  wrapperClassName?: string;
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
    ,wrapperClassName
  }: LayoutHOCProps<P>
) => {
  return () => (
    <div className={`dvh-screen flex flex-col m-0 ${backgroundColor || 'bg-white'}`}>
      {!hideNavbar && (
        <NavBar
          title={title || 'עזר לחיים'}
          showBackButton={showBackButton}
          onBackClick={onBackClick}
          showLogoutButton={showLogoutButton}
        />
      )}
      <div className={`max-h-full overflow-auto h-full ${wrapperClassName || ''}`}>
        <div className="max-w-lg mx-auto w-full h-full">
          <main className="flex items-center flex-col p-5 box-border h-full">
            <Component {...(componentProps as P)} />
          </main>
        </div>
      </div>
      {!hideFooter && <Footer />}
    </div>
  );
};

export default withLayout;
