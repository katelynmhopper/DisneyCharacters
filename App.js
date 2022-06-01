import React, { useEffect, useState } from "react";
import { Character } from './components/Character';
import ReactBootstrap from "react"; 
import './App.css'; 

const Pagination = ({ data, pageSize, onPageChange}) => {
    const { Button } = ReactBootstrap; 
    if (data.length <= 1) return null; 

    let num = Math.ceil(data.length / pageSize);
    let pages = range(1, num + 1); 
    const list = pages.map(page => {
        return( 
            <Button key={page} onClick={onPageChange} className="page-item">{page}
            </Button>
        );
    });
    return ( 
        <nav> 
            <ul className="pagination">{list}</ul>
        </nav>
    );
};

const range = (start, end) => {
    return Array(end - start + 1)
        .fill(0)
        .map((data, i) => start + i);
};
function paginate(data, pageNumber, pageSize) {
    const start = (pageNumber - 1) * pageSize; 
    let page = data.slice(start, start + pageSize); 
    return page; 
}


function App() {
const [data, setData] = useState([]);
const [loaded, setLoaded] = useState(false);
const [currentPage, setCurrentPage] = useState(1);
const pageSize = 100; 

    useEffect(() => {
        async function fetchData() {
            const response = await fetch("https://api.disneyapi.dev/characters");
            const data  = await response.json();
            setData(data.data);
            setLoaded(true);
        }
        fetchData();
    },[])
    console.log('loaded:', loaded, 'data:', data);

const handlePageChange = e => { 
    setCurrentPage(Number(e.target.textContent));
};
let page = data; 
if (page.length >= 1) {
    page = paginate(page, currentPage, pageSize);
    console.log(`currentPage: ${currentPage}`);
}

return (
<React.Fragment>


<div className="container">
<ul>
{data.map(data => (
<li>
<Character name={data.name} films={data.films} tvShows={data.tvShows} />
</li>
))}
</ul>
<Pagination 
    data={data.hits}
    pageSize={pageSize}
    onPageChange={handlePageChange}
    ></Pagination>
</div>
</React.Fragment>
);
}

export default App;