import React, { Component } from 'react';
import ImageGallery from './ImageGallery/ImageGallery';
import { requestGalleryList } from 'services/Api';
import Button from './Button/Button';
import Searchbar from './Searchbar/Searchbar';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';
import { POSTS_PER_PAGE } from 'constants/constans';

export default class App extends Component {
  state = {
    galleryList: [],
    isLoading: false,
    error: null,
    searchTerm: '',
    page: 0,
    totalHits: null,
    modal: { isOpen: false, modalData: null },
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.searchTerm !== this.state.searchTerm ||
      prevState.page !== this.state.page
    ) {
      this.fetchGallery();
    }
    if (prevState.galleryList.length !== this.state.galleryList.length) {
      this.scrollToBottom();
    }
  }
  onSelectCategory = category => {
    this.setState({ searchTerm: category, page: 1 });
  };

  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };
  onOpenModal = data =>
    this.setState({ modal: { isOpen: true, modalData: data } });

  onCloseModal = () =>
    this.setState({ modal: { isOpen: false, modalData: null } });

  fetchGallery = async () => {
    try {
      this.setState({ isLoading: true });
      const galleryList = await requestGalleryList(
        this.state.searchTerm,
        this.state.page
      );
      this.setState(prevState => ({
        galleryList:
          this.state.page === 1
            ? galleryList.hits
            : [...prevState.galleryList, ...galleryList.hits],
        totalHits: galleryList.totalHits,
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };
  checkLoadMore() {
    const LoadMoreHidden = Boolean(
      this.state.totalHits / POSTS_PER_PAGE < this.state.page &&
        this.state.totalHits
    );

    return LoadMoreHidden;
  }
  scrollToBottom() {
    const page = window.innerHeight;
    window.scrollTo({
      top: page * this.state.page,
      behavior: 'smooth',
    });
  }

  render() {
    const showLoader = this.state.isLoading;
    const showError = this.state.error;
    const showButton =
      !this.checkLoadMore() &&
      this.state.page >= 1 &&
      !showLoader &&
      !showError;
    return (
      <div className="App">
        <Searchbar onSelectCategory={this.onSelectCategory} />
        {showError && (
          <div>
            <p>Opps, some error occured... Error: {this.state.error}</p>
          </div>
        )}
        {this.state.galleryList?.length > 0 && (
          <ImageGallery
            galleryList={this.state.galleryList}
            onOpenModal={this.onOpenModal}
          />
        )}
        {showLoader && <Loader />}{' '}
        {showButton && <Button onLoadMore={this.onLoadMore} />}
        {this.state.modal.isOpen && (
          <Modal
            onCloseModal={this.onCloseModal}
            modalData={this.state.modal.modalData}
          />
        )}
      </div>
    );
  }
}
