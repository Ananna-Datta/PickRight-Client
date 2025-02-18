import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../Provider/AuthProvider";

const ViewDetails = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [equipment, setEquipment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState([]);

  // Fetch Equipment Details
  const fetchEquipmentDetails = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/equipment/details/${id}`
      );
      setEquipment(data);
    } catch (error) {
      // console.error("Error fetching equipment details:", error);
      toast.error("Failed to load equipment details.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch Recommendations
  const fetchRecommendations = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/recommendations/${id}`);
      setRecommendations(data);
      setLoading(false);
    } catch (error) {
      // console.error("Error fetching recommendations:", error);
      // toast.error("Failed to load recommendations.");
    }
  };

  useEffect(() => {
    fetchEquipmentDetails();
    fetchRecommendations();
  }, [id]);

  const handleAddRecommendation = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.product_title.value;
    const productName = form.productName.value;
    const productImage = form.productImage.value;
    const reason = form.reason.value;
    const user_name = user.displayName;
    const user_email = user.email;
    

    // Prepare data for the recommendation
    const data = {
      title,
      productName,
      productImage,
      reason,
      user,
      user_name,
      user_email,
      equipmentId: id,
    };

    try {
      // Send POST request to add recommendation
      await axios.post(`${import.meta.env.VITE_API_URL}/recommendation`, data);

      // // Update Count on Backend (If Required)
      // await axios.patch(`${import.meta.env.VITE_API_URL}/equipment/updateCount/${id}`);

      // Fetch latest data after submission
      fetchRecommendations(); // Refresh recommendations immediately
      fetchEquipmentDetails(); // Refresh equipment count

      toast.success("Recommendation Added successfully");
      form.reset();
    } catch (err) {
      // console.error("Error submitting query:", err);
      toast.error(err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin h-10 w-10 border-4 border-red-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!equipment) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-red-500">Equipment not found.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Equipment Details</h2>

      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Equipment Image */}
        <img
          src={equipment.img}
          alt={equipment.name}
          className="w-full h-60 object-cover rounded-md mb-4 shadow-lg"
        />

        {/* Equipment Info */}
        <h3 className="text-2xl font-semibold text-gray-800">{equipment.name}</h3>
        <p className="text-gray-600"><strong>Brand:</strong> {equipment.brand}</p>
        <p className="text-gray-700 mt-2"><strong>Query:</strong> {equipment.title}</p>
        <p className="text-gray-700 mt-2"><strong>Reason Details:</strong> {equipment.reasonDetails}</p>
        <p className="text-gray-700 mt-2"><strong>Count:</strong> 0</p>
        {user && <p className="text-gray-600"><strong>Email:</strong> {user.email}</p>}
        
        <p className="text-gray-500 text-sm mt-3">
          <strong>Created at:</strong>{" "}
          {equipment.formattedDate
            ? new Date(equipment.formattedDate).toLocaleString()
            : "Date unavailable"}
        </p>
      </div>

      {/* Recommendation Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mt-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Add Recommendation</h3>
        <form onSubmit={handleAddRecommendation}>
          <div className="mb-4">
            <label className="block text-gray-700">Recommendation Title</label>
            <input
              type="text"
              name="product_title"
              className="w-full p-2 mt-2 border border-gray-300 rounded-md"
              placeholder="Recommendation title"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Recommended Product Name</label>
            <input
              type="text"
              name="productName"
              className="w-full p-2 mt-2 border border-gray-300 rounded-md"
              placeholder="Recommended product name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Recommended Product Image URL</label>
            <input
              type="text"
              name="productImage"
              className="w-full p-2 mt-2 border border-gray-300 rounded-md"
              placeholder="Product image URL"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Recommendation Reason</label>
            <textarea
              name="reason"
              className="w-full p-2 mt-2 border border-gray-300 rounded-md"
              placeholder="Reason for recommendation"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md"
          >
            Add Recommendation
          </button>
        </form>
      </div>

      {/* Show Recommendations */}
      <div className="bg-white rounded-lg shadow-md p-6 mt-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">All Recommendations</h3>

        {recommendations?.length === 0 ? (
          <p className="text-gray-600">No recommendations yet.</p>
        ) : (
          <div className="space-y-4">
            {recommendations.map((rec) => (
              <div key={rec._id} className="border p-4 rounded-lg shadow-sm bg-gray-100">
                <div className="flex gap-4">
                  <img
                    src={rec.productImage}
                    alt={rec.productName}
                    className="w-16 h-16 rounded-md shadow"
                  />
                  <div>
                    <h4 className="font-semibold text-lg">{rec.productName}</h4>
                    <p className="text-gray-700"><strong>Title:</strong> {rec.title}</p>
                    <p className="text-gray-700"><strong>Reason:</strong> {rec.reason}</p>
                    <p className="text-gray-500 text-sm">
                      Recommended by {rec.user_name}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewDetails;
