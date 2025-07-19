import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("list");
  const token = localStorage.getItem("token");
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    image: null,
  });
  const [blogs, setBlogs] = useState([]);

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fileHandler = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("category", formData.category);
    data.append("description", formData.description);
    data.append("image", formData.image);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/blog/create`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(res.data.message);
      setFormData({
        title: "",
        category: "",
        description: "",
        image: null,
      });
      // Optionally reload blogs after post
      fetchBlogs();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/blog/all`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBlogs(Array.isArray(res.data.blogs) ? res.data.blogs : []);
    } catch (error) {
      setBlogs([]); // Defensive: set to empty if error
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
    // eslint-disable-next-line
  }, []);

  const removeBlog = async (blogId) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/blog/delete/${blogId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(res.data.message);
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== blogId));
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to delete blog"
      );
    }
  };

  return (
    <div className="flex h-auto">
      {/* side bar */}
      <div className="w-64 border-1 border-gray-300  text-white p-6">
        <h2 className="text-lg font-semibold mb-6 text-white">Dashboard</h2>
        <button
          className={`w-full text-left py-2 px-4 mb-2 rounded ${
            activeTab === "post" ? "bg-orange-500" : "bg-gray-700"
          }`}
          onClick={() => setActiveTab("post")}
        >
          Post a Blog
        </button>
        <button
          className={`w-full text-left py-2 px-4 rounded ${
            activeTab === "list" ? "bg-orange-500" : "bg-gray-700"
          }`}
          onClick={() => setActiveTab("list")}
        >
          List of Blogs
        </button>
      </div>

      <div className="flex-1 p-6">
        {activeTab === "post" ? (
          <div>
            <h2 className="text-xl font-bold">Post a new blog</h2>
            <div className="mt-8">
              <form
                onSubmit={submitHandler}
                className="w-1/2 flex flex-col gap-3"
              >
                <input
                  name="title"
                  value={formData.title}
                  onChange={onChangeHandler}
                  type="text"
                  placeholder="title"
                  className="border border-gray-300 rounded-md p-2 outline-none w-full"
                />
                <input
                  name="category"
                  value={formData.category}
                  onChange={onChangeHandler}
                  type="text"
                  placeholder="category"
                  className="border border-gray-300 rounded-md p-2 outline-none w-full"
                />
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={onChangeHandler}
                  placeholder="description"
                  className="border border-gray-300 rounded-md p-2 outline-none w-full"
                />

                <div>
                  <label>Choose Image</label>
                  <input
                    onChange={fileHandler}
                    type="file"
                    accept="image/*"
                    className="border border-gray-300 rounded-md p-2 outline-none w-full"
                  />
                </div>
                <button className="bg-black text-white w-full rounded-full border-none cursor-pointer py-2">
                  post blog
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="p-4 h-auto">
            <h2 className="text-xl font-semibold mb-4">List of Blogs</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border px-4 py-2">Title</th>
                    <th className="border px-4 py-2">Category</th>
                    <th className="border px-4 py-2">Image</th>
                    <th className="border px-4 py-2">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {(Array.isArray(blogs) ? blogs : []).length > 0 ? (
                    blogs.map((blog) => (
                      <tr key={blog._id} className="text-center">
                        <td className="border px-4 py-2">{blog.title}</td>
                        <td className="border px-4 py-2">{blog.category}</td>
                        <td className="border px-4 py-2">
                          <img
                            src={`${import.meta.env.VITE_API_URL}/images/${blog.image}`}
                            alt={blog.title}
                            className="w-16 h-16 object-cover mx-auto"
                          />
                        </td>
                        <td
                          className="border px-4 py-2 cursor-pointer"
                          onClick={() => removeBlog(blog._id)}
                        >
                          X
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center">
                        No blogs found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Dashboard;
