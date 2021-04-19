import React, { useContext } from 'react';
import { RecipeBloc } from './blocs/RecipeBloc';
import { RecipeListBloc } from './blocs/RecipeListBloc';
import { Configuration, RecipesApi } from './client';


const RecipeContext = React.createContext<RecipeBloc | null>(null);

export const RecipeContextProvider: React.FC = ({children}) => {
  const recipesApi = new RecipesApi(new Configuration({ basePath: "http://localhost:8000" }));
  const recipeBloc = new RecipeBloc(recipesApi);
  return <RecipeContext.Provider value={recipeBloc}>{children}</RecipeContext.Provider>
}

export const useRecipeBloc: () => RecipeBloc = () => {
  const context = useContext(RecipeContext);
  if (context === null) {
    throw new Error("useRecipeBloc must be used within a RecipeContext");
  }
  return context;
}
