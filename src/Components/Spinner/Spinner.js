import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { MutatingDots } from "react-loader-spinner";
import { SpinnerLoad } from "./Spinner.styled";

export const Spinner = () => {
  return (
    <SpinnerLoad>
      <MutatingDots color="blue" />
    </SpinnerLoad>
  );
};
