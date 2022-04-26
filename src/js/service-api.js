import axios from 'axios';

export default class ServiceApi {
    constructor() {
        this.options = {
            params: {
                key: '27031452-a137835af82b3a6efb2323c99',
                q: '',
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: true,
                per_page: 40,
                page: 1,
            },
        };
    }
    
    async getPictures() {
        const response = await axios.get('https://pixabay.com/api/', this.options);
        return response;
    }

    incrementPage() {
        this.options.params.page += 1;
    }

    resetPage() {
        this.options.params.page = 1;
    }

    get searchQuery() {
        return this.options.params.q
    }

    set searchQuery(newQuery) {
        this.options.params.q = newQuery;
    }

    get page() {
        return this.options.params.page;
    }

    set page(newPage) {
        this.options.params.page = newPage;
    }
}