"use client";
import { FC, HTMLAttributes } from "react";
import { ThemeProvider as Provider } from "next-themes";

type ThemeProviderProps = HTMLAttributes<HTMLDivElement> & {};
const ThemeProvider: FC<ThemeProviderProps> = ({ children, ...rest }) => {
  return (
    <Provider attribute="class" {...rest}>
      {children}
    </Provider>
  );
};
export default ThemeProvider;
