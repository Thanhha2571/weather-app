import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import weatherCallApi from "../services/api";

const initialState = {
    currentWeather: {},
    forecastWeather: {},
    activeWeekItem: 0,
    todayView: true,
    weekView: false,
    hourView: false,
    // infoTodayForecast: {},
    searchInput: "",
    loading: false,
    dailyWeather: {},
}

//get current weather
export const getCurrentWeather = createAsyncThunk(
    "weather/getCurrentWeather",
    async (input, thunkAPI) => {
        try {
            const response = await weatherCallApi.getCurrentWeather(input);
            return response
        } catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
)

export const getForecastWeather = createAsyncThunk(
    "weather/getForecastWeather",
    async ({lat, lon}, thunkAPI) => {
        try {
            const response = await weatherCallApi.getForecastWeather(lat, lon);
            return response
        } catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
)

export const weatherSlice = createSlice({
    name: "weather",
    initialState,
    reducers: {
        setSearchInput: (state, action) => {
            state.searchInput = action.payload;
        },
        setTodayView: (state, action) => {
            state.todayView = true;
            state.weekView = false;
            state.hourView = false;
            state.activeWeekItem = false;
        },
        setWeekView: (state, action) => {
            state.todayView = false;
            state.weekView = true;
            state.hourView = false;
        },
        setHourView: (state, action) => {
            state.todayView = false;
            state.weekView = false;
            state.hourView = true;
            state.activeWeekItem = false;
        },
        setActiveWeekItem: (state, action) => {
            state.activeWeekItem = action.payload;
            // console.log(state.activeWeekItem);
        }
    },
    extraReducers: (builder) => {
        builder
            // get current weather
            .addCase(getCurrentWeather.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getCurrentWeather.fulfilled, (state, action) => {
                state.loading = false;
                state.currentWeather = action.payload;
                // console.log(state.currentWeather);
            })
            .addCase(getCurrentWeather.rejected, (state, action) => {
                state.loading = false;
            })
            .addCase(getForecastWeather.fulfilled, (state, action) => {
                state.loading = false;
                state.forecastWeather = action.payload;
                // console.log(action.payload);
            })
    }
})

export const { setSearchInput, setTodayView, setWeekView, setHourView, setActiveWeekItem } = weatherSlice.actions;
export default weatherSlice.reducer;