export interface ISearchInputProps {
  searchTerm: string;
  onSearch: (searchTerm: string) => void;
  onSearchInputChange: (searchTerm: string) => void;
}

export interface IResult {
  name: string;
  description: string;
}

export interface ISearchResultsProps {
  searchResult: IResult[];
}

export interface ISearchPageState extends ISearchResultsProps {
  searchTerm: string;
}
