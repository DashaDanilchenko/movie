const SearchMovie = ({text, setText, searchMovie}) => {

    function searchTextAndMovie(e) {
        setText(e.target.value) 
        searchMovie() 
    }

  return (
    <div >
        <label>Search: <input type="text" value={text} onChange={(e) => {searchTextAndMovie(e)}}/></label>
    </div>
    
  )
}

export default SearchMovie