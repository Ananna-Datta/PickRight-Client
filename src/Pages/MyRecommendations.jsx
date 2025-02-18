import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const MyRecommendations = () => {
  const { user } = useContext(AuthContext);
  const [equip, setEquip] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetchAllEquipments();
    }
  }, [user]);

  const fetchAllEquipments = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/recommendation/${user.email}`
      );
      // Sort by timestamp (descending order)
      const sortedData = data.sort((a, b) => new Date(b.formattedDate) - new Date(a.formattedDate));
      setEquip(sortedData);
    } catch (error) {
      // console.error("Error fetching equipment:", error);
      toast.error("Failed to load equipment.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/recommendation/${id}`);
        setEquip((prevEquip) => prevEquip.filter((item) => item._id !== id));

        Swal.fire({
          title: "Deleted successfully!",
          text: "Your query has been removed.",
          icon: "success",
        });
      } catch (error) {
        // console.error("Error deleting query:", error);
        toast.error("Failed to delete query.");
      }
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">My Recommendations</h2>

      {loading ? (
        <div className="flex justify-center items-center">
          <div className="animate-spin h-10 w-10 border-4 border-red-600 border-t-transparent rounded-full"></div>
        </div>
      ) : equip.length === 0 ? (
        <div className="text-center p-6 bg-gray-100 rounded-lg shadow-md">
          <p className="text-gray-700 text-lg">No recommendations found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {equip.map((item) => (
            <div key={item._id} className="bg-white rounded-lg shadow-md p-4">
              <img
                src={item.productImage}
                alt={item.productName}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
              <p className="text-gray-600">{item.productName}</p>
              <p className="text-gray-500 text-sm">{item.reason}</p>
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => handleDelete(item._id)}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRecommendations;
