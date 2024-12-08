import { useState } from "react";
import axios from "axios";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { notification } from 'antd'

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Validate individual field
  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case "email": {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Declare within block
        if (!value.trim()) return "Email is required";
        return emailRegex.test(value) ? "" : "Please enter a valid email address";
      }
  
      case "password": {
        if (!value) return "Password is required";
        return value.length >= 8 ? "" : "Password must be at least 8 characters long";
      }
  
      case "name": {
        return value.trim() ? "" : "Name is required";
      }
  
      default:
        return "";
    }
  };

  // Handle input changes with immediate validation
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update the input value
    if (name === "name") setName(value);
    else if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);

    // Validate the field and update errors
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, value),
    }));
  };

  // Validate all fields before form submission
  const validateForm = () => {
    const newErrors = {
      name: validateField("name", name),
      email: validateField("email", email),
      password: validateField("password", password),
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const formData = { name, email, password };

    try {
      const response = await axios.post("http://localhost:3000/register", formData);
      console.log("Form submitted successfully:", response.data);
      notification.success({
        message: "Congratulations",
        description: "Your registration was successfully registered",
      });
      
      // Reset form
      setName("");
      setEmail("");
      setPassword("");
      setErrors({ name: "", email: "", password: "" });
    } catch (error) {
      console.error(
        "Error submitting form:",
        error.response?.data || error.message
      );
      alert(error.response?.data?.message || "Failed to submit the form!");
    }
  };

  return (
    <>
      <div className="min-h-screen w-full flex justify-center items-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="flex flex-col bg-white/10 backdrop-blur-xl backdrop-filter border-2 border-[#FFD700] p-8 w-full md:w-[500px] rounded-lg shadow-lg shadow-[#FFD700]/20">
          <h2 className="text-[#FFD700] text-3xl font-bold text-center mb-8">Sign Up</h2>
          <form className="flex flex-col gap-y-6 w-full" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-y-2">
              <label className="text-[#FFD700] font-semibold">Name:</label>
              <input
                type="text"
                name="name"
                value={name}
                placeholder="Enter name..."
                onChange={handleInputChange}
                className={`bg-white/20 backdrop-blur-lg border-2 ${
                  errors.name ? "border-red-500" : "border-[#FFD700]"
                } rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700] transition-all`}
              />
              {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
            </div>

            <div className="flex flex-col gap-y-2">
              <label className="text-[#FFD700] font-semibold">Email:</label>
              <input
                type="email"
                name="email"
                value={email}
                placeholder="Enter email..."
                onChange={handleInputChange}
                className={`bg-white/20 backdrop-blur-lg border-2 ${
                  errors.email ? "border-red-500" : "border-[#FFD700]"
                } rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700] transition-all`}
              />
              {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
            </div>

            <div className="flex flex-col gap-y-2">
              <label className="text-[#FFD700] font-semibold">Password:</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  placeholder="Enter password..."
                  onChange={handleInputChange}
                  className={`bg-white/20 backdrop-blur-lg border-2 ${
                    errors.password ? "border-red-500" : "border-[#FFD700]"
                  } rounded-md p-2 text-white w-full pr-10 focus:outline-none focus:ring-2 focus:ring-[#FFD700] transition-all`}
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-[#FFD700] text-xl"
                >
                  {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                </span>
              </div>
              {errors.password && (
                <span className="text-red-500 text-sm">{errors.password}</span>
              )}
            </div>

            <button
              type="submit"
              className="bg-[#FFD700] text-black font-bold py-3 px-6 rounded-md mt-4 hover:bg-[#FFD700]/80 transition-all"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
