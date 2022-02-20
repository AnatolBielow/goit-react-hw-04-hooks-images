import React, { Component } from "react";
import "./App.css";
import { ImageGallery } from "./Components/ImageGallery/ImageGallery";
import Searchbar from "./Components/Searchbar/Searchbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "./services/api";
import { LoadMoreButton } from "./Components/Button/Button";
import { Spinner } from "./Components/Spinner/Spinner";
import Modal from "./Components/Modal/Modal";

export default class App extends Component {
  state = {
    pictures: [],
    searchQuery: "",
    page: 1,
    per_page: 12,
    total: 0,
    totalPages: 0,
    showModal: false,
    status: "idle",
    error: null,
    modalImg: null,
    modalAlt: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { per_page } = this.state;
    const prevStateQuery = prevState.searchQuery;
    const prevStatePage = prevState.page;
    const newQuery = this.state.searchQuery;
    const newPage = this.state.page;

    if (prevStateQuery !== newQuery || prevStatePage !== newPage) {
      this.setState({ status: "pending" });

      try {
        const response = await API(newQuery, newPage);
        console.log(response);
        const { total, hits } = response;
        if (total === 0) {
          this.setState({ status: "reject" });
          return toast.error(`No "${newQuery}" query found!`);
        }
        if (total !== 0 && newPage === 1) {
          toast.success(`We found ${total} images according to your query!`);
        }
        this.setState((prevState) => ({
          total: total,
          pictures: [...prevState.pictures, ...hits],
          status: "resolved",
          totalPages: Math.ceil(total / per_page),
        }));

        this.scrollToBottom();
      } catch (error) {
        toast.error("Sorry, something went wrong!");
        this.setState({ error, status: "rejected" });
      }
    }
  }

  handleFormSubmit = (searchQuery) => {
    if (searchQuery === this.state.searchQuery) {
      return;
    }
    this.setState({ searchQuery, pictures: [] });
  };

  incrementPage = () => {
    this.setState((prevState) => ({ page: prevState.page + 1 }));
  };

  togleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };
  handleModal = (src, alt) => {
    this.togleModal();
    this.setState({ modalImg: src, modalAlt: alt });
  };

  scrollToBottom = () => {
    this.endContainer.scrollIntoView({ behavior: "smooth" });
  };

  render() {
    const { pictures, status, totalPages, showModal, modalImg, modalAlt } =
      this.state;
    return (
      <div className="App">
        <Searchbar onSubmit={this.handleFormSubmit} />
        {status === "idle" && <div>Please search images</div>}
        {pictures.length > 0 && (
          <ImageGallery pictures={pictures} onClick={this.handleModal} />
        )}
        {status === "pending" && <Spinner />}
        <div
          style={{ float: "left", clear: "both" }}
          ref={(el) => {
            this.endContainer = el;
          }}
        ></div>
        {status === "resolved" && pictures.length < totalPages && (
          <LoadMoreButton onClick={this.incrementPage} />
        )}
        {status === "reject" && <div>Nic nie znaleziono</div>}
        {showModal && (
          <Modal onClose={this.handleModal}>
            <img src={modalImg} alt={modalAlt} />
          </Modal>
        )}
        <ToastContainer />
      </div>
    );
  }
}
