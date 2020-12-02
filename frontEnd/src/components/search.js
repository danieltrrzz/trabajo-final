class Search {
    
    constructor(onSubmit) {

        this.inputSearch = document.querySelector("#inputSearch");
        this.formSearch = document.querySelector("#formSearch");

        this.formSearch.addEventListener('submit', (e) => {
            e.preventDefault();
            onSubmit(this.inputSearch.value);
        }); 
    };
};

export default Search