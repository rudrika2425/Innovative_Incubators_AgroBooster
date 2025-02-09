import React, { useState, useEffect } from "react";

const Home = () => {
  const [tools, setTools] = useState([]);
  const [myTools, setMyTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [farmerId, setFarmerId] = useState("679e7026948f428e82f7ab5f");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch all tools
  const fetchAllTools = async () => {
    try {
      const response = await fetch("http://127.0.0.1:4000/tools/gettools");
      if (!response.ok) throw new Error("Failed to fetch tools");
      const data = await response.json();
      setTools(data);
    } catch (err) {
      setError(err.message);
    }
  };

  // Fetch tools by farmer ID
  const fetchMyTools = async (farmerId) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:4000/tools/tools/farmer/${farmerId}`
      );
      if (!response.ok) throw new Error("Failed to fetch my tools");
      const data = await response.json();
      setMyTools(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchAllTools();
      if (farmerId) {
        await fetchMyTools(farmerId);
      }
      setLoading(false);
    };

    fetchData();
  }, [farmerId]);

  const handleDeleteTool = async (toolId) => {
    try {
      const response = await fetch(`http://127.0.0.1:4000/tools/tools/${toolId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete tool");
      }

      fetchAllTools();
      fetchMyTools(farmerId);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleImageUpdate = async (toolId, files) => {
    if (files.length > 5) {
      setError("Maximum 5 images allowed");
      return;
    }

    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append("images", file);
    });

    try {
      const response = await fetch(`http://127.0.0.1:4000/tools/tools/${toolId}/images`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update images");
      }

      fetchAllTools();
      fetchMyTools(farmerId);
    } catch (error) {
      setError(error.message);
    }
  };

  const ToolCard = ({ tool, isMyTool }) => (
    <div className="bg-white shadow-lg hover:shadow-xl rounded-xl p-4 mb-6 flex flex-col md:flex-row border border-gray-200">
      <div className="relative w-full md:w-40 h-40 overflow-hidden rounded-lg">
        <img
          src={tool.images?.[0] || "/api/placeholder/300/200"}
          alt={tool.title}
          className="w-full h-full object-cover transform transition-all hover:scale-110"
        />
        {tool.images?.length > 1 && (
          <span className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
            +{tool.images.length - 1}
          </span>
        )}
      </div>
      <div className="flex-1 mt-4 md:mt-0 md:ml-4">
        <h3 className="text-xl font-semibold">{tool.title}</h3>
        <p className="text-gray-500">{tool.brand} {tool.model}</p>
        <p className="text-lg font-bold text-green-600">₹{tool.rate}/day</p>
        {tool.deposit > 0 && <p className="text-sm text-gray-500">Deposit: ₹{tool.deposit}</p>}
        <p className="text-sm text-gray-600">Category: {tool.category}</p>
        <p className="text-sm">Condition: {tool.condition}</p>
        <p className="text-sm text-gray-600">Location: {tool.district}, {tool.state}</p>

        {isMyTool && (
          <div className="mt-3 flex space-x-3">
            <button onClick={() => handleDeleteTool(tool._id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
              Delete
            </button>
            <input type="file" multiple accept="image/*" onChange={(e) => handleImageUpdate(tool._id, e.target.files)} className="hidden" id={`file-upload-${tool._id}`} />
            <label htmlFor={`file-upload-${tool._id}`} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded cursor-pointer">
              Upload Images
            </label>
          </div>
        )}
      </div>
    </div>
  );

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen text-lg font-semibold">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="bg-blue-500 text-white p-6 rounded-lg text-center mb-6">
        <h1 className="text-3xl font-bold">Tool Rental Dashboard</h1>
        <p className="mt-2">Find and manage your tools easily.</p>
      </div>

      {error && <div className="text-red-500 bg-red-100 p-4 rounded-lg mb-4">{error}</div>}

      <input
        type="text"
        placeholder="Search tools..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <h2 className="text-2xl font-semibold mb-4">My Tool Listings</h2>
      <div>
        {myTools.length === 0 ? (
          <div className="text-center text-gray-500">
            <p>You haven't listed any tools yet.</p>
            <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
              Add a Tool
            </button>
          </div>
        ) : (
          myTools.map((tool) => <ToolCard key={tool._id} tool={tool} isMyTool={true} />)
        )}
      </div>
    </div>
  );
};

export default Home;
