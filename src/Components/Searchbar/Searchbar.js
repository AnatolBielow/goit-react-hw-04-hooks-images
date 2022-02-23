import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  SearchbarHeader,
  Form,
  FormButton,
  ButtonLabel,
  FormInput,
} from "./Searchbar.styled";
import { GrFormSearch } from "react-icons/gr";
import PropTypes from "prop-types";

export default function Searchbar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (evt) => {
    setSearchQuery(evt.target.value.toLowerCase());
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (searchQuery.trim() === "") {
      return toast.error("No input");
    }
    onSubmit(searchQuery);
    setSearchQuery("");
  };

  return (
    <SearchbarHeader>
      <Form onSubmit={handleSubmit}>
        <FormButton type="submit">
          <GrFormSearch size={40} />
          <ButtonLabel>Search</ButtonLabel>
        </FormButton>

        <FormInput
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchQuery}
          onChange={handleInputChange}
        />
      </Form>
    </SearchbarHeader>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
