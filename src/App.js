import { useEffect, useState, useRef } from "react";
import "./App.css";
import { ImageGallery } from "./Components/ImageGallery/ImageGallery";
import Searchbar from "./Components/Searchbar/Searchbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "./services/api";
import { LoadMoreButton } from "./Components/Button/Button";
import { Spinner } from "./Components/Spinner/Spinner";
import Modal from "./Components/Modal/Modal";

export default function App() {
  const [pictures, setPictures] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPictures, setTotalPictures] = useState(0);
  const [showModal, setSchowModal] = useState(false);
  const [status, setStatus] = useState("idle");
  const [modalImg, setModalImg] = useState(null);
  const [modalAlt, setModalAlt] = useState(null);

  const per_page = 12;
  const totalPages = Math.ceil(totalPictures / per_page);

  const handleFormSubmit = (newQuery) => {
    if (searchQuery === newQuery) {
      return;
    }
    setSearchQuery(newQuery);
    setPictures([]);
    setPage(1);
  };

  const incrementPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const togleModal = () => {
    setSchowModal(!showModal);
  };

  const handleModal = (src, alt) => {
    togleModal();
    setModalImg(src);
    setModalAlt(alt);
  };

  useEffect(() => {
    if (searchQuery.trim() === "") {
      return;
    }
    setStatus("pending");
    API(searchQuery, page)
      .then(({ total, hits }) => {
        if (total === 0) {
          setStatus("reject");
          return toast.error(`No "${searchQuery}" query found!`);
        }
        if (total !== 0 && page === 1) {
          toast.success(`We found ${total} images according to your query!`);
        }
        const pictures = hits.map(
          ({ id, webformatURL, largeImageURL, tags }) => {
            return { id, webformatURL, largeImageURL, tags };
          }
        );

        setTotalPictures(total);
        setPictures((prevState) => [...prevState, ...pictures]);
        setStatus("resolved");
      })
      .catch(() => {
        setStatus("rejected");
        toast.error("Sorry, something went wrong!");
      });
  }, [searchQuery, page]);

  //Scroll to bottom//////
  const endContainer = useRef(null);
  const scrollToBottom = () => {
    endContainer.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [pictures]);
  //////////////////////////

  return (
    <div className="App">
      <Searchbar onSubmit={handleFormSubmit} />
      {status === "idle" && <div>Please search images</div>}
      {pictures.length > 0 && (
        <ImageGallery pictures={pictures} onClick={handleModal} />
      )}
      {status === "pending" && <Spinner />}
      <div ref={endContainer} />

      {status === "resolved" && page < totalPages && (
        <LoadMoreButton onClick={incrementPage} />
      )}
      {status === "reject" && <div>Nic nie znaleziono</div>}
      {showModal && (
        <Modal onClose={handleModal}>
          <img src={modalImg} alt={modalAlt} />
        </Modal>
      )}
      <ToastContainer />
    </div>
  );
}
