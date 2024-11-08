const API_URL = 'https://trefle.io/api/v1/plants';
const API_TOKEN = process.env.TREFLE_API_TOKEN;

const handleRequest = async (path, params = {}) => {
	const queryParams = new URLSearchParams({ ...params, token: API_TOKEN });
	const response = await fetch(`${API_URL}${path}?${queryParams}`);

	if (!response.ok) {
		const errorBody = await response.text();
		console.error(`Error ${response.status}: ${response.statusText}`, errorBody);
		throw new Error(`API request failed: ${errorBody}`);
	}
	return response.json();
};

export const getAllPlants = async (params = null) => {
    try {
        const searchQuery = params ? params : '';
        const results = await handleRequest('/', {
            'filter[common_name]': searchQuery,
        });
        
        // Filter to ensure partial matches if API doesn't support it directly
        const filteredResults = results.data.filter(plant =>
            plant.common_name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (filteredResults.length === 0) {
            throw new Error('No plant data found for the specified name.');
        }

        return filteredResults.map((result) => ({
            id: result.id,
            common_name: result.common_name,
            scientific_name: result.scientific_name,
            image_url: result.image_url,
            year: result.year,
            bibliography: result.bibliography,
            family: result.family,
        }));
    } catch (error) {
        console.error('Caught error:', error);
        throw new Error('Sorry, no plant found with that name. Details: ' + error.message);
    }
};