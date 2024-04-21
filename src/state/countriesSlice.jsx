import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchCountries = createAsyncThunk(
    'countries/fetchCountries',
    async function (_, { rejectWithValue, dispatch }) {
        try {
            const response = await fetch(`https://restcountries.com/v3.1/all?fields=name,capital,flags,population,region`)
            if (!response.ok) {
                throw new Error('Server Error')
            }

            const data = await response.json()

            dispatch(setCountries(data))
            // console.log(data)
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const fetchCountryDetaails = createAsyncThunk(
    'countries/fetchCountryDetaails',
    async function (name, { rejectWithValue, dispatch }) {
        try {
            const response = await fetch(`https://restcountries.com/v3.1/name/${name}`)
            if (!response.ok) {
                throw new Error('Server Error')
            }

            const data = await response.json()

            dispatch(setDetails(data[0]))
            console.log(data[0])
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const fetchCountryBorder = createAsyncThunk(
    'countries/fetchCountryBorder',
    async function (name, { rejectWithValue, dispatch }) {
        try {
            const response = await fetch(`https://restcountries.com/v3.1/alpha?codes=${name}`)
            if (!response.ok) {
                throw new Error('Server Error')
            }

            const data = await response.json()

            dispatch(setBorderDetails(data[0].name.common))
            // console.log(data[0].name.common)
            // return data[0].name.common
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

const countriesSlice = createSlice({
    name: 'countries',
    initialState: {
        countries: [],
        name: '',
        details: [],
        borderDetails: null,
    },
    reducers: {
        setCountries(state, action) {
            state.countries = action.payload
            //    console.log(state.films)
        },
        setName(state, action) {
            state.name = action.payload
        },
        setDetails(state, action) {
            state.details = action.payload
        },
        setBorderDetails(state, action) {
            state.borderDetails = action.payload
        }
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(fetchFilms.fulfilled, (state, action) => {
    //             state.films = action.payload;
    //         })
    //         .addCase(fetchFilms.rejected, (state, action) => {
    //             // Handle error state if needed
    //         });
    // }
})

export const { setCountries, setName, setDetails, setBorderDetails } = countriesSlice.actions
export default countriesSlice.reducer