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
    notFoundCity: false,
}

//get current weather
export const getCurrentWeather = createAsyncThunk(
    "weather/getCurrentWeather",
    async (input, thunkAPI) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const response = await weatherCallApi.getCurrentWeather(input);
            return response
        } catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
)

export const getForecastWeather = createAsyncThunk(
    "weather/getForecastWeather",
    async (rq, thunkAPI) => {
        try {
            const response = await weatherCallApi.getForecastWeather(rq);
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
                state.notFoundCity = false;
                state.todayView = false;
            })
            .addCase(getCurrentWeather.fulfilled, (state, action) => {
                state.loading = false;
                state.currentWeather = action.payload;
                // console.log(state.currentWeather);
                state.todayView = true;
            })
            .addCase(getCurrentWeather.rejected, (state, action) => {
                state.loading = false;
                state.notFoundCity = true;
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