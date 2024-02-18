import {
  createSlice,
  createAsyncThunk,
  configureStore,
  PayloadAction,
} from '@reduxjs/toolkit';
import axios from 'axios';

interface RepositoriesState {
  data: string[];
  loading: boolean;
  error: string | null;
}

export const searchRepositories = createAsyncThunk<string[], string>(
  'repositories/searchRepositories',
  async (term: string) => {
    const { data } = await axios.get('https://registry.npmjs.org/-/v1/search', {
      params: {
        text: term,
      },
    });
    return data.objects.map((result: any) => result);
  }
);
// Explicitly type the dispatch function
// export type AppDispatch = Dispatch<any>; // You can replace 'any' with your specific action types if defined

const initialState: RepositoriesState = {
  data: [],
  loading: false,
  error: null,
};

const repositoriesSlice = createSlice({
  name: 'repositories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchRepositories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        searchRepositories.fulfilled,
        (state, action: PayloadAction<string[]>) => {
          state.loading = false;
          state.error = null;
          state.data = action.payload;
        }
      )
      .addCase(searchRepositories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message
          ? action.error.message
          : 'An error occurred';
        state.data = [];
      });
  },
});

// export const {} = repositoriesSlice.actions;
export default repositoriesSlice.reducer;

export const store = configureStore({
  reducer: {
    repositories: repositoriesSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
