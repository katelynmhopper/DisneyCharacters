import React, { useEffect, useState } from "react";
import { Character } from './components/Character';
import './App.css'; 


const Pagination = ({ data, pageSize, onPageChange }) => {
 
    

    let pages = range(1, data.length + 1); 
    const list = pages.map(page => {
        return ( 
            <button key={page} onClick={onPageChange} className="page-item">{page}</button>
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

const pageSize = 6; 

function App() {
    const [data, setData] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    

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
    
    const handlePageChange = (e) => { 
        setCurrentPage(Number(e.target.textContent));
    };
    let page = data;
    if (page.length >=1 && loaded) {
        page = paginate(data, currentPage, pageSize);
       console.log(`currentPage: ${currentPage}`);
    }
    
    

return (
    <React.Fragment>
        <div className="container">
            <ul className="list-group">
                {page.map(data=> (
                    <li>
                        <Character name={data.name} films={data.films} tvShows={data.tvShows} />
                    </li>
                ))}
            </ul>
            {loaded && (
                <Pagination 
                    data={page}
                    pageSize={pageSize}
                    onPageChange={handlePageChange}
                ></Pagination>
            )}
        </div>
    </React.Fragment>
);
}

export default App;