import React from 'react';
import { NavBar, NavBarProps } from './NavBar/NavBar.tsx';
import { Footer } from './Footer/Footer.tsx';

interface LayoutHOCProps extends Partial<NavBarProps> {
  hideNavbar?: boolean;
  hideFooter?: boolean;
}

const withLayout = (
  Component: React.ComponentType,
  { hideNavbar, hideFooter, title, hasGoBack }: LayoutHOCProps
) => {
  return () => (
    <div className="h-screen flex flex-col m-0">
      {!hideNavbar && <NavBar title={title || 'עזר לחיים'} hasGoBack={hasGoBack} />}
      <div className="relative flex-1 bg-white max-h-full overflow-auto">
        <main className="flex items-center flex-col p-5 box-border">
          <Component />
        </main>
      </div>
      {!hideFooter && <Footer />}
    </div>
  );
};

export default withLayout;
