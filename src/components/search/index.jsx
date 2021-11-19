import "./styles.css";

export const Search = (props) => {
    return(
        <input type="search" className="search-input" placeholder="Search by breed..." type="text" onChange={props.handleSearchUpdate}/>
    )
}