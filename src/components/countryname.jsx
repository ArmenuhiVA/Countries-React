import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCountries, fetchCountryBorder, fetchCountryDetaails } from '../state/countriesSlice'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';

const Countryname = () => {

    const countries = useSelector(state => state.countries.countries);
    // const countryname = useSelector(state => state.countries.name);
    const countryDetails = useSelector(state => state.countries.details);
    const countryBorderDetails = useSelector(state => state.countries.borderDetails)
    const { name } = useParams()
    const navigate = useNavigate();

    console.log(countryBorderDetails)

    const dispatch = useDispatch();

    // const [value, setValue] = useState();
    // const movie = ceckValue

    useEffect(() => {
        dispatch(fetchCountryDetaails(name));

    }, [dispatch, name])

    useEffect(() => {
        if (countryDetails && countryDetails.borders) {
            countryDetails.borders.forEach(country => {
                dispatch(fetchCountryBorder(country));
            });
        }
    }, [countryDetails, dispatch]);


    // console.log(countryname)


    // const search = () => {
    //     dispatch(fetchCountries())
    // }


    // console.log(countryDetails[0])
    // const handleBorderClick = (borderCountry) => {
    //     dispatch(fetchCountryBorder(borderCountry));
    //     // You can navigate to the border country details page here if needed
    // };
    // const handleBorderClick = (borderCountry) => {
    //     dispatch(fetchCountryBorder(borderCountry));
    //     // You can navigate to the border country details page here if needed
    // };
    return (
        <>

            <button
                className='p-3'
                onClick={() => navigate(-1)}
            >Back</button>
            {/* {console.log(countryDetails.flags.svg)} */}
            <div className='flex gap-6' >
                <img
                    src={countryDetails?.flags?.svg}
                    alt=""
                    className='p-1 w-1/2'
                />
                <div className='w-1/2'>
                    <h2><b>Native Name: </b>{countryDetails?.name?.common}</h2>
                    <h2> <b> The population: </b>{countryDetails?.population}</h2>
                    <h2> <b>Region: </b>{countryDetails?.region}</h2>
                    <h2> <b>Sub Region: </b>{countryDetails?.subregion}</h2>
                    <h2> <b>Capital: </b>{countryDetails?.capital}</h2>
                    <h2> <b>Top Level Domain: </b>{countryDetails?.tld}</h2>
                    <h2> <b>Currency:</b>
                        {countryDetails?.currencies &&
                            countryDetails.currencies[Object.keys(countryDetails.currencies)[0]]?.name}
                    </h2>
                    <h2> <b>Languages:  </b>
                        {countryDetails?.languages && countryDetails.languages[Object.keys(countryDetails.languages)]}
                    </h2>
                    <h2> <b>Border Countries: </b>{countryDetails?.borders?.map(country =>

                        <Link
                            to={`/country/${countryBorderDetails}`}
                            className='cursor-pointer'
                            key={country}
                        >
                            {country} <br />
                        </Link>)}
                    </h2>
                </div>
            </div>
        </>
    )
}

export default Countryname
