import React from 'react';

const getYearsFrom2015To2024 = () => {
    const years = [];
    for (let year = 2015; year <= 2024; year++) {
        years.push(year);
    }
    return years;
};

export async function generateStaticParams() {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL);
        const data = await response.json();

        const years = getYearsFrom2015To2024();

        const paths = data.Results.flatMap(make =>
            years.map(year => ({
                makeId: make.MakeId.toString(),
                year: year.toString(),
            }))
        );

        return paths;
    } catch (error) {
        console.error("Error generating static paths:", error);
        return [];
    }
}

const ResultPage = async ({ params }) => {
    const { makeId, year } = await params;

    let vehicleData;
    let error = null;

    try {
        const response = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`);

        if (!response.ok) {
            if (response.status === 404) {
                console.error(`Model not found for makeId: ${makeId} and year: ${year}`);
                vehicleData = { Results: [] };
            } else {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } else {
            vehicleData = await response.json();
        }
    } catch (err) {
        console.error('Error fetching vehicle data:', err);
        error = err.message;
        vehicleData = null;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl font-semibold text-gray-900 mb-8">
                    Results for {makeId} - {year}
                </h1>

                {error && (
                    <div className="text-red-500 text-xl mb-4">
                        <p>Error: {error}</p>
                    </div>
                )}

                {vehicleData ? (
                    <ul className="space-y-4">
                        {vehicleData.Results && vehicleData.Results.length > 0 ? (
                            vehicleData.Results.map(vehicle => (
                                <li key={vehicle.Model_Id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
                                    <h2 className="text-2xl font-semibold text-gray-800">{vehicle.Model_Name}</h2>
                                </li>
                            ))
                        ) : (
                            <li className="text-gray-500">No models found for this year.</li>
                        )}
                    </ul>
                ) : (
                    <p className="text-gray-500">Loading...</p>
                )}
            </div>
        </div>
    );
};

export default ResultPage;
