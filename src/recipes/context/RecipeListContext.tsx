import React, { useContext } from 'react';
import { RecipeListBloc } from '../blocs/RecipeListBloc';
import { Configuration, RecipesApi } from '../client';


const RecipeListContext = React.createContext<RecipeListBloc | null>(null);

export const RecipeListContextProvider: React.FC = ({children}) => {
  // nice to have: dependency injection on this
  const recipesApi = new RecipesApi(new Configuration({ basePath: "http://localhost:8000" }));
  const recipeListBloc = new RecipeListBloc(recipesApi);
  return <RecipeListContext.Provider value={recipeListBloc}>{children}</RecipeListContext.Provider>
}

export const useRecipeListBloc: () => RecipeListBloc = () => {
  const context = useContext(RecipeListContext);
  if (context === null) {
    throw new Error("useRecipeBloc must be used within a RecipeListContext");
  }
  return context;
}
