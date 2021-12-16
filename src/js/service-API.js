import axios from "axios";
import Notiflix from 'notiflix';



const BASIC_URL = "https://pixabay.com/api";
const KEY = "24794015-09b4d3adaf3fdc4c67b01cd25";
const PAGE_AMOUND = 40;

export default class GalleryApiService {
    constructor() {
        this.searchQuery = "";
        this.page = 1;
    }

    async fetchPhoto() {
        const response = await axios.get(`${BASIC_URL}/?key=${KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=${PAGE_AMOUND}`);
        this.incrementPage();
        return response.data; 
    
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;

    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}