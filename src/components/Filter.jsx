import React from 'react';
import { useNavigate } from 'react-router-dom';

const Filter = ({ search, region, onSearchChange, onRegionChange }) => {
    const navigate = useNavigate();

    const handleSelectChange = (e) => {
        if (e.target.value === "home") {
            navigate('/');
            window.location.reload(); 
        } else {
            onRegionChange(e);
        }
    };

    return (
        <>
            <section className="filter">
                <form className="form-control filter-form">
                    <div className="search-filter-container">
                        <div className="search-container">
                            <i className="fa-solid fa-magnifying-glass iconsearch" />
                            <input
                                value={search}
                                onChange={onSearchChange}
                                type="text"
                                placeholder="Search for a country..." />
                        </div>
                    </div>
                    <div className="input-group">
                    </div>
                </form>

                <div className='region-filter'>
                    <select
                        value={region}
                        onChange={handleSelectChange}
                        className="filter-by-region">
                        <option hidden>Filter by Region</option>
                        <option value="home">Open this select menu</option>
                        <option value="Africa">Africa</option>
                        <option value="America">America</option>
                        <option value="Asia">Asia</option>
                        <option value="Europe">Europe</option>
                        <option value="Oceania">Oceania</option>
                    </select>
                </div>
            </section>

            <style jsx>{`
                .filter {
                    display: flex;
                    flex-direction: column;
                }

                @media (min-width: 768px) {
                    .filter {
                        flex-direction: row;
                    }
                }
            `}</style>
        </>
    );
};

export default Filter;