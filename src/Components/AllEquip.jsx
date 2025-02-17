import axios from 'axios';
import { useEffect, useState } from 'react';
import EquipCard from './EquipCard';

const AllEquip = () => {
    const [equip, setEquip] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [gridCols, setGridCols] = useState(3); // Default 3-column layout

    useEffect(() => {
        fetchAllJobs();
    }, []);

    const fetchAllJobs = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/equipment`);
            setEquip(data);
        } catch (error) {
            console.error("Error fetching jobs:", error);
        }
    };

    // Filter equipment based on search text
    const filteredEquip = equip.filter(equipment => 
        equipment.name.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div>
            {/* Search Input */}
            <input 
                type="text" 
                placeholder="Search by product name..." 
                value={searchText} 
                onChange={(e) => setSearchText(e.target.value)}
                className="p-2 border border-gray-300 rounded mb-4 w-full"
            />

            {/* Layout Toggle Buttons */}
            <div className="mb-4 flex gap-2">
                <button onClick={() => setGridCols(2)} className="p-2 bg-gray-200 rounded">2 Columns</button>
                <button onClick={() => setGridCols(3)} className="p-2 bg-gray-200 rounded">3 Columns</button>
                <button onClick={() => setGridCols(4)} className="p-2 bg-gray-200 rounded">4 Columns</button>
            </div>

            {/* Grid Layout */}
            <div className={`grid grid-cols-${gridCols} gap-4`} style={{ gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))` }}>
                {filteredEquip.map(equipment => (
                    <EquipCard key={equipment._id} equipment={equipment} />
                ))}
            </div>
        </div>
    );
};

export default AllEquip;
