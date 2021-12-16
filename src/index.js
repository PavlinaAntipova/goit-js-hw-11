import './sass/main.scss';

import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import photoCard from "./photoCard.hbs"
import GalleryApiService from './js/service-API.js';

const searchFormRef = document.querySelector("#search-form");
const loadMoreBtn = document.querySelector('[data-action="load-more"]');
const gallery = document.querySelector(".gallery");

const galleryApiService = new GalleryApiService();

searchFormRef.addEventListener("submit", onSubmit);
loadMoreBtn.addEventListener("click", onLoadMore);

function onSubmit(event) {
    event.preventDefault();
    if (event.target.elements.searchQuery.value === "") {
            Notiflix.Notify.failure("Please, fill in your request.");
            return;
    }
        hideBtn();
    clearGallery();
  
    galleryApiService.query = (event.target.elements.searchQuery.value).trim();
    galleryApiService.resetPage();
    try {
        galleryApiService.fetchPhoto().then(data => {
        if (data.hits.length === 0) {
            Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
            return;
        }
Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
        appendPhotosMarkup(data.hits);
        scrollPage();
        createModal();
        revealBtn();
    });
    } catch (error) {
        Notiflix.Notify.warning('Something went wrong :( Try later.');
    }

}

function onLoadMore() {
     
    galleryApiService.fetchPhoto().then(data => {
        appendPhotosMarkup(data.hits);
        scrollPage();
        createModal();
        if (galleryApiService.page === 14) {
            hideBtn();
            Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
            return;
        }
    });

}

function appendPhotosMarkup(photos) {
    gallery.insertAdjacentHTML("beforeend", photoCard(photos)); 

}

function clearGallery() {
    gallery.innerHTML = "";
}

function revealBtn() {
    loadMoreBtn.classList.remove("is-hidden");
}

function hideBtn() {
    loadMoreBtn.classList.add("is-hidden");
}

function createModal() {
    const modal = new SimpleLightbox('.gallery a');
    modal.refresh();
}


function scrollPage() {
    const { height: cardHeight } = document
  .querySelector(".gallery")
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 2,
  behavior: "smooth",
});
}



