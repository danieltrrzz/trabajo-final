class Search {
    
    constructor(onSubmit) {

        this.inputSearch = document.querySelector("#inputSearch");
        this.formSearch = document.querySelector("#formSearch");

        window.addEventListener('load', (e) => {
            e.preventDefault();
            onSubmit(this.inputSearch.value);
        }); 
    };
};

export default Search