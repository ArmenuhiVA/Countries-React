import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCountries, setCountries, setName } from '../state/countriesSlice'
import { Link, Route, Routes } from 'react-router-dom';
import Countryname from './countryname';

const Countries = () => {
    const countries = useSelector(state => state.countries.countries);
    const countryname = useSelector(state => state.countries.name);
    const [value, setValue] = useState('');
    const [filteredNames, setFilteredNames] = useState([]);




    const dispatch = useDispatch();

    // const [value, setValue] = useState();
    // const movie = ceckValue

    useEffect(() => {
        dispatch(fetchCountries());
    }, [])

    // console.log(countries)


    // const search = () => {
    //     dispatch(fetchCountries())
    // }
    useEffect(() => {
        if (countries && countries.length > 0) { // Check if countries is not empty
            const filtered = countries.filter(country =>
                country.name.common.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredNames(filtered);
        }
    }, [countries, value]);

    return (
        <>
            <div className='min-h-24'>
                <h1 className='container mx-auto p-8'>Were is the world?</h1>
            </div>
            <div className='bg-slate-200 p-4' >
                <input
                    className='p-3 w-600 rounded-md'
                    type="text"
                    placeholder='Search for country...'
                    onChange={e => setValue(e.target.value)}
                />
                {/* <button className='bg-white p-1 m-3 rounded-md' onClick={search}> Search</button> */}
            </div>
            <div
                className='flex justify-center items-center flex-wrap gap-4 bg-slate-200 '

            >
                {
                    filteredNames ? filteredNames.map(flags => (
                        <Link to={`/country/${flags.name.common}`}
                            className='rounded-md bg-white border border-black border-solid p-4 m-5 transition duration-300 ease-in-out hover:border-blue-500 cursor-pointer'
                            key={flags.name.common}
                        // onClick={() => dispatch(setName(flags.name.common))}
                        >
                            {/* {console.log(countryname)} */}
                            <img src={flags.flags.png} alt={flags.flags.png} />
                            <h2> <b> Country name:</b> {flags.name.common}</h2>
                            <h2> <b>The Capital: </b>{flags.capital.map(c => `${c}`)}</h2>
                            <h2> <b> The population: </b>{flags.population}</h2>
                            <h2> <b>The region: </b>{flags.region}</h2>
                            {/* <p>{film.Year}</p>
                            <p>{film.Type}</p> */}
                        </Link>
                    ))
                        :
                        <div> <h2>There isn't any much</h2> </div>
                }
            </div>
        </>
    )
}

export default Countries
