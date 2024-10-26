import { FC, HTMLAttributes } from "react";

type DisplayTobBarProps = HTMLAttributes<HTMLDivElement> & {};
const DisplayTobBar: FC<DisplayTobBarProps> = (props) => {
  const { ...rest } = props;
  return (
    <div
      className="flex bg-popover/30 backdrop-blur-3xl backdrop-brightness-125 items-center justify-between px-4 py-4"
      {...rest}
    ></div>
  );
};
export default DisplayTobBar;
