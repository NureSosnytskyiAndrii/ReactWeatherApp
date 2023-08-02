import {AsyncPaginate} from "react-select-async-paginate";
import {useState} from "react";
import {GET_API_URL, geoApiOptions} from '../../api';

    const Search = ({onSearchChange}) => {

        const [search, setSearch] = useState(null);

        const handleOnChange = (searchData) => {
            setSearch(searchData);
            onSearchChange(searchData);
        }

        const loadOptions = (inputValue) => {
            return fetch(`${GET_API_URL}/cities?minPopulation=500&namePrefix=${inputValue}`, geoApiOptions)
                .then(response => response.json())
                .then(response => {
                    return {
                        options: response.data.map((city) => {
                            return {
                                value: `${city.latitude} ${city.longitude}`,
                                label: `${city.name}, ${city.countryCode}`,
                            }
                        })
                    }
                })
                .catch(response => console.error(1))
        }

        return (
            <AsyncPaginate
                placeholder="Search for city"
                debounceTimeout={600}
                value={search}
                onChange={handleOnChange}
                loadOptions={loadOptions}
            />

        );
    }

export default Search;