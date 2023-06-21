'use client';

export const RootContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="relative flex-1 bg-white max-h-full overflow-auto">{children}</div>;
};
