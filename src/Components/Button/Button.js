import PropTypes from "prop-types";
import { Button } from "./Button.styled";

export const LoadMoreButton = ({ onClick }) => {
  return <Button onClick={onClick}>Load more</Button>;
};

LoadMoreButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
