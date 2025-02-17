import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const AddQuery = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate(); // Initialize useNavigate hook

  if (!user) {
    return <p>Loading user data...</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const brand = form.brand.value;
    const img = form.img.value;
    const title = form.title.value;
    const reasonDetails = form.reasonDetails.value;
    const formattedDate = new Date().toISOString(); 
    const nm = user.displayName;
    const email = user.email;
    const photo = user.photoURL;

    const data = {
      name,
      brand,
      img,
      title,
      reasonDetails,
      formattedDate,
      nm,
      email,
      photo,
      count : 0,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/equipment`, data
      );
      toast.success("Data Added successfully");
      form.reset();
      console.log(response.data);
      navigate('/myEquip'); // Use navigate to redirect
    } catch (err) {
      console.log("Error submitting query:", err);
      toast.error(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-lg shadow-lg bg-white p-6 rounded-2xl">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Add a Query</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            required
            className="w-full p-2 border rounded-lg"
          />
          <input
            type="text"
            name="brand"
            placeholder="Product Brand"
            required
            className="w-full p-2 border rounded-lg"
          />
          <input
            type="url"
            name="img"
            placeholder="Product Image URL"
            required
            className="w-full p-2 border rounded-lg"
          />
          <input
            type="text"
            name="title"
            placeholder="Query Title"
            required
            className="w-full p-2 border rounded-lg"
          />
          <textarea
            name="reasonDetails"
            placeholder="Boycotting Reason Details"
            required
            className="w-full p-2 border rounded-lg"
          />
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-xl"
          >
            Add Query
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddQuery;
