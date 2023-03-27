

const SearchMovie = ({text, setText}) => {

  return (
    <div>
        <label>Search: <input type="search" value={text} onChange={(e) => {setText(e.target.value)}}/></label>
    </div>
    
  )
}

export default SearchMovie