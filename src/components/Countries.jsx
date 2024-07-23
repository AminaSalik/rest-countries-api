import React, { useContext, useEffect, useState } from 'react';

import { ThemeContext } from './ThemeContext';
import { Link, useLocation } from 'react-router-dom';
import Filter from './Filter';
import countriesData from './countries.json';
import './animation.css';

const Countries = () => {

  const [countries, setCountries] = useState([]);

  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");

  const [animate, setAnimate] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const [loading, setLoading] = useState(true); 

  const itemsPerPage = 8;
  const { isLightTheme } = useContext(ThemeContext);
  const location = useLocation();



  useEffect(() => {

    const query = new URLSearchParams(location.search);

    const regionFromQuery = query.get('region');

    if (regionFromQuery) {

      setRegion(regionFromQuery);
    }

  }, [location.search]);


  useEffect(() => {

    try {

      setCountries(countriesData);

      setLoading(false); 

    } catch (err) {
      setLoading(false); 

    }

  }, []);

  const removeCountry = (numericCode) => {

    const newCountries = countries.filter(country => country.numericCode !== numericCode);

    setCountries(newCountries);

  };

  const handleSearchChange = (e) => {

    setSearch(e.target.value);

    setAnimate(true);

  };


  const handleRegionChange = (e) => {

    setRegion(e.target.value);

    setCurrentPage(1); 

    setAnimate(true);

  };


  const handlePageChange = (e) => {

    setCurrentPage(Number(e.target.value));

  };


  const handlePreviousPage = () => {

    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));

  };


  const handleNextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));

  };


  const filteredCountries = countries.filter(country => {

    const matchesSearch = country.name.toLowerCase().includes(search.toLowerCase());
    const matchesRegion = region === "" || country.region === region;

    return matchesSearch && matchesRegion;

  });


  console.log('Filtered Countries:', filteredCountries); 

  const indexOfLastCountry = currentPage * itemsPerPage;

  const indexOfFirstCountry = indexOfLastCountry - itemsPerPage;

  const currentCountries = filteredCountries.slice(indexOfFirstCountry, indexOfLastCountry);


  useEffect(() => {

    if (animate) {
      const timer = setTimeout(() => setAnimate(false), 500);

      return () => clearTimeout(timer);
    }

  }, [animate]);


  const totalPages = Math.ceil(filteredCountries.length / itemsPerPage);


  return (

    <>

      <Filter

        search={search}
        region={region}

        onSearchChange={handleSearchChange}

        onRegionChange={handleRegionChange}

        onReset={handlePageChange}

      />


      <section className={`grid container ${isLightTheme ? 'light-theme' : ''}`} style={{ overflow: 'hidden' }}>

        {loading && <p>Loading...</p>}

        {!loading && currentCountries.length > 0 && currentCountries.map((country, index) => {

          const { numericCode, name, flag, capital, population, region } = country;

          return (
            <article key={numericCode} className={`country-card ${animate ? "fadeInFromBottom" : ""}`}>

              <div>

                <Link to={`/countries/${name}?region=${region}`}>

                  <img src={flag} alt={name} />

                </Link>
                <div className={`details ${isLightTheme ? 'light-theme' : ''}`}>
                  <h3>{name}</h3>

                  <h4>Population: <span>{population}</span></h4>

                  <h4>Region: <span>{region}</span></h4>

                  <h4>Capital: <span>{capital}</span></h4>
                  
                </div>

              </div>
            </article>
          );

        })}

        {!loading && region && currentCountries.length === 0 && (

          <p className='text-red-500'>No countries found in {region}.</p>

        )}

      </section>

      <div className="pagination">

        <button onClick={handlePreviousPage} disabled={currentPage === 1}>

          &laquo;

        </button>
        <span className="paginationSpan">{` ${currentPage} of ${totalPages}`}</span>

        <button onClick={handleNextPage} disabled={currentPage === totalPages}>

          &raquo;

        </button>

        <div className="region-filter">

          <select

            className="filter-by-region form-control scrollable-dropdown"style={{ width: "50%" ,height:"35px",marginBottom:"9px"}}

            value={currentPage}

            onChange={handlePageChange}

          >

            {Array.from({ length: totalPages }, (_, i) => (

              <option key={i + 1} value={i + 1}>
                {i + 1}

              </option>

            ))}
          </select>

        </div>

      </div>

    </>

  );
};


export default Countries;
