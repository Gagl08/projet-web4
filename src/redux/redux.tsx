import {configureStore, createSlice} from '@reduxjs/toolkit';
import {Gender} from '@prisma/client';
import {rootReducer} from '@reduxjs/toolkit/src/tests/injectableCombineReducers.example';

const questions: string[] = [
  'Salut, je suis Cupibot. Il me manque quelques détails avant de terminer ton inscription. C\'est quoi ton sexe ?',
  'Ok et tu es attiré par quel genre ?',
  'Ça marche, c\'est quoi la tranche d\'âge que tu recherche ?',
  'T\'as des passions dans la vie ? (Choisis-en 3 minimum)',
  'Ok j\'ai toutes les infos d\'on j\'ai besoin, je vais tout faire pour te faire trouver la personne qui te correspond!',
];

const gettingStartFormSlice = createSlice({
  name: 'gettingStartForm',
  initialState: {
    currentStep: 0,
    inputs: {
      ownGender: Gender.UNKNOWN,
      researchGender: Gender.UNKNOWN,
      ages: [18, 25],
      passions: [],
    },
    messages: [
      {text: questions[0], user: 'bot'},
    ],
  },
  reducers: {
    setInput: (state, action) => {
      // {type: "SET_INPUT", payload: {inputs: {ownGender: Gender.Male}, message: "Homme"} }

      state.currentStep++;
      state.inputs = {...state.inputs, ...action.payload.inputs};
      state.messages.push({text: action.payload.message, user: 'me'},
          {text: questions[state.currentStep], user: 'bot'});
    },
  },
});

export const store = configureStore({
  reducer: {
    gettingStartForm: gettingStartFormSlice.reducer,
  },
});

export type RootState = ReturnType<typeof rootReducer>