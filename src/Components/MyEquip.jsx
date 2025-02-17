import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const MyEquip = () => {
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
        `${import.meta.env.VITE_API_URL}/equipment/${user.email}`
      );
      // Sort by timestamp (descending order)
      const sortedData = data.sort((a, b) => new Date(b.formattedDate) - new Date(a.formattedDate));
      setEquip(sortedData);
    } catch (error) {
      console.error("Error fetching equipment:", error);
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
        await axios.delete(`${import.meta.env.VITE_API_URL}/equipment/${id}`);
        setEquip((prevEquip) => prevEquip.filter((item) => item._id !== id));

        Swal.fire({
          title: "Deleted successfully!",
          text: "Your query has been removed.",
          icon: "success",
        });
      } catch (error) {
        console.error("Error deleting query:", error);
        toast.error("Failed to delete query.");
      }
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">My Queries</h2>

      {loading ? (
        <div className="flex justify-center items-center">
          <div className="animate-spin h-10 w-10 border-4 border-red-600 border-t-transparent rounded-full"></div>
        </div>
      ) : equip.length === 0 ? (
        <div className="text-center p-6 bg-gray-100 rounded-lg shadow-md">
          <p className="text-gray-700 text-lg">No queries found. Add one now!</p>
          <Link to="/add-query">
            <button className="mt-4 px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg">
              Add Query
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {equip.map((item) => (
            <div key={item._id} className="bg-white rounded-lg shadow-md p-4">
              <img
                src={item.img}
                alt={item.name}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
              <p className="text-gray-600">{item.brand}</p>
              <p className="text-gray-500 text-sm">
                Created at: {item.formattedDate ? new Date(item.formattedDate).toLocaleString() : "Date unavailable"}
              </p>
              <div className="flex justify-between mt-4">
                <Link to={`/equipment_details/${item._id}`}>
                  <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md">
                    View Details
                  </button>
                </Link>
                <Link to={`/edit_equipment/${item._id}`}>
                  <button className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md">
                    Edit
                  </button>
                </Link>
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

export default MyEquip;
