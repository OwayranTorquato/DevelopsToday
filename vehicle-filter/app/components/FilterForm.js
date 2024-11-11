'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const FilterForm = () => {
    const [makes, setMakes] = useState([]);
    const [selectedMake, setSelectedMake] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const router = useRouter();

    useEffect(() => {
        const fetchMakes = async () => {
            try {
                const response = await fetch(process.env.NEXT_PUBLIC_API_URL); 
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log('Data received:', data);

                if (data.Results && Array.isArray(data.Results)) {
                    setMakes(data.Results);
                } else {
                    console.error('Results not found or is not an array', data);
                    setMakes([]);
                }
            } catch (error) {
                console.error("Error fetching makes:", error);
                setMakes([]);
            }
        };

        fetchMakes();
    }, []);

    const handleNext = () => {
        if (selectedMake && selectedYear) {
            router.push(`/result/${selectedMake}/${selectedYear}`);
        }
    };

    return (
        <div className="flex flex-col space-y-4">
            <select onChange={(e) => setSelectedMake(e.target.value)} value={selectedMake}>
                <option value="">Select the make</option>
                {makes.length > 0 ? (
                    makes.map(make => (
                        <option key={make.MakeId} value={make.MakeId}>{make.MakeName}</option>
                    ))
                ) : (
                    <option value="">Loading...</option>
                )}
            </select>
            <select onChange={(e) => setSelectedYear(e.target.value)} value={selectedYear}>
                <option value="">Select the year</option>
                {[...Array(new Date().getFullYear() - 2014).keys()].map(i => (
                    <option key={2015 + i} value={2015 + i}>{2015 + i}</option>
                ))}
            </select>
            <button onClick={handleNext} disabled={!selectedMake || !selectedYear}>
                Next
            </button>
        </div>
    );
};

export default FilterForm;
