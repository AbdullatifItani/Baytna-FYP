import { useState, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import PropertyCard from "./PropertyCard";
import { fetchFavorites } from "../../../store/favorites";

import noproperty from "../../../assets/no-property-nobg.svg";
import axios from "axios";
//export const BASE_URL = "http://localhost:5000";
export const BASE_URL = "http://127.0.0.1:5000";

const List = ({
    min,
    setMin,
    max,
    setMax,
    type,
    setType,
    bed,
    setBed,
    bath,
    setBath,
    propArr,
    setOver,
    url,
}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const searchParam = useParams().searchParam;
    const areaParam = useParams().areaParam;

    const [search, setSearch] = useState("");
    const [searchList, setSearchList] = useState([]);
    const [searchFiltered, setSearchFiltered] = useState([]);
    const [error, setError] = useState("");

    const favorites = useSelector((state) => state.favorites.favorites); // Get favorites from Redux store

    const searchDivRef = useRef();
    const searchDDRef = useRef();

    const directSearch = (term) => {
        setError("");
        const searchTerm = term.split(" ").join("-");
        history.push(`/search/${searchTerm}`);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (search.length > 0) {
            setError("");
            const searchTerm = search.split(" ").join("-");
            history.push(`/search/${searchTerm}`);
        } else {
            setError("Please enter address, city, or zip code to search");
        }
    };

    const searchByArea = (e) => {
        e.preventDefault();
        history.push(url);
    };

    useEffect(() => {
        // Fetch search terms
        axios
            .get(`${BASE_URL}/api/search/terms`, {
                withCredentials: true, // Include credentials (cookies)
            })
            .then((response) => setSearchList(response.data.terms))
            .catch((err) => console.log(err));
        if (searchParam) {
            const param = searchParam.split("-").join(" ");
            setSearch(param);
        }
    }, [searchParam]);

    useEffect(() => {
        // Filter search terms
        const filtered = searchList.filter((term) =>
            term.toLowerCase().includes(search.toLowerCase())
        );
        setSearchFiltered(filtered);
    }, [search, searchList]);

    useEffect(() => {
        // Fetch favorites when the component loads
        dispatch(fetchFavorites());
    }, [dispatch]);

    return (
        <div className="search-wrap">
            <div className="search-bar-wrap">
                <form className="search-bar" onSubmit={handleSubmit}>
                    <label className="search-label-sm">
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Enter an address, city, or ZIP code"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            ref={searchDivRef}
                        />
                        <i
                            className="fa-solid fa-magnifying-glass"
                            onClick={handleSubmit}
                        ></i>
                        {error && <div className="search-error">{error}</div>}
                        <div className="search-dd search-dd-sm" ref={searchDDRef}>
                            {searchFiltered.map((term) => (
                                <div
                                    className="div"
                                    key={term}
                                    onMouseDown={(e) => {
                                        setSearch(term);
                                        directSearch(term);
                                    }}
                                >
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                    <div className="term">{term}</div>
                                </div>
                            ))}
                        </div>
                    </label>
                    {!areaParam && (
                        <button className="btn" type="button" onClick={searchByArea}>
                            Search by Map Area
                        </button>
                    )}
                </form>
                <div className="search-bar">
                    <div className="filters">Filters</div>
                    <div className="wrap">
                        Price
                        <label className="sh-label">
                            Min
                            <select
                                value={min}
                                onChange={(e) => setMin(parseInt(e.target.value, 10))}
                            >
                                <option value="0">$0+</option>
                                <option value="100000">$100,000+</option>
                                <option value="200000">$200,000+</option>
                                <option value="300000">$300,000+</option>
                                <option value="400000">$400,000+</option>
                                <option value="500000">$500,000+</option>
                                <option value="600000">$600,000+</option>
                                <option value="700000">$700,000+</option>
                                <option value="800000">$800,000+</option>
                                <option value="900000">$900,000+</option>
                            </select>
                        </label>
                        <label className="sh-label">
                            Max
                            <select
                                value={max}
                                onChange={(e) => setMax(parseInt(e.target.value, 10))}
                            >
                                <option value="500000">$500,000+</option>
                                <option value="600000">$600,000+</option>
                                <option value="700000">$700,000+</option>
                                <option value="800000">$800,000+</option>
                                <option value="900000">$900,000+</option>
                                <option value="1000000">$1M</option>
                                <option value="1250000">$1.25M</option>
                                <option value="1500000">$1.5M</option>
                                <option value="1750000">$1.75M</option>
                                <option value="99999999999">Any Price</option>
                            </select>
                        </label>
                    </div>
                    <div className="wrap">
                        <label className="sh-label">
                            Home type
                            <select value={type} onChange={(e) => setType(e.target.value)}>
                                <option value="">All</option>
                                <option value="Apartment">Apartment</option>
                                <option value="Villa">Villa</option>
                                <option value="Chalet">Chalet</option>
                                <option value="Single Family">Single Family</option>
                                <option value="Condominium">Condominium</option>
                                <option value="Townhouse">Townhouse</option>
                                <option value="Manufactured Home">Manufactured Home</option>
                                <option value="Cabin">Cabin</option>
                            </select>
                        </label>
                    </div>
                    <div className="wrap">
                        <label className="sh-label">
                            Bed
                            <select
                                value={bed}
                                onChange={(e) => setBed(parseInt(e.target.value, 10))}
                            >
                                <option value="0">Any</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4+</option>
                            </select>
                        </label>
                    </div>
                    <div className="wrap">
                        <label className="sh-label">
                            Bath
                            <select
                                value={bath}
                                onChange={(e) => setBath(parseInt(e.target.value, 10))}
                            >
                                <option value="0">Any</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4+</option>
                            </select>
                        </label>
                    </div>
                    <div className="results">{propArr.length} results</div>
                </div>
            </div>
            {propArr.length ? (
                <div className="search-list">
                    {propArr?.map((property, idx) => (
                        <PropertyCard
                            key={"property" + idx}
                            property={property}
                            setOver={setOver}
                            isFavorite={favorites.includes(property.id)} // Pass favorite status
                        />
                    ))}
                </div>
            ) : (
                <div className="search-no-results">
                    <img className="img" src={noproperty} alt="No property" />
                    <div className="title">Sorry no results are found</div>
                    <div className="desc">
                        Please search different city or filter with different criteria
                    </div>
                </div>
            )}
        </div>
    );
};

export default List;