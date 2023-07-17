import React, { Component } from 'react';
import ImageGallery from './ImageGallery/ImageGallery';
import { requestGalleryList } from 'services/Api';
import Button from './Button/Button';
import Searchbar from './Searchbar/Searchbar';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';

export default class App extends Component {
  state = {
    galleryList: [],
    isLoading: false,
    error: null,
    searchTerm: '',
    page: null,
    totalHits: null,
    modal: { isOpen: false, modalData: null },
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.searchTerm !== this.state.searchTerm ||
      prevState.page !== this.state.page
    ) {
      this.fetchGallery(this.state.searchTerm);
    }
  }

  onSelectCategory = category => {
    this.setState({ searchTerm: category, page: 1 });
  };

  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
    this.scrollToBottom();
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
      this.setState({
        galleryList:
          this.state.page === 1
            ? galleryList.hits
            : [...this.state.galleryList, ...galleryList.hits],
        totalHits: galleryList.totalHits,
      });
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };
  checkLoadMore() {
    const LoadMoreHidden = Boolean(
      this.state.totalHits / 12 < this.state.page && this.state.totalHits
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
    const showButton = this.checkLoadMore();
    return (
      <div className="App">
        <Searchbar onSelectCategory={this.onSelectCategory} />
        {showError && (
          <div>
            <p>Opps, some error occured... Error: {this.state.error}</p>
          </div>
        )}
        {showLoader ? (
          <Loader />
        ) : (
          <ImageGallery
            galleryList={this.state.galleryList}
            onOpenModal={this.onOpenModal}
          />
        )}
        {this.state.page > 0 && !showLoader && !showButton && !showError && (
          <Button onLoadMore={this.onLoadMore} />
        )}
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
