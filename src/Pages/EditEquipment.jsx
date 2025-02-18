import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom"; // Import useNavigate & useParams

const EditEquipment = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams(); // Get equipment ID from URL
  const navigate = useNavigate();
  const [equipment, setEquipment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch equipment data by ID
    axios.get(`${import.meta.env.VITE_API_URL}/equipment/details/${id}`)
      .then((res) => {
        setEquipment(res.data);
        setLoading(false);
      })
      .catch((err) => {
        // console.error("Error fetching equipment:", err);
        toast.error("Failed to load equipment data");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center">Loading equipment details...</p>;
  if (!equipment) return <p className="text-center text-red-500">Equipment not found!</p>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedData = {
      name: form.name.value,
      brand: form.brand.value,
      img: form.img.value,
      title: form.title.value,
      reasonDetails: form.reasonDetails.value,
    };

    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/edit_equipment/${id}`, updatedData);
      toast.success("Equipment updated successfully");
      navigate('/myEquip'); // Redirect to myEquip page
    } catch (err) {
      // console.error("Error updating equipment:", err);
      toast.error("Failed to update equipment");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-lg shadow-lg bg-white p-6 rounded-2xl">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Edit Equipment</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            defaultValue={equipment.name}
            placeholder="Product Name"
            required
            className="w-full p-2 border rounded-lg"
          />
          <input
            type="text"
            name="brand"
            defaultValue={equipment.brand}
            placeholder="Product Brand"
            required
            className="w-full p-2 border rounded-lg"
          />
          <input
            type="url"
            name="img"
            defaultValue={equipment.img}
            placeholder="Product Image URL"
            required
            className="w-full p-2 border rounded-lg"
          />
          <input
            type="text"
            name="title"
            defaultValue={equipment.title}
            placeholder="Query Title"
            required
            className="w-full p-2 border rounded-lg"
          />
          <textarea
            name="reasonDetails"
            defaultValue={equipment.reasonDetails}
            placeholder="Boycotting Reason Details"
            required
            className="w-full p-2 border rounded-lg"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditEquipment;
