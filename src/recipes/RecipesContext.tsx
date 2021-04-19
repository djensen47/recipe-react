import React, { useContext } from 'react';
import { RecipeBloc } from './blocs/RecipeBloc';
import { RecipeListBloc } from './blocs/RecipeListBloc';
import { Configuration, RecipesApi } from './client';


const RecipeContext = React.createContext<RecipeBloc | null>(null);
const RecipeListContext = React.createContext<RecipeListBloc | null>(null);

export const RecipeListContextProvider: React.FC = ({children}) => {
  // nice to have: dependency injection on this
  const recipesApi = new RecipesApi(new Configuration({ basePath: "http://localhost:8000" }));
  const recipeListBloc = new RecipeListBloc(recipesApi);
  return <RecipeListContext.Provider value={recipeListBloc}>{children}</RecipeListContext.Provider>
}

export const RecipeContextProvider: React.FC = ({children}) => {
  const recipesApi = new RecipesApi(new Configuration({ basePath: "http://localhost:8000" }));
  const recipeBloc = new RecipeBloc(recipesApi);
  return <RecipeContext.Provider value={recipeBloc}>{children}</RecipeContext.Provider>
}

export const useRecipeListBloc: () => RecipeListBloc = () => {
  const context = useContext(RecipeListContext);
  if (context === null) {
    throw new Error("useRecipeBloc must be used within a RecipeListContext");
  }
  return context;
}

export const useRecipeBloc: () => RecipeBloc = () => {
  const context = useContext(RecipeContext);
  if (context === null) {
    throw new Error("useRecipeBloc must be used within a RecipeContext");
  }
  return context;
}
