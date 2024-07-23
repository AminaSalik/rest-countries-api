import React, { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import fetchData from "./countries.json";
import "../country.css";

const Country = () => {
  const [country, setCountry] = useState(null);
  const { name } = useParams();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const regions = query.get('region');

  useEffect(() => {
    const fetchCountryData = () => {
      const country = fetchData.find(c => c.name.toLowerCase() === name.toLowerCase());
      setCountry(country);
    };

    fetchCountryData();
  }, [name]);

  if (!country) {
    return <p>Loading...</p>;
  }

  const {
    numericCode,
    flag,
    name: countryName,
    nativeName,
    population,
    region,
    subregion,
    capital,
    topLevelDomain,
    currencies,
    languages,
    borders = []
  } = country;

  return (
    <section className="country">
      <Link to={`/?region=${regions}`} className="btn btn-light back-home">
        <i className="fas fa-arrow-left"></i> Back
      </Link>
      <article key={numericCode}>
        <div className="country-inner">
          <div className="flag">
            <img src={flag} alt={countryName} />
          </div>

          <div className="country-details">
            <div>
              <h2>{countryName}</h2>
              <h5>
                Native Name: <span>{nativeName}</span>
              </h5>
              <h5>
                Population: <span>{population.toLocaleString()}</span>
              </h5>
              <h5>
                Region: <span>{region}</span>
              </h5>
              <h5>
                Sub Region: <span>{subregion}</span>
              </h5>
              <h5>
                Capital: <span>{capital}</span>
              </h5>
            </div>

            <div>
              <h5>
                Top Level Domain: <span>{topLevelDomain.join(', ')}</span>
              </h5>
              <h5>
                Currencies: <span>{currencies.map(curr => curr.name).join(', ')}</span>
              </h5>
              <h5>
                Languages: <span>{languages.map(lang => lang.name).join(', ')}</span>
              </h5>
            </div>
            <div className="border-container">
              <div className="d-flex flex-lg-row flex-md-row flex-column align-items-center">
                <h3 className="me-3">Border Countries:</h3>
                <div className="borders d-flex flex-wrap">
                  {borders.length > 0 ? (
                    borders.map((border, index) => (
                      <div className="border-country" key={index}>
                        {border}
                      </div>
                    ))
                  ) : (
                    <p>No border countries.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
};

export default Country;
