import { Notify } from 'notiflix/build/notiflix-notify-aio';

import ServiceAPI from './service-api';
import makeGalleryMarkup from './markup.js'

import refs from './refs'

const service = new ServiceAPI;

refs.formRef.addEventListener('submit', onFormSubmit);
refs.loadMoreBtnRef.addEventListener('click', onLoadMoreBtnClick)

function onFormSubmit(e) {
    e.preventDefault();
    refs.galleryRef.innerHTML = '';
    
    const inputValue = e.currentTarget.elements.searchQuery.value;
    
    if (inputValue) {
        service.resetPage();
        service.searchQuery = inputValue;
        loadPictures();
        refs.loadMoreBtnRef.classList.add('visible');
        refs.loadMoreBtnRef.disabled = true;
    }
}

function loadPictures() {
    service.getPictures()
        .then(dataProcessing)
        .catch(error => {
        console.log(error)
        Notify.failure('Something went wrong, please try again...');
    })
};

function dataProcessing(imagesData) {
    const images = imagesData.data.hits;
    const totalHits = imagesData.data.totalHits;
    
    if (totalHits === 0) {
        Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        refs.loadMoreBtnRef.classList.remove('visible')
        return;
    };

      if (totalHits !== 0 && imagesData.data.hits.length === 0) {
    Notify.warning(`We're sorry, but you've reached the end of search results.`);
    return;
    };

    const markupData = images.map(makeGalleryMarkup).join('');

    refs.galleryRef.insertAdjacentHTML('beforeend', markupData);

    refs.loadMoreBtnRef.disabled = false;
}

function onLoadMoreBtnClick(e) {
    service.incrementPage();
    loadPictures();
}
