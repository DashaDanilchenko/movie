const SearchMovie = ({text, setText, searchMovie}) => {

    function searchTextAndMovie(e) {
        setText(e.target.value) 
        searchMovie(text) 
    }

  return (
    <form >
        <label>Search: <input type="text" value={text} onChange={(e) => {searchTextAndMovie(e)}}/></label>
    </form>
    
  )
}

export default SearchMovie